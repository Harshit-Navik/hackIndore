import { useState, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/new.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const goToDashboard = () => {
    if (userRole === "doctor") {
      navigate("/doctor-dashboard");
    } else if (userRole === "patient") {
      navigate("/patient-dashboard");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between py-3 sm:py-4">
        {/* ✅ Logo */}
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="WeCare Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </a>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <ul className="flex space-x-4 lg:space-x-6 font-medium text-gray-700">
            <li>
              <a href="#upload" className="hover:text-blue-600 transition">
                Upload Report
              </a>
            </li>
            <li>
              <a href="#chatbot" className="hover:text-blue-600 transition">
                Chatbot
              </a>
            </li>
            <li>
              <a href="#map" className="hover:text-blue-600 transition">
                Map
              </a>
            </li>
            <li>
              <a href="#medicines" className="hover:text-blue-600 transition">
                Medicines
              </a>
            </li>
          </ul>

          <select className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="pn">Punjabi</option>
          </select>

          {/* ✅ Profile Button (only when logged in) */}
          {isLoggedIn && (
            <button
              onClick={goToDashboard}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline">Profile</span>
            </button>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn && (
            <FaUserCircle
              onClick={goToDashboard}
              className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer"
            />
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col text-center space-y-3 py-4 font-medium text-gray-700">
            <li>
              <a
                href="#upload"
                className="hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Upload Report
              </a>
            </li>
            <li>
              <a
                href="#chatbot"
                className="hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Chatbot
              </a>
            </li>
            <li>
              <a
                href="#map"
                className="hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Map
              </a>
            </li>
            <li>
              <a
                href="#medicines"
                className="hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Medicines
              </a>
            </li>

            {/* ✅ Profile Option (Mobile) */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    goToDashboard();
                  }}
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <FaUserCircle className="text-xl" />
                  Profile
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
  