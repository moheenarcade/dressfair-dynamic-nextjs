"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { IoMdLock } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import Select from "react-select";
import { FiEdit } from "react-icons/fi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { LuCheck } from "react-icons/lu";
import EditAddressModal from "./EditAddressModal";

const AddPaymentCardModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [selectedAddressToEdit, setSelectedAddressToEdit] = useState(null);

    const [form, setForm] = useState({
        cardNumber: "",
        month: null,
        year: null,
        cvv: ""
    });

    const [errors, setErrors] = useState({});

    // Month options
    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1).padStart(2, "0"),
        label: String(i + 1).padStart(2, "0"),
    }));

    // Year options
    const yearOptions = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return { value: String(year), label: String(year) };
    });

    const validate = () => {
        const newErrors = {};

        if (!form.cardNumber.trim()) {
            newErrors.cardNumber = "Please enter card number";
        } else if (form.cardNumber.replace(/\s/g, "").length < 16) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }

        if (!form.month) newErrors.month = "Please select expiry month";
        if (!form.year) newErrors.year = "Please select expiry year";

        if (!form.cvv.trim()) {
            newErrors.cvv = "Please enter CVV";
        } else if (form.cvv.length < 3) {
            newErrors.cvv = "CVV must be 3 or 4 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        console.log("Card Data:", form);
        onClose();
    };

    // Numeric only input
    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");

        setForm(prev => ({ ...prev, cardNumber: value }));

        // ✅ Remove error while typing
        if (errors.cardNumber) {
            setErrors(prev => ({ ...prev, cardNumber: "" }));
        }
    };

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");

        setForm(prev => ({ ...prev, cvv: value }));

        // ✅ Remove error while typing
        if (errors.cvv) {
            setErrors(prev => ({ ...prev, cvv: "" }));
        }
    };

    // react-select style WITHOUT breaking your UI
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "48px",
            borderRadius: "0.375rem",
            borderColor: state.selectProps.hasError ? "#ef4444" : base.borderColor,
            boxShadow: "none"

        }),
        valueContainer: (base) => ({
            ...base,
            padding: "0 12px"
        })
    };

    return (
        <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black/60">
            <div className="w-[95%] max-w-[620px] bg-white rounded-lg py-6 relative animate-fadeIn z-[999999999999]">
                <div className="max-h-[560px] overflow-auto p-2 md:px-6">
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
                    <div className="mt-6 space-y-4 border-b border-b-gray-200 pb-6">

                        {/* Card Number */}
                        <div>
                            <label className="font-semibold text-sm">
                                <span>*</span> Card number
                            </label>

                            <div
                                className={`border rounded-md px-3 mt-2 flex items-center ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <Image className="w-8" width={100} height={100} src="/cardiconincardnumberinput.avif" alt="card" />

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={formatCardNumber(form.cardNumber)}
                                    onChange={handleCardNumberChange}
                                    placeholder="Card number"
                                    maxLength={19}
                                    className="w-full font-semibold p-3 focus:outline-none focus:border-0"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#0A8800" aria-hidden="true"><path d="M453.8 53.5c33.4-13.3 70.5-13.5 104.1-0.7l340.5 130.2c41.2 15.7 67.6 56 65.7 100l-8.2 190.2c-6.9 160.5-88.2 308.6-219.8 400.6l-116.5 81.6c-67 46.8-156.1 46.8-223.1 0l-115.1-80.5c-131.5-92-211.7-240.8-216.2-401.2l-5.4-191.4c-1.2-43 24.6-82.2 64.6-98.1z m258.7 327.4c-15.8-16.1-41.8-16.4-57.9-0.5l-178.8 175.5-89.9-81.2c-16.8-15.2-42.7-13.8-57.9 3-15.2 16.8-13.8 42.7 2.9 57.8l118.6 107.1c16.1 14.5 40.7 14 56.2-1.2l206.3-202.6c16.1-15.8 16.4-41.8 0.5-57.9z"></path></svg>
                            </div>

                            {errors.cardNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.cardNumber}
                                </p>
                            )}
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            {/* Month */}
                            <div>
                                <label className="text-sm font-semibold">
                                    <span>*</span> Expiration date
                                </label>
                                <Select
                                    className="mt-2 font-semibold"
                                    options={monthOptions}
                                    placeholder="Month"
                                    styles={customSelectStyles}
                                    value={form.month}
                                    onChange={(val) => {
                                        setForm({ ...form, month: val });

                                        if (errors.month) {
                                            setErrors(prev => ({ ...prev, month: "" }));
                                        }
                                    }}
                                    hasError={!!errors.month}
                                />
                                {errors.month && (
                                    <p className="text-red-500 text-xs mt-1">{errors.month}</p>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="text-sm font-semibold invisible hidden md:block">
                                    Year
                                </label>
                                <Select
                                    className="mt-3 font-semibold"
                                    options={yearOptions}
                                    placeholder="Year"
                                    styles={customSelectStyles}
                                    value={form.year}
                                    onChange={(val) => {
                                        setForm({ ...form, year: val });

                                        if (errors.year) {
                                            setErrors(prev => ({ ...prev, year: "" }));
                                        }
                                    }}
                                    hasError={!!errors.year}
                                />
                                {errors.year && (
                                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                                )}
                            </div>

                            {/* CVV */}
                            <div>
                                <label className="text-sm font-semibold flex items-center gap-1 mt-1">
                                    <span>*</span> CVV
                                 
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="3–4 digits code"
                                    className={`w-full font-semibold border rounded-md p-3 mt-2 focus:outline-none ${errors.cvv ? "border-red-500" : "border-gray-300"
                                        }`}
                                    maxLength={4}
                                    value={form.cvv}
                                    onChange={handleCvvChange}
                                />

                                {errors.cvv && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.cvv}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="billing-address py-3 border-b border-b-gray-200">
                        <div className="flex justify-between items-start">
                            <div className="">
                                <label className="font-semibold text-sm">
                                    <span>*</span> Billing address
                                </label>
                                <p className="text-[13px] text-gray-600 font-semibold">
                                    test, test address, ARIF WALA, Punjab Pakistan
                                </p>
                            </div>
                            <button 
                               onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAddressToEdit({
                                    name: "test",
                                    phone: "+92 433 4343434",
                                    address: "test address",
                                    city: "ARIF WALA, Punjab Pakistan",
                                });
                                setIsEditModalOpen(true);
                            }}
                            className="flex items-center gap-1 text-[14px] font-[500] hover:scale-[1.05] hover:bg-gray-100 px-2 py-px rounded-md transition-all duration-[0.5s] ease-in-out">
                                <FiEdit />
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleSubmit}
                            className="w-full md:w-[60%] mx-auto mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full text-lg"
                        >
                            Add your card
                        </button>
                    </div>

                    <div className="pt-4">
                        <p className="inline mr-2 text-[#0a8800] text-[14px] font-semibold">
                            <RiSecurePaymentFill className="text-[#088901] text-2xl inline mr-1" />
                            Temu protects your card information
                        </p>
                        <ul className="flex flex-col gap-x-2">
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                                <LuCheck className="text-lg text-[#088901]" />
                                Temu follows the Payment Card Industry Data Security Standard (PCI DSS) when handling card data
                            </li>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                                <LuCheck className="text-lg text-[#088901]" />
                                Card information is secure and uncompromised
                            </li>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                                <LuCheck className="text-lg text-[#088901]" />
                                All data is safeguarded
                            </li>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                                <LuCheck className="text-lg text-[#088901]" />
                                Temu never sells your card information
                            </li>
                        </ul>
                        <div className="pt-2 flex flex-wrap gap-2">
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/pcj.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/visasecure.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/id-check.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/safekey.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/protectbuy.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/j-secure.avif" alt="payemnt system" />
                            <Image className="w-auto h-[30px]" width={40} height={40} src="/apwg.avif" alt="payemnt system" />
                        </div>
                    </div>
                </div>
            </div>

            <EditAddressModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                address={selectedAddressToEdit}
            />
        </div>
    );
};

export default AddPaymentCardModal;

