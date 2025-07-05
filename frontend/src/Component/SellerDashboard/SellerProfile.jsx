
// import { Link } from "react-router-dom";

// const SellerProfile = () => {
//   return (
//     <>
//       <div className="flex flex-col md:flex-row h-screen">
//         {/* Sidebar */}
//         <div className="bg-black flex flex-col md:h-screen w-full md:w-96 p-10 text-center justify-between">
//           <div className="text-white font-semibold">
//             <p className="text-2xl md:text-3xl">Hello👋 Neha!</p>
//           </div>
//           <div className="text-white font-semibold flex flex-col items-center justify-center">
//             <div className="h-24 w-24 md:h-28 md:w-28 bg-white rounded-full text-center overflow-hidden">
//               <img
//                 className="h-full w-full object-cover"
//                 src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1vZGVsfGVufDB8MXwwfHx8MA%3D%3D"
//                 alt="Profile"
//               />
//             </div>
//             <h2 className="text-white mt-4 text-lg md:text-xl">Neha Meena</h2>
//           </div>
//           <p className="text-white font-semibold text-lg md:text-xl whitespace-pre-wrap mb-10">
//             Welcome to EduLinker! 💗
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="bg-stone-300 flex-1 p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 lg:gap-24 text-center m-6 md:m-12">
//             <Link to="/S_Upload">
//               <div className="h-40 w-full max-w-xs mx-auto border-2 rounded-lg bg-amber-700 text-white flex flex-col justify-center items-center cursor-pointer font-bold">
//                 <p className="text-3xl">
//                   <i className="ri-upload-cloud-fill"></i>
//                 </p>
//                 <span className="mt-2 text-base md:text-lg">Upload Docs</span>
//               </div>
//             </Link>
//             <Link to="/S_Sell">
//               <div className="h-40 w-full max-w-xs mx-auto border-2 rounded-lg bg-cyan-700 text-white flex flex-col justify-center items-center cursor-pointer font-bold">
//                 <p className="text-3xl">
//                   <i className="ri-money-rupee-circle-fill"></i>
//                 </p>
//                 <span className="mt-2 text-base md:text-lg">Uploaded Document</span>
//               </div>
//             </Link>
//             <Link to="/S_History">
//               <div className="h-40 w-full max-w-xs mx-auto border-2 rounded-lg bg-cyan-700 text-white flex flex-col justify-center items-center cursor-pointer font-bold">
//                 <p className="text-3xl">
//                   <i className="ri-chat-history-fill"></i>
//                 </p>
//                 <span className="mt-2 text-base md:text-lg">Sell's History</span>
//               </div>
//             </Link>
//             <Link to="/S_payment">
//               <div className="h-40 w-full max-w-xs mx-auto border-2 rounded-lg bg-amber-700 text-white flex flex-col justify-center items-center cursor-pointer font-bold">
//                 <p className="text-3xl">
//                   <i className="ri-secure-payment-line"></i>
//                 </p>
//                 <span className="mt-2 text-base md:text-lg">Payment Information</span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SellerProfile;





// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const SellerProfile = () => {
//   const [activeTab, setActiveTab] = useState('upload');

//   // Icons with inline styling
//   const UploadIcon = () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//     </svg>
//   );

//   const MaterialsIcon = () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//     </svg>
//   );

//   const SalesIcon = () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//     </svg>
//   );

//   const PaymentIcon = () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//   );

//   const DashboardNavItem = ({ icon, title, active, onClick }) => {
//     return (
//       <motion.div 
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         className={`px-6 py-3 flex items-center cursor-pointer transition-colors duration-200 ${active ? 'bg-white bg-opacity-20 text-white' : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'}`}
//         onClick={onClick}
//       >
//         <div className="mr-4">
//           {icon}
//         </div>
//         <span className="font-medium">{title}</span>
//         {active && (
//           <motion.div 
//             layoutId="navActive"
//             className="ml-auto w-1 h-6 bg-white rounded-l-md"
//             initial={false}
//             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//           />
//         )}
//       </motion.div>
//     );
//   };

//   const renderActiveTab = () => {
//     switch(activeTab) {
//       case 'upload':
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload New Material</h2>
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
//               <UploadIcon />
//               <p className="mt-4 text-gray-600">Drag and drop your files here or click to browse</p>
//               <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//                 Browse Files
//               </button>
//             </div>
//           </div>
//         );
//       case 'materials':
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Materials</h2>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <MaterialsIcon className="inline-block mr-2" />
//               <span>Materials list will appear here</span>
//             </div>
//           </div>
//         );
//       case 'sales':
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales History</h2>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <SalesIcon className="inline-block mr-2" />
//               <span>Sales data will appear here</span>
//             </div>
//           </div>
//         );
//       case 'payments':
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <PaymentIcon className="inline-block mr-2" />
//               <span>Payment details will appear here</span>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-600 to-purple-700 shadow-lg">
//         <div className="flex items-center justify-center h-16 px-4 bg-white bg-opacity-10">
//           <h1 className="text-white text-xl font-bold">Seller Portal</h1>
//         </div>
//         <nav className="mt-8">
//           <DashboardNavItem 
//             icon={<UploadIcon />} 
//             title="Upload Material" 
//             active={activeTab === 'upload'} 
//             onClick={() => setActiveTab('upload')}
//           />
//           <DashboardNavItem 
//             icon={<MaterialsIcon />} 
//             title="All Materials" 
//             active={activeTab === 'materials'} 
//             onClick={() => setActiveTab('materials')}
//           />
//           <DashboardNavItem 
//             icon={<SalesIcon />} 
//             title="Sales History" 
//             active={activeTab === 'sales'} 
//             onClick={() => setActiveTab('sales')}
//           />
//           <DashboardNavItem 
//             icon={<PaymentIcon />} 
//             title="Payment Information" 
//             active={activeTab === 'payments'} 
//             onClick={() => setActiveTab('payments')}
//           />
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-xl shadow-lg m-8 overflow-hidden"
//         >
//           {renderActiveTab()}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SellerProfile;






