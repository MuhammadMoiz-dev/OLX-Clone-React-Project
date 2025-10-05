import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const DashboardCards = () => {

    const [productData, setProductData] = useState([]); // ✅ use state
    const [loading, setLoading] = useState(true);
    let [uid, setuid] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setuid(currentUser.uid)
            }


        });
        return () => unsubscribe();
    }, [uid]);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const querySnapshot = await getDocs(collection(db, "Products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductData(productList); // ✅ triggers re-render
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []); // ✅ fetch only once on mount
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg animate-pulse">
                    Loading products...
                </p>
            </div>
        );
    }
    let filterdata = productData.filter((data) => {
        return data.Userid == uid
    })

    return (
        <div className="max-w-7xl mx-auto p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filterdata.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 text-lg">
                    No products found.
                </p>
            ) : (
                filterdata.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition transform hover:-translate-y-1"
                    >
                        {/* Product Image */}
                        <div className="relative">

                            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                                Featured
                            </span>

                            <img
                                src={
                                    item.Image
                                }
                                alt={item.Title || "Product"}
                                className="w-full h-52 object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-3">
                            <h3 className="text-lg font-bold text-gray-900">
                                Rs {item.Price || "N/A"}
                            </h3>
                            <p className="text-sm text-gray-800 line-clamp-2">
                                {item.Name || "No title"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.Location || "Unknown location"}
                            </p>

                            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                                <span>{item.Time || "Recently added"}</span>
                                <button className="text-gray-600 hover:text-red-500">
                                    <i className="bx bx-heart text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DashboardCards;
