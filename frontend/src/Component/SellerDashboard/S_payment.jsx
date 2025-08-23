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
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/seller/payments?email=${userEmail}`, {
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

  const getEarningsIcon = (type) => {
    switch (type) {
      case 'total': return (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      );
      case 'month': return (
        <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      );
      case 'pending': return (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-custom-blue/10 rounded-lg">
              <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-custom-blue">Payment Dashboard</h1>
          </div>
          <p className="text-gray-600 ml-14">Track your earnings and payment history</p>
          <div className="w-24 h-1 bg-gradient-to-r from-custom-blue to-custom-i-berry ml-14 mt-2"></div>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-50 rounded-lg">
                    {getEarningsIcon('total')}
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Total Earnings</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">₹{earnings.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-custom-blue/10 rounded-lg">
                    {getEarningsIcon('month')}
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">This Month</h3>
                </div>
                <p className="text-3xl font-bold text-custom-blue">₹{earnings.thisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-custom-blue/10 to-custom-blue/20 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-custom-blue/30 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    {getEarningsIcon('pending')}
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Pending</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600">₹{earnings.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-custom-blue/5 to-custom-i-berry/5 p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-custom-blue">Payment History</h2>
            </div>
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
                    <div key={index} className="flex justify-between items-center p-6 hover:bg-gray-50 transition-all duration-200 border border-gray-100 rounded-xl hover:border-custom-blue/30">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{payment.itemTitle}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                              <span>{payment.buyerName}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              <span>{new Date(payment.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2.828 2.828 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            <span>ID: {payment.paymentId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="text-2xl font-bold text-green-600">₹{payment.amount}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          payment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No payments received yet</h3>
                  <p className="text-gray-600 mb-6">Start selling your study materials to see payments here</p>
                  <button 
                    onClick={() => window.location.href = '/seller/S_upload'}
                    className="bg-gradient-to-r from-custom-blue to-custom-brown text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                  >
                    Upload Material
                  </button>
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