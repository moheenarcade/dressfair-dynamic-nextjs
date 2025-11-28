"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const EditEmailVerificationMobileBottomModel = ({ isOpen, onClose }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [showGoogleVerify, setShowGoogleVerify] = useState(false);


    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
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
                            <>
                               
                                    <button className="text-black " onClick={() => setShowGoogleVerify(false)}>
                                    {showGoogleVerify && ( <FaChevronLeft />)}
                                    </button>
                            </>
                          
                            <p className="text-[17px] font-semibold text-black"> {!showGoogleVerify ? "Enter the verification code":"Verify your identity"}

                            </p>
                            <button onClick={onClose}>
                                <CgClose className="text-[22px]" />
                            </button>
                        </div>

                        <div className="pt-3 pb-20 px-4 h-[60vh]">
                            {!showGoogleVerify && (
                                <>
                                    <div className="text-[17px] text-[#000] font-[500]">
                                        <p>
                                            To continue, complete this verification step. We've sent a verification code to the email
                                        </p>
                                        <p><span className="text-[#fb7701]"> moheendealsarcade@gmail.com </span><span>. Please enter it below.</span></p>
                                    </div>
                                    <div className="verification-code-sec pt-4 pb-8 flex flex-col justify-center items-center gap-4">
                                        <div className="verification-inputs flex justify-center gap-1 sm:gap-3">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    maxLength="1"
                                                    value={digit}
                                                    onChange={(e) => handleChange(e.target.value, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    className="border border-gray-300 rounded-md h-12 w-12 sm:h-14 sm:w-14 text-center text-[20px] font-semibold focus:border-[#fb7701] outline-none"
                                                />
                                            ))}
                                        </div>

                                        <button className="text-[#fb7701] font-[500] text-[14px]">
                                            Resend code
                                        </button>
                                    </div>
                                    <ul>
                                        <li className="text-[15px] font-[500]">Didn't receive the email?</li>
                                        <li className="text-[13px] text-[#777]">1. Make sure your email address is correct.</li>
                                        <li className="text-[13px] text-[#777]">2. Please check your spam folder.</li>
                                        <li className="text-[13px] text-[#777]">3. If you still don't see the email, <button onClick={() => setShowGoogleVerify(true)} className="text-[15px] flex items-center font-[500] text-[#000]">try another way to verify your identity
                                            <FaChevronRight />
                                        </button>
                                        </li>
                                    </ul>
                                </>
                            )}

                            {showGoogleVerify && (
                                <div className="login-withgoogle ">
                                    <p className="text-[17px] font-[500] text-black">
                                        For your account security, we need to make sure it's really you, you have another way to verify your identity.
                                    </p>
                                    <div className="flex items-center justify-between gap-2 mt-4 border border-gray-400 rounded-md p-2" >
                                        <div className="">
                                            <p className="font-semibold">Use Google account to verify identity</p>
                                            <div className="pt-2 flex items-center gap-1">
                                                <FcGoogle className="text-xl" />
                                                <p className="text-[14px] font-[500]">Moheen deal...</p>
                                                <p className="text-[#777] text-[14px]">moheendealsracde@gmail.com</p>
                                            </div>
                                        </div>
                                        <FaChevronRight />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditEmailVerificationMobileBottomModel;
