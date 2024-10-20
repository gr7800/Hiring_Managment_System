import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.facebook.com/guddu.tiwari.90813236",
      icon: <FaFacebookF />,
      color: "text-blue-600 hover:text-blue-800",
    },
    {
      href: "https://www.instagram.com/tiwariji78001/",
      icon: <FaInstagram />,
      color: "text-pink-500 hover:text-pink-700",
    },
    {
      href: "https://github.com/gr7800",
      icon: <FaGithub />,
      color: "text-gray-700 hover:text-gray-900",
    },
    {
      href: "https://www.linkedin.com/in/guddu-tiwari-57b841230",
      icon: <FaLinkedin />,
      color: "text-blue-500 hover:text-blue-700",
    },
  ];

  return (
    <footer className="w-full bg-gray-100 text-[#1f84b9] py-8 font-medium shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-center items-center">
        <div className="flex flex-col justify-center gap-4 w-full lg:w-3/5 md:w-4/5 sm:w-11/12">
          <ul className="flex justify-center space-x-8 w-full">
            {[
              { path: "/terms", label: "Terms Of Use" },
              { path: "/privacy", label: "Privacy Policy" },
              { path: "/contact-us", label: "Contact" },
              { path: "/blog", label: "Blog" },
              { path: "/faq", label: "FAQ" },
            ].map((item, index) => (
              <li key={index} className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="text-sm text-center text-gray-500 w-full">
            © {currentYear} Your Company. All rights reserved. Empowering recruitment and talent management.
          </div>

          <div className="flex space-x-6 justify-center items-center">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} transition-colors duration-300`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
