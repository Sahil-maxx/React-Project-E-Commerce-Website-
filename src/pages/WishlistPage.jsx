import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import ProductCard from "../components/ProductCard";

function WishlistPage({ wishlistItems, onAddToCart, onToggleWishlist }) {
  return (
    <main>
      <PageBanner
        eyebrow="Saved Favorites"
        title="Your wishlist"
        text="Keep your favorite BuzzBuy styles in one place and add them to your bag whenever you are ready."
      />

      <section className="section shell">
        {wishlistItems.length ? (
          <div className="product-grid">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="fa-heart"
            title="Your wishlist is empty"
            text="Save products you like so you can compare them later."
            buttonLabel="Explore products"
            buttonLink="/products"
          />
        )}
      </section>
    </main>
  );
}

export default WishlistPage;
