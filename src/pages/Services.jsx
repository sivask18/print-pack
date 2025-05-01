import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="py-12 px-4 md:px-20 bg-white min-h-screen">
      <motion.h2
        className="text-4xl font-bold text-indigo-700 text-center mb-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Services
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        At <strong>PrintPack</strong>, we offer a wide range of services tailored to meet the growing demands of the printing industry. With decades of experience and a commitment to excellence, we ensure quality solutions that support the success of printing businesses across India.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Service 1 */}
        <motion.div
          className="bg-gray-100 rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Printing Machine Sales</h3>
          <p className="text-gray-700 leading-relaxed">
            We provide high-quality printing machines with expert advice and support. Whether you're
            looking to upgrade or start fresh, we offer the best models for your needs at competitive
            prices.
          </p>
        </motion.div>

        {/* Service 2 */}
        <motion.div
          className="bg-gray-100 rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Consulting & Guidance</h3>
          <p className="text-gray-700 leading-relaxed">
            Not sure what machine fits your workflow? We offer professional consulting—both onsite
            and online—to help you select the right setup, optimize workflow, and boost productivity.
          </p>
        </motion.div>

        {/* Service 3 */}
        <motion.div
          className="bg-gray-100 rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Servicing & Repairs</h3>
          <p className="text-gray-700 leading-relaxed">
            We offer expert repair services for <strong>three-color variant printing presses</strong> and
            top brands like <strong>Mitsubishi</strong>. Our experienced team ensures quick and
            dependable servicing—minimizing downtime and maximizing machine lifespan.
          </p>
        </motion.div>

        {/* Service 4 */}
        <motion.div
          className="bg-gray-100 rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Printing Product Delivery</h3>
          <p className="text-gray-700 leading-relaxed">
            We now deliver quality-printed products such as <strong>Calendars</strong>, 
            <strong> Notebooks</strong>, <strong> Diaries</strong>, and <strong>Eco-friendly
            packaging bags</strong> at affordable prices. All products are custom-designed and
            delivered based on your order needs.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
