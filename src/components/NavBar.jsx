import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">PrintPack</h1>
        <nav className="md:flex space-x-6 text-sm font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition duration-300 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition duration-300 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition duration-300 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition duration-300 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:text-indigo-600 font-bold transition duration-300 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Login
          </NavLink>
        </nav>
        <button className="md:hidden text-gray-700 text-xl">☰</button>
      </div>
    </header>
  );
};

export default NavBar;
