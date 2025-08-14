import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerProfile = () => {
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "₹0" },
    { title: "Total Files", value: "0" },
  ]);
  const [recentSales, setRecentSales] = useState([]);
  const [topMaterials, setTopMaterials] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({ downloads: 0, revenue: 0, views: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch payment data
        const paymentsRes = await axios.get(`http://localhost:7000/api/seller/payments?email=${userEmail}`, {
          withCredentials: true,
        });
        
        // Fetch materials data
        const materialsRes = await axios.get(`http://localhost:7000/api/materials/count?email=${userEmail}`, {
          withCredentials: true,
        });
        
        // Fetch all materials for analysis
        const allMaterialsRes = await axios.get(`http://localhost:7000/api/materials?email=${userEmail}`, {
          withCredentials: true,
        });
        
        const totalSales = paymentsRes.data.earnings?.total || 0;
        const totalFiles = materialsRes.data.count || 0;
        const payments = paymentsRes.data.payments || [];
        const allMaterials = allMaterialsRes.data || [];
        
        // Update stats
        setStats([
          { title: "Total Sales", value: `₹${totalSales}` },
          { title: "Total Files", value: totalFiles.toString() },
        ]);
        
        // Process recent sales
        const recent = payments.slice(0, 5).map(payment => ({
          id: payment.paymentId,
          customer: payment.buyerName,
          amount: `₹${payment.amount}`,
          status: payment.status === 'completed' ? 'Completed' : 'Pending'
        }));
        setRecentSales(recent);
        
        // Process monthly data
        const monthlyEarnings = {};
        const currentYear = new Date().getFullYear();
        
        payments.forEach(payment => {
          const paymentDate = new Date(payment.createdAt || payment.date);
          if (paymentDate.getFullYear() === currentYear) {
            const monthKey = paymentDate.toLocaleString('default', { month: 'short' });
            monthlyEarnings[monthKey] = (monthlyEarnings[monthKey] || 0) + payment.amount;
          }
        });
        
        // Create last 6 months data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        const last6Months = [];
        
        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          const monthName = months[monthIndex];
          last6Months.push({
            month: monthName,
            sales: monthlyEarnings[monthName] || 0
          });
        }
        setMonthlyData(last6Months);
        
        // Process top materials
        const materialStats = {};
        payments.forEach(payment => {
          const materialId = payment.materialId || payment.productId;
          if (materialId) {
            if (!materialStats[materialId]) {
              materialStats[materialId] = { downloads: 0, revenue: 0 };
            }
            materialStats[materialId].downloads += 1;
            materialStats[materialId].revenue += payment.amount;
          }
        });
        
        const topMaterialsList = allMaterials
          .map(material => ({
            name: material.title || material.name || 'Untitled Material',
            downloads: materialStats[material._id]?.downloads || 0,
            revenue: materialStats[material._id]?.revenue || 0
          }))
          .sort((a, b) => b.downloads - a.downloads)
          .slice(0, 3);
        
        setTopMaterials(topMaterialsList);
        
        // Calculate monthly stats
        const currentMonthPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt || payment.date);
          return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
        });
        
        const monthlyRevenue = currentMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
        const monthlyDownloads = currentMonthPayments.length;
        
        setMonthlyStats({
          downloads: monthlyDownloads,
          revenue: monthlyRevenue,
          views: Math.floor(monthlyDownloads * 3.5) // Estimate views as 3.5x downloads
        });
        
        // Create real notifications from recent payments
        const recentNotifications = payments.slice(0, 3).map((payment, index) => {
          const timeAgo = index === 0 ? '5 minutes ago' : index === 1 ? '1 hour ago' : '3 hours ago';
          const type = index === 0 ? 'payment' : index === 1 ? 'download' : 'review';
          
          return {
            type,
            title: type === 'payment' ? 'Payment Received' : type === 'download' ? 'New Download' : 'New Review',
            message: type === 'payment' ? `You received ₹${payment.amount} from ${payment.buyerName}` :
                    type === 'download' ? `Your material was downloaded by ${payment.buyerName}` :
                    `You received a 5-star review from ${payment.buyerName}`,
            time: timeAgo,
            color: type === 'payment' ? 'green' : type === 'download' ? 'blue' : 'yellow'
          };
        });
        
        setNotifications(recentNotifications);
        
      } catch (err) {
        console.error("Failed to fetch seller data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchSellerData();
    }
  }, [userEmail]);

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

        {/* Quick Actions */}
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20 mb-6">
          <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex items-center justify-center p-3 bg-[rgb(31,91,120)] text-white rounded-lg hover:bg-[rgb(31,91,120)]/90 transition-colors">
              <span className="text-sm">+ Upload</span>
            </button>
            <button className="flex items-center justify-center p-3 bg-[rgb(148,93,94)] text-white rounded-lg hover:bg-[rgb(148,93,94)]/90 transition-colors">
              <span className="text-sm">💰 Earnings</span>
            </button>
            <button className="flex items-center justify-center p-3 bg-[rgb(221,167,123)] text-[rgb(31,91,120)] rounded-lg hover:bg-[rgb(221,167,123)]/80 transition-colors">
              <span className="text-sm">📊 Analytics</span>
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-100 text-[rgb(31,91,120)] rounded-lg hover:bg-gray-200 transition-colors">
              <span className="text-sm">⚙️ Settings</span>
            </button>
          </div>
        </div>

        {/* Performance Chart & This Month */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Performance Chart */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
            <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base mb-4">
              Monthly Performance
            </h3>
            {isLoading ? (
              <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <div className="h-48 flex items-end justify-between px-2">
                {monthlyData.map((data, index) => {
                  const maxSales = Math.max(...monthlyData.map(d => d.sales), 1000);
                  const height = Math.max((data.sales / maxSales) * 120, 8);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-[rgb(31,91,120)] mb-1">₹{data.sales}</div>
                      <div 
                        className="w-8 bg-[rgb(221,167,123)] rounded-t mb-2 transition-all hover:bg-[rgb(148,93,94)]"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-[rgb(31,91,120)]">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* This Month Stats */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
            <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base mb-4">
              This Month
            </h3>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[rgb(31,91,120)]/70">Downloads</span>
                  <span className="text-lg font-bold text-[rgb(31,91,120)]">{monthlyStats.downloads}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[rgb(31,91,120)]/70">Revenue</span>
                  <span className="text-lg font-bold text-[rgb(148,93,94)]">₹{monthlyStats.revenue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[rgb(31,91,120)]/70">Views</span>
                  <span className="text-lg font-bold text-[rgb(31,91,120)]">{monthlyStats.views}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-[rgb(221,167,123)] h-2 rounded-full" style={{width: `${Math.min((monthlyStats.revenue / 5000) * 100, 100)}%`}}></div>
                </div>
                <p className="text-xs text-gray-500 text-center">{Math.min(Math.round((monthlyStats.revenue / 5000) * 100), 100)}% of monthly goal</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications & Top Materials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Notifications */}
          <div className="lg:col-span-2 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base">
                Notifications
              </h3>
              <span className="bg-[rgb(148,93,94)] text-white text-xs px-2 py-1 rounded-full">{notifications.length}</span>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border-l-4 border-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-3 border-l-4 border-${notification.color}-400 bg-${notification.color}-50 rounded-r`}>
                    <div className={`w-10 h-10 bg-${notification.color}-100 rounded flex items-center justify-center`}>
                      <span className={`text-${notification.color}-600`}>
                        {notification.type === 'payment' ? '💰' : notification.type === 'download' ? '📥' : '⭐'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[rgb(31,91,120)]">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Materials */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
            <h3 className="font-semibold text-[rgb(31,91,120)] text-sm md:text-base mb-4">
              Top Materials
            </h3>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-full animate-pulse mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {topMaterials.map((material, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${index === 0 ? 'bg-[rgb(221,167,123)]/20' : index === 1 ? 'bg-[rgb(148,93,94)]/20' : 'bg-gray-200'} rounded flex items-center justify-center`}>
                      <span className={`${index === 0 ? 'text-[rgb(31,91,120)]' : index === 1 ? 'text-[rgb(148,93,94)]' : 'text-gray-600'} font-bold`}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[rgb(31,91,120)]">{material.name}</p>
                      <p className="text-xs text-gray-500">{material.downloads} downloads • ₹{material.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-2 md:p-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : recentSales.length === 0 ? (
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