// SellerLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;