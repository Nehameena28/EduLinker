import { useEffect,useState } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


const BuyerProfile = () => {
  const username = localStorage.getItem("username") || "User";
  const userEmail = localStorage.getItem("email");

  const [savedCount, setSavedCount] = useState(0);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const stats = [
    { title: "Purchased Notes", value: String(purchasedCount)},
    { title: "Saved Notes", value: String(savedCount) },
    { title: "Total Spent", value: `₹${totalSpent}` },
  ];


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId || !userEmail) return;

    const fetchData = async () => {
      try {
        // Fetch saved notes count
        const savedRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/saved-notes/${userId}`);
        setSavedCount(savedRes.data.length);

        // Fetch purchased items and payments
        const paymentsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/buyer/payments?email=${userEmail}`, {
          withCredentials: true,
        });
        setPurchasedCount(paymentsRes.data.payments.length);
        setTotalSpent(paymentsRes.data.totalSpent);

        // Create recent activity from payments and saved notes
        const recentPayments = paymentsRes.data.payments.slice(0, 3).map(payment => ({
          id: payment.paymentId,
          title: payment.itemTitle,
          status: "Purchased",
          date: new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));

        const recentSaved = savedRes.data.slice(0, 2).map(note => ({
          id: note._id,
          title: note.title,
          status: "Saved",
          date: new Date(note.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));

        // Combine and sort by most recent
        const combinedActivity = [...recentPayments, ...recentSaved]
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setRecentActivity(combinedActivity);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const getStatIcon = (title) => {
    switch (title) {
      case "Purchased Notes": return (
        <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      );
      case "Saved Notes": return (
        <svg className="w-6 h-6 text-custom-i-berry" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
        </svg>
      );
      case "Total Spent": return (
        <svg className="w-6 h-6 text-custom-brown" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
        </svg>
      );
      default: return (
        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:px-6 md:px-8 lg:px-10 md:py-10">
      {/* Header with greeting and Explore button */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-blue mb-2">
              👋 Hello, {username}!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back to your learning dashboard</p>
          </div>
          <Link to="/Sellspage" className="w-full sm:w-auto flex-shrink-0">
            <button className="group w-full sm:w-auto bg-gradient-to-r from-custom-blue to-custom-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Explore Notes</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-gray-50 rounded-lg flex-shrink-0">
                    {getStatIcon(stat.title)}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-custom-blue">
                  {stat.value}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-custom-blue/20 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-custom-blue/5 to-custom-i-berry/5 p-4 sm:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-white/50 rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-custom-blue">
                Recent Activity
              </h3>
            </div>
            <button 
              onClick={() => setShowAllActivity(!showAllActivity)}
              className="text-xs sm:text-sm text-custom-brown hover:text-custom-blue font-medium transition-colors"
            >
              {showAllActivity ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          {recentActivity.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.slice(0, showAllActivity ? 4 : 2).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 sm:p-4 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-colors border border-gray-100"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.status === 'Purchased' ? (
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-custom-i-berry" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.status} • {item.date}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    item.status === 'Purchased' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-custom-i-berry/20 text-custom-brown'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <p className="text-gray-500 text-base sm:text-lg">No recent activity</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Start exploring notes to see your activity here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;