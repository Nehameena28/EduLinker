 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import NoteCard from "./NoteCard";
 import { useToast } from "../Toast/useToast";
 import ToastContainer from "../Toast/ToastContainer";
 import RestrictedPdfViewer from "../PdfViewer/RestrictedPdfViewer";

 const Sellspage = () => {
   const [notes, setNotes] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [showPhoneModal, setShowPhoneModal] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [selectedNote, setSelectedNote] = useState(null);
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showPurchaseModal, setShowPurchaseModal] = useState(false);
   const [selectedNoteForPurchase, setSelectedNoteForPurchase] = useState(null);
   const [showPdfViewer, setShowPdfViewer] = useState(false);
   const [currentPdfUrl, setCurrentPdfUrl] = useState("");
   const [currentNoteId, setCurrentNoteId] = useState("");
   const [purchasedNotes, setPurchasedNotes] = useState([]);
   const { toasts, showToast, removeToast } = useToast();
   const navigate = useNavigate();

   const user = JSON.parse(localStorage.getItem("user"));
   const userId = user?.id;
   const userRole = user?.role; // Get user role

   const handleSave = async (note) => {
     if (!user || !userId) {
       setShowLoginModal(true);
       return;
     }

     // Check if user is seller
     if (userRole === 'seller') {
       showToast("Sellers cannot save notes. Only buyers can save notes.", "warning");
       return;
     }

     try {
       await axios.post(`${import.meta.env.VITE_API_URL}/api/save-note`, {
         userId,
         title: note.title,
         description: note.description,
         category: note.category,
         price: note.price,
         fileName: (note.pdf?.fullUrl || note.pdf?.url)?.split("/").pop() || "Note",
         previewUrl: note.pdf?.fullUrl || note.pdf?.url,
       });

       showToast("Note saved successfully!", "success");
     } catch (err) {
       if (err.response?.status === 409) {
         showToast("Note already saved.", "warning");
       } else if (err.response?.status === 403) {
         showToast("Only buyers can save notes.", "warning");
       } else {
         console.error("Failed to save note", err);
         showToast("Error saving note.", "error");
       }
     }
   };

   const handlePayment = async (note) => {
     try {
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment`, {
         noteId: note._id,
         userId,
         amount: note.price
       });
       showToast("Payment successful!", "success");
     } catch (error) {
       console.error("Payment failed:", error);
       showToast("Payment failed. Please try again.", "error");
     }
   };

   const handleBuyNow = (note) => {
     if (!user || !user.name || !user.email) {
       setShowLoginModal(true);
       return;
     }

     // Allow both buyers and sellers to buy notes
     setSelectedNote(note);
     setShowPhoneModal(true);
   };

   const handlePhoneSubmit = async () => {
     if (!phoneNumber || phoneNumber.length < 10) {
       showToast("Please enter a valid 10-digit phone number.", "warning");
       return;
     }

     setShowPhoneModal(false);
     await processPayment(selectedNote, phoneNumber);
   };

   const processPayment = async (note, phone) => {

     try {
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/checkout`, {
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
             const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
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
               showToast("Payment successful and saved!", "success");
             } else {
               showToast("Signature verification failed.", "error");
             }
           } catch (err) {
             console.error("Payment save failed:", err);
             showToast("Payment verified but not saved.", "error");
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
       showToast("Payment failed. Try again.", "error");
     }
   };

   useEffect(() => {
     const fetchData = async () => {
       try {
         setIsLoading(true);
         console.log("Fetching all study materials...");
         
         const [notesRes, purchasedRes] = await Promise.all([
           axios.get(`${import.meta.env.VITE_API_URL}/api/all-materials`, { withCredentials: true }),
           user?.email ? axios.get(`${import.meta.env.VITE_API_URL}/api/buyer/purchased?email=${user.email}`, { withCredentials: true }).catch(() => ({ data: [] })) : Promise.resolve({ data: [] })
         ]);
         
         console.log("Fetched data:", notesRes.data);
         setNotes(notesRes.data);
         setPurchasedNotes(purchasedRes.data?.map(item => item._id) || []);
       } catch (err) {
         console.error("Failed to fetch notes:", err);
         console.error("Error details:", err.response?.data);
       } finally {
         setIsLoading(false);
       }
     };

     fetchData();
   }, [user?.email]);

   const handleSearch = () => {
     // Force re-render by updating a state or just scroll to results
     const resultsSection = document.querySelector('.max-w-6xl');
     if (resultsSection) {
       resultsSection.scrollIntoView({ behavior: 'smooth' });
     }
   };

   const handleViewPdf = (note, noteId) => {
     if (!note.pdf?.fullUrl) {
       showToast("PDF not available", "warning");
       return;
     }
     
     setCurrentNoteId(noteId);
     setShowPdfViewer(true);
   };

   const filteredNotes = notes.filter((note) =>
     note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.category.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
       <div className="relative">
         <img src="/img/sellespage.png" className="w-full h-[80vh] object-cover" />

         <div className="absolute inset-0 bg-black/50"></div>
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
           <h1 className="text-4xl font-bold text-custom-i-berry drop-shadow-lg">Turn Your Knowledge Into Income</h1>
           <p className="mt-4 text-lg">Upload your notes, reach learners worldwide, and start earning with EduLinker.</p>
           <div className="mt-6 relative flex flex-col sm:flex-row items-center bg-white rounded-full shadow-lg border-2 border-gray-300 overflow-hidden w-full max-w-3xl hover:shadow-xl hover:border-blue-500 focus-within:shadow-xl focus-within:border-blue-600 transition-all duration-300">
             <div className="flex items-center flex-grow">
               <svg className="w-5 h-5 text-gray-400 ml-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input
                 type="text"
                 placeholder="Search uploaded notes..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="flex-grow py-3 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none w-full sm:w-auto transition-all duration-200 bg-transparent"
               />
             </div>
             <button 
               onClick={handleSearch}
               className="bg-custom-blue text-white w-full sm:w-auto px-6 py-3 font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               Search
             </button>
           </div>
         </div>
       </div>

       <div className="px-4 sm:px-6 py-16">
         <div className="max-w-6xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
               Discover Study Materials
             </h2>
             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
               Browse through our collection of high-quality study materials
             </p>
           </div>
           
           {isLoading ? (
             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {[...Array(6)].map((_, index) => (
               <div
                 key={index}
                 className="animate-pulse bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100"
               >
                 <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                 <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                 <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                 <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
               </div>
             ))}
             </div>
           ) : (
             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {filteredNotes.length > 0 ? (
               filteredNotes.map((note, index) => (
                 <div key={index} className="transform hover:scale-105 transition-all duration-300">
                   <NoteCard
                   key={index}
                   title={note.title}
                   description={note.description}
                   price={note.price}
                   category={note.category}
                   fileName={note.pdf?.fullUrl?.split("/").pop() || note.fileName || "Preview PDF"}
                   previewUrl={note.pdf?.fullUrl}
                   onViewPdf={() => handleViewPdf(note, note._id)}
                   isPurchased={purchasedNotes.includes(note._id)}
                   onPurchaseRequired={() => {
                     setSelectedNoteForPurchase(note);
                     setShowPurchaseModal(true);
                   }}
                   onBuy={() => handleBuyNow(note)}
                   onSave={() => handleSave(note)}
                   onPayment={() => handlePayment(note)}
                   hideSave={false}
                   hideBuy={false}
                   userRole={userRole}
                   />
                 </div>
               ))
             ) : (
               <div className="col-span-full text-center py-16">
                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                 </div>
                 <h3 className="text-xl font-semibold text-gray-700 mb-2">No materials found</h3>
                 <p className="text-gray-500">Try adjusting your search terms</p>
               </div>
             )}
             </div>
           )}
         </div>
       </div>

       {/* Enhanced Phone Number Modal */}
       {showPhoneModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
           <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl border border-custom-blue/20">
             <div className="text-center mb-8">
               <div className="w-20 h-20 bg-gradient-to-br from-custom-blue/10 to-custom-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-custom-blue/30">
                 <svg className="w-10 h-10 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-custom-blue mb-3">Complete Your Purchase</h3>
               <p className="text-gray-600 leading-relaxed">Please provide your phone number to proceed with secure payment</p>
             </div>
             
             <div className="mb-8">
               <label className="block text-sm font-semibold text-custom-blue mb-3">
                 Phone Number
               </label>
               <input
                 type="tel"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 placeholder="Enter your 10-digit phone number"
                 className="w-full px-5 py-4 border-2 border-custom-blue/30 rounded-xl focus:ring-2 focus:ring-custom-blue focus:border-custom-blue outline-none transition-all duration-300 text-lg bg-white/80"
                 maxLength="10"
               />
             </div>
             
             <div className="flex gap-4">
               <button
                 onClick={() => {
                   setShowPhoneModal(false);
                   setPhoneNumber("");
                   setSelectedNote(null);
                 }}
                 className="flex-1 px-6 py-4 bg-transparent border-2 border-custom-blue text-custom-blue rounded-xl hover:bg-custom-blue hover:text-white transition-all duration-300 font-semibold"
               >
                 Cancel
               </button>
               <button
                 onClick={handlePhoneSubmit}
                 className="flex-1 px-6 py-4 bg-custom-blue border-2 border-custom-blue text-white rounded-xl hover:bg-transparent hover:text-custom-blue transition-all duration-300 font-semibold"
               >
                 Continue
               </button>
             </div>
           </div>
         </div>
       )}

       {/* Login Required Modal */}
       {showLoginModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border-l-4 border-custom-i-berry">
             <div className="text-center">
               <div className="w-16 h-16 bg-custom-i-berry/20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-custom-blue mb-2">Login Required</h3>
               <p className="text-gray-600 mb-6">Please log in to access this feature</p>
               <div className="flex gap-3">
                 <button
                   onClick={() => setShowLoginModal(false)}
                   className="flex-1 px-4 py-2 border border-custom-brown text-custom-brown rounded-lg hover:bg-custom-brown/10"
                 >
                   Cancel
                 </button>
                 <button
                   onClick={() => navigate("/Login")}
                   className="flex-1 px-4 py-2 bg-custom-i-berry text-white rounded-lg hover:bg-custom-brown"
                 >
                   Login
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Purchase Required Modal */}
       {showPurchaseModal && selectedNoteForPurchase && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border-l-4 border-blue-600">
             <div className="text-center">
               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-blue-600 mb-3">🔒 Purchase Required</h3>
               <p className="text-gray-600 mb-4">You've reached the preview limit (4 pages)</p>
               <div className="bg-blue-50 rounded-lg p-4 mb-6">
                 <h4 className="font-semibold text-blue-800 mb-2">{selectedNoteForPurchase.title}</h4>
                 <p className="text-sm text-gray-700 mb-2">Category: {selectedNoteForPurchase.category}</p>
                 <p className="text-lg font-bold text-blue-600">Price: ₹{selectedNoteForPurchase.price}</p>
               </div>
               <p className="text-gray-500 text-sm mb-6">Purchase this note to access the complete content</p>
               <div className="flex gap-3">
                 <button
                   onClick={() => {
                     setShowPurchaseModal(false);
                     setSelectedNoteForPurchase(null);
                   }}
                   className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                 >
                   Cancel
                 </button>
                 <button
                   onClick={() => {
                     setShowPurchaseModal(false);
                     handleBuyNow(selectedNoteForPurchase);
                   }}
                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
                 >
                   Purchase Full Access
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
       
       <ToastContainer toasts={toasts} removeToast={removeToast} />
       {showPdfViewer && (
         <RestrictedPdfViewer
           materialId={currentNoteId}
           onClose={() => setShowPdfViewer(false)}
           userEmail={user?.email}
           onPurchaseRequired={(material) => {
             setSelectedNoteForPurchase(material);
             setShowPurchaseModal(true);
           }}
         />
       )}
     </div>
   );
 };

 export default Sellspage;




