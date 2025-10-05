import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

function Home() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const querySnapshot = await getDocs(collection(db, "Products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductData(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg animate-pulse">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive grid */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {productData.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={listing.Image}
                                    alt={listing.Name}
                                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                                />

                                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                                    Featured
                                </span>

                            </div>

                            {/* Product Details */}
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Rs {listing.Price}
                                        </h2>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <i className="bx bx-heart text-2xl"></i>
                                        </button>
                                    </div>

                                    <h3 className="text-base font-medium text-gray-700 mt-1">
                                        {listing.Name}
                                    </h3>

                                    <div className="flex items-center text-gray-500 text-sm mt-3">
                                        <svg
                                            className="w-4 h-4 mr-1 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>{listing.Location}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-400">Latest Post</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                    <button className="flex-1 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        Call
                                    </button>

                                    <button className="flex-1 border border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
