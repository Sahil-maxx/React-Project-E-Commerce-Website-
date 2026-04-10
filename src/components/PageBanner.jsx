function PageBanner({ eyebrow, title, text }) {
  return (
    <section className="page-banner">
      <div className="shell">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export default PageBanner;
