import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Check,
  Edit3,
} from "lucide-react";
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/api'

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    nationality: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        firstName:   profile.first_name   || "",
        lastName:    profile.last_name    || "",
        email:       profile.email        || "",
        phone:       profile.phone        || "",
        address:     (profile as any).address      || "",
        dateOfBirth: (profile as any).date_of_birth || "",
        occupation:  (profile as any).occupation   || "",
        nationality: (profile as any).nationality  || "",
      });
    }
  }, [profile]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name:    form.firstName,
          last_name:     form.lastName,
          phone:         form.phone,
          address:       form.address,
          date_of_birth: form.dateOfBirth || null,
          occupation:    form.occupation,
          nationality:   form.nationality,
        })
        .eq('id', user!.id)

      if (error) throw error

      await refreshProfile()
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      console.error('Save profile error:', err)
    }
  };

  const inputStyle = (isEditing: boolean) => ({
    background: isEditing ? "var(--bg-input)" : "transparent",
    border: isEditing
      ? "1px solid var(--border-primary)"
      : "1px solid transparent",
    color: "var(--text-primary)",
    outline: "none",
    transition: "all 0.2s ease",
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (editing) {
      e.target.style.borderColor = "#ccff00";
      e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = editing
      ? "var(--border-primary)"
      : "transparent";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            My <span style={{ color: "#ccff00" }}>Profile</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your personal information
          </p>
        </div>
        {saved && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in-down"
            style={{
              background: "rgba(34,197,94,0.1)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <Check size={14} />
            Profile Saved!
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div
        className="rounded-2xl p-6 flex items-center gap-6 relative overflow-hidden"
        style={{
          background: `radial-gradient(
            ellipse at top right,
            rgba(204,255,0,0.08) 0%,
            transparent 60%
          ), var(--bg-elevated)`,
          border: "1px solid rgba(204,255,0,0.15)",
        }}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl"
            style={{ background: "#ccff00", color: "#0d0d0d" }}
          >
            JD
          </div>
          <button
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "var(--bg-elevated)",
              border: "2px solid var(--bg-primary)",
              color: "var(--text-secondary)",
            }}
          >
            <Camera size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2
            className="text-xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {form.firstName} {form.lastName}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {form.email}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,0.1)",
                color: "#22c55e",
              }}
            >
              ✓ Verified Account
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(204,255,0,0.1)",
                color: "#ccff00",
              }}
            >
              Premium Member
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 shrink-0"
          style={{
            background: editing ? "#ccff00" : "var(--bg-hover)",
            color: editing ? "#0d0d0d" : "var(--text-secondary)",
            border: editing ? "none" : "1px solid var(--border-primary)",
          }}
        >
          {editing ? (
            <>
              <Check size={14} /> Save Changes
            </>
          ) : (
            <>
              <Edit3 size={14} /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Personal Information */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Personal Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              field: "firstName",
              label: "First Name",
              icon: User,
              type: "text",
            },
            { field: "lastName", label: "Last Name", icon: User, type: "text" },
            {
              field: "email",
              label: "Email Address",
              icon: Mail,
              type: "email",
            },
            { field: "phone", label: "Phone Number", icon: Phone, type: "tel" },
            {
              field: "dateOfBirth",
              label: "Date of Birth",
              icon: Calendar,
              type: "date",
            },
            {
              field: "occupation",
              label: "Occupation",
              icon: User,
              type: "text",
            },
          ].map(({ field, label, icon: Icon, type }) => (
            <div key={field} className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon size={12} />
                {label}
              </label>
              <input
                type={type}
                value={form[field as keyof typeof form]}
                onChange={(e) => update(field, e.target.value)}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-full text-sm"
                style={inputStyle(editing)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))}
        </div>

        {/* Address — full width */}
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            <MapPin size={12} />
            Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            disabled={!editing}
            className="w-full px-4 py-3 rounded-full text-sm"
            style={inputStyle(editing)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {editing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 15px rgba(204,255,0,0.2)",
              }}
            >
              <Check size={14} />
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Account Information
        </h3>

        {[
          { label: 'Account Number', value: profile?.account_number || '••••••••••' },
          { label: 'Account Type',   value: (profile as any)?.account_type || 'Checking' },
          { label: 'Member Since',   value: profile ? new Date((profile as any).created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '...' },
          { label: 'Account Status', value: profile?.status || 'Active', highlight: true },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: "1px solid var(--border-primary)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              {label}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: highlight ? "#22c55e" : "var(--text-primary)" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
