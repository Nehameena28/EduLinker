// import { Upload, FileText } from "lucide-react";

// const SellerProfile = () => {
//   const username = "Neha"; // Replace dynamically as needed

//   return (
//     <div className="min-h-screen bg-[rgb(221,167,123)]/5">
     

//       <div className="container mx-auto flex">
       

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
//               <span className="text-custom-brown font-semibold">₹199</span>
//             </div>
//           </div>
//         </div>

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
