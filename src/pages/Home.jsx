import React from "react";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged in user:", user);

  return (
    <div className="font-sans text-gray-800 bg-white">
      <HeroSection />
    </div>
  );
};

export default Home;
