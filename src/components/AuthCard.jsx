export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <div className="auth__card">
        <p className="auth__brand">
          <span>Study</span>
          <span>Flow</span>
        </p>
        <h1 className="auth__title">{title}</h1>
        {subtitle ? <p className="auth__subtitle">{subtitle}</p> : null}
        {children}
        {footer}
      </div>
    </div>
  );
}
