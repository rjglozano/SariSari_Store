// components/HeroSection.js or components/HeroSection.tsx
import React from 'react';
import NavigationBar from './NavigationBar';

const Hero = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />

      {/* Hero Section with Image Background */}
      <div className="flex-1 bg-cover bg-center relative flex items-center justify-center z-0" style={{ backgroundImage: 'url("/images/store.jpg")', opacity: '0.8' }}>
   
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-20 text-red-400 text-center">
            <h1 className="TitanFont md:text-6xl lg:text-8xl text-5xl font-bold mb-4">Sari-Sari Store</h1>
            <p className="TitanFont lg:text-3xl md:text-lg text-sm text-black bg-gradient-to-r from-red-500 to-white p-3 rounded-lg z-10">Sari-Sari Sa Puso, Sa Bawat Kanto</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
