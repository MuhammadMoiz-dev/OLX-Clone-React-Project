import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import DashboardCards from "./DashboardCards";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

function Dashboard() {
  let Pname = useRef()
  let Pprice = useRef()
  let Pimage = useRef()
  let Pdetails = useRef()
  let Plocation = useRef()
  let [Userid, SetUserid] = useState(null)
  const [showForm, setShowForm] = useState(false);


  const navigate = useNavigate();

  // ✅ Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        SetUserid(currentUser.uid)
      }

    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Handle Input Change


  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Products"), {
        Userid,
        Name: Pname.current.value,
        Price: Pprice.current.value,
        Details: Pdetails.current.value,
        Image: Pimage.current.value,
        Location: Plocation.current.value,
      });
      Swal.fire({
        title: "Product Add Successfully",
        text: "You clicked the button!",
        icon: "success"
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setShowForm(false);

  };

  return (
    <>
      <div className="flex justify-end p-5 items-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-transform transform hover:scale-105"
        >
          {showForm ? "Close Form" : "Add New Product"}
        </button>
      </div>
      <hr />

      {/* ✅ AnimatePresence will handle enter/exit animations */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              duration: 0.5,
            }}
            className="flex justify-center mt-10"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-4 border border-gray-200 transform perspective-1000"
            >
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Add New Product
              </h2>

              <input
                type="text"
                name="title"
                ref={Pname}
                placeholder="Product Title"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="number"
                name="price"
                ref={Pprice}
                placeholder="Price (Rs)"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                ref={Plocation}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                ref={Pimage}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <textarea
                name="description"
                placeholder="Product Description"
                rows="3"
                ref={Pdetails}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Submit Product
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Cards below when form hidden */}
      {!showForm && <DashboardCards />}
    </>
  );
}

export default Dashboard;
