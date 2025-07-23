import React, { useState } from "react";
import axios from "axios";

const S_Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const predefinedCategories = [
    "JavaScript", "React", "Node.js", "Python", "Java", "C++", "Data Science"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!pdfFile || !coverImage || !title || !description || !category || !price) {
      alert("Please fill all the fields and upload both files.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("pdf", pdfFile);
    formData.append("cover", coverImage);

    try {
      const response = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Upload successful!");
      console.log(response.data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setPdfFile(null);
      setCoverImage(null);
      e.target.reset();

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-custom-blue to-custom-brown p-0 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-custom-i-berry text-center mb-4">Upload Study Material</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-custom-blue mb-1">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-custom-i-berry"
                  placeholder="Enter title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-custom-blue mb-1">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                  rows="2"
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-custom-i-berry"
                  placeholder="Brief description"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-custom-blue mb-1">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-custom-i-berry"
                  >
                    <option value="">Select</option>
                    {predefinedCategories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-custom-blue mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-custom-i-berry"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-3">
                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-custom-blue mb-1">PDF File</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => setPdfFile(e.target.files[0])} 
                      required 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="pdf-upload"
                    />
                    <label 
                      htmlFor="pdf-upload"
                      className="block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 text-center text-xs hover:border-custom-i-berry"
                    >
                      {pdfFile ? (
                        <span className="text-green-600 font-medium truncate block">{pdfFile.name}</span>
                      ) : (
                        <span className="text-gray-500">Click to upload PDF</span>
                      )}
                    </label>
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-custom-blue mb-1">Cover Image</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setCoverImage(e.target.files[0])} 
                      required 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 text-center text-xs hover:border-custom-i-berry"
                    >
                      {coverImage ? (
                        <span className="text-green-600 font-medium truncate block">{coverImage.name}</span>
                      ) : (
                        <span className="text-gray-500">Click to upload image</span>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${isUploading ? 'bg-gray-400' : 'bg-custom-i-berry hover:bg-opacity-90'} text-white transition`}
                >
                  {isUploading ? 'Uploading...' : 'Upload Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S_Upload;
