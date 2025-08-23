import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryManager from "./CategoryManager";


const SellerProfile = () => {
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "₹0" },
    { title: "Total Notes", value: "0" },
    { title: "Categories", value: "0" },
  ]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const hasFetched = useRef(false);

  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();


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
          { title: "Total Notes", value: totalFiles.toString() },
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


  const getStatIcon = (title) => {
    switch (title) {
      case "Total Sales": return (
        <svg className="w-6 h-6 text-custom-blue" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      );
      case "Total Notes": return (
        <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      );
      case "Categories": return (
        <svg className="w-6 h-6 text-custom-i-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      );
      default: return (
        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      );
    }
  };

  const username = localStorage.getItem("username") || "Seller";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 md:px-6 md:py-10">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-custom-blue mb-2">
              👋 Hello, {username}!
            </h2>
            <p className="text-gray-600">Manage your notes and track your earnings</p>
          </div>
          <div className="w-full md:w-auto">
            <button 
              onClick={() => navigate('/seller/S_upload')}
              className="group w-full bg-gradient-to-r from-custom-blue to-custom-brown text-white hover:shadow-2xl hover:shadow-custom-blue/30 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-custom-blue/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                <span>Upload New Note</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getStatIcon(stat.title)}
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                </div>
                {isLoading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-3xl font-bold text-custom-blue">
                    {stat.value}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-custom-blue/20 rounded-full"></div>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-custom-blue/5 to-custom-i-berry/5 p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/50 rounded-lg">
                  <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-custom-blue">
                  Recent Activity
                </h3>
              </div>
              <button 
                onClick={() => setShowAllActivity(!showAllActivity)}
                className="text-sm text-custom-brown hover:text-custom-blue font-medium transition-colors"
              >
                {showAllActivity ? 'Show Less' : 'View All'}
              </button>
            </div>
          </div>
          <div className="p-6">

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No recent activity</p>
                <p className="text-gray-400 text-sm mt-1">Start uploading notes to see your activity here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.slice(0, showAllActivity ? recentActivity.length : 4).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-all duration-200 border border-gray-100 rounded-xl hover:border-custom-blue"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'sale' ? (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {activity.title}
                        </h4>
                        <p className={`text-sm ${
                          activity.type === 'sale' 
                            ? activity.status === 'Completed' 
                              ? 'text-green-600' 
                              : 'text-yellow-600'
                            : 'text-custom-blue'
                        }`}>
                          {activity.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="font-bold text-custom-blue text-lg">
                        {activity.amount}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === 'sale'
                          ? activity.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                          : 'bg-custom-blue/20 text-custom-blue'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
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








