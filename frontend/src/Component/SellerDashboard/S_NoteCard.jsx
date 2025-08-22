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
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-2 hover:border-blue-300">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] h-32 flex items-center px-6">
        <div className="flex items-center">
          <div className="bg-[rgb(221,167,123)] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaBook className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
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

        <div className="h-0.5 bg-gradient-to-r from-transparent via-[rgb(221,167,123)] to-transparent my-4" />

        {/* PDF Preview */}
        <div className="mb-4" onClick={onViewPdf}>
          <h3 className="text-sm font-semibold text-[rgb(148,93,94)] mb-2">
            PDF PREVIEW
          </h3>
          <div className="border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-24 bg-[rgba(221,167,123,0.05)] flex items-center justify-center hover:bg-[rgba(221,167,123,0.1)] transition-all duration-200 cursor-pointer">
            <div className="text-center">
              <FaFilePdf className="text-2xl text-[rgb(148,93,94)] mb-1 mx-auto" />
              <p className="text-xs font-medium text-gray-700">{fileName}</p>
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

          {/* Purchase Status or Delete Button */}
          {isPurchased ? (
            <span className="bg-green-50 text-green-600 font-medium py-2 px-3 rounded-lg text-sm">
              Purchased
            </span>
          ) : (
            showActions && onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center bg-red-50 hover:bg-red-100 text-red-500 font-medium py-2 px-3 rounded-lg text-sm transition"
                title="Delete this note"
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default S_NoteCard;
