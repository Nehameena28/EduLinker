import React, { useState } from "react";
import './contact.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
        <h3 className="text-4xl ml-80 pt-20 head1 text-custom-blue">Get In Touch With Us</h3>
        <h2 className="text-xl ml-96 pt-10 head2">Contact Us</h2>        
      </div>

        <div className="form-contact flex">
        <div className="contact-form m-11">
      <p className="text">
          We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
        </p>
      {isSubmitted ? (
          <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Thank you for contacting us!</h2>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mt-10 ml-24">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="input1 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className=" ml-24">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="input2 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className=" ml-24">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="6"
                className="input3 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-start  ml-24">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>

      <div>
        <img className="contact-img mt-32"
            src="public/img/con2.png"
            alt="about-img"
          />
        </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 ml-10 mb-5">
          Or Reach Us Through:
        </h2>
      <div className="contact-body">
      
      <div className="icon-1">
         <FontAwesomeIcon icon={faMobileScreenButton} className="i1 fa-lg ml-10 text-custom-i-berry"/>
        <pre><p className="pl-5">Phone   : <a href="tel:+1234567890" className=" text-blue-600 hover:underline"> +111 222 3333</a></p></pre>

      </div>
      <div className="icon-2">
          <FontAwesomeIcon icon={faEnvelope} className=" i2 fa-lg ml-3 text-custom-i-berry"/>
          <pre><p className="pl-4">Email   : <a href="mailto:study@edulinker.com" className=" text-blue-600 hover:underline"> contact@edulinker.com</a></p></pre>
      </div>
      <div className="icon-3">
      <FontAwesomeIcon icon={faLocationDot} className="i3 fa-lg ml-3 text-custom-i-berry"/>
      <pre><p className="pl-5">Address  : <a href="#" className=" text-blue-600 hover:underline"> Hrd, mp</a></p></pre>
      </div>
          

        </div>
    </section>
  );
};

export default Contact;
