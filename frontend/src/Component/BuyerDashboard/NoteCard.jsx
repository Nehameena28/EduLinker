
import React from "react";
import { FaBook, FaHeart, FaFilePdf, FaDownload } from "react-icons/fa";

const NoteCard = ({
  title,
  description,
  price,
  category,
  fileName,
  previewUrl,
  onDownload,
  onBuy,
}) => {
  return (
    <div className="w-full max-w-md bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
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

<a
  href={previewUrl}
  target="_blank"
  rel="noopener noreferrer"
  >
        {/* PDF Preview */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[rgb(148,93,94)] mb-2">
            PDF PREVIEW
          </h3>
          <div className="border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-24 bg-[rgba(221,167,123,0.05)] flex items-center justify-center hover:bg-[rgba(221,167,123,0.1)] transition-all duration-200 cursor-pointer">
            <div className="text-center">
              <FaFilePdf className="text-2xl text-[rgb(148,93,94)] mb-1 mx-auto" />
              <p className="text-xs font-medium text-gray-700">{fileName}</p>
              <p className="text-xs text-gray-500">Click to preview</p>
            </div>
          </div>
        </div>

</a>
       

        {/* Buttons */}
        <div className="flex justify-between items-center">
          {/* <button className="flex items-center text-sm text-gray-600 hover:text-[rgb(31,91,120)] transition">
            <FaHeart className="mr-1" /> Save
          </button> */}

          <div className="flex items-center gap-3">
            <button
              onClick={onDownload}
              className="bg-gray-100 hover:bg-gray-300 text-[rgb(31,91,120)] font-medium py-2 px-4 rounded-lg text-sm transition"
            >
              <FaDownload className="inline-block mr-1" />
              Download
            </button>

            
            {/* ✅ Price shown here before download */}
            <span className="text-sm font-semibold text-[rgb(148,93,94)]">
              ₹{price}
            </span>


            <button
              onClick={onBuy}
              className="bg-[rgb(221,167,123)] hover:bg-[rgb(148,93,94)] text-white font-medium py-2 px-5 rounded-lg text-sm transition"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
