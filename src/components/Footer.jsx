import { Link } from "react-router-dom";
import { footerGroups } from "../data/siteContent";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-buzz">BUZZ</span>
            <span className="brand-buy">BUY</span>
          </Link>
          <p className="footer-copy">
            BuzzBuy brings together fashion-forward clothing, elevated essentials,
            and effortless styling for every day of the week.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="#" aria-label="X">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h4>{group.title}</h4>
            <ul className="footer-links">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom shell">
        <p>Copyright 2026 BuzzBuy. All rights reserved.</p>
        <p>support@buzzbuy.com</p>
      </div>
    </footer>
  );
}

export default Footer;
