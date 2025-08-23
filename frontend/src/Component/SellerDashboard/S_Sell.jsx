import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./S_NoteCard";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";

const S_Sell = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toasts, showToast, removeToast } = useToast();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/seller/notes?email=${userEmail}`, {
          withCredentials: true,
        });

        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchNotes();
    }
  }, [userEmail]);

  const handleSearch = () => {
    const resultsSection = document.querySelector('.max-w-6xl');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPdf = (pdfUrl) => {
    if (!pdfUrl || pdfUrl === '' || pdfUrl === 'undefined') {
      showToast("PDF not available", "warning");
      return;
    }
    
    console.log('Opening PDF URL:', pdfUrl);
    
    // Use Google Docs PDF viewer to display PDF instead of downloading
    const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    
    // Create a new window with Google Docs PDF viewer
    const newWindow = window.open('', '_blank', 'width=1000,height=700');
    newWindow.document.write(`
      <html>
        <head>
          <title>PDF Preview</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .header { background: #1e40af; color: white; padding: 10px; text-align: center; }
            iframe { width: 100%; height: calc(100vh - 50px); border: none; }
          </style>
        </head>
        <body>
          <div class="header">PDF Preview</div>
          <iframe src="${googleDocsUrl}"></iframe>
        </body>
      </html>
    `);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/seller/notes/${noteId}`, {
        withCredentials: true,
      });
      setNotes(notes.filter(note => note._id !== noteId));
      showToast("Note deleted successfully", "success");
    } catch (err) {
      console.error("Failed to delete note:", err);
      showToast("Failed to delete note", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-custom-blue/10 rounded-lg">
            <svg className="w-6 h-6 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-custom-blue">My Materials</h1>
        </div>
        <p className="text-gray-600 ml-14">Manage and view all your uploaded study materials</p>
        <div className="w-24 h-1 bg-gradient-to-r from-custom-blue to-custom-i-berry ml-14 mt-2"></div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Your Library</h3>
              <p className="text-gray-600">You have {filteredNotes.length} {filteredNotes.length === 1 ? 'material' : 'materials'} {searchTerm && 'matching your search'}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-custom-blue">{filteredNotes.length}</div>
              <div className="text-sm text-gray-500">{searchTerm ? 'Found' : 'Total Materials'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pb-6">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full hover:shadow-lg focus-within:shadow-lg transition-all duration-300">
              <div className="flex items-center flex-grow">
                <svg className="w-5 h-5 text-gray-400 ml-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your uploaded materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow py-4 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none w-full sm:w-auto transition-all duration-200 bg-transparent"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-custom-blue text-white w-full sm:w-auto px-6 py-4 font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Display Section */}
      <div className="px-6 pb-14">
        {isLoading ? (
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-sm rounded-2xl p-6 space-y-4 border border-gray-200"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {filteredNotes.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note, index) => (
                  <div key={index} className="transform hover:scale-105 transition-all duration-300">
                    <NoteCard
                      title={note.title}
                      description={note.description}
                      price={note.price}
                      category={note.category}
                      fileName={note.pdf?.fullUrl?.split("/").pop() || "Preview PDF"}
                      previewUrl={note.pdf?.fullUrl}
                      onViewPdf={() => handleViewPdf(note.pdf?.fullUrl)}
                      onDelete={() => handleDeleteNote(note._id)}
                      isPurchased={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {searchTerm ? 'No materials found' : 'No materials uploaded yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms or clear the search to see all materials.' 
                    : 'Start by uploading your first study material to share with learners.'
                  }
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => window.location.href = '/seller/S_upload'}
                    className="bg-gradient-to-r from-custom-blue to-custom-brown text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                  >
                    Upload Material
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default S_Sell;