
import React, { useState } from "react";
import axios from "axios";

const S_Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");

  const predefinedCategories = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", 
    "Python", "Java", "C++", "Data Science"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const uploadedBy = localStorage.getItem("email");

    if (!pdfFile || !title || !description || !category || !price || !uploadedBy) {
      alert("Please fill all the fields and upload PDF file.");
      setIsUploading(false);
      return;
    }

    if (pdfFile && pdfFile.type !== 'application/pdf') {
      alert("Please upload a valid PDF file.");
      setIsUploading(false);
      return;
    }

    if (pdfFile && pdfFile.size > 50 * 1024 * 1024) {
      alert("PDF file size should be less than 50MB.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("price", parseFloat(price));
    formData.append("pdf", pdfFile);
    formData.append("uploadedBy", uploadedBy);

    try {
      const response = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        timeout: 300000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      let uploadedPdfUrl = response.data.pdfUrl || response.data.fileUrl || response.data.url || response.data.filename;
      
      if (uploadedPdfUrl && !uploadedPdfUrl.startsWith('http')) {
        uploadedPdfUrl = `http://localhost:7000/uploads/${uploadedPdfUrl}`;
      }
      
      if (uploadedPdfUrl) {
        setPdfUrl(uploadedPdfUrl);
        alert(`Upload successful! PDF URL: ${uploadedPdfUrl}`);
      } else {
        alert("Upload successful!");
      }

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setPdfFile(null);
      setUploadProgress(0);
      
      const form = e.target;
      const fileInputs = form.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        alert("Upload timeout. Please check your connection and try again.");
      } else if (error.response) {
        alert(`Upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        alert("Network error. Please check if the server is running on port 7000.");
      } else {
        alert("Upload failed. Check console for details.");
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-custom-blue">Upload Study Material</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                  className="w-full px-4 py-2 border-b border-gray-300 focus:border-custom-i-berry focus:outline-none"
                  placeholder="Title"
                />
              </div>

              {/* Description */}
              <div>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                  rows="2"
                  className="w-full px-4 py-2 resize-none border-b border-gray-300 focus:border-custom-i-berry focus:outline-none"
                  placeholder="Description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-custom-i-berry focus:outline-none"
                  >
                    <option value="">Category</option>
                    {predefinedCategories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <input 
                    type="number" 
                    min="0" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-custom-i-berry focus:outline-none"
                    placeholder="Price (₹)"
                  />
                </div>
              </div>

              {/* PDF Upload */}
              <div className="pt-2">
                <label className="block text-sm text-gray-500 mb-1">PDF File</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  {pdfFile ? (
                    <p className="text-sm text-custom-i-berry">{pdfFile.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & drop or click to browse</p>
                  )}
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => setPdfFile(e.target.files[0])} 
                    required
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label 
                    htmlFor="pdf-upload" 
                    className="inline-block mt-2 px-4 py-1 text-sm text-custom-i-berry border border-custom-i-berry rounded-md cursor-pointer hover:bg-custom-i-berry hover:text-white transition"
                  >
                    Select File
                  </label>
                </div>
              </div>

              {/* Progress Bar */}
              {isUploading && uploadProgress > 0 && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-custom-blue mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-custom-i-berry h-1.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-2 px-4 rounded-md font-medium text-white transition ${
                    isUploading ? 'bg-gray-400' : 'bg-custom-i-berry hover:bg-custom-blue'
                  }`}
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
