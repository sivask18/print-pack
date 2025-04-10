import React from "react";

const LandingPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Navbar */}
            <nav className="w-full bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-indigo-600">PrintPack</div>
                    <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        <li><a href="#" className="hover:text-indigo-600">Home</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Services</a></li>
                        <li><a href="#" className="hover:text-indigo-600">About</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
                    </ul>
                    <button className="md:hidden text-gray-700">
                        {/* Add hamburger icon if needed */}
                        ☰
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="w-full py-20 bg-gradient-to-r from-indigo-100 to-white">
                <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Revolutionizing <span className="text-indigo-600">Printing Solutions</span>
                        </h1>
                        <p className="text-gray-600 mb-6 text-lg">
                            End-to-end services in printing, machinery servicing, and press sales. Everything you need in one place.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
                                Get Started
                            </button>
                            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
                                Learn More
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default LandingPage;
