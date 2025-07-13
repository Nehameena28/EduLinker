// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NoteCard from "./Notecard";

// const SellsPage = () => {

//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/seller/notes", {
//           withCredentials: true,
//         });
//         setNotes(res.data);
//       } catch (err) {
//         console.error("Failed to fetch notes:", err);
//       }
//     };

//     fetchNotes();
//   }, []);


//   return (
//     <>
  
//         <div className="min-h-screen bg-white text-custom-blue">
//       {/* 🔥 Hero Section */}
      
//       <div
//         className="relative bg-cover bg-center h-[420px] flex items-center justify-center px-6"
//         style={{
//           backgroundImage: "url('/sel.png')",
//         }}
//       >

      
//         <div className="absolute inset-0 bg-black bg-opacity-40">
          
//         </div>
//         <div className="relative z-10 text-center">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">
//             Turn Your Knowledge Into Income
//           </h1>
//           <p className="text-white text-lg max-w-2xl mx-auto">
//             Upload your notes, reach learners around the world, and start earning today with Edulinker.
//           </p>
//         </div>
//       </div>
//     <div className="min-h-screen bg-white px-6 py-10 text-custom-blue">
//   <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//     {notes.map((note, index) => (
//       <NoteCard
//         key={index}
//         title={note.title}
//         description={note.description}
//         price={note.price}
//         category={note.category}
//         fileName={note.pdfUrl?.split("/").pop() || "Preview PDF"}
//         onDownload={() => window.open(`http://localhost:7000${note.pdfUrl}`, "_blank")}
//         onBuy={() => alert("Redirecting to Buy Page")}
//       />
//     ))}
//   </div>
// </div>
// </div>
// </>
//   );
// };

// export default SellsPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./Notecard";

const SellsPage = () => {
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
    <div className="min-h-screen bg-white text-custom-blue">
      {/* 🔥 Hero Section */}
      <div
        className="relative bg-cover bg-center h-[440px] flex items-center justify-center px-6"
        style={{
          backgroundImage: "url('/sell-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Turn Your Knowledge Into Income
          </h1>
          <p className="text-white text-lg mb-6">
            Upload your notes, reach learners around the world, and start earning today with Edulinker.
          </p>

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
      </div>

      {/* 💼 Uploaded Notes */}
      <div className="px-6 py-14">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <NoteCard
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
    </div>
  );
};

export default SellsPage;
