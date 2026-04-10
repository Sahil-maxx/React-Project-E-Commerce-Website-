import { Link } from "react-router-dom";
import { formatCurrency, getRatingStars } from "../utils/helpers";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted = false }) {
  const stars = getRatingStars(product.rating);

  return (
    <article className="product-card fade-in-up">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
        <span className="product-badge">{product.badge}</span>
        <button
          type="button"
          className={`wishlist-button${isWishlisted ? " active" : ""}`}
          onClick={() => onToggleWishlist(product)}
          aria-label="Toggle wishlist"
        >
          <i className={`${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart`} />
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <p className="product-meta">
            {product.category} / {product.subcategory}
          </p>
          <span className="product-stock">{product.stock} in stock</span>
        </div>
        <Link to={`/products/${product.id}`} className="product-title-link">
          {product.name}
        </Link>

        <div className="product-rating">
          {stars.map((filled, index) => (
            <i
              key={`${product.id}-${index}`}
              className={filled ? "fa-solid fa-star" : "fa-regular fa-star"}
            />
          ))}
          <span>({product.reviews})</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-card-footer">
          <div>
            <strong>{formatCurrency(product.price)}</strong>
            <span>{formatCurrency(product.oldPrice)}</span>
          </div>
          <button
            type="button"
            className="primary-button compact-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
