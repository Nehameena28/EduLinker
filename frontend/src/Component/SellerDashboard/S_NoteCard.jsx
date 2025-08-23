import React from "react";
import { FaBook, FaFilePdf, FaTrash } from "react-icons/fa";

const S_NoteCard = ({
  title,
  description,
  price,
  category,
  fileName,
  previewUrl,
  onViewPdf,
  onDelete,
  showActions = true,
  isPurchased = false,
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:scale-105 hover:shadow-xl transform cursor-pointer h-auto sm:h-[480px] flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] h-24 sm:h-32 flex items-center px-4 sm:px-6 flex-shrink-0">
        <div className="flex items-center w-full">
          <div className="bg-[rgb(221,167,123)] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <FaBook className="text-white text-lg sm:text-xl" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{title}</h2>
            <div className="flex items-center mt-1">
              <span className="bg-white/20 text-xs text-white px-2 py-1 rounded truncate">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-shrink-0">{description}</p>

        {/* PDF Preview */}
        <div className="mb-3 sm:mb-4 flex-1" onClick={onViewPdf}>
          <h3 className="text-xs sm:text-sm font-semibold text-[rgb(148,93,94)] mb-2">
            PDF PREVIEW
          </h3>
          <div className="border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-20 sm:h-24 bg-[rgba(221,167,123,0.05)] flex items-center justify-center hover:bg-[rgba(221,167,123,0.1)] transition-all duration-200 cursor-pointer">
            <div className="text-center px-2">
              <FaFilePdf className="text-xl sm:text-2xl text-[rgb(148,93,94)] mb-1 mx-auto" />
              <p className="text-xs font-medium text-gray-700 truncate">{fileName}</p>
              <p className="text-xs text-gray-500 hidden sm:block">
                {isPurchased ? "Click to view full PDF" : "Click to preview"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Price */}
          <div className="text-sm sm:text-base font-semibold text-[rgb(148,93,94)] text-center sm:text-left">
            Price: ₹{price}
          </div>

          {/* Delete Button */}
          {showActions && onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 font-medium py-2 px-3 rounded-lg text-xs sm:text-sm transition w-full sm:w-auto"
              title="Delete this note"
            >
              <FaTrash className="mr-1" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default S_NoteCard;
