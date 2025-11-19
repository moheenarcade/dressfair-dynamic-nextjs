"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Link from "next/link";


const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const SpecialForYouModel = ({ isOpen, onClose }) => {
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
                        className="bg-white relative rounded-lg shadow-xl w-[90%] sm:w-[30%] px-6 py-8 "
                    >
                        <button onClick={onClose} className="absolute right-2 top-2">
                            <IoClose className="text-2xl" />
                        </button>
                        <h2 className="text-[20px] font-bold text-[rgb(0, 0, 0)] mb-4 text-center">
                            Special for you
                        </h2>
                        <div className="max-h-[400px] overflow-y-auto">
                            <div className="border rounded-md mb-4 bg-[linear-gradient(180deg,#e7f3e6,#f6fbf5)] p-4 border-[#d5ead3]">
                                <p className="text-[#0a8800] mb-4 font-bold text-lg pb-2 border-b border-dashed border-[#d5ead3]">
                                    Delivery guarantee
                                </p>

                                <p className="text-[13px]">
                                    Temu works with reliable shipping partners around the world. We guarantee that your package will reach you safely and on time. If there are any problems during the transit of items you purchased, such as damage, loss, or delay, rest assured that we will do our best to solve the problems and provide the best solutions.

                                </p>
                                <ul className="text-[14px] mt-4 pl-4 flex flex-col gap-2 list-disc list-outside">
                                    <li className="font-[600]">Rs.280 Credit for delay</li>
                                    <p className="text-[13px]">
                                        If your order isn't delivered on or before the latest delivery date provided to you, as a gesture of courtesy, we offer you a Rs.280 credit (Standard Shipping) within 48 hours of that date. The credit will be issued to your Temu credit balance and can be used on your next order. Under specific circumstances, including but not limited to natural disasters and other unforeseeable circumstances, you may not be able to receive compensation for late delivery.
                                        <Link href="#">
                                            For more exceptions and details about the policy, please refer to our policy page
                                        </Link>
                                    </p>

                                    <li className="font-[600]">Return if item damaged</li>
                                    <p className="text-[13px]">
                                        If you receive your package and find that some items are lost or damaged in transit, rest assured that you can easily apply for a full refund for those items.
                                    </p>

                                    <li className="font-[600]">15-day no update refund                                    </li>
                                    <p className="text-[13px]">
                                        If your package has no tracking updates for over 15 days and has not been delivered, you can request a free reshipment or refund because the package may have been lost in transit. If you receive the package after your request has been approved, you may be allowed to keep it for free in certain circumstances without needing to return it. In certain circumstances, including but not limited to natural disasters and other force majeure circumstances, you may not be able to receive compensation or request a refund if there have not been updates.

                                    </p>

                                    <li className="font-[600]">
                                        30-day no delivery refund

                                    </li>
                                    <p className="text-[13px]">
                                        If your package isn't delivered within 30 days after shipment, you can apply for a free reshipment or a full refund. If you receive the package after your request has been approved, you may be allowed to keep it for free in certain circumstances without needing to return it. In certain circumstances, including but not limited to natural disasters and other force majeure circumstances, you may not be able to request a free reshipment or a refund if your order wasn't delivered.

                                    </p>
                                </ul>
                            </div>

                            <div className="border rounded-md mb-4 bg-[linear-gradient(180deg,#e7f3e6,#f6fbf5)] p-4 border-[#d5ead3]">
                                <p className="text-[#0a8800] mb-4 font-bold text-lg pb-2 border-b border-dashed border-[#d5ead3]">
                                    Price adjustment
                                </p>

                                <ul className="text-[14px] mt-4 pl-4 flex flex-col gap-2 list-disc list-outside">
                                    <li className="text-[13px]">
                                        Items purchased from Temu are eligible for our price adjustment policy. Temu will provide the price difference in the currency that the order was paid in if the selling price of the item purchased was reduced within 30 days of payment in the same country or region. The shipment of your order will not be affected by applying for a price adjustment before you receive your item(s). You can request a price adjustment refund by selecting the relevant order in 'Your Orders' and clicking on the 'Price adjustment' button.
                                    </li>
                                    <li className="text-[13px]">
                                        Items that are promotional or no longer available may not be eligible for our price adjustment policy. Fees, including but not limited to shipping fees, will be excluded for any price adjustment calculation. Temu reserves the right to the final interpretation of our price adjustment policy, the right to modify the terms of this policy at any time, and the right to deny any price adjustment at our sole discretion.
                                    </li>
                                </ul>
                            </div>
                        </div>
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

export default SpecialForYouModel;
