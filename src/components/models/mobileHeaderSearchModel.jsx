"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa6";
import { MdDeleteForever, MdDeleteSweep } from "react-icons/md";
import Image from "next/image";
import DLogo from "../../../public/df-logo.png";
import { RxCross2 } from "react-icons/rx";

const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const MobileHeaderSearchModel = ({ isOpen, onClose }) => {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [recentItems, setRecentItems] = useState([
        "shoes",
        "rings for girls",
        "bags",
        "heels",
        "jackets",
    ]);

    const [popularItems, setPopularItems] = useState([
        "jewelry for women",
        "jewellery for girls",
        "phone things",
        "hand bags",
        "jackets",
        "makeup",
    ]);

    const handleToggleDeleteMode = () => {
        setIsDeleteMode((prev) => !prev);
    };

    const handleDeleteItem = (item) => {
        setRecentItems((prev) => prev.filter((i) => i !== item));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999999999999999] flex items-center justify-center bg-black/70"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white relative w-full h-full overflow-y-auto p-3"
                    >


                        {/* Modal Content */}
                        <div className="flex items-center gap-4">
                            <button className="" onClick={onClose}>
                                <FaChevronLeft className="text-2xl" />
                            </button>
                            <div className="grow flex justify-center min-w-[200px]">
                                <div className="bg-white border-2 border-black rounded-full flex items-center justify-between pl-4 pr-px w-full max-w-[500px] h-[43px]">
                                    <input
                                        className="h-full w-full text-[16px] rounded-full outline-0 font-[500]"
                                        type="search"
                                        placeholder="Search Dressfair"
                                    />
                                    <button className="bg-[#222] rounded-full py-[6px] px-3 cursor-pointer">
                                        <FiSearch className="text-white text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Recent Searches */}
                        <div className="pt-4 recent-search">
                            <div className="flex justify-between items-center">
                                <p className="text-black font-semibold text-md">Recently searched</p>
                                {isDeleteMode ? (
                                    <button
                                        onClick={handleToggleDeleteMode}
                                        className="text-gray-400 font-medium"
                                    >
                                        Done
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleToggleDeleteMode}
                                        className="text-gray-500"
                                    >
                                        <MdDeleteSweep className="text-xl" />
                                    </button>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="recent-data flex items-center flex-wrap gap-2 pt-3">
                                {recentItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 bg-[#f9f9f9] rounded-full py-1 pl-2 pr-2 w-fit relative"
                                    >
                                        <Image
                                            className="w-5 h-5"
                                            src={DLogo}
                                            alt="dressfair"
                                        />
                                        <p className="text-[15px] font-medium">{item}</p>
                                        {isDeleteMode && (
                                            <button
                                                onClick={() => handleDeleteItem(item)}
                                                className="ml-1 text-gray-500 hover:text-red-500"
                                            >
                                                <RxCross2 className="text-sm" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 popular-right-now">
                            <p className="text-black font-semibold text-md">
                                Popular right now
                            </p>
                            {/* popularnright now Tags */}
                            <div className="popular-right-now flex items-center flex-wrap gap-2 pt-3">
                                {popularItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 bg-[#f9f9f9] rounded-full py-1 pl-2 pr-2 w-fit relative"
                                    >
                                        <Image
                                            className="w-5 h-5"
                                            src={DLogo}
                                            alt="dressfair"
                                        />
                                        <p className="text-[15px] font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileHeaderSearchModel;
