import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="py-12 px-4 md:px-20 bg-gray-50 min-h-screen">
      <motion.h2
        className="text-4xl font-bold text-indigo-700 text-center mb-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <strong>Sri Kanagalakshmi Lathe Works</strong> was founded in 1990 in Sivakasi,
        with a vision to provide reliable and innovative solutions in printing machinery and servicing.
        Starting as a humble lathe service center, our dedication to quality and customer satisfaction
        has helped us grow into a trusted name in the printing industry.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 gap-10 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Our Journey</h3>
          <p className="text-gray-700 leading-relaxed">
            In 2011, we expanded our expertise by launching <strong>Dharani Fitting Works</strong>,
            adding more advanced servicing capabilities to our offerings. By 2025, we entered the
            tech-enabled printing industry, delivering both <strong>online consulting</strong> and
            <strong> on-site services</strong> for printing press requirements.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Expertise & Services</h3>
          <p className="text-gray-700 leading-relaxed">
            We specialize in <strong>three-color variant printing press servicing</strong>,
            supporting major brands like <strong>Mitsubishi</strong> and more. Our team includes
            experienced helpers, ready to deliver high-quality repair and consulting services tailored
            to your press setup.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Products We Offer</h3>
          <p className="text-gray-700 leading-relaxed">
            We’ve also entered the online product delivery space, offering customized and bulk
            printing solutions. Our product line includes <strong>Monthly Calendar Sheets</strong>,
            <strong> Daily Calendars</strong>, <strong>Notebooks</strong>, <strong>Diaries</strong>,
            and eco-friendly options like <strong>cloth-based shopping bags</strong> and
            <strong> recyclable packaging products</strong>.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Why Choose Us?</h3>
          <p className="text-gray-700 leading-relaxed">
            At Sri Kanagalakshmi Lathe Works, we blend <strong>tradition with technology</strong>.
            Our decades-long experience, commitment to service excellence, and customer-first
            approach make us the preferred choice for press owners and businesses in need of
            dependable printing solutions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
