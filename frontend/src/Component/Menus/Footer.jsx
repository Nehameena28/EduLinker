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
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left py-8">
          {/* 1st section */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-3">Edulinker</h2>
            <p className="text-gray-400">
              Connecting buyers and sellers of educational materials. Empowering
              learners with knowledge.
            </p>
          </div>

          {/* 2nd section */}
          <div>
            <h3 className="text-xl font-semibold mt-5 mb-3">Quick Links</h3>
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

          {/* 3rd section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 mt-5">Follow Us</h3>
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

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 border-t border-gray-700 mt-8 pt-8 text-center md:text-left px-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMobileScreenButton} className="text-custom-i-berry" />
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                +91 7867564564
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-custom-i-berry" />
            <p>
              Email:{" "}
              <a href="mailto:study@edulinker.com" className="text-blue-600 hover:underline">
                contact@edulinker.com
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-custom-i-berry" />
            <p>
              Address:{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Hrd, MP
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
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
