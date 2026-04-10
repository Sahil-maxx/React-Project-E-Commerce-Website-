import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { formatCurrency } from "../utils/helpers";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  payment: "Cash on Delivery",
};

function CheckoutPage({ cartItems, cartTotal, currentUser, onPlaceOrder }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...initialForm,
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    city: currentUser?.city || "",
  });
  const [errors, setErrors] = useState({});

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (formData.phone.trim().length < 10) nextErrors.phone = "Enter a valid phone number.";
    if (!formData.address.trim()) nextErrors.address = "Address is required.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    if (!formData.zipCode.trim()) nextErrors.zipCode = "ZIP code is required.";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    onPlaceOrder(formData);
    navigate("/orders");
  };

  return (
    <main>
      <PageBanner
        eyebrow="Checkout Page"
        title="Secure checkout"
        text="Fill in delivery details with simple validation and confirm the order."
      />

      <section className="section shell checkout-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Billing details</h2>
          <div className="form-grid">
            <label>
              Full name
              <input name="fullName" value={formData.fullName} onChange={handleChange} />
              {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
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

            <label className="full-span">
              Address
              <input name="address" value={formData.address} onChange={handleChange} />
              {errors.address ? <span className="field-error">{errors.address}</span> : null}
            </label>

            <label>
              ZIP code
              <input name="zipCode" value={formData.zipCode} onChange={handleChange} />
              {errors.zipCode ? <span className="field-error">{errors.zipCode}</span> : null}
            </label>

            <label>
              Payment method
              <select name="payment" value={formData.payment} onChange={handleChange}>
                <option>Cash on Delivery</option>
                <option>Credit Card</option>
                <option>UPI</option>
              </select>
            </label>
          </div>

          <button type="submit" className="primary-button">
            Place Order
          </button>
        </form>

        <aside className="summary-card">
          <h2>Checkout summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default CheckoutPage;
