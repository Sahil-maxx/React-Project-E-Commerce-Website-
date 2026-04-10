import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import { formatCurrency } from "../utils/helpers";

function OrderHistoryPage({ orders }) {
  return (
    <main>
      <PageBanner
        eyebrow="Order History"
        title="Your recent orders"
        text="Keep track of your latest BuzzBuy purchases, order totals, and delivery status updates."
      />

      <section className="section shell">
        {orders.length ? (
          <div className="order-history-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="summary-row">
                  <h2>{order.id}</h2>
                  <span className="status-pill">{order.status}</span>
                </div>
                <div className="summary-row">
                  <span>{order.date}</span>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
                <p>{order.customer.fullName}</p>
                <p>{order.customer.address}</p>
                <p>{order.items.length} items in this order</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="fa-receipt"
            title="No orders yet"
            text="Your BuzzBuy purchases will appear here once you place your first order."
            buttonLabel="Go to cart"
            buttonLink="/cart"
          />
        )}
      </section>
    </main>
  );
}

export default OrderHistoryPage;
