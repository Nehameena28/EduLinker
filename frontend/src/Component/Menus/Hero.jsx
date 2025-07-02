
// import React from 'react';

// const Hero = () => {
//   return (
//     <>
    
//       {/* <h1 className="text-5xl text-center mt-10 font-bold">Features</h1> */}
// <div className="text-center mb-12">
//   <h2 className="text-4xl font-pacifico  mt-8 text-custom-brown">Features</h2>
//   <div className="w-24 h-1 bg-custom-brown mx-auto mt-2 rounded-full"></div>
// </div>

//       {/* <div
//         id="RemoveScrlbr"
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-20 gap-4 w-full bg-[#f8f9fa] py-16 px-4"
//       >
//         {/* Card 1 */}
//         <div className="flex flex-col  items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
//           <img
//             src="Home-Img/save.jpg"
//             alt="img1"
//             className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
//           />
//           <p className="font-semibold text-black">Save Notes</p>
//           {/* <p className="text-black text-center">Keep your handwritten notes safe and organized in one place — access them anytime, from any device.</p> */}
//         </div>

//         {/* Card 2 */}
//         <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
//           <img
//             src="Home-Img/div2.jpg"
//             alt="img2"
//             className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
//           />
//           <p className="font-semibold text-black">Best Notes Available</p>
//           <p className="text-black text-center">Get access to high-quality handwritten notes prepared by top-performing students.</p>
//         </div>

//         {/* Card 3 */}
//         <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
//           <img
//             src="Home-Img/div3.webp"
//             alt="img3"
//             className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
//           />
//           <p className="font-semibold text-black">Upload Your Notes</p>
//           <p className="text-black text-center">Share your handwritten notes with others and help fellow learners while earning rewards.</p>
//         </div>

//         {/* Card 4 */}
//         <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
//           <img
//             src="Home-Img/div43.webp"
//             alt="img4"
//             className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
//           />
//           <p className="font-semibold text-black">Buyer & Seller Platform</p>
//           <p className="text-black text-center">A seamless platform where students can both upload and purchase notes with ease.</p>
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default Hero;


import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    title: "Upload Documents",
    desc: "Easily upload your study notes or PDFs with a title, cover photo, and price.",
    icon: "https://img.icons8.com/3d-fluency/94/upload.png",
  },
  {
    title: "View Uploaded Docs",
    desc: "Access and manage your uploaded materials from a clean dashboard.",
    icon: "https://img.icons8.com/3d-fluency/94/opened-folder.png",
  },
  {
    title: "Sold Notes",
    desc: "Check which documents were purchased, and by whom.",
    icon: "https://img.icons8.com/3d-fluency/94/sales-performance.png",
  },
  {
    title: "Payment Info",
    desc: "Track your earnings and view your payment and payout history easily.",
    icon: "https://img.icons8.com/3d-fluency/94/money.png",
  },
  {
    title: "Marketplace Access",
    desc: "Explore all available study notes with search, filters, and previews.",
    icon: "https://img.icons8.com/3d-fluency/94/shop.png",
  },
  {
     title: "Buy Notes / Docs",
    desc: "Browse and purchase quality notes directly from sellers in a few clicks.",
    icon: "https://img.icons8.com/3d-fluency/94/shopping-bag.png", 
  },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <h2
        className="text-4xl font-bold text-center text-custom-blue mb-4"
        data-aos="fade-up"
      >
        Features of Edulinker
      </h2>
      <p
        className="text-center text-gray-600 mb-14 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Built for learners and note creators alike. Upload, browse, and manage content — all in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
