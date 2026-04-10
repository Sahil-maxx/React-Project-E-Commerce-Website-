import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { heroContent, highlights, homeCategories, stats, testimonials } from "../data/siteContent";

function HomePage({ products, onAddToCart, onToggleWishlist, wishlistItems }) {
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroContent.slides.length);
    }, 3200);

    return () => window.clearInterval(slideTimer);
  }, []);

  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);

  if (loading) {
    return <LoadingScreen label="Preparing your shopping experience..." />;
  }

  return (
    <main>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy fade-in-up">
            <p className="eyebrow">Curated Style Marketplace</p>
            <h1>{heroContent.title}</h1>
            <p>{heroContent.text}</p>
            <div className="hero-actions">
              <Link to="/products" className="primary-button">
                Explore Products
              </Link>
              <Link to="/about" className="secondary-button">
                See Our Story
              </Link>
            </div>

            <div className="hero-note">
              <span>New season edit</span>
              <strong>
                Clean essentials, statement accessories, and better-aligned product stories.
              </strong>
            </div>

            <div className="stats-grid">
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-main-card">
              {heroContent.slides.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt={`Shopping hero ${index + 1}`}
                  className={`hero-slide${activeSlide === index ? " active" : ""}`}
                />
              ))}
            </div>
            <div className="hero-dots">
              {heroContent.slides.map((slide, index) => (
                <button
                  type="button"
                  key={slide}
                  className={activeSlide === index ? "active" : ""}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show hero slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionTitle
          eyebrow="Browse By Mood"
          title="Shop by category"
          text="Explore curated collections shaped around everyday dressing, statement moments, and elevated essentials."
        />
        <div className="category-grid">
          {homeCategories.map((category) => (
            <article className="category-card" key={category.title}>
              <img src={category.image} alt={category.title} />
              <div className="category-card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link to="/products" className="text-link">
                  Browse now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <SectionTitle
          eyebrow="Most Loved"
          title="Featured products"
          text="Discover standout styles chosen for their versatile appeal, refined details, and everyday wearability."
        />
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistItems.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <SectionTitle
            eyebrow="Why It Feels Better"
            title="Why shoppers love BuzzBuy"
            text="From polished essentials to trend-forward pieces, BuzzBuy makes style discovery feel easy, modern, and inspiring."
            align="center"
          />
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article key={item.title} className="highlight-card fade-in-up">
                <i className={`fa-solid ${item.icon}`} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionTitle
          eyebrow="Fresh Picks"
          title="Trending picks"
          text="Stay ahead with fresh arrivals, current favorites, and fashion picks that fit every kind of wardrobe."
        />
        <div className="product-grid">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistItems.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <SectionTitle
            eyebrow="Customer Voices"
            title="What shoppers are saying"
            text="See why customers keep coming back for versatile fashion, easy browsing, and a smooth shopping experience."
            align="center"
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <p>{item.text}</p>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
