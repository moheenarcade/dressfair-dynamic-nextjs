"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";

const EditNubmerMobileBottomModel = ({ isOpen, onClose }) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay Background */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[99999998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom Modal */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[99999999999999] shadow-xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
                            <button className="text-black " onClick={onClose}>

                            </button>
                            <p className="text-[17px] font-semibold text-black">Add a phone number</p>
                            <button onClick={onClose}>
                                <CgClose className="text-[22px]" />
                            </button>
                        </div>

                        <div className="py-6 px-4 h-[60vh]">
                          <p className="text-[17px] text-[#000] font-[500] pb-3">
                          Enter the mobile phone number you would like to associate with your account below.
                          </p>

                          <div className="flex items-center border border-gray-300 rounded-sm px-4">
                            <p className="w-20">
                                PK +92
                            </p>
                            <input type="number" className="border-l border-l-gray-200 outline-0 w-full py-3 px-4 text-gray-600" placeholder="Enter your phone number" />
                          </div>

                            <div className="flex items-center justify-between pt-12">
                                <button
                                    className="text-lg rounded-full py-3 px-8 text-white transition-all duration-[500] ease-in-out w-full hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditNubmerMobileBottomModel;
