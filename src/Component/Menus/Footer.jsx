import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer id='RemoveScrlbr' className="bg-gray-900 text-white  ">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* 1st section */}
          <div className="ml-10 mt-5">
            <h2 className="text-2xl font-bold mb-3 pt-5">Edulinker</h2>
            <p className="text-gray-400">
              Connecting buyers and sellers of educational materials. Empowering
              learners with knowledge.
            </p>
          </div>

          {/* second Section */}
          <div className="ml-20">
            <h3 className="text-xl font-semibold mt-20 mb-3 ml-20 ">Quick Links</h3>
            <ul>
              <li>
                <a href="/about" className="text-gray-400 ml-20 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400  ml-20 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 ml-20 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 ml-20 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* third Section */}
          <div className="ml-20 mb-0">
            <h3 className="text-xl font-semibold mb-3 mt-5">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-2xl hover:text-white"
              >
                <i class="ri-facebook-circle-fill"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-2xl  hover:text-white"
              >
                <i class="ri-twitter-line"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400  text-2xl  hover:text-white"
              >
               <i class="ri-instagram-line"></i>
              </a>
            </div>
          </div>
        </div>

       

        {/* icons */}
        <div className="contact-body flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12 text-center md:text-left  border-t border-gray-700 mt-8 pt-12">
        <div className="icon-1">
          <FontAwesomeIcon icon={faMobileScreenButton} className="i1 fa-lg text-custom-i-berry" />
          <p className="pl-3">Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+111 222 3333</a></p>
        </div>
        <div className="icon-2">
          <FontAwesomeIcon icon={faEnvelope} className="i2 fa-lg text-custom-i-berry" />
          <p className="pl-3">Email: <a href="mailto:study@edulinker.com" className="text-blue-600 hover:underline">contact@edulinker.com</a></p>
        </div>
        <div className="icon-3">
          <FontAwesomeIcon icon={faLocationDot} className="i3 fa-lg text-custom-i-berry" />
          <p className="pl-3">Address: <a href="#" className="text-blue-600 hover:underline">Hrd, mp</a></p>
        </div>
      </div>

      {/* ending div */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Edulinker. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
