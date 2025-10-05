import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Navbar = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check auth state once
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          text: "You’ve been signed out of your account.",
          icon: "success",
          confirmButtonColor: "#2563eb", // Tailwind blue-600
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

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
              <Link to="/">MyStore</Link>
            </span>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex space-x-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 border border-gray-700 text-gray-800 rounded-md hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-700 text-gray-800 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Render page content below navbar */}
      {children}
    </>
  );
};

export default Navbar;
