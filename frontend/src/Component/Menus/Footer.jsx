
import React from "react";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Edulinker</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bridging the gap between learners and resources. Buy, sell, and explore the best study materials.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-custom-i-berry mt-1" />
              <a href="mailto:contact@edulinker.com" className="hover:text-white transition">
                contact@edulinker.com
              </a>
            </li>
            {/* <li className="flex items-start gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-custom-i-berry mt-1" />
              <a href="tel:+910000000000" className="hover:text-white transition">
                +91 00000 00000
              </a>
            </li> */}
            <li className="flex items-start gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-custom-i-berry mt-1" />
              <span>Harda, Madhya Pradesh, India</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white text-gray-400 transition"><i className="ri-facebook-fill"></i></a>
            <a href="#" className="hover:text-white text-gray-400 transition"><i className="ri-instagram-line"></i></a>
            <a href="#" className="hover:text-white text-gray-400 transition"><i className="ri-twitter-x-line"></i></a>
            <a href="#" className="hover:text-white text-gray-400 transition"><i className="ri-linkedin-fill"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Edulinker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
