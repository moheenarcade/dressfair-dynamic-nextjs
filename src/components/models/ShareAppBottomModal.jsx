"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { FaWhatsapp, FaFacebook, FaTelegram, FaLink } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FaTiktok } from "react-icons/fa";


const APP_URL = "https://dressfair.com";

const ShareAppBottomModal = ({ isOpen, onClose }) => {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(APP_URL);
        toast.success("Link copied!");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 z-[99998999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom sheet */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-[999989999] p-4"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-b-gray-200">
                            <p></p>
                            <p className="font-semibold text-[16px]">Share this app to</p>
                            <button onClick={onClose}>
                                <CgClose className="text-xl" />
                            </button>
                        </div>

                        {/* Share Options */}
                        <div className="grid grid-cols-4 gap-4 text-center pt-8">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(APP_URL)}`}
                                target="_blank"
                                className="flex flex-col items-center gap-1"
                            >
                                <FaWhatsapp className="text-5xl text-green-500" />
                                <span className="text-xs">WhatsApp</span>
                            </a>

                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${APP_URL}`}
                                target="_blank"
                                className="flex flex-col items-center gap-1"
                            >
                                <FaFacebook className="text-5xl text-blue-600" />
                                <span className="text-xs">Facebook</span>
                            </a>

                            <a
                                href={`https://www.tiktok.com/share?url=${encodeURIComponent(APP_URL)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1"
                            >
                                <FaTiktok className="text-5xl text-black" />
                                <span className="text-xs">TikTok</span>
                            </a>

                            <button
                                onClick={handleCopy}
                                className="flex flex-col items-center gap-1"
                            >
                                <FaLink className="text-5xl text-gray-600" />
                                <span className="text-xs">Copy</span>
                            </button>
                        </div>

                        {/* Link box */}
                        <div className="mt-8 mb-6 bg-gray-100 p-2 rounded text-xs break-all text-center">
                            {APP_URL}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ShareAppBottomModal;
