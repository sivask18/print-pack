import React from "react";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">PrintPack</h1>
        <nav className="md:flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-indigo-600 font-bold">Home</a>
          <a href="#" className="hover:text-indigo-600 font-bold">About</a>
          <a href="#" className="hover:text-indigo-600 font-bold">Services</a>
          <a href="#" className="hover:text-indigo-600 font-bold">Contact</a>
        </nav>
        <button className="md:hidden text-gray-700 text-xl">☰</button>
      </div>
    </header>
  );
};

export default NavBar;
