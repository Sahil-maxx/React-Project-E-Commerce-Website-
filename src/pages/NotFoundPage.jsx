import EmptyState from "../components/EmptyState";

function NotFoundPage() {
  return (
    <main className="section shell">
      <EmptyState
        icon="fa-compass"
        title="Page not found"
        text="The page you requested does not exist."
        buttonLabel="Return home"
        buttonLink="/"
      />
    </main>
  );
}

export default NotFoundPage;
