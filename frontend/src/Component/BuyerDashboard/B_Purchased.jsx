import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaFilePdf, FaDownload } from "react-icons/fa";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";

const B_Purchased = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toasts, showToast, removeToast } = useToast();

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:7000/api/buyer/purchased?email=${userEmail}`, {
          withCredentials: true,
        });
        setPurchasedItems(res.data);
      } catch (err) {
        console.error("Failed to fetch purchased items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchPurchasedItems();
    }
  }, [userEmail]);

  const filteredItems = purchasedItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPdf = async (item) => {
    try {
      if (!item._id) {
        showToast("Material ID not found", "error");
        return;
      }
      
      // Use the secure download endpoint
      const downloadUrl = `http://localhost:7000/api/download-pdf/${item._id}?userEmail=${userEmail}`;
      
      // Create download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${item.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast("Download started!", "success");
    } catch (error) {
      console.error('Download failed:', error);
      showToast("Download failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-custom-blue">
      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-3xl font-bold text-white mb-2">My Purchased Items</h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center px-4 pb-6">
        <div className="w-full max-w-3xl">
          <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-full shadow-lg border-2 border-gray-300 overflow-hidden w-full hover:shadow-xl hover:border-blue-500 focus-within:shadow-xl focus-within:border-blue-600 transition-all duration-300">
            <div className="flex items-center flex-grow">
              <svg className="w-5 h-5 text-gray-400 ml-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search purchased items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow py-3 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none w-full sm:w-auto transition-all duration-200 bg-transparent"
              />
            </div>
            <button className="bg-[rgb(31,91,120)] text-white w-full sm:w-auto px-6 py-3 font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Items Display */}
      <div className="px-4 sm:px-6 pb-14">
        {isLoading ? (
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-md rounded-xl p-4 space-y-4"
              >
                <div className="h-40 bg-gray-300 rounded-md"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="bg-white shadow-lg hover:shadow-xl hover:scale-105 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] h-32 flex items-center px-6">
                    <div className="flex items-center">
                      <div className="bg-[rgb(221,167,123)] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                        <FaBook className="text-white text-xl" />
                      </div>
                      <div>
                        {/* <h1 className="text-xl font-bold text-white">{item.title}</h1> */}
                        <h2 className="text-xl font-bold text-white">{item.title}</h2>
                        <div className="flex items-center mt-1">
                          <span className="bg-white/20 text-xs text-white px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                    {/* PDF Preview */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-[rgb(148,93,94)] mb-2">
                        PURCHASED ITEM
                      </h3>
                      <div className="border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-24 bg-[rgba(221,167,123,0.05)] flex items-center justify-center">
                        <div className="text-center">
                          <FaFilePdf className="text-2xl text-[rgb(148,93,94)] mb-1 mx-auto" />
                          <p className="text-xs font-medium text-gray-700">
                            {(item.pdf?.fullUrl || item.pdf?.url)?.split("/").pop() || "PDF File"}
                          </p>
                          <p className="text-xs text-green-600 font-medium">✓ Owned</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                      {/* Purchase Info */}
                      <div className="text-sm flex-1 min-w-0">
                        <p className="font-semibold text-[rgb(148,93,94)] whitespace-nowrap">Purchased: ₹{item.price}</p>
                        <p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">Seller: {item.uploadedBy}</p>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownloadPdf(item)}
                        className="flex items-center bg-custom-blue text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-transparent hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300 flex-shrink-0 whitespace-nowrap"
                      >
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaBook className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Purchased Items</h3>
                <p className="text-gray-500">You haven't purchased any study materials yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default B_Purchased;