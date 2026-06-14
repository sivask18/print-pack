import React, { useState, useMemo } from "react";
import { products } from "../productConfig";

const Products = () => {

  const [sortBy, setSortBy] = useState('relevance');
  const [filterRating, setFilterRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesRating = filterRating === 0 || product.rating >= filterRating;
      const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRating && matchesSearch;
    });

    // Sort the filtered products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'relevance':
        default:
          return 0;
      }
    });

    return filtered;
  }, [sortBy, filterRating, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Header Bar - Match site theme */}
      <div className="bg-indigo-600 text-white border-b border-indigo-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">Printing Machines</h1>
              <span className="text-sm text-indigo-200">({filteredAndSortedProducts.length} products)</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-indigo-400 rounded-lg px-4 py-2 pr-10 text-sm bg-indigo-500 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 w-64"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-indigo-400 rounded px-3 py-2 text-sm bg-indigo-500 text-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="rating-high">Rating: High to Low</option>
                  <option value="rating-low">Rating: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-20 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">FILTERS</h3>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Customer Ratings</h4>
                <div className="space-y-2">
                  {[
                    { label: '4★ & above', value: 4 },
                    { label: '3★ & above', value: 3 },
                    { label: '2★ & above', value: 2 },
                    { label: '1★ & above', value: 1 }
                  ].map((rating) => (
                    <label key={rating.value} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterRating === rating.value}
                        onChange={() => setFilterRating(filterRating === rating.value ? 0 : rating.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <div className="aspect-[3/2]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-medium mr-1">
                        <span className="mr-0.5">{product.rating}</span>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500">({Math.floor(Math.random() * 100) + 10})</span>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-bold text-gray-900 mb-2">Contact for Price</p>

                    {/* Location - smaller */}
                    <p className="text-xs text-gray-500 mb-2">📍 {product.location}</p>

                    {/* Description - minimal */}
                    <p className="text-xs text-gray-700 line-clamp-2 mb-2 leading-tight">
                      {product.description.substring(0, 80)}...
                    </p>

                    {/* Action Buttons - small */}
                    <div className="flex gap-1">
                      <button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-2 rounded text-xs font-semibold transition-colors duration-200"
                        onClick={() => window.open(product.youtubeUrl.replace('embed/', 'watch?v='), '_blank')}
                      >
                        Video
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-2 rounded text-xs font-semibold transition-colors duration-200"
                        onClick={() => window.location.href = 'https://wa.me/919876543210'}
                      >
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
