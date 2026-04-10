import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage({ onRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (formData.phone.trim().length < 10) nextErrors.phone = "Enter a valid phone number.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    if (formData.password.trim().length < 6) nextErrors.password = "Password must be at least 6 characters.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    onRegister(formData);
    navigate("/");
  };

  return (
    <main className="auth-simple-page">
      <section className="section shell auth-shell auth-shell-simple">
        <form className="form-card auth-card auth-card-simple" onSubmit={handleSubmit}>
          <div className="auth-hero auth-hero-register">
            <div className="auth-spark auth-spark-one" aria-hidden="true" />
            <div className="auth-spark auth-spark-two" aria-hidden="true" />
            <div className="auth-spark auth-spark-three" aria-hidden="true" />

            <div className="auth-logo auth-logo-hero">
              <span className="brand-buzz">BUZZ</span>
              <span className="brand-buy">BUY</span>
            </div>

            <div className="auth-hero-copy">
              <p className="auth-kicker auth-kicker-light">Create Account</p>
              <h2>Join the BuzzBuy circle.</h2>
              <p>Register once to save your details, track orders, and keep every favorite look in one place.</p>
            </div>

            <div className="auth-hills" aria-hidden="true">
              <span className="auth-hill auth-hill-back" />
              <span className="auth-hill auth-hill-front" />
            </div>
          </div>

          <div className="auth-form-panel">
            <div className="auth-card-head">
              <p className="auth-kicker">Register</p>
              <h2>Create your account</h2>
              <p>Start your BuzzBuy account and make checkout faster from day one.</p>
            </div>

            <label>
              Full name
              <input name="name" value={formData.name} onChange={handleChange} />
              {errors.name ? <span className="field-error">{errors.name}</span> : null}
            </label>

            <label>
              Email
              <input name="email" value={formData.email} onChange={handleChange} />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </label>

            <label>
              Phone
              <input name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
            </label>

            <label>
              City
              <input name="city" value={formData.city} onChange={handleChange} />
              {errors.city ? <span className="field-error">{errors.city}</span> : null}
            </label>

            <label>
              Password
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password ? <span className="field-error">{errors.password}</span> : null}
            </label>

            <button type="submit" className="primary-button full-width">
              Register
            </button>
            <p className="auth-helper">
              Already have a customer account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
