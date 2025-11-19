"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleRight, FaTruck, FaGift, FaBox } from "react-icons/fa6";
import HeaderOfferModal from "../models/headerOfferModal";
import SpecialForYouModel from "../models/specialForYouModel";
import GetMobileAppModel from "../models/getMobileAppModel";

const messages = [
    {
        title: "Free shipping on all orders",
        subtitle: "Limited-time offer",
        icon: <FaTruck className="text-[#FFF7A7] w-6 h-6" />
    },
    {
        title: "Get 20% off today",
        subtitle: "Use code SAVE20",
        icon: <FaGift className="text-[#FFF7A7] w-6 h-6" />
    },
    {
        title: "New arrivals in stock",
        subtitle: "Check now",
        icon: <FaBox className="text-[#FFF7A7] w-6 h-6" />
    },
];



const HeaderTopContent = () => {
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showSpecialModel, setSpecialModel] = useState(false);
    const [showGetMobileModel, setGetMobileModel] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='bg-black py-1 mb-2 '>
                <div className="container mx-auto px-2 2xl:px-22 flex justify-between">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="2rem" height="2rem" fill="currentColor" color="#ADFFA2" aria-hidden="true"><path d="M675 167.4c44.9 0 81.6 35 84.4 79.2l0.2 5.4 0 58.1 136.4 56.5c29.7 12.3 49.7 40.4 52 72.1l0.2 6 0 224.9c0 44.9-35 81.6-79.2 84.4l-5.4 0.2-7.1 0c-8.2 56-53.2 99.7-108.8 99.7-55.6 0-100.6-43.7-108.8-99.7l-213.6 0c-8.2 56-53.2 99.7-108.8 99.7-55.6 0-100.6-43.7-108.8-99.7l-6.9 0c-44.9 0-81.6-35-84.4-79.2l-0.2-5.4 0-77.1c0-17.7 14.3-32 32-32 16.4 0 29.9 12.4 31.8 28.2l0.2 3.8 0 77.1c0 10.3 7.6 18.9 17.5 20.4l3.1 0.2 494.8 0 0-438.2c0-10.3-7.6-18.9-17.6-20.4l-3-0.2-474.2 0c-10.3 0-18.9 7.6-20.4 17.5l-0.2 3.1 0 78.8 161.2 0c16.4 0 29.9 12.4 31.7 28.3l0.3 3.7c0 16.4-12.4 29.9-28.3 31.8l-3.7 0.2-193.2 0c-16.4 0-29.9-12.4-31.8-28.3l-0.2-3.7 0-110.8c0-44.9 35-81.6 79.2-84.4l5.4-0.2 474.2 0z m-315.1 586.8l-86.8 0c6.5 21.1 23.9 35.7 43.4 35.7 19.4 0 36.8-14.6 43.4-35.7z m431.2 0l-86.8 0c6.5 21.1 23.9 35.7 43.4 35.7 19.4 0 36.8-14.6 43.4-35.7z m-31.5-374.9l0 310.9 104 0c9.2 0 17-6 19.6-14.3l0.8-3.2 0.2-3.1 0-224.9c0-7.3-3.8-13.9-9.9-17.6l-2.8-1.4-111.9-46.4z m-563.4 68.4c17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32l-115.4 0c-17.7 0-32-14.3-32-32 0-17.7 14.3-32 32-32l115.4 0z"></path></svg>
                        <div onClick={() => setShowModal(true)} className="text-[#ADFFA2] hover:underline cursor-pointer">
                            <p className='text-[16px] font-bold flex items-center gap-1'>
                                Free shipping on all orders <FaAngleRight />
                            </p>
                            <p className='text-[14px] font-medium'>
                                Limited-time offer
                            </p>
                        </div>
                    </div>
                    <span className="relative inset-0 w-px h-[33px] my-auto opacity-[0.4] bg-[linear-gradient(rgba(255,255,255,0),#FFFFFF,#FFFFFF,rgba(255,255,255,0))]"></span>
                    <div className="w-[30%] flex justify-center items-center overflow-hidden">

                        <AnimatePresence initial={false}>
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                onClick={() => setSpecialModel(true)}
                                className="absolute flex items-center gap-2 w-fit text-[#FFF7A7] cursor-pointer"
                            >
                                {messages[index].icon}
                                <div>
                                    <p className="text-[16px] font-bold flex items-center gap-1">
                                        {messages[index].title} <FaAngleRight />
                                    </p>
                                    <p className="text-[14px] font-medium">{messages[index].subtitle}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <span className="relative inset-0 w-px h-[33px] my-auto opacity-[0.4] bg-[linear-gradient(rgba(255,255,255,0),#FFFFFF,#FFFFFF,rgba(255,255,255,0))]"></span>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setGetMobileModel(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="2rem" height="2rem" fill="currentColor" color="#FFF7A7" aria-hidden="true"><path d="M754.9 108.3c44.2 0.1 80.3 34.5 83.1 78.1l0.2 5.3 0 667.4c-0.1 44.2-34.5 80.4-78.1 83.1l-5.2 0.2-465.8 0c-44.2-0.1-80.4-34.5-83.1-78.1l-0.2-5.2 0-667.4c0.1-44.2 34.5-80.4 78-83.2l5.3-0.2 465.8 0z m-7.2 66.6l-451.4 0c-13.8 0-25.2 10.3-26.9 23.7l-0.2 3.4 0 646.7c0 13.8 10.3 25.2 23.7 26.9l3.4 0.2 451.4 0c13.8 0 25.2-10.3 26.8-23.7l0.2-3.4 0-646.7c0-13.8-10.3-25.2-23.6-26.9l-3.4-0.2z m-218.2 566.2c24.6 0 44.5 19.9 44.5 44.4 0 24.6-19.9 44.5-44.5 44.5-24.6 0-44.5-19.9-44.4-44.5 0-24.6 19.9-44.5 44.4-44.4z m50.2-514.9c17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32l-115.4 0c-17.7 0-32-14.3-32-32 0-17.7 14.3-32 32-32l115.4 0z"></path></svg>
                        <div className="text-[#FFF7A7] hover:underline">
                            <p className='text-[16px] font-extrabold flex items-center gap-1'>
                                Get the Temu App
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <HeaderOfferModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <SpecialForYouModel isOpen={showSpecialModel} onClose={() => setSpecialModel(false)}/>
            <GetMobileAppModel isOpen={showGetMobileModel} onClose={() => setGetMobileModel(false)} />
        </>
    )
}

export default HeaderTopContent;
