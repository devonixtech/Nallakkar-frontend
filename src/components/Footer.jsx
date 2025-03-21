import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaFigma } from "react-icons/fa";
import { PiX } from "react-icons/pi"; // For X (Twitter)

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 sm:py-20 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto w-full gap-8 lg:gap-0">
        {/* Left Section - Logo & Social Icons */}
        <div className="flex flex-col items-start space-y-6 w-full lg:w-1/4">
          {/* Figma Logo */}
          <FaFigma className="text-[#ff7070] text-4xl sm:text-5xl" />
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <PiX className="text-white text-xl sm:text-2xl" />
            <FaInstagram className="text-white text-xl sm:text-2xl" />
            <FaYoutube className="text-white text-xl sm:text-2xl" />
            <FaLinkedin className="text-white text-xl sm:text-2xl" />
          </div>
        </div>

        {/* Center Section - Products & Business */}
        <div className="flex  sm:flex-row justify-between w-full lg:w-1/2 gap-8 sm:gap-0">
          {/* Products Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="font-semibold mb-3 text-white">Products</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Courses</li>
              <li>Digital Products</li>
              <li>Newsletter</li>
              <li>Help</li>
            </ul>
          </div>

          {/* Business Section */}
          <div className="w-full sm:w-1/2">
            <h3 className="font-semibold mb-3 text-white">Business</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Carrier</li>
              <li>Instructors</li>
            </ul>
          </div>
        </div>

        {/* Right Section - Legal */}
        <div className="w-full lg:w-1/2">
          <h3 className="font-semibold mb-3 text-white">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Cookies Policy</li>
            <li>Privacy And Terms</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;