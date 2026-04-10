import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import PageBanner from "../components/PageBanner";
import ProductCard from "../components/ProductCard";

function ProductListingPage({ products, onAddToCart, onToggleWishlist, wishlistItems }) {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()) ||
          product.subcategory.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice =
          priceFilter === "All" ||
          (priceFilter === "Under 80" && product.price < 80) ||
          (priceFilter === "80 to 140" && product.price >= 80 && product.price <= 140) ||
          (priceFilter === "Above 140" && product.price > 140);

        return matchesSearch && matchesCategory && matchesPrice;
      }),
    [priceFilter, products, searchText, selectedCategory],
  );

  return (
    <main>
      <PageBanner
        eyebrow="Curated Catalog"
        title="Browse the latest edit"
        text="Search by style, category, or product name and explore a cleaner, better-matched product collection."
      />

      <section className="section shell">
        <div className="filters-panel">
          <div className="filter-field">
            <label htmlFor="search-products">Search</label>
            <input
              id="search-products"
              type="text"
              value={searchText}
              placeholder="Search by name, style, or category"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="price-filter">Price</label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="Under 80">Under $80</option>
              <option value="80 to 140">$80 to $140</option>
              <option value="Above 140">Above $140</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingScreen label="Loading catalog..." />
        ) : (
          <>
            <div className="results-bar surface-panel">
              <div>
                <p className="results-count">{filteredProducts.length} products found</p>
                <span className="muted-text">
                  Thoughtful essentials across apparel, footwear, and accessories.
                </span>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSearchText("");
                  setSelectedCategory("All");
                  setPriceFilter("All");
                }}
              >
                Reset filters
              </button>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistItems.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default ProductListingPage;
