import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 px-8 md:px-32 text-white py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm md:text-md">
        
        {/* DevBlogs Logo */}
        <div>
          <h1 className="text-2xl font-bold">DevBlogs</h1>
          <p className="text-gray-300 text-sm mt-2">Your go-to platform for developers.</p>
        </div>

        {/* Blog Links Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Featured Blogs</h3>
          <Link to="#" className="hover:text-gray-300 transition">Most Viewed</Link>
          <Link to="#" className="hover:text-gray-300 transition">Readers’ Choice</Link>
          <Link to="#" className="hover:text-gray-300 transition">Latest Posts</Link>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
          <Link to="/privacy-policy" className="hover:text-gray-300 transition">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300 transition text-xl"><FaLinkedin /></a>
            <a href="#" className="hover:text-gray-300 transition text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} DevBlogs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
