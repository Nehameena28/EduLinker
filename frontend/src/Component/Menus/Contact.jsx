import React, { useState } from "react";
import './contact.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsSubmitted(true);
  };

  return (
    <section className="contact-section">
      <div className="contact-bg mt-0">
        <h3 className="text-5xl  pt-28 ml-32 head1 text-custom-blue text-left">Get In Touch With Us</h3>
        {/* <h2 className="text-xl text-center pt-10 head2">Contact Us</h2> */}
      </div>

      <div className="form-contact flex flex-col md:flex-row justify-between mx-auto px-4 md:px-16">
        {/* Contact Form */}
        <div className="contact-form md:w-1/2 w-full">
          <p className="text-center md:text-left mt-10 pt-10 md:mt-0 mb-6">
            We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
          </p>

          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Thank you for contacting us!</h2>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mt-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="input1 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>

              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="input2 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>

              <div className="mt-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="6"
                  className="input3 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>

              <div className="flex justify-start mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out mb-10"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Image Section */}
        <div className="contact-img pt-12 md:mt-0 md:w-1/2 w-full">
          <img className="rounded-lg ml-10 " src="public/img/con2.png" alt="about-img" />
        </div>
      </div>

      {/* Contact Info Section */}
      <Footer/>

    </section>

  );
};

export default Contact;
