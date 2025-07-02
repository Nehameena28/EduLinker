// // import React from 'react'
// import './About.css'
// import Footer from './Footer';

// const About = () => {
//   return (
//     <div className='hero' >
//       {/* <div className="heading">
//         <h1>About Us</h1>
//       </div> */}
//       <div className="container" >
//         <div className="hero-content">
//           <b><h2>Welcome to EduLinker</h2></b>
//           <p> EduLinker is an online platform designed to connect sellers and buyers of educational materials.Whether you're a seller looking to share your study notes or a student looking to buy quality resources,EduLinker provides an easy and secure marketplace for both.</p>
//         </div>
//         <div className="hero-img mt-5">
//         <img
//             src="public/img/about.avif"
//             alt="about-img"
//           />
//         </div>
//       </div>
//       <div className="info flex ">
//   <div className=" div1 mt-12 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
//           <div className="bg-white shadow-lg rounded-lg p-8 ml-5">
//             <h2 className="text-2xl font-bold text-custom-blue">Sellers</h2>
//             <p className="mt-4 text-gray-600">
//               Share your study material and earn money. As a seller, you can upload PDFs, create listings, and set your own prices. EduLinker provides a user-friendly interface to manage your content and sales efficiently.
//             </p>
//           </div>
//           <div className="div2 bg-white shadow-lg rounded-lg p-8">
//             <h2 className="text-2xl font-bold text-custom-blue">Buyers</h2>
//             <p className="mt-4 text-gray-600">
//               Find and buy study materials that suit your needs. Browse through a wide selection of high-quality PDFs uploaded by sellers. Once you find the right material, make secure payments and instantly download your purchase.
//             </p>
//           </div>
//           <div className="div3 bg-white shadow-lg rounded-lg p-8 mr-5">
//             <h2 className="text-2xl font-bold text-custom-blue ">Why Choose EduLinker?</h2>
//             <p className="mt-4 text-gray-600">
//               Our platform is designed with simplicity and security in mind. We prioritize your privacy and offer secure payment gateways. EduLinker also offers a rating and review system to ensure high-quality content for buyers and fair practices for sellers.
//             </p>
//           </div>
// </div>
//      </div>

//      <div className="mt-16">
//           <h2 className="text-3xl font-semibold text-custom-blue text-center">
//             Join EduLinker Today!
//           </h2>
//           <p className="mt-4 text-lg  p-5 text-gray-500 text-center">
//             Whether you're a seller or a buyer, EduLinker is the perfect place to share and discover study materials. Start browsing or uploading today and be a part of our growing community!
//           </p>
//         </div>
//         <Footer/>
//      </div>
//   )
// }

// export default About;


import { useEffect } from "react";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-24 px-6 text-center">
        <h1
          className="text-5xl font-extrabold mb-4 text-custom-blue"
          data-aos="fade-up"
        >
          Learn. Share. Grow.
        </h1>
        <p
          className="max-w-3xl mx-auto text-lg text-gray-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Edulinker is your one-stop academic marketplace — empowering learners to share study materials and helping others grow through quality content.
        </p>
      </div>

      {/* Company Purpose Section */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        <div data-aos="fade-right">
          <h2 className="text-3xl font-bold text-custom-brown mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            We believe in the power of shared learning. Edulinker enables students to turn their notes into earnings and gives others access to helpful, student-curated resources that truly make a difference.
          </p>
        </div>

        <div data-aos="fade-left">
          <h2 className="text-3xl font-bold text-custom-i-berry mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            To become the leading platform where creators, educators, and learners collaborate — making education more accessible, affordable, and effective for everyone.
          </p>
        </div>
      </div>

      {/* Core Values or Highlights */}
      <div className="bg-gray-100 py-20 px-6">
        <h2
          className="text-4xl font-bold text-center text-custom-blue mb-16"
          data-aos="fade-up"
        >
          What Makes Edulinker Special?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "For Note Creators",
              desc: "Upload, manage, and monetize your study materials.",
              icon: "https://img.icons8.com/3d-fluency/94/upload.png",
              color: "border-custom-brown",
            },
            {
              title: "For Learners",
              desc: "Browse, search, and instantly access quality notes.",
              icon: "https://img.icons8.com/3d-fluency/94/search--v1.png",
              color: "border-custom-i-berry",
            },
            {
              title: "Secure & Transparent",
              desc: "Safe payments and full transparency on every transaction.",
              icon: "https://img.icons8.com/3d-fluency/94/lock--v1.png",
              color: "border-custom-blue",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white border-l-4 ${item.color} rounded-2xl p-6 shadow hover:shadow-lg transition`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-20 px-6 bg-white" data-aos="zoom-in">
        <h2 className="text-3xl font-bold mb-4 text-custom-blue">
          Ready to join the Edulinker community?
        </h2>
        <p className="text-gray-600 mb-6">
          Whether you're a note creator or knowledge seeker — Edulinker is built for you.
        </p>
        <button className="bg-custom-blue text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition">
          Get Started Now
        </button>
      </div>
      <Footer/>
    </section>
  );
};

export default About;
