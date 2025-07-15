
import React, { useEffect, useState } from "react";
import axios from "axios";
import S_NoteCard from "./S_NoteCard";

const S_Sell = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter notes based on search input
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

<>

    {/* <div className="min-h-screen bg-white text-custom-blue"> */}
       <div className="relative bg-cover bg-center h-[40px] flex items-center justify-center px-6">

          {/* 🔍 Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search your uploaded notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-5 py-3 text-gray-700 focus:outline-none"
            />
            <button className="bg-custom-blue text-white px-6 py-3 font-medium hover:bg-opacity-90 transition">
              Search
            </button>
          </div>
        </div>
      {/* </div> */}

      {/* 💼 Uploaded Notes */}
      <div className="px-6 py-14">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <S_NoteCard
                key={index}
                title={note.title}
                description={note.description}
                price={note.price}
                category={note.category}
                fileName={note.pdfUrl?.split("/").pop() || "Preview PDF"}
                onDownload={() =>
                  window.open(`http://localhost:7000${note.pdfUrl}`, "_blank")
                }
                onBuy={() => alert("Redirecting to Buy Page")}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No notes found matching your search.
            </p>
          )}
        </div>
      </div>
    

 </> 
  );

};

export default S_Sell;
