"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { MdLock, MdOutlineContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import EditAddressForm from '../EditAddressForm/index';
import AddAddressForm from "../addAddressForm";


const notify = () =>
    toast.success("Copied successfully!", {
        icon: "✔️",
        style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
            fontSize: "14px",
            fontWeight: "600"
        },
    });

const AddressModal = ({ isOpen, onClose }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(1);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addingAddress, setAddingAddress] = useState(false);
    const [deletingAddress, setDeletingAddress] = useState(null);

    const addresses = [
        {
            id: 1,
            name: "Home",
            phone: "+92 433 4343434",
            address: "test address",
            city: "ARIF WALA, Punjab Pakistan",
        },
        {
            id: 2,
            name: "Office",
            phone: "+92 355 455555",
            address: "Street 10, Model Town",
            city: "Lahore, Punjab Pakistan",
        },
    ];

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const handleSelect = (item) => {
        setSelectedAddress(item.id);
        setDefaultAddress(item.id);
    };
    const handleEditSave = (updated) => {
        console.log("Updated address:", updated);
        setEditingAddress(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-[999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Wrapper */}
                    <motion.div
                        className="fixed inset-0 z-[99999999999999] flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}

                    >

                        <motion.div
                            className="relative h-[640px] overflow-hidden bg-white rounded-lg shadow-xl w-full max-w-[700px] px-6 py-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 140, damping: 18 }}
                            onClick={(e) => e.stopPropagation()}

                        >
                            <button onClick={onClose} className="p-1 absolute right-2 top-2 hover:bg-gray-100 rounded-full">
                                <CgClose className="text-xl" />
                            </button>
                            {!editingAddress && !addingAddress ? (
                                <>
                                    {!editingAddress ? (
                                        <div className="flex flex-col justify-between h-full">
                                            <div className="">
                                                {/* Header */}
                                                <div className="flex justify-center items-center pb-4">
                                                    <div className="flex justify-center flex-col">
                                                        <h3 className="text-[20px] text-center font-semibold text-[#222]">
                                                            Addresses
                                                        </h3>
                                                        <p className="text-[#0a8800] font-[500] text-[13px] flex items-center gap-1 text-center">
                                                            <MdLock />
                                                            All data is safeguarded
                                                        </p>
                                                    </div>

                                                </div>

                                                <div className="space-y-3 h-[380px] overflow-y-auto mt-4 pr-2">
                                                    {addresses.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={`border rounded-lg p-3 cursor-pointer transition hover:shadow ${selectedAddress === item.id
                                                                ? "border-gray-300"
                                                                : "border-gray-300"
                                                                }`}

                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="">
                                                                    <p className="text-[15px] font-bold text-black">{item.name}</p>
                                                                    <p className="text-[14px] text-black">{item.phone}</p>
                                                                    <p className="text-[14px] font-bold text-[#FB7701]">{item.address}</p>
                                                                    <p className="text-[14px] text-black font-medium">{item.city}</p>
                                                                </div>

                                                                <div className="">
                                                                    {defaultAddress === item.id ? <>
                                                                        <p className="text-3xl py-1 text-md font-semibold px-4 rounded-full">
                                                                            <BsCheckLg className="text-[#fb7701]" />
                                                                        </p>
                                                                    </> : <>
                                                                        <button onClick={() => handleSelect(item)} className="py-1 text-md font-semibold px-4 rounded-full text-white bg-[#fb7701]">Use</button>
                                                                    </>}

                                                                </div>
                                                            </div>

                                                            <div className="pt-4 flex items-center justify-between">
                                                                {defaultAddress === item.id ? (
                                                                    <button className="flex items-center gap-1 text-[#757575] text-[14px] font-[600] cursor-default">
                                                                        <div className="h-5 w-5 rounded-full border flex justify-center items-center bg-black">
                                                                            <p className="h-2 w-2 rounded-full bg-white"></p>
                                                                        </div>
                                                                        <p>Default</p>
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleSelect(item)}
                                                                        className="flex items-center gap-1 text-[#757575] text-[14px] font-[500]"
                                                                    >
                                                                        <div className="h-5 w-5 rounded-full border flex justify-center items-center">
                                                                            <p className="h-2 w-2 rounded-full bg-white"></p>
                                                                        </div>
                                                                        <p>Set as default</p>
                                                                    </button>
                                                                )}

                                                                <div className="flex items-center gap-4">
                                                                    <button onClick={notify} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                                                                        <MdOutlineContentCopy />
                                                                        Copy
                                                                    </button>
                                                                    <button onClick={() => setEditingAddress(item)} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                                                                        <FiEdit />
                                                                        Edit
                                                                    </button>
                                                                    <button onClick={() => setDeletingAddress(item)} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                                                                        <AiOutlineDelete />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pt-3 flex justify-center items-center">
                                                <button onClick={() => setAddingAddress(true)} className="hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-full md:w-[50%] mx-auto py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">
                                                    Add a new address
                                                </button>
                                            </div>


                                        </div>
                                    ) : (
                                        <EditAddressForm
                                            key="edit-form"
                                            address={editingAddress}
                                            onSave={handleEditSave}
                                            onCancel={() => setEditingAddress(null)}
                                            exitDirection="left"
                                        />
                                    )}
                                </>
                            ) : (
                                <   AddAddressForm
                                    key="address-form"
                                    address={editingAddress || {}}
                                    exitDirection="left"
                                    onCancel={() => {
                                        setEditingAddress(null);
                                        setAddingAddress(false);
                                    }}
                                    onSave={(data) => {
                                        console.log("Saved address", data);
                                        setEditingAddress(null);
                                        setAddingAddress(false);
                                    }}
                                />
                            )}
                        </motion.div>

                    </motion.div>
                </>
            )
            }
            <Toaster
                containerStyle={{
                    zIndex: '999999979999999999999',
                }}
            />


            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deletingAddress && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 flex justify-center items-center z-[999999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-[90%] max-w-[480px] shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h3 className="text-2xl font-semibold text-[#222] text-center">
                                Are you sure you want to delete this address?

                            </h3>
                            <div className="text-[15px] py-3 text-start mt-2 font-medium text-gray-600">
                                <p className="text-[14px] text-black">{deletingAddress.phone}</p>
                                <p className="text-[14px] font-bold text-[#FB7701]">{deletingAddress.address}</p>
                                <p className="text-[14px] text-black font-medium">{deletingAddress.city}</p>
                            </div>

                            <p className="text-[#888] text-[14px]">
                                Deleting this address will not delete any pending orders being dispatched to this address.

                            </p>

                            <div className="flex items-center justify-between gap-4 mt-6">
                                <button
                                    onClick={() => setDeletingAddress(null)}
                                    className="w-full py-2 rounded-full font-semibold text-[#444] border border-gray-400 hover:bg-gray-100 duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("Deleted:", deletingAddress);
                                        // here call backend delete API if needed
                                        setDeletingAddress(null);
                                    }}
                                    className="w-full py-2 rounded-full font-semibold text-white bg-red-600 hover:bg-red-700 duration-200"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </AnimatePresence >
    );
};

export default AddressModal;
