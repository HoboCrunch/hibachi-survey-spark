
import React from 'react';
import HibachiLogo from './HibachiLogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-hibachi-dark text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-hibachi-pink/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-hibachi-orange/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[5%] left-[30%] w-[15vw] h-[15vw] rounded-full bg-hibachi-yellow/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[20%] w-[20vw] h-[20vw] rounded-full bg-hibachi-purple/5 blur-3xl animate-pulse-slow"></div>
        
        {/* Decorative curves inspired by the design */}
        <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0C300 200 700 1000 1000 800" stroke="url(#curve-gradient-1)" strokeWidth="2" />
          <path d="M0 1000C200 800 800 200 1000 0" stroke="url(#curve-gradient-2)" strokeWidth="2" />
          <defs>
            <linearGradient id="curve-gradient-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="800">
              <stop offset="0%" stopColor="#FFD600" />
              <stop offset="100%" stopColor="#FF1A8C" />
            </linearGradient>
            <linearGradient id="curve-gradient-2" gradientUnits="userSpaceOnUse" x1="0" y1="1000" x2="1000" y2="0">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#9B87F5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 relative z-10">
        <HibachiLogo />
        <div className="text-sm text-white/70">Survey Portal</div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full p-6 text-center text-white/50 text-sm relative z-10">
        © {new Date().getFullYear()} Hibachi. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
