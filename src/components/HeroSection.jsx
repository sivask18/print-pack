import React from "react";
import { motion } from "framer-motion";


const HeroSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Quality <span className="text-indigo-600">Printing Machines</span> & Services
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            PrintPack is your trusted partner for printing machine sales, press consulting, and expert servicing. We deliver excellence in every product — from calendars to eco-friendly bags.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
              Get Free Consultation
            </button>
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
              View Our Products
            </button>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center shadow-inner">
            <img
              src="/public/assets/printing-solution-service.jpg"
              alt="Printing Machine"
              className="object-contain h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
