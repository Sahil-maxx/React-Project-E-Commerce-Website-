import PageBanner from "../components/PageBanner";
import { faqs } from "../data/siteContent";

function FaqPage() {
  return (
    <main>
      <PageBanner
        eyebrow="BuzzBuy FAQ"
        title="Frequently asked questions"
        text="Helpful answers about shopping, wishlist saving, returns, and the BuzzBuy customer experience."
      />

      <section className="section shell faq-list">
        {faqs.map((item) => (
          <article className="faq-card" key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default FaqPage;
