import React, { useState, useEffect } from 'react';
import { FaTimes, FaLock, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

const RestrictedPdfViewer = ({ materialId, onClose, onPurchaseRequired, userEmail }) => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/restricted-pdf/${materialId}?userEmail=${userEmail || ''}`);
        setPdfData(response.data);
      } catch (err) {
        console.error('Error fetching PDF data:', err);
        setError('Failed to load PDF');
      } finally {
        setLoading(false);
      }
    };

    if (materialId) {
      fetchPdfData();
    }
  }, [materialId, userEmail]);

  const handlePurchaseClick = () => {
    if (onPurchaseRequired && pdfData?.material) {
      onPurchaseRequired(pdfData.material);
    }
    onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading PDF...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">
              {pdfData?.isPurchased ? 'Full PDF Viewer' : 'PDF Preview'}
            </h3>
            {pdfData?.previewOnly && (
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full flex items-center">
                <FaLock className="mr-1" />
                Preview Mode
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfData?.pdfUrl)}&embedded=true&toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            title="PDF Viewer"
            sandbox="allow-scripts allow-same-origin"
          />
          
          {/* Blur overlay for non-purchased items */}
          {pdfData?.previewOnly && (
            <>
              {/* Clear area - top 10% */}
              <div className="absolute top-0 left-0 right-0 h-[10%] bg-transparent pointer-events-none"></div>
              
              {/* Blurred area - remaining 90% */}
              <div className="absolute top-[10%] left-0 right-0 bottom-0 backdrop-blur-md bg-white/30 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-4 shadow-2xl border border-blue-200">
                  <div className="text-center">
                    <FaLock className="text-4xl text-blue-600 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">🔒 Preview Mode</h4>
                    <p className="text-gray-600 mb-4">Only 10% of the PDF is visible. Purchase to unlock the complete document.</p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                      <h5 className="font-semibold text-lg text-gray-800">{pdfData.material?.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">Category: {pdfData.material?.category}</p>
                      <p className="text-xl font-bold text-blue-600">₹{pdfData.material?.price}</p>
                    </div>
                    <button 
                      onClick={handlePurchaseClick}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105 shadow-lg"
                    >
                      Purchase Full Access
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestrictedPdfViewer;