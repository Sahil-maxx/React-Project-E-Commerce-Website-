import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ProductCard from "../components/ProductCard";
import { formatCurrency, getRatingStars } from "../utils/helpers";

function ProductDetailsPage({ products, onAddToCart, onToggleWishlist, wishlistItems }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [selectedImage, setSelectedImage] = useState(product?.gallery[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product?.gallery[0]);
    setSelectedColor(product?.colors[0]);
    setSelectedSize(product?.sizes[0]);
    setQuantity(1);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 3);
  }, [product, products]);

  if (!product) {
    return (
      <main className="section shell">
        <EmptyState
          icon="fa-box-open"
          title="Product not found"
          text="The product you are looking for is not available right now."
          buttonLabel="Back to products"
          buttonLink="/products"
        />
      </main>
    );
  }

  const stars = getRatingStars(product.rating);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <main>
      <section className="section shell">
        <div className="details-layout">
          <div className="details-gallery">
            <div className="details-main-image">
              <img src={selectedImage} alt={product.name} />
            </div>
            {product.gallery.length > 1 ? (
              <div className="details-thumbnails">
                {product.gallery.map((image) => (
                  <button
                    type="button"
                    key={image}
                    className={selectedImage === image ? "active" : ""}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={product.name} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="details-content">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>

            <div className="product-rating">
              {stars.map((filled, index) => (
                <i
                  key={`${product.id}-rating-${index}`}
                  className={filled ? "fa-solid fa-star" : "fa-regular fa-star"}
                />
              ))}
              <span>
                {product.rating} rating • {product.reviews} reviews
              </span>
            </div>

            <div className="details-price-row">
              <strong>{formatCurrency(product.price)}</strong>
              <span>{formatCurrency(product.oldPrice)}</span>
              <small>{product.badge}</small>
            </div>

            <p className="details-description">{product.description}</p>

            <div className="option-group">
              <h3>Choose color</h3>
              <div className="option-list">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={selectedColor === color ? "selected" : ""}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h3>Choose size</h3>
              <div className="option-list">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={selectedSize === size ? "selected" : ""}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-row">
              <div className="quantity-box">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => current + 1)}>
                  +
                </button>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => onAddToCart(product, quantity)}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className={`secondary-button icon-button${isWishlisted ? " active" : ""}`}
                onClick={() => onToggleWishlist(product)}
              >
                <i className={`${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart`} />
                Wishlist
              </button>
            </div>

            <div className="details-meta-grid">
              <div>
                <span>SKU</span>
                <strong>{product.sku}</strong>
              </div>
              <div>
                <span>Stock</span>
                <strong>{product.stock} available</strong>
              </div>
            </div>

            <div className="feature-list">
              {product.features.map((feature) => (
                <p key={feature}>
                  <i className="fa-solid fa-circle-check" />
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="info-panel">
          <h2>Delivery and care</h2>
          <p>
            Orders are processed within 24 hours with easy exchange support, careful
            packaging, and simple care guidance designed to keep the shopping flow realistic.
          </p>
          <Link to="/checkout" className="text-link">
            Continue to checkout
          </Link>
        </div>
      </section>

      <section className="section shell">
        <div className="section-title">
          <p className="eyebrow">Related Items</p>
          <h2>You may also like</h2>
        </div>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistItems.some((wishlistItem) => wishlistItem.id === item.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
