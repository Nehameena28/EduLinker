import React from "react";
import { FaBook, FaFilePdf } from "react-icons/fa";

const NoteCard = ({
  title,
  description,
  price,
  category,
  fileName,
  previewUrl,
  onSave,
  onBuy,
  onUnsave,
  hideSave,
  hideBuy,
  userRole,
  onClick,
  onPurchaseRequired,
  onViewPdf,
  isPurchased = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden transition-all duration-300 border border-gray-100 cursor-pointer">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] h-32 flex items-center px-6">
        <div className="flex items-center">
          <div className="bg-[rgb(221,167,123)] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaBook className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <div className="flex items-center mt-1">
              <span className="bg-white/20 text-xs text-white px-2 py-1 rounded">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* PDF Preview */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[rgb(148,93,94)] mb-2">
            PDF PREVIEW
          </h3>
          <div 
            className="border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-24 bg-[rgba(221,167,123,0.05)] flex items-center justify-center hover:bg-[rgba(221,167,123,0.1)] transition-all duration-200 cursor-pointer"
            onClick={() => {
              if (onViewPdf) {
                onViewPdf();
              } else if (onClick) {
                onClick();
              } else {
                window.open(previewUrl, '_blank');
              }
            }}
          >
            <div className="text-center">
              <FaFilePdf className="text-2xl text-[rgb(148,93,94)] mb-1 mx-auto" />
              <p className="text-xs font-medium text-gray-700">{fileName || 'Preview PDF'}</p>
              <p className="text-xs text-gray-500">
                {isPurchased ? "Click to view full PDF" : "Click to preview"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-4">
          {/* Price */}
          <div className="text-sm font-semibold text-[rgb(148,93,94)]">
            Price: ₹{price}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* Save/Unsave Button */}
            {onUnsave ? (
              <button
                className="bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 px-3 rounded-lg text-sm transition"
                onClick={onUnsave}
              >
                Unsave
              </button>
            ) : (!userRole || userRole === 'buyer') && !hideSave && (
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition"
                title="Save this note"
                onClick={onSave}
              >
                💾 Save
              </button>
            )}

            {/* Buy Button or Already Purchased */}
            {isPurchased ? (
              <span className="bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg text-sm border border-green-200">
                ✓ Purchased
              </span>
            ) : !hideBuy && onBuy && (
              <button
                onClick={onBuy}
                className="bg-[rgb(221,167,123)] hover:bg-[rgb(148,93,94)] text-white font-medium py-2 px-4 rounded-lg text-sm transition"
              >
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;



