"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { FaChevronUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdLock, MdOutlineContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import EditAddressMobileModelSidebar from "./editAddressMobileModelSidebar";
import AddNewAddressMobileModal from "./AddNewAddressMobileModel";

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

const MobileChekoutAddressList = ({
  isOpen,
  onClose,
  cartItems,
  toggleQtyDropdown,
  updateQty,
  qtyOptions,
  setIsModalOpen
}) => {
  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);


  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(1);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);


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
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-[9999998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom sheet modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-[999999999] py-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >

            {/* Modal Content */}
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="relative w-full">
                <div className="border-b border-b-gray-200 pb-3 px-3">
                  <p className="text-center text-lg text-[#000] font-[600]">Change Address</p>

                </div>
                <div className="absolute right-2 top-0">
                  <button onClick={onClose}>
                    <CgClose className="text-xl" />
                  </button>
                </div>


                <div className="px-0 pb-16">

                  <div className=" h-[380px] overflow-y-auto pr-2">
                    {addresses.map((item) => (
                      <div
                        key={item.id}
                        className={`border-b border-b-gray-200 p-3 cursor-pointer transition hover:shadow ${selectedAddress === item.id
                          ? ""
                          : ""
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
                            <button className="flex items-center gap-1 text-[#757575] text-[12px] font-[600] cursor-default">
                              <div className="h-4 w-4 rounded-full border flex justify-center items-center bg-black">
                                <p className="h-2 w-2 rounded-full bg-white"></p>
                              </div>
                              <p>Default</p>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelect(item)}
                              className="flex items-center gap-1 text-[#757575] text-[12px] font-[500]"
                            >
                              <div className="h-4 w-4 rounded-full border flex justify-center items-center">
                                <p className="h-2 w-2 rounded-full bg-white"></p>
                              </div>
                              <p>Set default</p>
                            </button>
                          )}

                          <div className="flex items-center gap-4">
                            <button onClick={notify} className="flex items-center gap-1 text-[#222] text-[13px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                              <MdOutlineContentCopy />
                              Copy
                            </button>
                            <button onClick={() => setEditingAddress(item)} className="flex items-center gap-1 text-[#222] text-[13px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                              <FiEdit />
                              Edit
                            </button>
                            <button onClick={() => setDeletingAddress(item)} className="flex items-center gap-1 text-[#222] text-[13px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                              <AiOutlineDelete />
                              Delete
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="fixed left-0 right-0 w-full bottom-0 border-t border-t-gray-100 py-3 px-1 md:px-6 z-[99999] bg-white block xl:hidden">
                  <div className="pt-3 flex justify-center items-center">
                    <button onClick={() => setIsAddAddressOpen(true)} className="hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-full md:w-[50%] mx-auto py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">
                      Add a new address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

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

          <EditAddressMobileModelSidebar
            isOpen={!!editingAddress}
            onClose={() => setEditingAddress(null)}
            address={editingAddress}
            onSave={(updated) => {
              handleEditSave(updated);
              setEditingAddress(null);
            }}
          />

          <AddNewAddressMobileModal
            isOpen={isAddAddressOpen}
            onClose={() => setIsAddAddressOpen(false)}
            onSave={(newAddress) => {
              console.log("New address saved:", newAddress);
              setIsAddAddressOpen(false);
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileChekoutAddressList;