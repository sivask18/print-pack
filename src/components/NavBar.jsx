import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="nm-header">
      <div className="nm-container">
        <div className="nm-left" onClick={() => navigate("/")}>
          <h1 className="nm-logo">Printomax</h1>
        </div>

        <nav className={`nm-center ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="nm-link">Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className="nm-link">About</NavLink>
          <NavLink to="/services" onClick={() => setMenuOpen(false)} className="nm-link">Services</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="nm-link">Contact</NavLink>
        </nav>

        <div className="nm-right">
          {!user ? (
            <NavLink to="/login" className="nm-login" onClick={() => setMenuOpen(false)}>Login</NavLink>
          ) : (
            <div className="nm-profile" ref={profileRef}>
              <button
                className="nm-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <svg className="nm-profile-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
                <span className="nm-profile-name">{user.name}</span>
                <svg className={`nm-chevron ${profileOpen ? "open" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              {profileOpen && (
                <div className="nm-dropdown">
                  <button className="nm-dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}

          {/* hamburger */}
          <button
            className={`nm-hamb ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile dropdown (visible via CSS when .open) */}
      <div className={`nm-mobile ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className="nm-link">Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className="nm-link">About</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)} className="nm-link">Services</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="nm-link">Contact</NavLink>
        {!user ? (
          <NavLink to="/login" onClick={() => setMenuOpen(false)} className="nm-link nm-login">Login</NavLink>
        ) : (
          <div className="nm-mobile-profile">
            <div className="nm-mobile-profile-info">
              <svg className="nm-profile-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
              <span className="nm-mobile-profile-name">{user.name}</span>
            </div>
            <button className="nm-link nm-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
