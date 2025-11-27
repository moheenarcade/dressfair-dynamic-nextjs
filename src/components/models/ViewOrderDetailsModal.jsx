"use client";
import Image from "next/image";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const ViewOrderDetailsModal = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-[800px] rounded-md shadow-lg overflow-hidden animate-fadeIn">
                <div className="relative flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-[12px] md:text-xl font-semibold">
                   
                    <p>Pending</p>

                    <button onClick={onClose} className="text-xl absolute right-2 hover:scale-[1.08] transition-all duration-[500] ease-in-out">
                        <IoClose />
                    </button>
                </div>

                <div className="p-3">
                    <div className="">
                        <div className="flex items-center gap-6 tetx-gray-600 text-[13px] font-semibold" >
                            <p>Order Time : Nov 24, 2025</p>
                            <p>Order ID : 530</p>
                        </div>
                        <p className="tetx-gray-600 text-[13px] font-semibold">Order confirmation was sent on 2025-11-24 to 971342344242</p>
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

export default ViewOrderDetailsModal;
