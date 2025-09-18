import React from 'react';
import LogoIcon from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-3">
        <LogoIcon className="w-8 h-8" />
        <h1 className="text-3xl font-bold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Gemini Image Fusion
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Header;