import React from 'react';

const Navigation = () => {
  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* LOGO */}
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <img src="/logo_NoBg.svg" alt="TechSubs Logo" className="h-8" />
              </a>
            </div>
          </div>
          
          {/* NAVIGATION LINKS */}
          <div className="hidden space-x-4 sm:-my-px sm:ms-10 sm:flex items-center">
            <a 
              href="/login" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-purple-700 hover:text-purple-800 transition duration-150 ease-in-out rounded-lg hover:bg-purple-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Login
            </a>
            <a 
              href="/register" 
              className="inline-flex items-center px-6 py-2 text-sm font-medium leading-5 text-white bg-gradient-to-r from-purple-700 to-indigo-700 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Sign-in
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;