// SellerLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const SellerLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50 overflow-y-scroll scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;