
import { useEffect } from "react";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {+
  
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

    </section>
  );
};

export default About;


// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';

// const About = () => {
//   useEffect(() => {
//     document.title = "About Edulinker - Buy & Sell Study Notes";
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f4f8]">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <div className="bg-custom-blue w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
//                 E
//               </div>
//               <span className="text-2xl font-bold text-custom-blue">Edulinker</span>
//             </div>
//             <div className="hidden md:flex space-x-8">
//               <a href="#" className="text-gray-600 hover:text-custom-blue transition">Home</a>
//               <a href="#" className="text-custom-blue font-medium">About</a>
//               <a href="#" className="text-gray-600 hover:text-custom-blue transition">Browse Notes</a>
//               <a href="#" className="text-gray-600 hover:text-custom-blue transition">Sell Notes</a>
//               <a href="#" className="text-gray-600 hover:text-custom-blue transition">Contact</a>
//             </div>
//             <div>
//               <button className="bg-custom-i-berry hover:bg-custom-brown text-white font-medium py-2 px-6 rounded-lg transition">
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-custom-blue leading-tight">
//                 Connecting Learners Through <span className="text-custom-i-berry">Knowledge Sharing</span>
//               </h1>
//               <p className="mt-6 text-xl text-gray-600 max-w-2xl">
//                 Edulinker is revolutionizing how students and educators share knowledge. 
//                 Our platform makes it simple to buy and sell high-quality study materials.
//               </p>
//               <div className="mt-10 flex flex-wrap gap-4">
//                 <button className="bg-custom-blue hover:bg-[#1a4a66] text-white font-medium py-3 px-8 rounded-lg transition text-lg">
//                   Browse Notes
//                 </button>
//                 <button className="bg-white border-2 border-custom-i-berry text-custom-i-berry hover:bg-custom-i-berry hover:text-white font-medium py-3 px-8 rounded-lg transition text-lg">
//                   Start Selling
//                 </button>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="relative"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="relative z-10">
//                 <div className="bg-custom-i-berry rounded-2xl overflow-hidden shadow-xl">
//                   <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
//                 </div>
//                 <div className="absolute -bottom-8 -right-8 z-0">
//                   <div className="bg-custom-blue rounded-2xl overflow-hidden shadow-xl w-64 h-64">
//                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
        
//         <div className="absolute top-0 right-0 -z-10">
//           <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="250" cy="250" r="250" fill="url(#paint0_linear)" fillOpacity="0.1"/>
//             <defs>
//               <linearGradient id="paint0_linear" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
//                 <stop stopColor="#1F5B78"/>
//                 <stop offset="1" stopColor="#1F5B78" stopOpacity="0"/>
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="py-20 bg-custom-blue text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               Our Mission
//             </motion.h2>
//             <motion.p 
//               className="text-xl opacity-90 mb-12"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Empowering students to succeed through collaborative learning
//             </motion.p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//             {[
//               {
//                 icon: (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 ),
//                 title: "Quality Study Materials",
//                 description: "Access thousands of high-quality notes, summaries, and study guides created by top students and educators."
//               },
//               {
//                 icon: (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 ),
//                 title: "Monetize Your Knowledge",
//                 description: "Turn your academic efforts into earnings by selling your study materials to students worldwide."
//               },
//               {
//                 icon: (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
//                   </svg>
//                 ),
//                 title: "Academic Community",
//                 description: "Join a vibrant community of learners sharing knowledge and supporting each other's educational journey."
//               }
//             ].map((item, index) => (
//               <motion.div 
//                 key={index}
//                 className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <div className="text-custom-i-berry mb-4">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">{item.title}</h3>
//                 <p className="opacity-80">{item.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How It Works */}
//       <div className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold text-custom-blue mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               How Edulinker Works
//             </motion.h2>
//             <motion.p 
//               className="text-xl text-gray-600"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Simple steps to buy quality notes or start earning from your knowledge
//             </motion.p>
//           </div>
          
