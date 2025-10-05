import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: 'linear-gradient(90deg, #f7e6ff 0%, #fdf6f0 100%)' }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <svg 
            className="h-12 w-12 text-purple-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ maxWidth: '48px', maxHeight: '48px' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* 404 Title */}
        <h1 className="text-4xl font-bold text-purple-700 mb-2">404</h1>
        
        {/* Subtitle */}
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Page not found</h2>
        
        {/* Description */}
        <p className="text-gray-500 mb-6 max-w-md">
          The page you are looking for does not exist or has been moved.
          <br />
          Use the button below to return to the main page.
        </p>
        
        {/* Back to Home Button */}
        <div className="w-full flex justify-center mb-4">
          <Link 
            to="/dashboard" 
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition text-center"
          >
            Back to Dashboard
          </Link>
        </div>
        
        {/* Support Text */}
        <p className="text-xs text-gray-400">
          If you think this is a mistake, please contact support or try again.
        </p>
      </div>
    </div>
  );
};

export default NotFound;