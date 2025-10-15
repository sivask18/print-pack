import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

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
    <header className="sticky top-0 z-50 bg-white shadow-md w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <h1
          className="text-3xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="PrintPack Home"
        >
          PrintPack
        </h1>

        {/* Navigation Menu */}
        <nav className="flex flex-1 justify-center items-center space-x-12 text-sm font-medium text-gray-700" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-semibold transition-colors duration-200 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-semibold transition-colors duration-200 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-semibold transition-colors duration-200 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-semibold transition-colors duration-200 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* ✅ Login or User Dropdown - Right Corner */}
        {!user ? (
          <NavLink
            to="/login"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Login
          </NavLink>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 font-semibold text-gray-900 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={`Account menu for ${user?.name || user?.email}`}
            >
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
              <span>{user.name || user.email}</span>
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg" role="menu">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
