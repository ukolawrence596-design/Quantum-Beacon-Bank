export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1
        className="text-8xl font-bold font-heading mb-4"
        style={{ color: "var(--accent-primary)" }}
      >
        404
      </h1>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md" style={{ color: "var(--text-secondary)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}
