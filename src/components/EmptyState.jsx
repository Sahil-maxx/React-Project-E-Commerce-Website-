import { Link } from "react-router-dom";

function EmptyState({ icon, title, text, buttonLabel, buttonLink }) {
  return (
    <div className="empty-state">
      <i className={`fa-solid ${icon}`} />
      <h2>{title}</h2>
      <p>{text}</p>
      {buttonLabel && buttonLink ? (
        <Link to={buttonLink} className="primary-button">
          {buttonLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
