import React, { useEffect, useState } from "react";
import axios from "axios";

const S_History = () => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('uploads');
  const [showAllUploads, setShowAllUploads] = useState(false);
  const [showAllSales, setShowAllSales] = useState(false);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        
        // Fetch upload history
        const uploadsRes = await axios.get(`http://localhost:7000/seller/notes?email=${userEmail}`, {
          withCredentials: true,
        });
        
        // Fetch sales history
        const salesRes = await axios.get(`http://localhost:7000/api/seller/payments?email=${userEmail}`, {
          withCredentials: true,
        });
        
        setUploadHistory(uploadsRes.data || []);
        setSalesHistory(salesRes.data.payments || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchHistory();
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">History Dashboard</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('uploads')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'uploads'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload History ({uploadHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'sales'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sales History ({salesHistory.length})
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            {/* Upload History Tab */}
            {activeTab === 'uploads' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Your Uploaded Materials</h2>
                  {uploadHistory.length > 3 && (
                    <button 
                      onClick={() => setShowAllUploads(!showAllUploads)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {showAllUploads ? 'Show Less' : 'View All'}
                    </button>
                  )}
                </div>
                {uploadHistory.length > 0 ? (
                  <div className="space-y-4">
                    {uploadHistory.slice(0, showAllUploads ? uploadHistory.length : 3).map((material, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h4 className="font-medium text-gray-800">{material.title}</h4>
                          <p className="text-sm text-gray-600">
                            Category: {material.category} • Uploaded: {new Date(material.createdAt || material.uploadDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">{material.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">₹{material.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No materials uploaded yet</p>
                    <p className="text-gray-400 text-sm mt-2">Start uploading study materials to see them here</p>
                  </div>
                )}
              </div>
            )}

            {/* Sales History Tab */}
            {activeTab === 'sales' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Your Sales History</h2>
                  {salesHistory.length > 3 && (
                    <button 
                      onClick={() => setShowAllSales(!showAllSales)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {showAllSales ? 'Show Less' : 'View All'}
                    </button>
                  )}
                </div>
                {salesHistory.length > 0 ? (
                  <div className="space-y-4">
                    {salesHistory.slice(0, showAllSales ? salesHistory.length : 3).map((sale, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h4 className="font-medium text-gray-800">{sale.itemTitle}</h4>
                          <p className="text-sm text-gray-600">
                            Sold to: {sale.buyerName} • {new Date(sale.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">Payment ID: {sale.paymentId}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{sale.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                            sale.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {sale.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No sales yet</p>
                    <p className="text-gray-400 text-sm mt-2">Your sales will appear here once buyers purchase your materials</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default S_History;