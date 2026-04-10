function SectionTitle({ title, text, align = "left", eyebrow = "BuzzBuy Collection" }) {
  return (
    <div className={`section-title section-title-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default SectionTitle;
