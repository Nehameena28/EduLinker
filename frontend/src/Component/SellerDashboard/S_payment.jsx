import React, { useEffect, useState } from "react";
import axios from "axios";

const S_payment = () => {
  const [payments, setPayments] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0, thisMonth: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching payments for:', userEmail);
        
        const res = await axios.get(`http://localhost:7000/api/seller/payments?email=${userEmail}`, {
          withCredentials: true,
        });
        
        console.log('Payment response:', res.data);
        console.log('Payments array:', res.data.payments);
        console.log('Earnings:', res.data.earnings);
        
        // Log each payment individually
        if (res.data.payments && res.data.payments.length > 0) {
          res.data.payments.forEach((payment, index) => {
            console.log(`Payment ${index}:`, {
              itemTitle: payment.itemTitle,
              buyerName: payment.buyerName,
              amount: payment.amount,
              date: payment.date,
              paymentId: payment.paymentId,
              status: payment.status
            });
          });
        }
        
        setPayments(res.data.payments || []);
        setEarnings(res.data.earnings || { total: 0, thisMonth: 0, pending: 0 });
      } catch (err) {
        console.error("Failed to fetch payment data:", err);
        console.error("Error details:", err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchPaymentData();
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment Dashboard</h1>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">₹{earnings.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">This Month</h3>
            <p className="text-3xl font-bold text-blue-600">₹{earnings.thisMonth}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-orange-600">₹{earnings.pending}</p>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {payments.length > 0 ? (
                <div className="space-y-4">
                  {payments.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium text-gray-800">{payment.itemTitle}</h4>
                        <p className="text-sm text-gray-600">
                          Buyer: {payment.buyerName} • {new Date(payment.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">ID: {payment.paymentId}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹{payment.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No payments received yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start selling your study materials to see payments here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default S_payment;