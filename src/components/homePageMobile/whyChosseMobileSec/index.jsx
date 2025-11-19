"use client";
import React, { useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";

const WhyChosseMobileSec = () => {
  const topTextItems = [
    {
      icon: <MdOutlinePriceChange size={18} color="#000" />,
      title: "Price adjustment",
      subtitle: "Within 30 days",
    },
    {
      icon: <TbTruckDelivery size={18} color="#000" />,
      title: "Delivery guarantee",
      subtitle: "We’re here anytime",
    },
    {
      icon: <FaLock size={18} color="#000" />,
      title: "Secure Payments",
      subtitle: "100% safe checkout",
    },
  ];

  const bottomTextItems = [
    {
      icon: (
        <svg
          className="WPHi-Fur"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          width="1.4rem"
          height="1.4rem"
          fill="#fff"
        >
          <path d="M549.7 128.9l284.8 111.9c27.3 10.7 44.8 37.6 43.5 66.9l-6.9 165.7c-5.7 135.5-73.3 260.9-183.4 340l-58.7 42.2c-72 51.7-168.9 51.7-240.9 0.1l-57.5-41.3c-109.9-79-176.5-204.7-180.2-340l-4.6-167c-0.8-28.6 16.3-54.7 42.8-65.6l275.3-112.3c27.5-11.2 58.2-11.4 85.8-0.6z"></path>
        </svg>
      ),
      title: "Why choose Temu?",
      subtitle: "Safe payments",
    },
    {
      icon: <TbShieldCheck size={18} color="#fff" />,
      title: "Trusted Vendor",
      subtitle: "Verified & secure",
    },
    {
      icon: <RiCustomerService2Fill size={18} color="#fff" />,
      title: "24/7 Support",
      subtitle: "Always here for you",
    },
  ];

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  useEffect(() => {
    const topTimer = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % topTextItems.length);
    }, 5000);

    const bottomTimer = setInterval(() => {
      setBottomIndex((prev) => (prev + 1) % bottomTextItems.length);
    }, 5000);

    return () => {
      clearInterval(topTimer);
      clearInterval(bottomTimer);
    };
  }, []);

  return (
    <div className="whychsoose-mobile py-3 px-3 lg:px-0">
      {/* Top section */}
      <div className="bg-[#ffefe0] rounded-t-lg p-3 flex justify-between items-center">
        <div className="w-[45%]">
          <p className="text-[#0A8800] font-semibold text-[14px] md:text-xl flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="1.4rem"
              height="1.4rem"
              fill="currentColor"
              color="#0A8800"
              className="icon-11_4i"
            >
              <path d="M930.4 227.8l-108.2-84.8-409.5 522.4-243.1-188.7-84.3 108.6 351.2 272.7z"></path>
            </svg>
            Free shipping
          </p>
          <p className="text-[#4B4743] text-[13px] md:text-lg font-normal pt-1">
            Limited-time offer
          </p>
        </div>

        <div className="h-8 w-px bg-black"></div>

        {/* Animated top text */}
        <div className="overflow-hidden w-[45%] h-[40px] md:h-[60px] flex flex-col justify-start relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={topIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full flex flex-col justify-center"
            >
              <p className="text-[#000000] font-semibold text-[12px] md:text-xl flex items-center gap-1">
                {topTextItems[topIndex].icon}
                {topTextItems[topIndex].title}
              </p>
              <p className="text-[#4B4743] text-[13px] md:text-lg font-normal pt-1">
                {topTextItems[topIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom green bar with animation */}
      <div className="bg-[#0A8800] flex justify-between items-center py-1 px-2 rounded-md mt-2 overflow-hidden relative my-auto h-[40px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bottomIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className=" top-0 left-0 w-full flex justify-between items-center"
          >
            <p className="flex items-center gap-1 text-white text-[13px] md:text-xl font-bold">
              {bottomTextItems[bottomIndex].icon}
              {bottomTextItems[bottomIndex].title}
            </p>
            <p className="flex gap-1 items-center text-white text-[14px] md:text-lg font-[500]">
              {bottomTextItems[bottomIndex].subtitle}
              <GoChevronRight />
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhyChosseMobileSec;
