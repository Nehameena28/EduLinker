import React from 'react';
import { FaTimes, FaLock, FaShoppingCart } from 'react-icons/fa';

const RestrictedPdfViewer = ({ pdfUrl, onClose, isPurchased }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">
              {isPurchased ? 'Full PDF Viewer' : 'PDF Preview'}
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
            src={pdfUrl}
            className="w-full h-full"
            title="PDF Viewer"
          />
          
          {/* Purchase Overlay for non-purchased items */}
          {!isPurchased && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="text-center text-white">
                <FaShoppingCart className="text-3xl mx-auto mb-2" />
                <h4 className="text-lg font-semibold mb-2">Want to see the full content?</h4>
                <p className="text-sm mb-4">This is just a preview (3 pages only). Purchase to access all pages.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
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

export default RestrictedPdfViewer;