import React from 'react'

function CardHome() {
    const listings = [
        {
            id: 1,
            price: "Rs 58,000",
            title: "Samsung A25 5G PTA Official 8/256",
            location: "Kala Board, Karachi",
            time: "6 days ago",
            featured: true,
            image: "https://images.olx.com.pk/thumbnails/443604402-800x600.webp"
        },
        {
            id: 2,
            price: "Rs 1.35 Lac",
            title: "Samsung Mobile S22 Ultra",
            location: "Location not specified",
            time: "Time not specified",
            featured: true,
            image: "https://images.olx.com.pk/thumbnails/443604401-800x600.webp"
        }
    ];


    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {listings.map((listing) => (
                    <div
                        key={listing.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 flex flex-col md:flex-row"
                    >
                        {/* Image Section */}
                        <div className="relative md:w-1/3">
                            <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-full h-48 md:h-full object-cover"
                            />
                            {listing.featured && (
                                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded">
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                {/* Price and Favorite */}
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-gray-800">{listing.price}</h2>
                                    <button className="text-gray-500 hover:text-red-500">
                                        
                                    </button>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-medium text-gray-700 mt-1">
                                    {listing.title}
                                </h3>

                                {/* Location and Time */}
                                <div className="flex items-center text-gray-500 text-sm mt-2">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{listing.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{listing.time}</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-3 mt-4">
                                <button className="flex-1 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call
                                </button>

                                <button className="flex-1 border border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardHome
