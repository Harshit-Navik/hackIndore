import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/new.jpg"; // your actual logo image

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          {/* Removed rounded-full and size constraints */}
          <img 
            src={logo} 
            alt="WeCare Logo" 
            className="h-12 w-auto object-contain" 
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 font-medium text-gray-700">
            <li><a href="#upload" className="hover:text-blue-600">Upload Report</a></li>
            <li><a href="#chatbot" className="hover:text-blue-600">Chatbot</a></li>
            <li><a href="#map" className="hover:text-blue-600">Map</a></li>
            <li><a href="#medicines" className="hover:text-blue-600">Medicines</a></li>
          </ul>

          <select className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="pn">Punjabi</option>
          </select>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col text-center space-y-2 py-3 font-medium text-gray-700">
            <li><a href="#upload" className="hover:text-blue-600">Upload Report</a></li>
            <li><a href="#chatbot" className="hover:text-blue-600">Chatbot</a></li>
            <li><a href="#map" className="hover:text-blue-600">Map</a></li>
            <li><a href="#medicines" className="hover:text-blue-600">Medicines</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
