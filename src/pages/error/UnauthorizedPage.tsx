export default function UnauthorizedPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1
        className="text-8xl font-bold font-heading mb-4"
        style={{ color: "var(--accent-primary)" }}
      >
        401
      </h1>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Unauthorized
      </h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        You don't have permission to access this page.
      </p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}
