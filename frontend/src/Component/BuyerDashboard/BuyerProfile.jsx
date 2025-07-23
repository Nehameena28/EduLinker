// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SellsPage from "./Sellspage";


// // import axios from "axios"; // make sure axios is installed

// const BuyerProfile = () => {
//   // const [username, setUsername] = useState("User");
//   const username = localStorage.getItem("username") || "User";

//   const stats = [
//     { title: "Purchased Docs", value: "5", change: "+25%" },
//     { title: "Saved Docs", value: "8", change: "+10%" },
//   ];

//   const recentActivity = [
//     { id: 1, title: "Maths Notes - Algebra", status: "Downloaded", date: "Jul 11" },
//     { id: 2, title: "Physics Guide - Motion", status: "Saved", date: "Jul 10" },
//   ];

//   // useEffect(() => {
//   //   const fetchUsername = async () => {
//   //     const userId = localStorage.getItem("userId"); // assuming you saved it at login
//   //     if (!userId) return;

//   //     try {
//   //       const res = await axios.get(`http://localhost:7000/api/users/${userId}`);
//   //       setUsername(res.data.username); // adapt to your backend response
//   //     } catch (err) {
//   //       console.error("Failed to fetch user data:", err);
//   //     }
//   //   };

//   //   fetchUsername();
//   // }, []);

//   return (
//     <div className="min-h-screen bg-white text-custom-blue px-6 py-10">
//       {/* Header with greeting and Explore button */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           👋 Hello , {username} !
//         </h2>
//         <Link to="/Sellspage">
//           <button className="bg-custom-i-berry text-white hover:opacity-90 px-6 py-3 rounded-lg text-lg">
//             Explore Notes
//           </button>
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
//           >
//             <div className="flex justify-between">
//               <div>
//                 <p className="text-sm text-[rgb(31,91,120)]/70">{stat.title}</p>
//                 <p className="text-2xl font-bold text-[rgb(31,91,120)] mt-1">
//                   {stat.value}
//                 </p>
//                 <p
//                   className={`text-xs mt-1 ${
//                     stat.change.startsWith("+")
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {stat.change} this month
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-[rgb(31,91,120)]">
//             Recent Activity
//           </h3>
//           <button className="text-sm text-[rgb(148,93,94)] hover:underline">
//             View All
//           </button>
//         </div>
//         <div className="space-y-4">
//           {recentActivity.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
//             >
//               <div>
//                 <h4 className="font-medium text-[rgb(31,91,120)]">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs text-gray-500">
//                   {item.status} • {item.date}
//                 </p>
//               </div>
//               <span className="text-[rgb(148,93,94)] font-semibold">
//                 {item.status}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerProfile;



import React from "react";
import { Link } from "react-router-dom";

const BuyerProfile = () => {
  const username = localStorage.getItem("username") || "User";

  const stats = [
    { title: "Purchased Docs", value: "5", change: "+25%" },
    { title: "Saved Docs", value: "8", change: "+10%" },
  ];

  const recentActivity = [
    { id: 1, title: "Maths Notes - Algebra", status: "Downloaded", date: "Jul 11" },
    { id: 2, title: "Physics Guide - Motion", status: "Saved", date: "Jul 10" },
  ];

  return (
    <div className="min-h-screen bg-white text-custom-blue px-4 py-6 md:px-6 md:py-10">
      {/* Header with greeting and Explore button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-4">
        <h2 className="text-2xl md:text-4xl font-bold">
          👋 Hello, {username}!
        </h2>
        <Link to="/Sellspage" className="w-full md:w-auto">
          <button className="w-full bg-custom-i-berry text-white hover:opacity-90 px-4 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg">
            Explore Notes
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs md:text-sm text-[rgb(31,91,120)]/70">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold text-[rgb(31,91,120)] mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change} this month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base">
            Recent Activity
          </h3>
          <button className="text-xs md:text-sm text-[rgb(148,93,94)] hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-3 md:space-y-4">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 md:p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
            >
              <div className="w-3/4">
                <h4 className="font-medium text-[rgb(31,91,120)] text-sm md:text-base truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.status} • {item.date}
                </p>
              </div>
              <span className="text-[rgb(148,93,94)] font-semibold text-xs md:text-sm">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;