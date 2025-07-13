import React from 'react';
import Buyersidebar from './Buyersidebar';
import { Outlet } from 'react-router-dom';

const BuyerLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Buyersidebar />
      <div className="flex-1 p-4 bg-gray-50 overflow-y-scroll scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLayout;
