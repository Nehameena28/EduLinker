

import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const Sellspage = () => {
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

  const handleBuyNow = async (note) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.name || !user.email) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    const phone = prompt("📱 Enter your phone number to continue:");

    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/api/payment/checkout", {
        amount: note.price * 100,
      });

      const { order } = res.data;

      const options = {
        key: "rzp_test_KbKCf8dIP10uNs", // Your Razorpay test key
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

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-custom-blue">
      {/* 🎯 Hero Section */}
      <div className="relative bg-cover bg-center h-[440px] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Turn Your Knowledge Into Income
          </h1>
          <p className="text-white text-lg mb-6">
            Upload your notes, reach learners around the world, and start earning today with EduLinker.
          </p>

          {/* 🔍 Search Input Only */}
          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search uploaded notes..."
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

      {/* 📚 Notes Section */}
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
                onBuy={() => handleBuyNow(note)}
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

export default Sellspage;
