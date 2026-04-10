import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import { formatCurrency } from "../utils/helpers";

function CartPage({ cartItems, cartTotal, onUpdateCartQuantity, onRemoveFromCart }) {
  if (!cartItems.length) {
    return (
      <main>
        <PageBanner
          eyebrow="Cart Page"
          title="Your cart"
          text="Review the items you have added before moving to checkout."
        />
        <section className="section shell">
          <EmptyState
            icon="fa-bag-shopping"
            title="Your cart is empty"
            text="Start adding products to see them here."
            buttonLabel="Shop now"
            buttonLink="/products"
          />
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageBanner
        eyebrow="Cart Page"
        title="Your cart"
        text="Update quantities, remove products, and continue with a clear checkout summary."
      />

      <section className="section shell cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateCartQuantity={onUpdateCartQuantity}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
        </div>

        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <strong>{cartItems.length}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>
          <Link to="/checkout" className="primary-button full-width">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="secondary-button full-width">
            Continue Shopping
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
