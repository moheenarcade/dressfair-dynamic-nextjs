"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";


const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const HeaderOfferModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
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
                        className="bg-white relative rounded-lg shadow-xl w-[90%] sm:w-[40%] px-6 py-8 "
                    >
                        <button onClick={onClose} className="absolute right-2 top-2">
                        <IoClose className="text-2xl"/>
                        </button>
                        <h2 className="text-[20px] font-bold text-[rgb(0, 0, 0)] mb-4 text-center">
                            Free shipping
                        </h2>
                        <ul className="text-[14px] pl-4 font-[500] flex flex-col gap-2 list-disc list-outside">
                            <li className="text-[#000]">Free standard shipping on all orders.</li>
                            <li className="text-[#000]">Get a Rs.280 credit (Standard Shipping) for late delivery.
                            </li>
                            <li className="text-[#000]">
                                Dressfair has order minimums to place your order. The applicable thresholds are detailed before you submit your order.
                            </li>
                        </ul>
                        <div className="flex justify-center pt-6">
                        <button
                            onClick={onClose}
                            className="px-4 w-full lg:w-[60%] mx-auto py-3 bg-[#fb7800] font-bold text-white rounded-full hover:scale-[1.02] transition-all"
                        >
                            OK
                        </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HeaderOfferModal;
