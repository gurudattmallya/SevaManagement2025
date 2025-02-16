import React from 'react';
import arisecraftLogo from '../../assets/ariselogo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <div className="text-center">
            <a
              href="https://www.arisecraft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-amber-600 text-sm mb-1">Made with Devotion By</p>
              <img
                src={arisecraftLogo}
                alt="Arisecraft"
                className="h-14 mx-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-amber-200">
        <div className="container mx-auto px-6 py-2">
          <p className="text-amber-600 text-xs text-center">
            © {new Date().getFullYear()} Arisecraft Technologies Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;