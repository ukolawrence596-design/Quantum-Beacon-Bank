import { supabase } from "./api";

// ─── GET USER TRANSACTIONS ───────────────────────────────────
export async function getUserTransactions(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function topUpCustomer(
  customerId: string,
  customerAccount: string,
  amount: number,
  note: string = "Admin top up",
) {
  const topUpAmount = Number(amount);
  if (topUpAmount <= 0) throw new Error("Top-up amount must be greater than zero");

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("balance")
    .eq("id", customerId)
    .single();

  if (profileError || !profileData) {
    throw profileError || new Error("Customer profile not found");
  }

  const newBalance = Number(profileData.balance ?? 0) + topUpAmount;
  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({ balance: newBalance })
    .eq("id", customerId)
    .select("balance")
    .single();

  if (updateError || !updatedProfile) throw updateError || new Error("Balance update failed");

  const reference = `TOPUP-${Date.now().toString().slice(-8)}`;
  const { error: transactionError } = await supabase.from("transactions").insert({
    sender_id: null,
    receiver_id: customerId,
    sender_account: "ADMIN",
    receiver_account: customerAccount,
    amount: topUpAmount,
    type: "topup",
    status: "successful",
    note,
    reference,
  });

  if (transactionError) throw transactionError;

  return {
    success: true,
    reference,
    newBalance: Number(updatedProfile.balance ?? newBalance),
  };
}

// ─── PROCESS TRANSFER ────────────────────────────────────────
export async function transferFunds(
  senderId: string,
  receiverAccount: string,
  amount: number,
  note: string = "",
) {
  const transferAmount = Number(amount);
  if (transferAmount <= 0) throw new Error("Transfer amount must be greater than zero");

  const rpcResult = await supabase.rpc("process_transfer", {
    p_sender_id: senderId,
    p_receiver_account: receiverAccount,
    p_amount: transferAmount,
    p_note: note,
  });

  if (!rpcResult.error && rpcResult.data?.success) {
    return rpcResult.data;
  }

  if (rpcResult.error) {
    console.warn("process_transfer RPC failed, falling back to client-side transfer:", rpcResult.error.message);
  }

  const { data: senderData, error: senderError } = await supabase
    .from("profiles")
    .select("id, account_number, balance")
    .eq("id", senderId)
    .single();
  if (senderError || !senderData) throw senderError || new Error("Sender profile not found");

  const { data: receiverData, error: receiverError } = await supabase
    .from("profiles")
    .select("id, balance")
    .eq("account_number", receiverAccount)
    .single();
  if (receiverError || !receiverData) throw receiverError || new Error("Receiver account not found");

  if (senderData.id === receiverData.id) {
    throw new Error("You cannot transfer to your own account");
  }

  const senderBalance = Number(senderData.balance ?? 0);
  const receiverBalance = Number(receiverData.balance ?? 0);

  if (senderBalance < transferAmount) {
    throw new Error("Insufficient balance");
  }

  const { error: updateSenderError } = await supabase
    .from("profiles")
    .update({ balance: senderBalance - transferAmount })
    .eq("id", senderData.id);
  if (updateSenderError) throw updateSenderError;

  const { error: updateReceiverError } = await supabase
    .from("profiles")
    .update({ balance: receiverBalance + transferAmount })
    .eq("id", receiverData.id);
  if (updateReceiverError) throw updateReceiverError;

  const reference = `TRF-${Date.now().toString().slice(-8)}`;
  const { error: transactionError } = await supabase.from("transactions").insert({
    sender_id: senderData.id,
    receiver_id: receiverData.id,
    sender_account: senderData.account_number,
    receiver_account: receiverAccount,
    amount: transferAmount,
    type: "transfer",
    status: "successful",
    note,
    reference,
  });
  if (transactionError) throw transactionError;

  return { success: true, reference };
}

export async function processTransfer(
  senderId: string,
  receiverAccount: string,
  amount: number,
  note: string = "",
) {
  const { data, error } = await supabase.rpc("process_transfer", {
    p_sender_id: senderId,
    p_receiver_account: receiverAccount,
    p_amount: amount,
    p_note: note,
  });

  if (error) throw error;
  return data;
}

// ─── GET TRANSACTION BY ID ───────────────────────────────────
export async function getTransactionById(id: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ─── GET USER BALANCE ────────────────────────────────────────
export async function getUserBalance(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("balance")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data?.balance || 0;
}

// ─── GET ALL TRANSACTIONS (Admin) ────────────────────────────
export async function getAllTransactions(limit = 100) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      sender:profiles!transactions_sender_id_fkey(first_name, last_name, email),
      receiver:profiles!transactions_receiver_id_fkey(first_name, last_name, email)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// ─── UPDATE TRANSACTION STATUS (Admin) ───────────────────────
export async function updateTransactionStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
