
import React from 'react';

const HibachiLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-8 h-10">
        <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M200 0C200 0 260 60 260 120C260 180 200 200 200 320C200 200 140 180 140 120C140 60 200 0 200 0Z" 
            fill="url(#flame-gradient)" 
          />
          <defs>
            <linearGradient id="flame-gradient" x1="140" y1="0" x2="260" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD600" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF1A8C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-bold text-xl text-white tracking-wider">HIBACHI</span>
    </div>
  );
};

export default HibachiLogo;
