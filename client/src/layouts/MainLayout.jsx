

import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
