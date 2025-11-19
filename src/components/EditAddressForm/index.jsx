"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdLock } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

const countries = [
    "Pakistan",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "UAE",
];

const EditAddressForm = ({ address, onSave, onCancel, exitDirection = "right" }) => {
    const [name, setName] = useState(address.name);
    const [phone, setPhone] = useState(address.phone);
    const [addr, setAddr] = useState(address.address);
    const [city, setCity] = useState(address.city);
    const [country, setCountry] = useState(address.country || "Pakistan"); // default country
    const [isDefault, setIsDefault] = useState(false);

  const handleSave = () => {
        onSave({ ...address, name, phone, address: addr, city, country, isDefault });
    };

    return (
   
        <motion.div
        key="edit-form"
        initial={{ x: 300, opacity: 0 }} // slides in from right
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }} // slides out to right
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="space-y-4 relative h-full flex flex-col justify-between"
      >
            {/* Back Button */}
            <div className="absolute -left-2 -top-2">
                <button onClick={onCancel} className="flex items-center gap-1 font-semibold">
                    <IoChevronBack className="text-2xl" />
                    Back
                </button>
            </div>

            <div className="">

                {/* Header */}
                <div className="flex justify-center items-center">
                    <div className="flex justify-center flex-col">
                        <h3 className="text-[20px] text-center font-semibold text-[#222]">
                            Edit Address
                        </h3>
                        <p className="text-[#0a8800] font-[500] text-[13px] flex items-center gap-1 text-center">
                            <MdLock />
                            All data is safeguarded
                        </p>
                    </div>
                </div>

                {/* Country Dropdown */}
                <div className="flex items-center gap-1">
                    <label htmlFor="country" className="font-[600] text-[14px] text-[#222] ">Country / Region:</label>
                    <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="outline-none w-fit font-[600] text-[14px] text-[#222] "
                    >
                        {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Other Inputs */}
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="" className="font-[600] text-[14px] text-[#222] ">Full Name <span className="text-red-600">*</span></label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222] " placeholder="Name" />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="" className="font-[600] text-[14px] text-[#222] ">Phone number <span className="text-red-600">*</span></label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222] " placeholder="Phone" />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="" className="font-[600] text-[14px] text-[#222] ">Province, City <span className="text-red-600">*</span></label>
                        <input value={addr} onChange={(e) => setAddr(e.target.value)} className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222] " placeholder="Address" />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="" className="font-[600] text-[14px] text-[#222] ">Building, street, and area etc <span className="text-red-600">*</span></label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222] " placeholder="City" />
                    </div>
                </div>

                <div
                    onClick={() => setIsDefault(!isDefault)}
                    className={`flex items-center w-fit gap-2 mt-4 rounded-lg cursor-pointer transition
                    }`}
                >
                    {isDefault ? <>
                        <div className="w-5 h-5 rounded-full border border-5 border-black flex justify-center items-center bg-white">
                        {isDefault && <BsCheckLg className={`${isDefault ? "text-white" : "text-[#fb7701]"}`} />}
                    </div>
                    </> : <>
                        <div className="w-5 h-5 rounded-full border flex justify-center items-center bg-white">
                        {isDefault && <BsCheckLg className={`${isDefault ? "text-white" : "text-[#fb7701]"}`} />}
                    </div>
                    </>}
                   
                    <p className="font-[500] text-[14px]">Set as my default address</p>
                </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-3 py-4">
                <button onClick={handleSave} className="hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-full md:w-[50%] mx-auto py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">Save and use</button>
            </div>
        </motion.div>
    );
};

export default EditAddressForm;
