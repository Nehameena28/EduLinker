import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";
import RestrictedPdfViewer from "../PdfViewer/RestrictedPdfViewer";

const B_Saved = () => {
  const [savedNotes, setSavedNotes] = useState([]);
  const [purchasedNotes, setPurchasedNotes] = useState([]);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState("");
  const { toasts, showToast, removeToast } = useToast();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [savedRes, purchasedRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/saved-notes/${userId}`),
          user?.email ? axios.get(`${import.meta.env.VITE_API_URL}/api/buyer/purchased?email=${user.email}`, { withCredentials: true }).catch(() => ({ data: [] })) : Promise.resolve({ data: [] })
        ]);
        
        console.log('Saved notes:', savedRes.data);
        console.log('Purchased response:', purchasedRes.data);
        
        // Log detailed structure
        if (purchasedRes.data && purchasedRes.data.length > 0) {
          console.log('First purchased item structure:', purchasedRes.data[0]);
          console.log('Available fields:', Object.keys(purchasedRes.data[0]));
        }
        
        setSavedNotes(savedRes.data);
        
        // Handle purchased notes - match by title since that's what's stored in payments
        let purchasedTitles = [];
        if (purchasedRes.data) {
          if (Array.isArray(purchasedRes.data)) {
            purchasedTitles = purchasedRes.data.map(item => item.itemTitle || item.title).filter(Boolean);
          } else if (purchasedRes.data.purchases) {
            purchasedTitles = purchasedRes.data.purchases.map(item => item.itemTitle || item.title).filter(Boolean);
          }
        }
        
        console.log('Purchased titles:', purchasedTitles);
        setPurchasedNotes(purchasedTitles);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [userId, user?.email]);


  const handleUnsave = async (noteId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved-notes/${noteId}`);
      setSavedNotes(prev => prev.filter(note => note._id !== noteId));
      showToast("Note unsaved successfully", "success");
    } catch (error) {
      console.error("Unsave failed:", error);
      showToast("Error unsaving note", "error");
    }
  };

  const handleBuyNow = (note) => {
    if (!user || !user.name || !user.email) {
      setShowLoginModal(true);
      return;
    }

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
        key: "rzp_test_KbKCf8dIP10uNs",
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
                  pdf: note.previewUrl,
                  cover: note.cover,
                },
              ],
            });

            if (verifyRes.data.success) {
              showToast("Payment successful and saved!", "success");
              // Refresh purchased notes after successful payment
              if (user?.email) {
                try {
                  const purchasedRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/buyer/purchased?email=${user.email}`, { withCredentials: true });
                  let purchasedTitles = [];
                  if (purchasedRes.data) {
                    if (Array.isArray(purchasedRes.data)) {
                      purchasedTitles = purchasedRes.data.map(item => item.itemTitle || item.title).filter(Boolean);
                    } else if (purchasedRes.data.purchases) {
                      purchasedTitles = purchasedRes.data.purchases.map(item => item.itemTitle || item.title).filter(Boolean);
                    }
                  }
                  setPurchasedNotes(purchasedTitles);
                } catch (err) {
                  console.error('Failed to refresh purchased notes:', err);
                }
              }
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

  const handleViewPdf = (note) => {
    if (!note.previewUrl) {
      showToast("PDF not available", "warning");
      return;
    }
    
    setCurrentNoteId(note._id);
    setShowPdfViewer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-custom-blue/10 rounded-lg">
            <FaBookmark className="w-5 h-5 sm:w-6 sm:h-6 text-custom-blue" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-custom-blue">Saved Notes</h1>
        </div>
        <p className="text-gray-600 ml-0 sm:ml-14 text-sm sm:text-base">Your collection of saved study materials</p>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-custom-blue to-custom-i-berry ml-0 sm:ml-14 mt-2"></div>
      </div>

      {savedNotes.length > 0 ? (
        <>
          {/* Stats Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Your Library</h3>
                <p className="text-gray-600 text-sm sm:text-base">You have {savedNotes.length} saved {savedNotes.length === 1 ? 'note' : 'notes'}</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-custom-blue">{savedNotes.length}</div>
                <div className="text-xs sm:text-sm text-gray-500">Total Saved</div>
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {savedNotes.map((note) => {
              const isPurchased = purchasedNotes.includes(note.title);
              console.log(`Note: ${note.title}, isPurchased: ${isPurchased}`);
              
              return (
                <div key={note._id} className="transform hover:scale-105 transition-all duration-300">
                  <NoteCard 
                    title={note.title}
                    description={note.description}
                    price={note.price}
                    category={note.category}
                    fileName={note.fileName}
                    previewUrl={note.previewUrl}
                    hideSave={true} 
                    onUnsave={() => handleUnsave(note._id)}
                    onBuy={isPurchased ? undefined : () => handleBuyNow(note)}
                    onClick={() => handleViewPdf(note)}
                    isPurchased={isPurchased}
                    hideBuy={isPurchased}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center max-w-md mx-auto p-6 sm:p-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-custom-blue/10 to-custom-i-berry/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FaBookmark className="w-10 h-10 sm:w-12 sm:h-12 text-custom-blue/60" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">No Saved Notes Yet</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
              Start building your personal library by saving study materials that interest you. 
              Browse through our collection and bookmark notes for easy access later.
            </p>
            <button 
              onClick={() => navigate('/Sellspage')}
              className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium text-sm sm:text-base"
            >
              Explore Notes
            </button>
          </div>
        </div>
      )}

      {/* Phone Number Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border-l-4 border-custom-i-berry">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-custom-i-berry/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📱</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-custom-blue mb-2">Enter Phone Number</h3>
              <p className="text-gray-600 text-sm sm:text-base">We need your phone number to complete the purchase</p>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-custom-brown mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-custom-i-berry/30 rounded-lg focus:ring-2 focus:ring-custom-i-berry focus:border-custom-i-berry outline-none text-sm sm:text-base"
                maxLength="10"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowPhoneModal(false);
                  setPhoneNumber("");
                  setSelectedNote(null);
                }}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-custom-brown text-custom-brown rounded-lg hover:bg-custom-brown/10 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handlePhoneSubmit}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-custom-i-berry text-white rounded-lg hover:bg-custom-brown transition text-sm sm:text-base"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md shadow-2xl border-l-4 border-custom-i-berry">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-custom-i-berry/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-custom-blue mb-2">Login Required</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Please log in to access this feature</p>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-3 sm:px-4 py-2 border border-custom-brown text-custom-brown rounded-lg hover:bg-custom-brown/10 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/Login")}
                  className="flex-1 px-3 sm:px-4 py-2 bg-custom-i-berry text-white rounded-lg hover:bg-custom-brown text-sm sm:text-base"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      {showPdfViewer && (
        <RestrictedPdfViewer
          materialId={currentNoteId}
          onClose={() => setShowPdfViewer(false)}
          userEmail={user?.email}
          onPurchaseRequired={(material) => {
            const note = savedNotes.find(n => n._id === currentNoteId);
            if (note) {
              handleBuyNow(note);
            }
          }}
        />
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default B_Saved;