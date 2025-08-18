import React, { useEffect, useState } from "react";
import axios from "axios";

const B_Payment = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:7000/api/buyer/payments?email=${userEmail}`, {
          withCredentials: true,
        });
        setPayments(res.data.payments);
        setTotalSpent(res.data.totalSpent);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchPayments();
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[rgb(31,91,120)] mb-2">Payment History</h1>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Total Spent</h3>
            <p className="text-3xl font-bold">₹{totalSpent}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-1">Total Purchases</h3>
            <p className="text-3xl font-bold">{payments.length}</p>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[rgb(221,167,123)] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        </div>

        {isLoading ? (
          <div className="p-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse border-b border-gray-200 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : payments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[rgb(148,93,94)] mb-1">
                      {payment.itemTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Seller: {payment.sellerEmail}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Payment ID: {payment.paymentId}</span>
                      <span>•</span>
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[rgb(148,93,94)] mb-1">
                      ₹{payment.amount}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Payments Found</h3>
            <p className="text-gray-500">You haven't made any purchases yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default B_Payment;