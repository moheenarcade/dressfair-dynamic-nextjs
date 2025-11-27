"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaAnglesLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import BuyAgainModal from "./BuyAgainModal";

const ViewOrderDetailsModal = ({ isOpen, onClose, order }) => {
    const [activeSection, setActiveSection] = useState("details");
    const [isBuyAgainModalOpen, setIsBuyAgainModalOpen] = useState(false);

    if (!isOpen || !order) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999999999] p-2">
            <div className="bg-white w-full max-w-[800px] overflow-hidden z-[9999998899999999]  rounded-md shadow-lg  animate-fadeIn">
                {activeSection === "details" && (
                    <>
                        <div className="relative flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-[12px] md:text-xl font-semibold">
                            {activeSection === "track" && <BsCheckLg className="text-xl md:text-3xl" />}
                            <p>
                                {order.status}
                            </p>
                            <button onClick={onClose} className="text-xl absolute right-2 hover:scale-[1.08] transition-all duration-[500] ease-in-out">
                                <IoClose />
                            </button>
                        </div>
                        <div className="p-3 order-detail-sec max-h-[80vh] overflow-y-auto">
                            <div className="">
                                <div className="flex items-center gap-6 tetx-gray-600 text-[13px] font-semibold" >
                                    <p>Order Time : Nov 24, 2025</p>
                                    <p>Order ID : 530</p>
                                </div>
                                <p className="tetx-gray-600 text-[13px] font-semibold">Order confirmation was sent on 2025-11-24 to 971342344242</p>
                            </div>

                            <div className="my-4 rounded-sm shipping-to bg-[#f2f2f2] p-3 flex flex-row md:flex-col md:flex-row gap-3 justify-between">
                                <div className="">
                                    <p className="font-semibold text-md mb-2">Shipping to </p>
                                    <p className="text-sm text-gray-600">234324434,- 432423424</p>
                                    <p className="text-sm text-gray-600">Saadiyat Island, Abu Dhabi, United Arab Emirates</p>
                                </div>
                                <div className="">
                                    <div className="flex flex-col gap-1">
                                        <button onClick={() => setActiveSection("track")} className="text-[14px] md:text-[16px] rounded-full w-[160px] md:w-[170px] py-1 px-4 transition-all duration-[500] ease-in-out hover:text-black hover:border-black text-gray-600 font-semibold border-2 border-gray-600">
                                            Track
                                        </button>
                                        <button onClick={() => setActiveSection("receipt")} className="text-[14px] md:text-[16px] rounded-full w-[160px] md:w-[170px] py-1 px-4 transition-all duration-[500] ease-in-out hover:text-black hover:border-black text-gray-600 font-semibold border-2 border-gray-600">
                                            View Reciept
                                        </button>
                                        <button
                                            onClick={() => {
                                           
                                                setIsBuyAgainModalOpen(true); // open BuyAgain modal
                                            }}
                                            className="text-[14px] md:text-[16px] rounded-full w-[160px] md:w-[170px] py-1 px-4 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent">
                                            Buy this again
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="order-products-list flex flex-col md:flex-row gap-2 md:gap-6 border border-gray-300 rounded-sm p-2">
                                <div className="flex items-start gap-3">
                                    <Image
                                        className="rounded-sm shadow-lg mb-2"
                                        width={100}
                                        height={100}
                                        src={order?.image || "/Placeholder_view_vector.png"}
                                        alt="product"
                                    />
                                    <div className="">
                                        <p className="font-semibold text-sm">Women Fashion Thick Crust High Wedge Sandals</p>
                                        <p className="text-gray-600 text-sm">35 Blue</p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between md:justify-start md:flex-col items-center md:items-end">
                                    <p className="text-lg font-semibold">AED 37.0000</p>
                                    <p className="text-gray-600 text-end text-sm font-semibold">x 1</p>
                                </div>
                            </div>

                            <div className="order-payment-detail my-4 border border-gray-300 rounded-sm p-2 flex flex-col md:flex-row gap-4 justify-between">
                                <div className="w-full md:w-[40%]">
                                    <p className="text-md font-semibold">Payment Details</p>
                                    <p className="text-md font-semibold text-[#0a8800] py-1">Order Summary</p>
                                    <p className="text-2xl font-semibold pb-3">AED 52.00</p>
                                    <div className="flex items-center justify-between text-sm pb-2">
                                        <p>Sub-Total</p>
                                        <p>AED 37.00</p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm pb-2">
                                        <p>Flat Shipping Rate</p>
                                        <p>AED 15.00</p>
                                    </div>
                                    <div className="flex items-center justify-between font-semibold text-sm">
                                        <p>Total</p>
                                        <p>AED 52.00</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-[40%]">
                                    <p className="text-md font-semibold pb-3">Payment Method</p>
                                    <p className="text-[#0a8800] text-sm pb-2">
                                        Dressfair is committed to protecting your payment information.
                                    </p>
                                    <p className="text-sm">
                                        We follow PCI DSS standards, use strong encryption, and perform regular reviews of its system to protect your privacy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            className="mt-5 w-full py-2 rounded-md bg-[#fb7701] hover:bg-[#fb5d01fc] text-white font-semibold"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </>
                )}

                {activeSection === "track" && (

                    <>
                        <div className="relative flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-[12px] md:text-2xl font-semibold">
                            <p>{order.status}</p>
                            <button onClick={() => setActiveSection("details")} className="text-sm flex items-center gap-1 absolute right-2 hover:scale-[1.03] transition-all duration-[500] ease-in-out">
                                <FaAnglesLeft /> Back
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
                            onClick={() => setActiveSection("details")}
                        >
                            Back
                        </button>
                    </>
                )}

                {activeSection === "receipt" && (
                    <>
                        <div className="relative flex items-center bg-[#0a8800] gap-2 px-3 py-2 text-white text-[12px] md:text-2xl font-semibold">

                            <p>{order.status}</p>
                            <button onClick={() => setActiveSection("details")} className="text-sm flex items-center gap-1 absolute right-2 hover:scale-[1.03] transition-all duration-[500] ease-in-out">
                                <FaAnglesLeft /> Back
                            </button>
                        </div>
                        <div className="p-3 flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="w-full md:w-[50%] border border-gray-300 rounded-sm overflow-hidden">
                                    <p className="text-lg font-semibold py-1 px-3 bg-gray-100 border-b border-b-gray-300">Order detail</p>
                                    <div className="px-3">
                                        <div className="flex items-center justify-between border-b border-b-gray-300 py-1">
                                            <p>Order ID:</p>
                                            <p>530</p>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-b-gray-300 py-1">
                                            <p>Order Time:</p>
                                            <p>2025-11-24 17:03:38</p>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-b-gray-300 py-1">
                                            <p>Shipping Method</p>
                                            <p>Flat Shipping Rate</p>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <p>Order ID:</p>
                                            <p>530</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[50%] border border-gray-300 rounded-sm overflow-hidden">
                                    <p className="text-lg font-semibold py-1 px-3 bg-gray-100 border-b border-b-gray-300">Delivery address</p>
                                    <div className="p-3">
                                        <p>test, 234324434,- 432423424, Saadiyat Island, Abu Dhabi, United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded-sm overflow-hidden">
                                <p className="text-lg font-semibold py-1 px-3 bg-gray-100 border-b border-b-gray-300">Product detail</p>
                                <table className="table-fixed w-full text-sm md:text-base">
                                    <thead className="border-b border-b-gray-300">
                                        <tr>
                                            <th className="w-1/4 px-2 py-2 text-left">Image</th>
                                            <th className="w-1/4 px-2 py-2 text-left">Variation</th>
                                            <th className="w-1/4 px-2 py-2 text-left">Unit Price</th>
                                            <th className="w-1/4 px-2 py-2 text-left">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="">
                                            <td className="px-2 py-2">
                                                <Image
                                                    className="rounded-sm shadow-lg mb-2"
                                                    width={100}
                                                    height={100}
                                                    src={order?.image || "/Placeholder_view_vector.png"}
                                                    alt="product"
                                                />
                                            </td>
                                            <td className="flex flex-col px-2 py-2 align-top text-left">
                                                <p>Qty: 1</p>
                                                <p>Size: 35</p>
                                                <p>Color: Blue</p>
                                            </td>
                                            <td className="px-2 py-2 align-top text-left">
                                                <p>
                                                    37.00 AED
                                                </p>
                                            </td>
                                            <td className="px-2 py-2 align-top text-left">
                                                <p>37.00 AED
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex flex-col justify-end items-end">
                                    <div className="flex border-t border-t-gray-300 w-full justify-end py-1 px-2">
                                        <p className="text-md font-semibold border-r pr-2 border-r-gray-300">Sub-Total</p>
                                        <p className="w-[30%] text-end">37.00 AED</p>
                                    </div>
                                    <div className="flex border-t border-t-gray-300 w-full justify-end py-1 px-2">
                                        <p className="text-md font-semibold border-r pr-2 border-r-gray-300" >Shipping Charges</p>
                                        <p className="w-[30%] text-end">15.00 AED</p>
                                    </div>
                                    <div className="flex border-t border-t-gray-300 w-full justify-end py-1 px-2">
                                        <p className="text-md font-semibold pr-2 border-r  border-r-gray-300">Total</p>
                                        <p className="w-[30%] text-end">52.00 AED</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="mt-5 w-full py-2 rounded-md bg-[#fb7701] hover:bg-[#fb5d01fc] text-white font-semibold"
                            onClick={() => setActiveSection("details")}
                        >
                            Back
                        </button>
                    </>
                )}

            </div>

            <BuyAgainModal
                isOpen={isBuyAgainModalOpen}
                onClose={() => setIsBuyAgainModalOpen(false)}
                order={order}
            />

        </div>
    );
};

export default ViewOrderDetailsModal;
