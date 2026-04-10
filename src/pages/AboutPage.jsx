import PageBanner from "../components/PageBanner";
import { highlights, stats } from "../data/siteContent";

function AboutPage() {
  return (
    <main>
      <PageBanner
        eyebrow="About Us"
        title="A modern fashion destination designed for everyday style"
        text="BuzzBuy is a clothing brand website built to help shoppers discover fresh outfits, timeless essentials, and confident looks for every season."
      />

      <section className="section shell about-grid">
        <div className="info-panel">
          <h2>Our brand</h2>
          <p>
            BuzzBuy brings together modern fashion, wearable trends, and versatile
            wardrobe pieces in one easy shopping experience. From everyday basics
            to standout seasonal styles, our goal is to make great clothing feel
            accessible, stylish, and effortless.
          </p>
        </div>

        <div className="info-panel">
          <h2>What makes BuzzBuy special</h2>
          <p>
            The BuzzBuy website is designed to feel smooth, simple, and inspiring.
            Shoppers can explore curated collections, browse by category, and find
            pieces that match their personal style with ease.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell highlight-grid">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <i className={`fa-solid ${item.icon}`} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
