"use client";
import Image from "next/image";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const TrackOrderModal = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999999999999]">
            <div className="bg-white w-[90%] max-w-[800px] rounded-md shadow-lg overflow-hidden animate-fadeIn">
                <div className="relative flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-[12px] md:text-2xl font-semibold">
                    <BsCheckLg className="text-xl md:text-3xl" />
                    <p> Your order is currently being processed for delivery.</p>

                    <button onClick={onClose} className="text-xl absolute right-2 hover:scale-[1.08] transition-all duration-[500] ease-in-out">
                        <IoClose />
                    </button>
                </div>

                <div className="p-3">
                    <div className="pb-3 flex flex-col md:flex-row gap-2 justify-between border-b border-b-gray-200">
                        <div className="w-full md:w-[50%]">
                            <p className=" md:text-lg font-semibold">
                                Delivery:
                            </p>
                            <p className="text-[14px] md:text-[16px]">
                                Your order is expected to arrive in 3 days.
                            </p>
                        </div>
                        <div className="w-full md:w-[50%]">
                            <p className="font-semibold mb-2">Package info</p>
                            <div className="flex gap-2">
                                <Image
                                    className="rounded-sm shadow-lg mb-2"
                                    width={100}
                                    height={100}
                                    src={order.image}
                                    alt="product"
                                />
                                <div className="flex flex-col text-[13px]">
                                    <p><span className="text-gray-500">Order ID:</span> {order.orderId}</p>
                                    <p><span className="text-gray-500">Status:</span> {order.status}</p>
                                    <p><span className="text-gray-500">Items:</span> {order.items}</p>
                                    <p><span className="text-gray-500">Price:</span> {order.price}</p>
                                    <p><span className="text-gray-500">Time:</span> {order.time}</p>
                                </div>
                            </div>
                            <p className="font-semibold">
                                Ship to
                            </p>
                            <div className="text-[14px] md:text-[15px] mt-1">
                                <p>
                                    test234324434,- 432423424Saadiyat Island, Abu DhabiUnited Arab Emirates
                                </p>
                                <p>
                                    234324434,- 432423424
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="order-status pt-4">
                        <p className="font-semibold text-lg md:text-xl">Shipping details</p>
                        <ul className="pt-4 pl-3 flex flex-col gap-4 text-sm md:text-md font-semibold text-gray-400">
                            <li className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-gray-400"></div> Delivered</li>
                            <li className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-gray-400"></div>Order Shipped</li>
                            <li className="flex gap-2 items-center active-status text-[#fb7701]"><div className="w-3 h-3 rounded-full bg-[#fb7701]"></div>Order Submitted</li>
                        </ul>
                    </div>
                </div>

                <button
                    className="mt-5 w-full py-2 rounded-md bg-[#fb7701] hover:bg-[#fb5d01fc] text-white font-semibold"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TrackOrderModal;