//           <div className="relative">
//             <div className="hidden lg:block absolute top-1/4 left-1/2 transform -translate-x-1/2 h-1/2 w-1 bg-custom-i-berry z-0"></div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               {[
//                 {
//                   title: "For Students",
//                   steps: [
//                     {
//                       num: "1",
//                       title: "Browse & Search",
//                       description: "Find study materials for your courses from thousands of options"
//                     },
//                     {
//                       num: "2",
//                       title: "Preview & Select",
//                       description: "Preview notes before purchasing to ensure quality"
//                     },
//                     {
//                       num: "3",
//                       title: "Instant Access",
//                       description: "Download immediately after payment and start learning"
//                     }
//                   ]
//                 },
//                 {
//                   title: "For Sellers",
//                   steps: [
//                     {
//                       num: "1",
//                       title: "Create Content",
//                       description: "Upload your notes, summaries, or study guides"
//                     },
//                     {
//                       num: "2",
//                       title: "Set Your Price",
//                       description: "You decide how much your knowledge is worth"
//                     },
//                     {
//                       num: "3",
//                       title: "Earn Money",
//                       description: "Get paid whenever someone purchases your materials"
//                     }
//                   ]
//                 }
//               ].map((section, sectionIndex) => (
//                 <motion.div 
//                   key={sectionIndex}
//                   className="bg-white rounded-2xl shadow-xl p-8 relative z-10"
//                   initial={{ opacity: 0, x: sectionIndex === 0 ? -30 : 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
//                 >
//                   <h3 className="text-2xl font-bold text-custom-blue mb-8 pb-4 border-b-2 border-custom-i-berry inline-block">
//                     {section.title}
//                   </h3>
                  
//                   <div className="space-y-8">
//                     {section.steps.map((step, stepIndex) => (
//                       <motion.div 
//                         key={stepIndex}
//                         className="flex items-start"
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5, delay: stepIndex * 0.2 + sectionIndex * 0.3 }}
//                       >
//                         <div className="bg-custom-i-berry text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
//                           {step.num}
//                         </div>
//                         <div>
//                           <h4 className="text-lg font-bold text-custom-blue mb-1">{step.title}</h4>
//                           <p className="text-gray-600">{step.description}</p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold text-custom-blue mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               What Our Community Says
//             </motion.h2>
//             <motion.p 
//               className="text-xl text-gray-600"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Join thousands of students and educators who are transforming education
//             </motion.p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Medical Student",
//                 quote: "Edulinker saved me during exam season! The anatomy notes I purchased were incredibly detailed and helped me score in the top 10% of my class.",
//                 avatar: "SJ"
//               },
//               {
//                 name: "David Chen",
//                 role: "Computer Science Major",
//                 quote: "I've earned over $2,000 selling my programming notes on Edulinker. It's amazing to get paid for helping other students succeed.",
//                 avatar: "DC"
//               },
//               {
//                 name: "Professor Williams",
//                 role: "Economics Lecturer",
//                 quote: "I encourage my students to use Edulinker. The platform fosters a culture of knowledge sharing that enhances classroom learning.",
//                 avatar: "PW"
//               }
//             ].map((testimonial, index) => (
//               <motion.div 
//                 key={index}
//                 className="bg-white p-8 rounded-2xl shadow-md"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <div className="flex items-center mb-6">
//                   <div className="bg-custom-blue text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-4">
//                     {testimonial.avatar}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-lg">{testimonial.name}</h4>
//                     <p className="text-custom-i-berry">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"{testimonial.quote}"</p>
//                 <div className="flex text-amber-400 mt-4">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                     </svg>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 bg-gradient-to-r from-custom-blue to-custom-brown">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold text-white mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               Join the Edulinker Community Today
//             </motion.h2>
//             <motion.p 
//               className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Whether you're looking for quality study materials or want to monetize your knowledge, Edulinker is your platform.
//             </motion.p>
//             <motion.div 
//               className="flex flex-wrap justify-center gap-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//             >
//               <button className="bg-white text-custom-blue hover:bg-gray-100 font-bold py-4 px-10 rounded-lg transition text-lg">
//                 Create Account
//               </button>
//               <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg transition text-lg">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default About;
