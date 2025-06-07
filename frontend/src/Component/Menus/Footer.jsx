// 

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreenButton,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Top section with 3 columns */}
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Edulinker</h2>
            <p className="text-gray-400">
              Connecting buyers and sellers of educational materials.
              Empowering learners with knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-twitter-line"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faMobileScreenButton} className="text-custom-i-berry" />
              <p>
                Phone:{" "}
                <a href="tel:+917867564564" className="text-blue-600 ">
                  +91 7867564564
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faEnvelope} className="text-custom-i-berry" />
              <p>
                Email:{" "}
                <a href="mailto:contact@edulinker.com" className="text-blue-600">
                  contact@edulinker.com
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faLocationDot} className="text-custom-i-berry" />
              <p>
                Address:{" "}
                <a href="#" className="text-blue-600 ">
                  Hrd, MP
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-700 mt-6 py-4 text-center  text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Edulinker. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
