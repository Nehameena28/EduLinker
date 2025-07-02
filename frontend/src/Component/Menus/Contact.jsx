// import React, { useState } from "react";
// import './contact.css'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMobileScreenButton, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import Footer from "./Footer";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     setIsSubmitted(true);
//   };

//   return (
//     <section className="contact-section">
//       <div className="contact-bg mt-0">
//         <h3 className="text-5xl  pt-28 ml-32 head1 text-custom-blue text-left">Get In Touch With Us</h3>
//         {/* <h2 className="text-xl text-center pt-10 head2">Contact Us</h2> */}
//       </div>

//       <div className="form-contact flex flex-col md:flex-row justify-between mx-auto px-4 md:px-16">
//         {/* Contact Form */}
//         <div className="contact-form md:w-1/2 w-full">
//           <p className="text-center md:text-left mt-10 pt-10 md:mt-0 mb-6">
//             We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
//           </p>

//           {isSubmitted ? (
//             <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold">Thank you for contacting us!</h2>
//               <p>Your message has been sent successfully. We'll get back to you soon.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   required
//                   className="input1 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>

//               <div className="mt-4">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   required
//                   className="input2 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>

//               <div className="mt-4">
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   required
//                   rows="6"
//                   className="input3 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>

//               <div className="flex justify-start mt-6">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out mb-10"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Image Section */}
//         <div className="contact-img pt-12 md:mt-0 md:w-1/2 w-full">
//           <img className="rounded-lg ml-10 " src="public/img/con2.png" alt="about-img" />
//         </div>
//       </div>

//       {/* Contact Info Section */}
//       <Footer/>

//     </section>

//   );
// };

// export default Contact;


import { useEffect } from "react";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>

   
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        data-aos="zoom-in"
      >
        {/* Left Image or Illustration */}
        <div className="bg-custom-blue text-white flex flex-col justify-center items-center p-10">
          <img
            src="https://img.icons8.com/3d-fluency/240/mail.png"
            alt="Contact Illustration"
            className="w-44 h-44 mb-6"
          />
          <h2 className="text-3xl font-bold mb-2 text-center">Let’s Talk</h2>
          <p className="text-center text-sm text-white/90">
            Reach out to us for any questions, feedback, or collaborations.
          </p>
        </div>

        {/* Right Form */}
        <div className="p-10 bg-white">
          <h3 className="text-2xl font-semibold text-custom-brown mb-6">
            Contact Us
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-custom-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-custom-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-custom-blue outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-3 rounded-xl hover:bg-opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
     
      </div>
    </section>
    <Footer/>
     </>
  );
};

export default Contact;
