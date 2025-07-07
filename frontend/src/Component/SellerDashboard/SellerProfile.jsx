// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const SellerProfile = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Icons with custom colors
//   const DashboardIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//     </svg>
//   );

//   const UploadIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//     </svg>
//   );

//   const MaterialsIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//     </svg>
//   );

//   const SalesIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//     </svg>
//   );

//   const PaymentIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//   );

//   const NavItem = ({ icon, title, active, onClick }) => (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
//         active 
//           ? 'bg-[rgb(221,167,123)] text-[rgb(31,91,120)] font-semibold' 
//           : 'text-[rgb(31,91,120)] hover:bg-[rgb(221,167,123)]/30'
//       }`}
//       onClick={onClick}
//     >
//       <div className="mr-3">
//         {icon}
//       </div>
//       <span>{title}</span>
//     </motion.div>
//   );

//   // Sample data
//   const stats = [
//     { title: "Total Materials", value: "24", change: "+12%", icon: <MaterialsIcon /> },
//     { title: "Monthly Sales", value: "$1,845", change: "+8%", icon: <SalesIcon /> },
//     { title: "Pending Orders", value: "5", change: "-2", icon: <PaymentIcon /> },
//     { title: "New Customers", value: "18", change: "+4", icon: <DashboardIcon /> }
//   ];

//   const recentMaterials = [
//     { id: 1, title: "Advanced Mathematics", date: "2 hours ago", price: "$29.99" },
//     { id: 2, title: "Science Experiments", date: "1 day ago", price: "$19.99" },
//     { id: 3, title: "History Timeline", date: "3 days ago", price: "$14.99" }
//   ];

//   const recentSales = [
//     { id: 1, customer: "john.doe@example.com", amount: "$29.99", status: "Completed" },
//     { id: 2, customer: "jane.smith@example.com", amount: "$19.99", status: "Completed" },
//     { id: 3, customer: "mike.johnson@example.com", amount: "$14.99", status: "Pending" }
//   ];

//   return (
//     <div className="min-h-screen bg-[rgb(221,167,123)]/5">
     

//       <div className="container mx-auto flex">
//         {/* Sidebar */}
//         {/* <div className="w-64 p-4 hidden md:block">
//           <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
//             <nav className="space-y-2">
//               <NavItem 
//                 icon={<DashboardIcon />} 
//                 title="Dashboard" 
//                 active={activeTab === 'dashboard'} 
//                 onClick={() => setActiveTab('dashboard')}
//               />
//               <NavItem 
//                 icon={<UploadIcon />} 
//                 title="Upload Material" 
//                 active={activeTab === 'upload'} 
//                 onClick={() => setActiveTab('upload')}
//               />
//               <NavItem 
//                 icon={<MaterialsIcon />} 
//                 title="All Materials" 
//                 active={activeTab === 'materials'} 
//                 onClick={() => setActiveTab('materials')}
//               />
//               <NavItem 
//                 icon={<SalesIcon />} 
//                 title="Sales History" 
//                 active={activeTab === 'sales'} 
//                 onClick={() => setActiveTab('sales')}
//               />
//               <NavItem 
//                 icon={<PaymentIcon />} 
//                 title="Payment Info" 
//                 active={activeTab === 'payments'} 
//                 onClick={() => setActiveTab('payments')}
//               />
//             </nav>

           
//           </div>
//         </div> */}

//         <div className="flex-1 p-4">
//           {activeTab === 'dashboard' && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h2 className="text-xl font-bold text-[rgb(31,91,120)] mb-6">Overview</h2>
              
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 {stats.map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <p className="text-sm text-[rgb(31,91,120)]/70">{stat.title}</p>
//                         <p className="text-2xl font-bold text-[rgb(31,91,120)] mt-1">{stat.value}</p>
//                         <p className={`text-xs mt-1 ${
//                           stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
//                         }`}>
//                           {stat.change} from last month
//                         </p>
//                       </div>
//                       <div className="w-12 h-12 rounded-lg bg-[rgb(221,167,123)]/10 flex items-center justify-center text-[rgb(148,93,94)]">
//                         {stat.icon}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Recent Materials */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-semibold text-[rgb(31,91,120)]">Recent Materials</h3>
//                     <button className="text-sm text-[rgb(148,93,94)] hover:underline">View All</button>
//                   </div>
//                   <div className="space-y-4">
//                     {recentMaterials.map((material) => (
//                       <div key={material.id} className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors">
//                         <div>
//                           <h4 className="font-medium text-[rgb(31,91,120)]">{material.title}</h4>
//                           <p className="text-xs text-[rgb(31,91,120)]/50">{material.date}</p>
//                         </div>
//                         <span className="font-semibold text-[rgb(148,93,94)]">{material.price}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Recent Sales */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-semibold text-[rgb(31,91,120)]">Recent Sales</h3>
//                     <button className="text-sm text-[rgb(148,93,94)] hover:underline">View All</button>
//                   </div>
//                   <div className="space-y-4">
//                     {recentSales.map((sale) => (
//                       <div key={sale.id} className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors">
//                         <div>
//                           <h4 className="font-medium text-[rgb(31,91,120)]">{sale.customer}</h4>
//                           <p className={`text-xs ${
//                             sale.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
//                           }`}>
//                             {sale.status}
//                           </p>
//                         </div>
//                         <span className="font-semibold text-[rgb(148,93,94)]">{sale.amount}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerProfile;



import { Upload, FileText } from "lucide-react";
import { motion } from "framer-motion"; // ✅ make sure you import this
import React from "react";

const stats = [
  { title: "Total Sales", value: "₹199", change: "+10%", icon: <Upload /> },
  { title: "Total Files", value: "12", change: "+3%", icon: <FileText /> },
  // Add more as needed
];

const recentSales = [
  { id: 1, customer: "John Doe", status: "Completed", amount: "₹99" },
  { id: 2, customer: "Jane Smith", status: "Pending", amount: "₹100" },
  // Add more as needed
];

const SellerProfile = () => {
  const username = "Neha"; // Replace dynamically as needed
  const activeTab = "dashboard"; // Set this as per your logic

  return (
    <div className="min-h-screen bg-[rgb(221,167,123)]/5">
      <div className="container mx-auto flex">
        <div className="flex-1 p-4">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-[rgb(31,91,120)] mb-6">
                Overview
              </h2>

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
                        <p className="text-sm text-[rgb(31,91,120)]/70">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-[rgb(31,91,120)] mt-1">
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            stat.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
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

              {/* Recent Sales */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[rgb(31,91,120)]">
                    Recent Sales
                  </h3>
                  <button className="text-sm text-[rgb(148,93,94)] hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-[rgb(31,91,120)]">
                          {sale.customer}
                        </h4>
                        <p
                          className={`text-xs ${
                            sale.status === "Completed"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {sale.status}
                        </p>
                      </div>
                      <span className="font-semibold text-[rgb(148,93,94)]">
                        {sale.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div> // ✅ CORRECT closing tag for motion.div
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
