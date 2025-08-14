
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";

const B_Saved = () => {
  const [savedNotes, setSavedNotes] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchSaved = async () => {
      const res = await axios.get(`http://localhost:7000/api/saved-notes/${userId}`);
      setSavedNotes(res.data);
    };

    fetchSaved();
  }, [userId]);


  const handleUnsave = async (noteId) => {
    try {
      await axios.delete(`http://localhost:7000/api/saved-notes/${noteId}`);
      setSavedNotes(prev => prev.filter(note => note._id !== noteId));
      alert("Note unsaved successfully");
    } catch (error) {
      console.error("Unsave failed:", error);
      alert("Error unsaving note");
    }
  };

  const handleViewPdf = (pdfUrl) => {
    if (!pdfUrl) {
      alert("PDF not available");
      return;
    }
    
    console.log("Original PDF URL:", pdfUrl);
    
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
    
    console.log("Final PDF URL:", fullUrl);
    
    // Open PDF in new tab
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Saved Notes</h1> */}
      {savedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedNotes.map((note) => {
            console.log('Note preview URL:', note.previewUrl); // Debug log
            return (
              <NoteCard 
                key={note._id} 
                title={note.title}
                description={note.description}
                price={note.price}
                category={note.category}
                fileName={note.fileName}
                previewUrl={note.previewUrl}
                hideSave={true} 
                onUnsave={() => handleUnsave(note._id)}
                onClick={() => handleViewPdf(note.previewUrl)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-gray-400 mb-4">
            <FaBookmark className="w-16 h-16" />
          </div>
          <p className="text-gray-600 text-lg">You have not saved any material yet.</p>
        </div>
      )}
    </div>
  );
};

export default B_Saved;
