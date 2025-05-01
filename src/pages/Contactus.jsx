import React from "react";
import { motion } from "framer-motion";

const ContactUS = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-20 min-h-screen">
      <motion.h2
        className="text-4xl font-bold text-indigo-700 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Our Team
      </motion.h2>

      <motion.p
        className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Reach out to us for printing machine sales, consulting, servicing, or product inquiries. We’re here to help!
      </motion.p>

      {/* Google Form */}
      <motion.div
        className="mt-10 rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://forms.cloud.microsoft/r/2zSAUW5PiN?origin=lprLink  "
          width="100%"
          height="700"
          frameBorder="0"
          title="Contact Form"
          className="w-full h-[700px] border-none"
          allowFullScreen
        >
          Loading…
        </iframe>
      </motion.div>

      {/* Google Map */}
      <motion.div
        className="mt-10 rounded-xl overflow-hidden shadow-md max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2939.7227230097274!2d77.80507770564883!3d9.453395695362508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06ceee26580575%3A0xc276a4f32f947325!2sSri%20Chellas%20Bakery%20and%20Sweets%20%7C%20Bakery%20Shop%20in%20Sivakasi%20%7C%20Cake%20shop%20in%20Sivakasi%20%7C%20Sweet%20shop%20in%20Sivakasi%20%7CBuy%20Cake%20in%20Sivkasi!5e0!3m2!1sen!2sin!4v1745686327619!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactUS;
