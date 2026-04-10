import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../data/siteContent";

function Header({ cartCount, wishlistCount, currentUser, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchText.trim())}`);
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar shell">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-buzz">BUZZ</span>
          <span className="brand-buy">BUY</span>
        </Link>

        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </form>

        <div className={`nav-panel${menuOpen ? " nav-panel-open" : ""}`}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <NavLink to="/wishlist" className="icon-link" onClick={closeMenu}>
              <i className="fa-regular fa-heart" />
              <span className="icon-badge">{wishlistCount}</span>
            </NavLink>
            <NavLink to="/cart" className="icon-link" onClick={closeMenu}>
              <i className="fa-solid fa-bag-shopping" />
              <span className="icon-badge">{cartCount}</span>
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to="/profile" className="account-link" onClick={closeMenu}>
                  {currentUser.name}
                </NavLink>
                <button type="button" className="account-link logout-link" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="account-link" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className="account-link" onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </nav>
    </header>
  );
}

export default Header;
