"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { MdLock } from "react-icons/md";

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

const EditAddressModal = ({ isOpen, onClose, address }) => {
    const [country, setCountry] = useState(address?.country || "Pakistan");
    const [isDefault, setIsDefault] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        fullAddress: "",
        city: "",
    });

    useEffect(() => {
        if (address) {
            setFormData({
                name: address.name,
                phone: address.phone,
                fullAddress: address.address,
                city: address.city,
            });
            setCountry(address.country || "Pakistan");
        }
    }, [address]);

    const handleSave = () => {
        const updatedAddress = {
            ...formData,
            country,
            isDefault,
        };
        console.log("Saving address:", updatedAddress);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 flex justify-center items-center z-[999999999999999999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative flex flex-col justify-between h-[640px] overflow-hidden bg-white rounded-lg shadow-xl w-full max-w-[700px] px-6 py-6"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                >
                    <button onClick={onClose} className="p-1 absolute right-2 top-2 hover:bg-gray-100 rounded-full">
                        <CgClose className="text-xl" />
                    </button>

                    <div className="">
                        {/* Header */}
                        <div className="flex justify-center items-center pb-3">
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

                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex flex-col w-full gap-1 mb-2">
                                <label className="font-[600] text-[14px] text-[#222]">
                                    Full Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                                    placeholder="Name"
                                />
                            </div>

                            <div className="flex flex-col w-full gap-1 mb-2">
                                <label className="font-[600] text-[14px] text-[#222]">
                                    Phone number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                                    placeholder="Phone"
                                />
                            </div>

                            <div className="flex flex-col w-full gap-1 mb-2">
                                <label className="font-[600] text-[14px] text-[#222]">
                                    Province, City <span className="text-red-600">*</span>
                                </label>
                                <input
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                                    placeholder="City / Province"
                                />
                            </div>

                            <div className="flex flex-col w-full gap-1 mb-2">
                                <label className="font-[600] text-[14px] text-[#222]">
                                    Building, street, and area etc <span className="text-red-600">*</span>
                                </label>
                                <input
                                    value={formData.fullAddress}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullAddress: e.target.value })
                                    }
                                    className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                                    placeholder="House / Street / Area"
                                />
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
                        <button onClick={handleSave} className="hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-full md:w-[50%] mx-auto py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">Save</button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditAddressModal;
