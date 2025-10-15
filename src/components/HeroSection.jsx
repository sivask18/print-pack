import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { products } from "../productConfig";


const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState({});
  const [slideType, setSlideType] = useState({});
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
            <motion.button
              className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Products
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'tel:+91-9876543210'}
            >
              <PhoneIcon className="w-5 h-5" />
              Get Consultation
            </motion.button>
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
              src="/assets/PressOne.jpg"
              alt="Printing Machine"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Products Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-lg max-w-6xl w-full m-4 max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Our Products</h3>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {products.map((product) => {
                  const currentSlideType = slideType[product.id] || 'image';

                  return (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        {/* Left Arrow */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setSlideType(prev => ({ ...prev, [product.id]: currentSlideType === 'image' ? 'video' : 'image' })); }}
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 w-6 h-6 rounded-full shadow hover:bg-opacity-100 transition"
                        >
                          ‹
                        </button>

                        {currentSlideType === 'image' ? (
                          <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                        ) : (
                          <iframe
                            src={product.youtubeUrl}
                            title={`${product.name} Video`}
                            className="w-full h-32"
                            allowFullScreen
                          ></iframe>
                        )}

                        {/* Right Arrow */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setSlideType(prev => ({ ...prev, [product.id]: currentSlideType === 'image' ? 'video' : 'image' })); }}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 w-6 h-6 rounded-full shadow hover:bg-opacity-100 transition"
                        >
                          ›
                        </button>

                        {/* Indicator Dots */}
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${currentSlideType === 'image' ? 'bg-white' : 'bg-gray-400'}`}></span>
                          <span className={`w-1.5 h-1.5 rounded-full ${currentSlideType === 'video' ? 'bg-white' : 'bg-gray-400'}`}></span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-semibold mb-1 line-clamp-2 leading-tight">{product.name}</h4>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                          ))}
                          <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1">📍 {product.location}</p>
                        {showDetails[product.id] ? (
                          <div className="mb-3">
                            <p className="text-xs text-gray-700">{product.longDescription}</p>
                            <button
                              className="w-full mt-2 px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition"
                              onClick={(e) => { e.stopPropagation(); setShowDetails(prev => ({ ...prev, [product.id]: false })); }}
                            >
                              Show Less
                            </button>
                          </div>
                        ) : (
                          <div className="mb-3">
                            <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                            <button
                              className="w-full mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                              onClick={(e) => { e.stopPropagation(); setShowDetails(prev => ({ ...prev, [product.id]: !prev[product.id] })); }}
                            >
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Product Details Modal */}
              {Object.entries(showDetails).find(([, shown]) => shown) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50" onClick={() => setShowDetails({})}>
                  <div className="bg-white rounded-lg max-w-2xl w-full m-4 p-6" onClick={(e) => e.stopPropagation()}>
                    {(() => {
                      const productId = Object.keys(showDetails).find(id => showDetails[id]);
                      const product = products.find(p => p.id === parseInt(productId));
                      if (!product) return null;

                      const currentSlideType = slideType[product.id] || 'image';

                      return (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold">{product.name}</h4>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => setShowDetails({})}
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1/2">
                              {currentSlideType === 'image' ? (
                                <img src={product.image} alt={product.name} className="w-full object-cover rounded" />
                              ) : (
                                <iframe
                                  src={product.youtubeUrl}
                                  title={`${product.name} Video`}
                                  className="w-full h-48 rounded"
                                  allowFullScreen
                                ></iframe>
                              )}
                              <button
                                onClick={() => setSlideType(prev => ({ ...prev, [product.id]: currentSlideType === 'image' ? 'video' : 'image' }))}
                                className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm"
                              >
                                Switch to {currentSlideType === 'image' ? 'Video' : 'Image'}
                              </button>
                            </div>
                            <div className="w-1/2">
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                                ))}
                                <span className="ml-2 text-sm">{product.rating}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">📍 {product.location}</p>
                              <p className="text-sm text-gray-700">{product.longDescription}</p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
