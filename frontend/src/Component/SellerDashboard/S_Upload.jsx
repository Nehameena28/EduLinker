import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";
import { FaChevronDown } from "react-icons/fa";

const S_Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const [userCategories, setUserCategories] = useState([]);
  const { toasts, showToast, removeToast } = useToast();

  const defaultCategories = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", 
    "Python", "Java", "C++", "Data Science"
  ];

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await axios.get(`http://localhost:7000/api/seller/categories?email=${userEmail}`, {
          withCredentials: true,
        });
        setUserCategories(response.data.categories || defaultCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setUserCategories(defaultCategories);
      }
    };
    fetchUserCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const uploadedBy = localStorage.getItem("email");

    if (!pdfFile || !title || !description || !category || !price || !uploadedBy) {
      showToast("Please fill all the fields and upload PDF file.", "warning");
      setIsUploading(false);
      return;
    }

    if (pdfFile && pdfFile.type !== 'application/pdf') {
      showToast("Please upload a valid PDF file.", "error");
      setIsUploading(false);
      return;
    }

    if (pdfFile && pdfFile.size > 50 * 1024 * 1024) {
      showToast("PDF file size should be less than 50MB.", "error");
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
        showToast("Upload successful!", "success");
      } else {
        showToast("Upload successful!", "success");
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
        showToast("Upload timeout. Please check your connection and try again.", "error");
      } else if (error.response) {
        showToast(`Upload failed: ${error.response.data.message || 'Server error'}`, "error");
      } else if (error.request) {
        showToast("Network error. Please check if the server is running on port 7000.", "error");
      } else {
        showToast("Upload failed. Check console for details.", "error");
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-custom-blue focus:outline-none"
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
                  className="w-full px-4 py-2 resize-none border border-gray-300 rounded-lg focus:border-custom-blue focus:outline-none"
                  placeholder="Description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-custom-blue cursor-pointer hover:border-custom-blue transition-colors duration-200 flex items-center justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={category ? "text-gray-700" : "text-gray-500"}>
                      {category || "Category"}
                    </span>
                    <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-48 overflow-y-auto">
                      {userCategories.map((cat, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-custom-blue hover:text-white cursor-pointer transition-colors duration-150 text-gray-700"
                          onClick={() => {
                            setCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div>
                  <input 
                    type="number" 
                    min="0" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-custom-blue focus:outline-none"
                    placeholder="Price (₹)"
                  />
                </div>
              </div>

              {/* PDF Upload */}
              <div className="pt-2">
                <label className="block text-sm text-gray-500 mb-1">PDF File</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  {pdfFile ? (
                    <p className="text-sm text-custom-blue">{pdfFile.name}</p>
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
                    className="inline-block mt-2 px-4 py-1 text-sm text-custom-blue border border-custom-blue rounded-md cursor-pointer hover:bg-custom-blue hover:text-white transition"
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
                      className="bg-custom-blue h-1.5 rounded-full" 
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
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 border-2 ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed text-white border-gray-400' 
                      : 'bg-custom-blue text-white border-custom-blue hover:bg-transparent hover:text-custom-blue hover:border-custom-blue'
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Upload Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
};

export default S_Upload;