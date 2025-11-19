"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const BuyNowModel = ({ isOpen, onClose, product }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isAreaOpen, setIsAreaOpen] = useState(false);

    const cities = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"];
    const areas = {
        Dubai: ["Jumeirah", "Deira", "Bur Dubai", "Business Bay"],
        "Abu Dhabi": ["Al Reem Island", "Khalifa City", "Corniche"],
        Sharjah: ["Al Majaz", "Al Nahda", "Al Qasimia"],
        Ajman: ["Al Nuaimiya", "Ajman Corniche", "Al Rashidiya"],
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const toggleCityDropdown = () => {
        setIsCityOpen(!isCityOpen);
        setIsAreaOpen(false);
    };

    const toggleAreaDropdown = () => {
        if (!selectedCity) return;
        setIsAreaOpen(!isAreaOpen);
        setIsCityOpen(false);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedArea("");
        setIsCityOpen(false);
    };

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setIsAreaOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-[999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal wrapper (scrollable container) */}
                    <motion.div
                        className="fixed inset-0 z-[99999999999999999] flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Actual modal box */}
                        <motion.div
                            className="relative bg-white rounded-2xl shadow-lg w-full max-w-md pt-4 pb-6 px-6 my-3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 bg-white z-10">
                                <h3 className="text-lg font-semibold text-gray-800">Order Now</h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 rounded-full transition"
                                >
                                    <CgClose className="text-xl" />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="flex gap-3 items-start py-4 border-b border-gray-200">
                                <Image
                                    src={product?.image || "/deals-product3.avif"}
                                    width={80}
                                    height={80}
                                    alt={product?.title || "Product"}
                                    className="rounded-md"
                                />
                                <div className="flex-1">
                                    <p className="text-[14px] text-gray-700 font-semibold line-clamp-2">
                                        {product?.title ||
                                            "New Fashion Men's Four Seasons Comfy Casual Running Shoes"}
                                    </p>
                                    <div className="flex gap-1 items-center pt-1">
                                        <p className="line-through text-gray-500 text-[13px] font-semibold">
                                            {product?.oldPrice || "44,127"}
                                        </p>
                                        <p className="text-gray-900 text-[14px] font-semibold">
                                            Rs.{" "}
                                            <span className="text-lg">
                                                {product?.price || "12,252"}
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-[#fb7701] border border-[#fb7701] rounded-sm px-2 font-semibold w-fit text-[13px]">
                                        72% OFF limited time
                                    </p>
                                </div>
                            </div>

                            {/* Form Section */}
                            <form className="pt-4 space-y-3">
                                <div>
                                    {/* <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label> */}
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    {/* <label className="block text-sm font-medium text-gray-700">
                                        Enter Email
                                    </label> */}
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                        required
                                    />
                                </div>

                                <div className="flex gap-1">
                                    <p className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-fit">
                                        +92
                                    </p>
                                    <input
                                        type="tel"
                                        placeholder="3XXXXXXXXX"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                        required
                                    />
                                </div>

                                {/* City Dropdown */}
                                <div className="relative">
                                    {/* <label className="block text-sm font-medium text-gray-700">
                                        Select City
                                    </label> */}
                                    <button
                                        type="button"
                                        onClick={toggleCityDropdown}
                                        className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 focus:ring-2 focus:ring-[#fb5d01] focus:border-[#fb5d01]"
                                    >
                                        {selectedCity || "Choose a city"}
                                        <IoIosArrowDown
                                            className={`transition-transform duration-300 ${isCityOpen ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isCityOpen && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-10 max-h-40 overflow-y-auto"
                                            >
                                                {cities.map((city) => (
                                                    <li
                                                        key={city}
                                                        onClick={() => handleCitySelect(city)}
                                                        className="px-3 py-2 text-sm hover:bg-[#fb5d01]/10 cursor-pointer"
                                                    >
                                                        {city}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Area Dropdown */}
                                <div className="relative">
                                    {/* <label className="block text-sm font-medium text-gray-700">
                                        Select Area
                                    </label> */}
                                    <button
                                        type="button"
                                        disabled={!selectedCity}
                                        onClick={toggleAreaDropdown}
                                        className={`w-full flex justify-between items-center border rounded-md px-3 py-2 mt-1 text-sm transition ${selectedCity
                                                ? "border-gray-300 text-gray-700"
                                                : "border-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        {selectedArea ||
                                            (selectedCity
                                                ? "Choose an area"
                                                : "Select a city first")}
                                        <IoIosArrowDown
                                            className={`transition-transform duration-300 ${isAreaOpen ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isAreaOpen && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-10 max-h-40 overflow-y-auto"
                                            >
                                                {areas[selectedCity]?.map((area) => (
                                                    <li
                                                        key={area}
                                                        onClick={() => handleAreaSelect(area)}
                                                        className="px-3 py-2 text-sm hover:bg-[#fb5d01]/10 cursor-pointer"
                                                    >
                                                        {area}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div>
                                    {/* <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label> */}
                                    <textarea
                                        placeholder="Enter your delivery address"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                        rows={3}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#fb5d01] hover:bg-[#fb7701] text-white font-semibold py-3 rounded-full text-md transition-all duration-300 ease-in-out"
                                >
                                    Place Order Now
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BuyNowModel;
