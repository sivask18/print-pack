import React from "react";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <SEO
        title="Quality Printing Machines & Press Servicing in Sivakasi"
        description="Printomax is your trusted partner for printing machine sales, press consulting and expert servicing in Sivakasi. From offset presses to eco-friendly calendars and bags — we deliver excellence."
        keywords="printing machine sales, printing press servicing, printing consulting, offset printing machine, Sivakasi printing, Printomax"
        path="/"
      />
      <HeroSection />
    </div>
  );
};


export default Home;
