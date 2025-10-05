import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/70 backdrop-blur-sm border-t border-purple-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-purple-700 mb-2 md:mb-0">
            © {currentYear} TechSubs. Made with{' '}
            <span className="text-indigo-600">❤️</span>{' '}
            for developers.
          </p>
          <div className="flex space-x-4 text-sm text-purple-600">
            <a href="#" className="hover:text-purple-800 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-800 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-800 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;