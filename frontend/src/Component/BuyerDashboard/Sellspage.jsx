import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./Notecard";

const SellsPage = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:7000/seller/notes", {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    fetchNotes();
  }, []);


  return (
    // <div className="min-h-screen bg-white px-6 py-10 text-custom-blue">
    //   <div className="max-w-5xl mx-auto">
    //     {/* <h2 className="text-3xl font-bold mb-8">📚 Your Uploaded Notes</h2> */}

    //     {/* NoteCard with spacing */}
    //     <div className="p-6 bg-gray-50 rounded-xl shadow-md border border-custom-i-berry/20">
    //       <NoteCard
    //         title="JavaScript Notes"
    //         description="Comprehensive JS notes covering core concepts, ES6+, DOM, async..."
    //         price={2500}
    //         category="JavaScript"
    //         fileName="JavaScript_Study_Notes.pdf"
           
    //         onDownload={() => alert("Download PDF")}
    //         onBuy={() => alert("Redirecting to Buy Page")}
    //       />
          
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-white px-6 py-10 text-custom-blue">
  <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {notes.map((note, index) => (
      <NoteCard
        key={index}
        title={note.title}
        description={note.description}
        price={note.price}
        category={note.category}
        fileName={note.pdfUrl?.split("/").pop() || "Preview PDF"}
        onDownload={() => window.open(`http://localhost:7000${note.pdfUrl}`, "_blank")}
        onBuy={() => alert("Redirecting to Buy Page")}
      />
    ))}
  </div>
</div>

  );
};

export default SellsPage;
