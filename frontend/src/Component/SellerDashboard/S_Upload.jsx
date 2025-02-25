import React, { useState } from "react";

const S_Upload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "pdf") {
      setPdfFile(file);
    } else if (e.target.name === "coverPhoto") {
      setCoverPhoto(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PDF File:", pdfFile);
    console.log("Cover Photo:", coverPhoto);
    console.log("Title:", title);
    console.log("Price:", price);
    alert("Material uploaded successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Upload Material
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PDF Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload PDF Document:
          </label>
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cover Photo Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Cover Photo:
          </label>
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Sell
        </button>
      </form>
    </div>
  );
};

export default S_Upload;

        
