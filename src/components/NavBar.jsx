import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <h1
          className="text-3xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          PrintPack
        </h1>

        {/* Navigation Menu */}
        <nav className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Contact
          </NavLink>

          {/* ✅ Conditional Login or User Dropdown */}
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-indigo-600 font-bold transition ${
                  isActive ? "text-indigo-600" : ""
                }`
              }
            >
              Login
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="font-bold text-indigo-600 focus:outline-none"
              >
                👤 {user.name || user.email}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
