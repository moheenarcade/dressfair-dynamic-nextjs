"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import OrderStatus from "../../../public/carparcvel.png";
import Image from "next/image";
import QRcode from "../../../public/qrcodeiamge.png";
import { FaApple } from "react-icons/fa6";


const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const GetMobileAppModel = ({ isOpen, onClose }) => {
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
                        className="relative rounded-lg shadow-xl w-[90%] sm:w-[40%] p-6 
                        bg-[url('/mobilemodel-bg.png')] bg-cover bg-center bg-no-repeat
                        "
                    >

                        <div className="bg-white p-6 rounded-lg">
                        <button onClick={onClose} className="absolute right-[-25px] top-[-30px] text-white rounded-full border">
                            <IoClose className="text-2xl" />
                        </button>
                        <h2 className="text-[24px] font-extrabold text-[rgb(0, 0, 0)] mb-4 text-center">
                            Get the Temu App to enjoy
                        </h2>
                        <div className="flex justify-evenly items-center">
                            <div className="flex flex-col justify-center items-center">
                                <Image src={OrderStatus} alt="order status" />
                                <p className="text-[14px] text-[#222222b3] font-[500]">Order Status</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src={OrderStatus} alt="order status" />
                                <p className="text-[14px] text-[#222222b3] font-[500]">
                                    Customer Support
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image src={OrderStatus} alt="order status" />
                                <p className="text-[14px] text-[#222222b3] font-[500]">
                                    App-only Events
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center items-start gap-4 pt-12">
                            <div className="w-[25%]">
                                <Image className="w-full h-auto" src={QRcode} alt="qr code "/>
                            </div>
                            <div className="flex flex-col w-fit gap-4 flex-wrap mt-4">
                                {/* App Store Button */}
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Download on the App Store"
                                    className="flex items-center gap-2 rounded-full  text-black border-1 px-4 py-2  transition"
                                >
                                   <FaApple className="text-3xl" />

                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[10px]">Download on the</span>
                                        <span className="text-sm font-semibold">App Store</span>
                                    </div>
                                </a>

                                {/* Google Play Button */}
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Get it on Google Play"
                                    className="flex items-center gap-2 rounded-full  text-black border-1 px-4 py-2  transition"
                                >
                                    <Image
                                        src="https://aimg.kwcdn.com/upload_aimg/pc/427c29ba-bef6-439c-9d4c-edbdde47c7e0.png.slim.png?imageView2/2/w/120/q/70/format/avif"
                                        alt="Google Play"
                                        width={30}
                                        height={30}
                                        className="object-contain"
                                    />
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[10px]">Get it on</span>
                                        <span className="text-sm font-semibold">Google Play</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GetMobileAppModel;
