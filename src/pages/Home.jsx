import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="font-sans text-gray-800 bg-white">
            <NavBar />
            <HeroSection />
            <Footer />
        </div>
    );
};

export default Home;
