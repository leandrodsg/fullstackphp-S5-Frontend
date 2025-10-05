import React from 'react';

const FeaturesSection = () => {
  return (
    <div id="features" className="relative bg-white/90 backdrop-blur-sm border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* FEATURE 1: CENTRALIZED MANAGEMENT */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Centralized Management</h3>
            <p className="text-gray-600 leading-relaxed">
              All your tech tools in one place.
            </p>
          </div>

          {/* FEATURE 2: FINANCIAL CONTROL */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Control</h3>
            <p className="text-gray-600 leading-relaxed">
              Know where every penny is going.
            </p>
          </div>

          {/* FEATURE 3: MADE FOR DEVS */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Made for Devs</h3>
            <p className="text-gray-600 leading-relaxed">
              DevTool, Infrastructure, AI, Hosting and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;