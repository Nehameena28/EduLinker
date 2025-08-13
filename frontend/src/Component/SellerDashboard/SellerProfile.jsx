// import React from "react";

// const SellerProfile = () => {
//   // Default stats with 0 values
//   const stats = [
//     { title: "Total Sales", value: "₹0" },
//     { title: "Total Files", value: "0"},
//   ];

//   // No recent sales initially
//   const recentSales = [];

//   return (
//     <div className="min-h-screen bg-[rgb(221,167,123)]/5">
//       <div className="w-full max-w-screen-xl mx-auto flex">
//         <div className="flex-1 p-4">
//           <h2 className="text-xl font-bold text-[rgb(31,91,120)] mb-6">
//             Overview
//           </h2>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-sm text-[rgb(31,91,120)]/70">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl font-bold text-[rgb(31,91,120)] mt-1">
//                       {stat.value}
//                     </p>
                    
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Recent Sales */}
//           <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-[rgb(31,91,120)]">
//                 Recent Sales
//               </h3>
//               <button className="text-sm text-[rgb(148,93,94)] hover:underline">
//                 View All
//               </button>
//             </div>

//             {recentSales.length === 0 ? (
//               <p className="text-sm text-gray-500 italic">
//                 No recent sales available
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {recentSales.map((sale) => (
//                   <div
//                     key={sale.id}
//                     className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
//                   >
//                     <div>
//                       <h4 className="font-medium text-[rgb(31,91,120)]">
//                         {sale.customer}
//                       </h4>
//                       <p
//                         className={`text-xs ${
//                           sale.status === "Completed"
//                             ? "text-green-500"
//                             : "text-yellow-500"
//                         }`}
//                       >
//                         {sale.status}
//                       </p>
//                     </div>
//                     <span className="font-semibold text-[rgb(148,93,94)]">
//                       {sale.amount}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerProfile;



import React from "react";

const SellerProfile = () => {
  // Default stats
  const stats = [
    { title: "Total Sales", value: "₹0" },
    { title: "Total Files", value: "0" },
  ];

  // No recent sales initially
  const recentSales = [];

  return (
    <div className="min-h-screen bg-[rgb(221,167,123)]/5 px-4 py-6 md:px-6 md:py-10">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-[rgb(31,91,120)] mb-6">
          Overview
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs md:text-sm text-[rgb(31,91,120)]/70">
                    {stat.title}
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[rgb(31,91,120)] mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Sales */}
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base">
              Recent Sales
            </h3>
            <button className="text-xs md:text-sm text-[rgb(148,93,94)] hover:underline">
              View All
            </button>
          </div>

          {recentSales.length === 0 ? (
            <p className="text-xs md:text-sm text-gray-500 italic">
              No recent sales available
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex justify-between items-center p-2 md:p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-[rgb(31,91,120)] text-sm md:text-base">
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
                  <span className="font-semibold text-[rgb(148,93,94)] text-sm md:text-base">
                    {sale.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
