
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";

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



  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Saved Notes</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedNotes.map((note) => (
          <NoteCard key={note._id} {...note} hideSave={true} onUnsave={() => handleUnsave(note._id)} />
          
        ))}
      </div>
    </div>
  );
};

export default B_Saved;
