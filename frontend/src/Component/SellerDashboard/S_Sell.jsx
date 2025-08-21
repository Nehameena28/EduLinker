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
        const res = await axios.get(`http://localhost:7000/seller/notes?email=${userEmail}`, {
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
    // Force re-render by updating a state or just scroll to results
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
    
    // Construct full URL
    let fullUrl = pdfUrl;
    if (!pdfUrl.startsWith('http')) {
      // If URL already starts with /uploads/, don't add it again
      if (pdfUrl.startsWith('/uploads/')) {
        fullUrl = `http://localhost:7000${pdfUrl}`;
      } else {
        fullUrl = `http://localhost:7000/uploads/${pdfUrl}`;
      }
    }
    
    // Open PDF in new tab
    window.open(fullUrl, '_blank');
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:7000/seller/notes/${noteId}`, {
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
    <div className="min-h-screen bg-white text-custom-blue">
      {/* Search Bar */}
      <div className="flex justify-center items-center px-4 pt-8 pb-4">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center bg-white rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search uploaded notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-5 py-3 text-gray-700 focus:outline-none w-full sm:w-auto"
            />
            <button 
              onClick={handleSearch}
              className="bg-custom-blue text-white w-full sm:w-auto px-6 py-3 font-medium hover:bg-opacity-90 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Notes Display Section */}
      <div className="px-4 sm:px-6 pt-8 pb-14">
        {isLoading ? (
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-md rounded-xl p-4 space-y-4"
              >
                <div className="h-40 bg-gray-300 rounded-md"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <NoteCard
                  key={index}
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
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No notes found matching your search.
              </p>
            )}
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default S_Sell;




