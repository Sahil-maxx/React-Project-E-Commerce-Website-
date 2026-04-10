import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (formData.password.trim().length < 6) nextErrors.password = "Password must be at least 6 characters.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    onLogin(formData);
    navigate("/");
  };

  return (
    <main className="auth-simple-page">
      <section className="section shell auth-shell auth-shell-simple">
        <form className="form-card auth-card auth-card-simple" onSubmit={handleSubmit}>
          <div className="auth-hero auth-hero-login">
            <div className="auth-spark auth-spark-one" aria-hidden="true" />
            <div className="auth-spark auth-spark-two" aria-hidden="true" />
            <div className="auth-spark auth-spark-three" aria-hidden="true" />

            <div className="auth-logo auth-logo-hero">
              <span className="brand-buzz">BUZZ</span>
              <span className="brand-buy">BUY</span>
            </div>

            <div className="auth-hero-copy">
              <p className="auth-kicker auth-kicker-light">Customer Login</p>
              <h2>Welcome back to your style space.</h2>
              <p>Log in to continue shopping, save your wishlist, and manage your BuzzBuy orders.</p>
            </div>

            <div className="auth-hills" aria-hidden="true">
              <span className="auth-hill auth-hill-back" />
              <span className="auth-hill auth-hill-front" />
            </div>
          </div>

          <div className="auth-form-panel">
            <div className="auth-card-head">
              <p className="auth-kicker">Sign In</p>
              <h2>Member login</h2>
              <p>Use your account details to enter the BuzzBuy store.</p>
            </div>

            <label>
              Email
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </label>

            <label>
              Password
              <input
                type="password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              />
              {errors.password ? <span className="field-error">{errors.password}</span> : null}
            </label>

            <button type="submit" className="primary-button full-width">
              Login
            </button>
            <p className="auth-helper">
              Don&apos;t have a customer account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
