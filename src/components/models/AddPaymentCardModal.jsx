"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { MdLock } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

const AddPaymentCardModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-[620px] bg-white rounded-lg p-6 relative animate-fadeIn">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
                >
                    <IoClose />
                </button>

                {/* Header */}
                <h2 className="text-xl font-bold text-center">Add a new card</h2>

                <Link href="#" className='pt-1 flex justify-center items-center gap-1 text-[#0a8800] text-[13px] font-[500]'>
                    <IoMdLock />
                    All data is safeguarded
                    <GoChevronRight />
                </Link>

                <div className="pt-4 flex flex-wrap gap-2">
                    <Image width={40} height={40} src="/dinerclub.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/jazzcash.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/googlepay.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/jcbpayment.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/maestro.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/mastercard.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/unionpay.avif" alt="payemnt system" />
                    <Image width={40} height={40} src="/visapaymewnt.avif" alt="payemnt system" />
                </div>

                {/* Form */}
                <div className="mt-6 space-y-4">
                    {/* Card Number */}
                    <div>
                        <label className="font-semibold text-sm">
                            Card number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Card number"
                            className="w-full border rounded-md p-3 mt-1 focus:outline-none focus:border-orange-400"
                        />
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-sm font-semibold">
                                Expiration <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full border rounded-md p-3 mt-1 focus:outline-none">
                                <option>Month</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold invisible">Year</label>
                            <select className="w-full border rounded-md p-3 mt-1 focus:outline-none">
                                <option>Year</option>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i}>{new Date().getFullYear() + i}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="3–4 digits code"
                                className="w-full border rounded-md p-3 mt-1 focus:outline-none"
                                maxLength="4"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="border-t pt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Billing address <span className="font-medium">Punjab Pakistan</span>
                        </p>
                        <button className="text-sm text-blue-600 font-medium">Edit</button>
                    </div>

                    {/* Button */}
                    <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-lg">
                        Add your card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPaymentCardModal;
