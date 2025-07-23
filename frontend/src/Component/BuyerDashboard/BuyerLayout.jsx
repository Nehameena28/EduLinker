// import React, { useState } from 'react';
// import Buyersidebar from './Buyersidebar';
// import { Outlet } from 'react-router-dom';
// import { HiMenu, HiX } from 'react-icons/hi';

// const BuyerLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* ☰ Sidebar toggle button (Mobile only) */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-custom-i-berry text-white rounded-md shadow"
//       >
//         {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static top-16 md:top-0 left-0 z-40 w-72 h-[calc(100%-4rem)] md:h-full transform transition-transform duration-300 ease-in-out bg-white shadow-md md:shadow-none ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         }`}
//       >
//         <Buyersidebar />
//       </div>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default BuyerLayout;

import React, { useState } from 'react';
import Buyersidebar from './Buyersidebar';
import { Outlet } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const BuyerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-custom-i-berry text-white p-4 md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Buyer Menu</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - shown below navbar on mobile */}
        <div 
          className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-72 bg-[rgb(221,167,123)]/10 flex-shrink-0`}
        >
          <Buyersidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-scroll scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BuyerLayout;