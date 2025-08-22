import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CategoryManager from "./CategoryManager";


const SellerProfile = () => {
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "₹0" },
    { title: "Total Files", value: "0" },
    { title: "Categories", value: "0" },
  ]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const hasFetched = useRef(false);

  const userEmail = localStorage.getItem("email");


  useEffect(() => {
    const fetchSellerData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      
      try {
        setIsLoading(true);
       
        // Fetch payment data for total sales
        const paymentsRes = await axios.get(`http://localhost:7000/api/seller/payments?email=${userEmail}`, {
          withCredentials: true,
        });
       
        // Fetch materials count
        const materialsRes = await axios.get(`http://localhost:7000/api/materials/count?email=${userEmail}`, {
          withCredentials: true,
        });

        // Fetch recent materials
        const materialsListRes = await axios.get(`http://localhost:7000/seller/notes?email=${userEmail}`, {
          withCredentials: true,
        });

        // Fetch categories count
        const categoriesRes = await axios.get(`http://localhost:7000/api/seller/categories?email=${userEmail}`, {
          withCredentials: true,
        });
       
        const totalSales = paymentsRes.data.earnings?.total || 0;
        const totalFiles = materialsRes.data.count || 0;
        const totalCategories = categoriesRes.data.categories?.length || 0;
        const payments = paymentsRes.data.payments || [];
       
        // Update stats
        setStats([
          { title: "Total Sales", value: `₹${totalSales}` },
          { title: "Total Files", value: totalFiles.toString() },
          { title: "Categories", value: totalCategories.toString() },
        ]);
       
        // Combine sales and materials into recent activity
        const salesActivity = payments.map(payment => ({
          id: payment.paymentId,
          type: 'sale',
          title: `Sale to ${payment.buyerName}`,
          subtitle: payment.status === 'completed' ? 'Completed' : 'Pending',
          amount: `₹${payment.amount}`,
          date: new Date(payment.date),
          status: payment.status === 'completed' ? 'Completed' : 'Pending'
        }));

        const materialsActivity = materialsListRes.data.map(material => ({
          id: material._id,
          type: 'upload',
          title: material.title,
          subtitle: `${material.category} • Uploaded`,
          amount: `₹${material.price}`,
          date: new Date(material.createdAt),
          status: 'Uploaded'
        }));

        // Combine and sort by date (most recent first)
        const combinedActivity = [...salesActivity, ...materialsActivity]
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setRecentActivity(combinedActivity);
      } catch (err) {
        console.error("Failed to fetch seller data:", err);
      } finally {
        setIsLoading(false);
      }
    };


    if (userEmail && !hasFetched.current) {
      fetchSellerData();
    }
  }, []);


  return (
    <div className="min-h-screen bg-[rgb(221,167,123)]/5 px-4 py-6 md:px-6 md:py-10">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-[rgb(31,91,120)] mb-6">
          Overview
        </h2>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
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
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
                  ) : (
                    <p className="text-xl md:text-2xl font-bold text-[rgb(31,91,120)] mt-1">
                      {stat.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Category Manager */}
        <div className="mb-6 md:mb-8">
          <CategoryManager onCategoryChange={(newCount) => {
            setStats(prevStats => 
              prevStats.map(stat => 
                stat.title === "Categories" 
                  ? { ...stat, value: newCount.toString() }
                  : stat
              )
            );
          }} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base">
              Recent Activity
            </h3>
            <button 
              onClick={() => setShowAllActivity(!showAllActivity)}
              className="text-xs md:text-sm text-[rgb(148,93,94)] hover:underline"
            >
              {showAllActivity ? 'Show Less' : 'View All'}
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-2 md:p-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <p className="text-xs md:text-sm text-gray-500 italic">
              No recent activity available
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {recentActivity.slice(0, showAllActivity ? 8 : 3).map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center p-2 md:p-3 hover:bg-[rgb(221,167,123)]/5 rounded-lg transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-[rgb(31,91,120)] text-sm md:text-base">
                      {activity.title}
                    </h4>
                    <p className={`text-xs ${
                      activity.type === 'sale' 
                        ? activity.status === 'Completed' 
                          ? 'text-green-500' 
                          : 'text-yellow-500'
                        : 'text-blue-500'
                    }`}>
                      {activity.subtitle}
                    </p>
                  </div>
                  <span className="font-semibold text-[rgb(148,93,94)] text-sm md:text-base">
                    {activity.amount}
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








