import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          TechSubs Frontend
        </h1>
        <p className="text-gray-700 mb-4">
          React project setup completed successfully!
        </p>
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
