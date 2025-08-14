 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import NoteCard from "./NoteCard";

 const Sellspage = () => {
   const [notes, setNotes] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [showPhoneModal, setShowPhoneModal] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [selectedNote, setSelectedNote] = useState(null);

   const user = JSON.parse(localStorage.getItem("user"));
   const userId = user?.id;

   const handleSave = async (note) => {
     try {
       await axios.post("http://localhost:7000/api/save-note", {
         userId,
         title: note.title,
         description: note.description,
         category: note.category,
         price: note.price,
         fileName: note.pdf?.url?.split("/").pop() || "Note",
         previewUrl: note.pdf?.url,
       });

       alert("Note saved successfully!");
     } catch (err) {
       if (err.response?.status === 409) {
         alert("Note already saved.");
       } else {
         console.error("Failed to save note", err);
         alert("Error saving note.");
       }
     }
   };

   const handleBuyNow = (note) => {
     const user = JSON.parse(localStorage.getItem("user"));

     if (!user || !user.name || !user.email) {
       alert("You must be logged in to make a purchase.");
       return;
     }

     setSelectedNote(note);
     setShowPhoneModal(true);
   };

   const handlePhoneSubmit = async () => {
     if (!phoneNumber || phoneNumber.length < 10) {
       alert("Please enter a valid 10-digit phone number.");
       return;
     }

     setShowPhoneModal(false);
     await processPayment(selectedNote, phoneNumber);
   };

   const processPayment = async (note, phone) => {

     try {
       const res = await axios.post("http://localhost:7000/api/payment/checkout", {
         amount: note.price * 100,
       });

       const user = JSON.parse(localStorage.getItem("user"));

       const { order } = res.data;

       const options = {
         key: "rzp_test_KbKCf8dIP10uNs", // Replace with your Razorpay key
         amount: order.amount,
         currency: "INR",
         name: "EduLinker",
         description: note.title,
         order_id: order.id,
         handler: async function (response) {
           try {
             const verifyRes = await axios.post("http://localhost:7000/api/payment/verify", {
               razorpay_order_id: response.razorpay_order_id,
               razorpay_payment_id: response.razorpay_payment_id,
               razorpay_signature: response.razorpay_signature,
               user: {
                 name: user.name,
                 email: user.email,
                 phone,
               },
               items: [
                 {
                   title: note.title,
                   description: note.description,
                   price: note.price,
                   category: note.category,
                   pdf: note.pdf?.url,
                   cover: note.cover,
                 },
               ],
             });

             if (verifyRes.data.success) {
               alert("✅ Payment successful and saved!");
             } else {
               alert("⚠️ Signature verification failed.");
             }
           } catch (err) {
             console.error("Payment save failed:", err);
             alert("❌ Payment verified but not saved.");
           }
         },
         prefill: {
           name: user.name,
           email: user.email,
           contact: phone,
         },
         theme: {
           color: "#1d4ed8",
         },
       };

       const rzp = new window.Razorpay(options);
       rzp.open();
     } catch (error) {
       console.error("Payment initiation failed", error);
       alert("❌ Payment failed. Try again.");
     }
   };

   useEffect(() => {
     const fetchNotes = async () => {
       try {
         setIsLoading(true);
         console.log("Fetching all study materials...");
         
         // Try the buyer-specific endpoint first
         const res = await axios.get("http://localhost:7000/api/all-materials", {
           withCredentials: true,
         });
         
         console.log("Fetched data:", res.data);
         console.log("Sample note structure:", res.data[0]);
         setNotes(res.data);
       } catch (err) {
         console.error("Failed to fetch notes:", err);
         console.error("Error details:", err.response?.data);
       } finally {
         setIsLoading(false);
       }
     };

     fetchNotes();
   }, []);

   const filteredNotes = notes.filter((note) =>
     note.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
     <div className="min-h-screen bg-white text-custom-blue">
       <div className="relative bg-cover bg-center h-[440px] flex items-center justify-center px-4 sm:px-6">
         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
         <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
             Turn Your Knowledge Into Income
           </h1>
           <p className="text-white text-base sm:text-lg mb-6 px-2 sm:px-0">
             Upload your notes, reach learners around the world, and start earning today with EduLinker.
           </p>
           <div className="flex flex-col sm:flex-row items-center bg-white rounded-full shadow-md overflow-hidden w-full">
             <input
               type="text"
               placeholder="Search uploaded notes..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="flex-grow px-5 py-3 text-gray-700 focus:outline-none w-full sm:w-auto"
             />
             <button className="bg-custom-blue text-white w-full sm:w-auto px-6 py-3 font-medium hover:bg-opacity-90 transition">
               Search
             </button>
           </div>
         </div>
       </div>

       <div className="px-4 sm:px-6 py-14">
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
                   fileName={note.pdf?.url?.split("/").pop() || note.fileName || "Preview PDF"}
                   previewUrl={note.pdf?.url ? 
                     (note.pdf.url.startsWith('http') ? note.pdf.url : `http://localhost:7000${note.pdf.url}`) 
                     : note.previewUrl || note.pdfUrl}
                   onBuy={() => handleBuyNow(note)}
                   onSave={() => handleSave(note)}
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

       {/* Phone Number Modal */}
       {showPhoneModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
           <div className="bg-white rounded-xl p-6 w-full max-w-md">
             <div className="text-center mb-6">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <span className="text-2xl">📱</span>
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Phone Number</h3>
               <p className="text-gray-600">We need your phone number to complete the purchase</p>
             </div>
             
             <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Phone Number
               </label>
               <input
                 type="tel"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 placeholder="Enter 10-digit phone number"
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                 maxLength="10"
               />
             </div>
             
             <div className="flex gap-3">
               <button
                 onClick={() => {
                   setShowPhoneModal(false);
                   setPhoneNumber("");
                   setSelectedNote(null);
                 }}
                 className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
               >
                 Cancel
               </button>
               <button
                 onClick={handlePhoneSubmit}
                 className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
               >
                 Continue
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

 export default Sellspage;




