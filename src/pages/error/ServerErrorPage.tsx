export default function ServerErrorPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1
        className="text-8xl font-bold font-heading mb-4"
        style={{ color: "var(--accent-primary)" }}
      >
        500
      </h1>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Server Error
      </h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Something went wrong on our end. Please try again later.
      </p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}
