import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import { formatCurrency } from "../utils/helpers";

function ProfilePage({ currentUser, orders, onLogout, onUpdateUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  if (!currentUser) {
    return (
      <main>
        <PageBanner
          eyebrow="Customer Account"
          title="Your account"
          text="Login or register to view your BuzzBuy profile, saved details, and recent orders."
        />
        <section className="section shell">
          <EmptyState
            icon="fa-user"
            title="No customer signed in"
            text="Please login or register to access your BuzzBuy account."
            buttonLabel="Login now"
            buttonLink="/login"
          />
        </section>
      </main>
    );
  }

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        city: currentUser.city,
      });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (formData.phone.trim().length < 10) nextErrors.phone = "Enter a valid phone number.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    onUpdateUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      city: currentUser.city,
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <main>
      <PageBanner
        eyebrow="Customer Account"
        title={`Hello, ${currentUser.name}`}
        text="View your customer details, recent orders, and account status in one place."
      />

      <section className="section shell profile-grid">
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Account details</h2>
            {!isEditing ? (
              <button type="button" className="secondary-button" onClick={() => setIsEditing(true)}>
                Edit details
              </button>
            ) : null}
          </div>
          <div className="profile-item">
            <span>Name</span>
            {isEditing ? (
              <label className="profile-edit-field">
                <input name="name" value={formData.name} onChange={handleChange} />
                {errors.name ? <span className="field-error">{errors.name}</span> : null}
              </label>
            ) : (
              <strong>{currentUser.name}</strong>
            )}
          </div>
          <div className="profile-item">
            <span>Email</span>
            {isEditing ? (
              <label className="profile-edit-field">
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email ? <span className="field-error">{errors.email}</span> : null}
              </label>
            ) : (
              <strong>{currentUser.email}</strong>
            )}
          </div>
          <div className="profile-item">
            <span>Phone</span>
            {isEditing ? (
              <label className="profile-edit-field">
                <input name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
              </label>
            ) : (
              <strong>{currentUser.phone}</strong>
            )}
          </div>
          <div className="profile-item">
            <span>City</span>
            {isEditing ? (
              <label className="profile-edit-field">
                <input name="city" value={formData.city} onChange={handleChange} />
                {errors.city ? <span className="field-error">{errors.city}</span> : null}
              </label>
            ) : (
              <strong>{currentUser.city}</strong>
            )}
          </div>
          <div className="profile-item">
            <span>Membership</span>
            <strong>{currentUser.membership}</strong>
          </div>
          {isEditing ? (
            <div className="profile-edit-actions">
              <button type="button" className="primary-button" onClick={handleSave}>
                Save changes
              </button>
              <button type="button" className="secondary-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : null}
          <button type="button" className="secondary-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-card">
          <h2>Recent order overview</h2>
          {orders.length ? (
            orders.slice(0, 3).map((order) => (
              <div className="order-card" key={order.id}>
                <div className="summary-row">
                  <span>{order.id}</span>
                  <strong>{order.status}</strong>
                </div>
                <div className="summary-row">
                  <span>{order.date}</span>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
              </div>
            ))
          ) : (
            <p className="muted-text">No orders yet. Your future purchases will appear here.</p>
          )}
          <Link to="/orders" className="text-link">
            View all orders
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
