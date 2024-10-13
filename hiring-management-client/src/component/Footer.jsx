import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-8 font-medium shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-center items-center">
        <div className="flex flex-col justify-center gap-4 w-full lg:w-[60%] md:w-[70%] sm:w-[90%]">
          <ul className="flex justify-center space-x-8 w-full">
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              <Link to="/terms">Terms Of Use</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              <Link to="/contact-us">Contact</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
          <div className="text-sm text-center text-gray-500 w-full">
            © {new Date().getFullYear()} Your Company. All rights reserved. Empowering recruitment and talent management.
          </div>
          <div className="flex space-x-6 justify-center items-center">
            <a
              href="https://www.facebook.com/cimet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/cimet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/cimet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/company/cimet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
