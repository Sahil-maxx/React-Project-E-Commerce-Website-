import { formatCurrency } from "../utils/helpers";

function CartItem({ item, onUpdateCartQuantity, onRemoveFromCart }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <strong>{formatCurrency(item.price)}</strong>
      </div>

      <div className="quantity-box">
        <button type="button" onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      <div className="cart-item-actions">
        <p>{formatCurrency(item.price * item.quantity)}</p>
        <button type="button" className="text-button" onClick={() => onRemoveFromCart(item.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
