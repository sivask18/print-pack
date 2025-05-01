import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-indigo-600 text-white py-10"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">PrintPack</h2>
          <p className="text-sm text-gray-200">
            Serving quality and trust in printing solutions across industries.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-5">
          <motion.a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white transition"
          >
            <FaFacebookF size={18} />
          </motion.a>

          <motion.a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-red-700 hover:text-white transition"
          >
            <FaInstagram size={18} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white transition"
          >
            <FaLinkedinIn size={18} />
          </motion.a>

          <motion.a
            href="https://wa.me/91" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-green-500 hover:bg-green-600 hover:text-white transition"
          >
            <FaWhatsapp size={20} />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-200">© 2025 PrintPack. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
