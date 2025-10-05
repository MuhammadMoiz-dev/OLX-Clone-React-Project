import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-800">
              <Link to={'/'}>
                MyStore
              </Link>
            </span>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-700 text-gray-800 rounded-md hover:bg-gray-100 transition">
              <Link to={'/login'}>
                Login
              </Link>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <Link to={'/signup'}>
                Signup
              </Link>
            </button>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
