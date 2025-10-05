import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const userEmail = useRef();
    const userPassword = useRef();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = userEmail.current.value;
        const password = userPassword.current.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.fire({
                    title: "Login successful!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    title: error.message,
                    text: "You clicked the button!",
                    icon: "error"
                });
                alert(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            ref={userEmail}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            ref={userPassword}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
