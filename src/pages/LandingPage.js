import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;