import { useState } from 'react';
import { motion } from 'framer-motion';

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Icons with custom colors
  const DashboardIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );

  const UploadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const MaterialsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  const SalesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const PaymentIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const NavItem = ({ icon, title, active, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
        active 
          ? 'bg-[rgb(221,167,123)] text-[rgb(31,91,120)] font-semibold' 
          : 'text-[rgb(31,91,120)] hover:bg-[rgb(221,167,123)]/30'
      }`}
      onClick={onClick}
    >
      <div className="mr-3">
        {icon}
      </div>
      <span>{title}</span>
    </motion.div>
  );

  // Sample data
  const stats = [
    { title: "Total Materials", value: "24", change: "+12%", icon: <MaterialsIcon /> },
    { title: "Monthly Sales", value: "$1,845", change: "+8%", icon: <SalesIcon /> },
    { title: "Pending Orders", value: "5", change: "-2", icon: <PaymentIcon /> },
    { title: "New Customers", value: "18", change: "+4", icon: <DashboardIcon /> }
  ];

  const recentMaterials = [
    { id: 1, title: "Advanced Mathematics", date: "2 hours ago", price: "$29.99" },
    { id: 2, title: "Science Experiments", date: "1 day ago", price: "$19.99" },
    { id: 3, title: "History Timeline", date: "3 days ago", price: "$14.99" }
  ];

  const recentSales = [
    { id: 1, customer: "john.doe@example.com", amount: "$29.99", status: "Completed" },
    { id: 2, customer: "jane.smith@example.com", amount: "$19.99", status: "Completed" },
    { id: 3, customer: "mike.johnson@example.com", amount: "$14.99", status: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-[rgb(221,167,123)]/5">
     

      <div className="container mx-auto flex">
        {/* Sidebar */}
        {/* <div className="w-64 p-4 hidden md:block">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
            <nav className="space-y-2">
              <NavItem 
                icon={<DashboardIcon />} 
                title="Dashboard" 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')}
              />
              <NavItem 
                icon={<UploadIcon />} 
                title="Upload Material" 
                active={activeTab === 'upload'} 
                onClick={() => setActiveTab('upload')}
              />
              <NavItem 
                icon={<MaterialsIcon />} 
                title="All Materials" 
                active={activeTab === 'materials'} 
                onClick={() => setActiveTab('materials')}
              />
              <NavItem 
                icon={<SalesIcon />} 
                title="Sales History" 
                active={activeTab === 'sales'} 
                onClick={() => setActiveTab('sales')}
              />
              <NavItem 
                icon={<PaymentIcon />} 
                title="Payment Info" 
                active={activeTab === 'payments'} 
                onClick={() => setActiveTab('payments')}
              />
            </nav>

           
          </div>
        </div> */}

        <div className="flex-1 p-4">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-[rgb(31,91,120)] mb-6">Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-[rgb(31,91,120)]/70">{stat.title}</p>
                        <p className="text-2xl font-bold text-[rgb(31,91,120)] mt-1">{stat.value}</p>
                        <p className={`text-xs mt-1 ${
                          stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-[rgb(221,167,123)]/10 flex items-center justify-center text-[rgb(148,93,94)]">
                        {stat.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Materials */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-[rgb(31,91,120)]">Recent Materials</h3>
                    <button className="text-sm text-[rgb(148,93,94)] hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentMaterials.map((material) => (
                      <div key={material.id} className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors">
                        <div>
                          <h4 className="font-medium text-[rgb(31,91,120)]">{material.title}</h4>
                          <p className="text-xs text-[rgb(31,91,120)]/50">{material.date}</p>
                        </div>
                        <span className="font-semibold text-[rgb(148,93,94)]">{material.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Sales */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-[rgb(31,91,120)]">Recent Sales</h3>
                    <button className="text-sm text-[rgb(148,93,94)] hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors">
                        <div>
                          <h4 className="font-medium text-[rgb(31,91,120)]">{sale.customer}</h4>
                          <p className={`text-xs ${
                            sale.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                          }`}>
                            {sale.status}
                          </p>
                        </div>
                        <span className="font-semibold text-[rgb(148,93,94)]">{sale.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;