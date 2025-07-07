
// import { Download, CreditCard, BookOpen } from "lucide-react";

// const BuyerProfile = () => {
//   const purchasedNotes = [
//     {
//       id: 1,
//       title: "JavaScript Basics",
//       price: "₹199",
//       downloadLink: "#",
//     },
//     {
//       id: 2,
//       title: "React Hooks Deep Dive",
//       price: "₹299",
//       downloadLink: "#",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-custom-blue p-6">
//       <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Purchased Notes */}
//         <div className="col-span-2 bg-white border shadow-md rounded-xl p-4">
//           <h3 className="text-xl font-semibold mb-4">Purchased Notes</h3>
//           {purchasedNotes.length === 0 ? (
//             <p className="text-gray-500">You have not purchased any notes yet.</p>
//           ) : (
//             purchasedNotes.map((note) => (
//               <div
//                 key={note.id}
//                 className="flex items-center justify-between py-3 border-b border-gray-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <BookOpen className="text-custom-blue" />
//                   <span className="font-medium">{note.title}</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="text-custom-brown font-semibold">{note.price}</span>
//                   <a href={note.downloadLink}>
//                     <button className="bg-custom-i-berry text-white hover:opacity-90 px-4 py-1 rounded-md flex items-center gap-1">
//                       <Download className="w-4 h-4" />
//                       Download
//                     </button>
//                   </a>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Payment Info */}
//         <div className="bg-white border shadow-md rounded-xl p-4">
//           <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <span>Total Spent</span>
//               <span className="font-bold text-custom-brown">₹498</span>
//             </div>
//             <div className="flex justify-between items-center">
//   <span>Payment Method</span>
//   <span className="flex items-center gap-2 text-custom-blue font-semibold">
//     <img
//       src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Razorpay_logo.svg"
//       alt="Razorpay"
//       className="w-5 h-5 object-contain"
//     />
//     Razorpay
//   </span>
// </div>

//           </div>
//         </div>
//       </div>

//       {/* Explore More */}
//       <div className="mt-8">
//         <button className="bg-custom-blue hover:opacity-90 text-white px-6 py-2 rounded-md">
//           Explore More Notes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BuyerProfile;



import { BookOpen } from "lucide-react";

const BuyerProfile = () => {
  const username = "Neha"; // You can replace this with dynamic data

  return (
    <div className="min-h-screen bg-white text-custom-blue px-6 py-10">
      {/* Header with greeting and Explore button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Hello, {username}!
        </h2>
        <button className="bg-custom-i-berry text-white hover:opacity-90 px-6 py-3 rounded-lg text-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Explore Notes
        </button>
      </div>

      {/* Purchased Notes Table */}
      <div className="bg-white border shadow-md rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Your Purchased Notes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-custom-blue text-white text-left">
                <th className="p-3">Note Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">DSA Notes - Level 1</td>
                <td className="p-3 text-custom-brown font-semibold">₹149</td>
                <td className="p-3">Razorpay</td>
                <td className="p-3 text-sm text-gray-500">2025-07-03</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Full Stack Roadmap</td>
                <td className="p-3 text-custom-brown font-semibold">₹199</td>
                <td className="p-3">Razorpay</td>
                <td className="p-3 text-sm text-gray-500">2025-07-04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
