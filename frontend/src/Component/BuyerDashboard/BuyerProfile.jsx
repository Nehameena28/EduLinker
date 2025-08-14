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
    { title: "Purchased Docs", value: String(purchasedCount)},
    { title: "Saved Docs", value: String(savedCount) },
    { title: "Total Spent", value: `₹${totalSpent}` },
  ];


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId || !userEmail) return;

    const fetchData = async () => {
      try {
        // Fetch saved notes count
        const savedRes = await axios.get(`http://localhost:7000/api/saved-notes/${userId}`);
        setSavedCount(savedRes.data.length);

        // Fetch purchased items and payments
        const paymentsRes = await axios.get(`http://localhost:7000/api/buyer/payments?email=${userEmail}`, {
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
          <button 
            onClick={() => setShowAllActivity(!showAllActivity)}
            className="text-xs md:text-sm text-[rgb(148,93,94)] hover:underline"
          >
            {showAllActivity ? 'Show Less' : 'View All'}
          </button>
        </div>
        <div className="space-y-3 md:space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.slice(0, showAllActivity ? 4 : 2).map((item) => (
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
                <span className={`font-semibold text-xs md:text-sm ${
                  item.status === 'Purchased' ? 'text-green-600' : 'text-[rgb(148,93,94)]'
                }`}>
                  {item.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;