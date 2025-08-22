import React, { useState, useEffect } from 'react';
import { FaTimes, FaLock, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RestrictedPdfViewerWithPages = ({ pdfUrl, onClose, isPurchased, onPurchase }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = isPurchased ? null : 3; // Limit to 3 pages for non-purchased

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const limit = maxPages || 999;
    if (currentPage < limit) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Construct PDF URL with page parameter
  const pdfUrlWithPage = `${pdfUrl}#page=${currentPage}&zoom=100&toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">
              {isPurchased ? 'Full PDF Viewer' : 'PDF Preview (3 pages only)'}
            </h3>
            {!isPurchased && (
              <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full flex items-center">
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
            src={pdfUrlWithPage}
            className="w-full h-full"
            title="PDF Viewer"
          />
          
          {/* Page Navigation */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300"
            >
              <FaChevronLeft />
            </button>
            <span className="px-3 py-1 text-sm font-medium">
              Page {currentPage} {maxPages && `of ${maxPages}`}
            </span>
            <button
              onClick={handleNextPage}
              disabled={maxPages && currentPage >= maxPages}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300"
            >
              <FaChevronRight />
            </button>
          </div>
          
          {/* Purchase Overlay for non-purchased items */}
          {!isPurchased && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="text-center text-white">
                <FaShoppingCart className="text-3xl mx-auto mb-2" />
                <h4 className="text-lg font-semibold mb-2">Want to see the full content?</h4>
                <p className="text-sm mb-4">This is just a preview (3 pages only). Purchase to access all pages.</p>
                <button 
                  onClick={onPurchase}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Purchase Full PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestrictedPdfViewerWithPages;