function LoadingScreen({ label = "Loading products..." }) {
  return (
    <div className="loading-grid" aria-live="polite">
      <p className="loading-label">{label}</p>
      <div className="skeleton-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen;
