"use client";
import React from "react";
import { BsCheckLg } from "react-icons/bs";

const TrackOrderModal = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-[800px] rounded-md shadow-lg overflow-hidden animate-fadeIn">
                <div className="flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-2xl font-semibold">
                    <BsCheckLg className="text-3xl"/>
                    <p> Your order is currently being processed for delivery.</p>
                </div>
                <div className="flex flex-col gap-2 text-[14px]">
                    <p><span className="text-gray-500">Order ID:</span> {order.orderId}</p>
                    <p><span className="text-gray-500">Status:</span> {order.status}</p>
                    <p><span className="text-gray-500">Items:</span> {order.items}</p>
                    <p><span className="text-gray-500">Price:</span> {order.price}</p>
                    <p><span className="text-gray-500">Time:</span> {order.time}</p>
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
