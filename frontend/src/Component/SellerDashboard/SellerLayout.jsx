// SellerLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const SellerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-custom-i-berry text-white p-4 md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Seller Menu</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - shown below navbar on mobile */}
        <div 
          className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-[rgb(221,167,123)]/10 flex-shrink-0`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-scroll scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;