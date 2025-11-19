"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

const ProductDetails = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <section className="product-details relative px-2 lg:px-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[17px] md:text-[20px] font-semibold text-[#222]">
                    Product Details
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-[12px] md:text-[14px] text-[#222] font-semibold flex items-center gap-1 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            width="1.4rem"
                            height="1.4rem"
                            fill="#000000"
                        >
                            <path d="M175.3 228.4c-93.8 95.9-93.8 251 0 347l250.2 255.9c47.7 48.7 125.3 48.7 173 0l250.2-255.9c93.8-96 93.8-251.1 0-347l-8.7-8.5c-91.7-85-232.3-85-324.1 0l-4 3.7 5 4.9c-94.3-96.4-247.4-96.4-341.6-0.1z m622.1 50.1c66.6 68.1 66.6 178.7 0 246.8l-250.2 255.9c-19.5 20-50.9 20-70.4 0l-250.2-255.9c-66.6-68.1-66.6-178.7 0-246.8 66.1-67.6 173-67.6 239.1 0l20.6 21.2c14 14.4 37.2 14.4 51.3 0.1l20.8-21.2c66.1-67.6 173-67.6 239-0.1z"></path>
                        </svg>{" "}
                        Save
                    </p>
                    <p className="w-px h-3 bg-black"></p>
                    <p className="text-[12px] md:text-[14px] cursor-pointer hover:underline font-bold text-[#222] flex items-center gap-1">
                        Report this item <FaChevronRight />
                    </p>
                </div>
            </div>

            {/* Product Content */}
            <div
                className={`overflow-hidden transition-all duration-500 relative ${
                    showMore ? "max-h-[3000px]" : "max-h-[350px]"
                }`}
            >
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Men's Winter Casual PU Leather Jacket
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Stay warm and stylish this winter with our premium PU leather jacket.
                        Designed for comfort and durability, it features a soft inner lining,
                        zippered sleeves, multiple pockets, and a classic stand collar.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Material: High-quality PU Leather</li>
                        <li>Available Colors: Black, Brown, and Navy Blue</li>
                        <li>Comfortable inner lining for extra warmth</li>
                        <li>Multiple utility pockets with durable zippers</li>
                        <li>Perfect for casual and semi-formal occasions</li>
                    </ul>
                    <p className="mt-5 text-gray-700">
                        This jacket is crafted to deliver both function and fashion. Whether
                        you’re heading out for a ride or just keeping warm, it’s the perfect
                        companion for cold weather.
                    </p>

                    <div className="flex flex-col gap-4 mt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Image
                                key={i}
                                src="/deals-product4.avif"
                                alt={`Jacket image ${i}`}
                                width={500}
                                height={600}
                                className="rounded-lg w-full shadow-md object-cover"
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Image
                                key={i}
                                src="/deals-product4.avif"
                                alt={`Jacket view ${i}`}
                                width={300}
                                height={300}
                                className="rounded-lg shadow-sm object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Gradient shadow (visible only when collapsed) */}
                {!showMore && (
                    <div className="absolute bottom-0 left-0 w-full h-[160px] bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
                )}
            </div>

            {/* See More / See Less Button */}
            <div className="text-center flex justify-center items-center relative z-20">
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-[#222] flex items-center gap-1 font-semibold text-sm px-4 py-2 rounded transition"
                >
                    {showMore ? "See Less" : "See More"} <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="UwGeB8k4" aria-hidden="true"><path d="M846.6 329.7c19.9-17.2 49.9-15 67.1 4.9 15.4 17.9 15.2 44 0.5 61.6l-5.4 5.5-365.3 315.5c-15.9 13.7-38.5 15.2-55.8 4.6l-6.3-4.6-366.1-315.5c-19.9-17.1-22.1-47.2-5-67 15.4-17.9 41.3-21.5 60.8-9.6l6.2 4.6 335.1 288.7 334.2-288.7z"></path></svg>
                </button>
            </div>
        </section>
    );
};

export default ProductDetails;
