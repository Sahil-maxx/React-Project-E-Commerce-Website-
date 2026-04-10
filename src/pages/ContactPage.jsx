import { useState } from "react";
import PageBanner from "../components/PageBanner";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasEmptyField = Object.values(formData).some((value) => !value.trim());

    if (hasEmptyField) {
      setStatusMessage("Please fill in all fields before sending your message.");
      return;
    }

    setStatusMessage("Your message has been sent successfully.");
    setFormData(initialForm);
  };

  return (
    <main>
      <PageBanner
        eyebrow="Contact / Support"
        title="We are here to help"
        text="Reach out to BuzzBuy for order help, style questions, product details, or general customer support."
      />

      <section className="section shell contact-grid">
        <div className="info-panel">
          <h2>Support details</h2>
          <p>
            <i className="fa-solid fa-location-dot" /> 24 Market Street, New Delhi
          </p>
          <p>
            <i className="fa-solid fa-phone" /> +91 98765 43210
          </p>
          <p>
            <i className="fa-solid fa-envelope" /> support@buzzbuy.com
          </p>
          <p>
            <i className="fa-solid fa-clock" /> Monday to Saturday, 10 AM to 7 PM
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Send a message</h2>
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Subject
            <input name="subject" value={formData.subject} onChange={handleChange} />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} />
          </label>
          <button type="submit" className="primary-button">
            Send Message
          </button>
          {statusMessage ? <p className="status-message">{statusMessage}</p> : null}
        </form>
      </section>
    </main>
  );
}

export default ContactPage;
