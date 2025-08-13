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
    "HTML","CSS","JavaScript", "React", "Node.js", "Python", "Java", "C++", "Data Science"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const uploadedBy = localStorage.getItem("email"); // seller email from login

    if (!pdfFile || !title || !description || !category || !price || !uploadedBy) {
      alert("Please fill all the fields and upload PDF file.");
      setIsUploading(false);
      return;
    }

    // Validate file types and sizes
    if (pdfFile && pdfFile.type !== 'application/pdf') {
      alert("Please upload a valid PDF file.");
      setIsUploading(false);
      return;
    }

    // Check file size (50MB for PDF)
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
    
    // Debug: Log form data
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, typeof value === 'object' ? value.name : value);
    }

    try {
      console.log("Starting upload...", { title, category, price, uploadedBy: uploadedBy });
      
      const response = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        timeout: 300000, // 5 minute timeout for large files
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });

      console.log("Upload response:", response.data);
      
      // Get PDF URL from response
      let uploadedPdfUrl = response.data.pdfUrl || response.data.fileUrl || response.data.url || response.data.filename;
      
      // If it's just a filename, construct full URL
      if (uploadedPdfUrl && !uploadedPdfUrl.startsWith('http')) {
        uploadedPdfUrl = `http://localhost:7000/uploads/${uploadedPdfUrl}`;
      }
      
      if (uploadedPdfUrl) {
        setPdfUrl(uploadedPdfUrl);
        console.log("PDF URL:", uploadedPdfUrl);
        alert(`Upload successful! PDF URL: ${uploadedPdfUrl}`);
      } else {
        alert("Upload successful!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setPdfFile(null);
      setUploadProgress(0);
      
      // Reset file inputs manually
      const form = e.target;
      const fileInputs = form.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');

    } catch (error) {
      console.error("Upload failed:", error);
      
      if (error.code === 'ECONNABORTED') {
        alert("Upload timeout. Please check your connection and try again.");
      } else if (error.response) {
        console.error("Server error:", error.response.data);
        alert(`Upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.error("Network error:", error.request);
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
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
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
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
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
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
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
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-3">
                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-custom-blue mb-1">PDF File</label>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => setPdfFile(e.target.files[0])} 
                    required
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-custom-i-berry file:text-white hover:file:bg-opacity-90"
                  />
                  {pdfFile && <p className="text-xs text-gray-600 mt-1">{pdfFile.name}</p>}
                </div>

                {/* Display PDF URL after upload */}
                {pdfUrl && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-1">PDF Uploaded Successfully!</p>
                    <p className="text-xs text-green-600 break-all">
                      URL: <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-800">{pdfUrl}</a>
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                {isUploading && uploadProgress > 0 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-custom-i-berry h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${isUploading ? 'bg-gray-400' : 'bg-custom-i-berry hover:bg-opacity-90'} text-white`}
                >
                  {isUploading ? (uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Preparing...') : 'Upload Material'}
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



