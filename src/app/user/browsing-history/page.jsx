"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { LuChevronRight } from "react-icons/lu";
import Product1 from "../../../../public/delas-prodcuct2.avif";
import { RiStarFill } from "react-icons/ri";
import DealTimer from '../../../components/homePageComponent/dealTimer/index';
import Product2 from "../../../../public/deals-product3.avif";
import Product3 from "../../../../public/deals-product4.avif";
import Product4 from "../../../../public/delas-prodcuct2.avif";
import Product5 from "../../../../public/dealsproduct1.avif";
import { motion, AnimatePresence } from "framer-motion";
import { BiCartAdd } from 'react-icons/bi';

// Generate random dates for different timer states
const getRandomDate = (hoursFromNow) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date;
};

const getRandomRating = () => {
  const ratings = [4.5, 4, 4.2, 4.5, 4.7, 5];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const getRandomSold = () => {
  const soldCounts = ["2k", "5k", "12k", "22k", "32k", "45k", "112k"];
  return soldCounts[Math.floor(Math.random() * soldCounts.length)];
};

const messages = [
  { title: "Best-Selling Item", subtitle: "in Temporary Tattoos" },
  { title: "Hot Pick", subtitle: "for Trend Lovers" },
  { title: "Top Rated", subtitle: "by 5,000+ Buyers" },
  { title: "Editor’s Choice", subtitle: "Limited Time Offer" },
  { title: "Most Loved", subtitle: "by Happy Customers" },
  { title: "Exclusive Deal", subtitle: "Just for You" },
];

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones - Ending Soon",
    image: Product1,
    price: 9093,
    originalPrice: 33725,
    discount: 65,
    sold: 758,
    rating: 4.5,
    reviewCount: 323,
    endDate: getRandomDate(2), // Ends in 2 hours (near end)
  },
  {
    id: 2,
    name: "Smart Watch Series 5 - Half Time",
    image: Product2,
    price: 12000,
    originalPrice: 25000,
    discount: 52,
    sold: 432,
    rating: 4.2,
    reviewCount: 156,
    endDate: getRandomDate(12), // Ends in 12 hours (half time)
  },
  {
    id: 3,
    name: "Portable Speaker - Just Started",
    image: Product3,
    price: 7500,
    originalPrice: 15000,
    discount: 50,
    sold: 289,
    rating: 4.7,
    reviewCount: 89,
    endDate: getRandomDate(14), // Ends in 24 hours (just started)
  },
  {
    id: 4,
    name: "Gaming Mouse - Almost Over",
    image: Product4,
    price: 15999,
    originalPrice: 32000,
    discount: 50,
    sold: 621,
    rating: 4.0,
    reviewCount: 245,
    endDate: getRandomDate(1.5), // Ends in 1 hour (almost over)
  },
  {
    id: 5,
    name: "Mechanical Keyboard - Half Time",
    image: Product5,
    price: 11250,
    originalPrice: 22500,
    discount: 50,
    sold: 387,
    rating: 4.3,
    reviewCount: 178,
    endDate: getRandomDate(18), // Ends in 18 hours (half time)
  },
  {
    id: 6,
    name: "USB-C Hub - Just Started",
    image: Product1,
    price: 11250,
    originalPrice: 25000,
    discount: 55,
    sold: 387,
    rating: 4.3,
    reviewCount: 178,
    endDate: getRandomDate(16),
  },
  {
    id: 7,
    name: "Power Bank - Ending Soon",
    image: Product2,
    price: 11250,
    originalPrice: 25000,
    discount: 55,
    sold: 387,
    rating: 4.3,
    reviewCount: 178,
    endDate: getRandomDate(3), // Ends in 3 hours (ending soon)
  },
  {
    id: 8,
    name: "Webcam - Almost Over",
    image: Product3,
    price: 11250,
    originalPrice: 25000,
    discount: 55,
    sold: 387,
    rating: 4.3,
    reviewCount: 178,
    endDate: getRandomDate(5), // Ends in 30 minutes (almost over)
  },
  {
    id: 9,
    name: "Tablet Stand - Half Time",
    image: Product4,
    price: 11250,
    originalPrice: 25000,
    discount: 55,
    sold: 387,
    rating: 4.3,
    reviewCount: 178,
    endDate: getRandomDate(15), // Ends in 15 hours (half time)
  },
];

const BrowsingHistory = () => {
  const swiperRef = useRef(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState(
    Math.floor(Math.random() * messages.length)
  );

  const [randomRating] = useState(getRandomRating());
  const [randomSold] = useState(getRandomSold());

  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * 10000) + 12000;
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % messages.length);
    }, randomInterval);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };


  return (
    <>
      <div className="hidden xl:block">
        <div className="flex items-center justify-between px-2 mb-3">
          <p className='text-lg font-semibold'>Today</p>
          <button className='hover:text-[#fb7701]'>
            Manage
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">
          {products?.slice(0, 4).map((product) => (
            <div key={product.id}>
              <Link href="#">
                <div className="single-product p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                  <div className="product-img overflow-hidden w-full md:w-[250px] h-[250px] bg-[#00000008] flex items-center justify-center">
                    <Image
                      className='w-full h-full object-contain group-hover:scale-[1.2] transition-all duration-500 ease-in-out'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-content">
                    <p className="line-clamp-1 text-[#555] text-[14px] font-medium py-1">
                      {product.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-black font-medium text-[15px] flex items-center gap-1">
                        Rs. <span className="text-lg font-bold">{product.originalPrice}</span>
                        {product.price && (
                          <span className="line-through text-[13px] text-[#555] font-medium">
                            {product.price}
                          </span>
                        )}
                        <span className="text-[11px] text-[#555] font-medium flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#fb7701]"
                            viewBox="0 0 1024 1024"
                            style={{ width: "1em", height: "1em" }}
                            fill="#fb7701"
                            overflow="hidden"
                          >
                            <path d="M433.9 8.5C580.2 94.2 679 249.2 682.6 427c29.6-29.3 51.3-66.4 61.6-107.8l.6-3.1c86.9 67.1 142.7 170.9 142.7 287.4 0 6.9-.2 13.8-.6 20.7.4 6.4.6 12.8.6 19.3 0 202.3-168.1 366.3-375.5 366.3s-375.5-164-375.5-366.3c0-101.3 42.1-192.9 110.3-259.3 88.6-101.4 152.8-223.8 183.4-358.4l3.7-17.3z" />
                          </svg>
                          {randomSold}+sold
                        </span>
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                        className="border-[1.2px] hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-3 py-0.5 flex justify-center items-center">
                        <BiCartAdd className="text-2xl" />
                      </button>
                    </div>
                  </div>
                  {/* 💫 Smooth vertical text swap */}
                  <div className="card-promotional-content overflow-hidden h-[22px] relative">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={activeMessageIndex}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute w-full flex font-[500] gap-1"
                      >
                        <p className="text-[#0a8800] text-[13px]">
                          {messages[activeMessageIndex].title}
                        </p>
                        <span className="text-[14px] text-[#555]">
                          {messages[activeMessageIndex].subtitle}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="deals-rating flex items-center gap-1">
                    <div className="flex items-center text-[13px] gap-1">
                      {[...Array(5)].map((_, index) => (
                        <RiStarFill
                          key={index}
                          className={index < Math.floor(product.rating) ? 'text-black' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className='text-[13px]'>{product.reviewCount}</p>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-12">
          <div className="flex items-center justify-between px-2 mb-3">
            <p className='text-lg font-semibold'>Nov 26, 2025</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">
          {products?.slice(0, 2).map((product) => (
            <div key={product.id}>
              <Link href="#">
                <div className="single-product p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                  <div className="product-img overflow-hidden w-full md:w-[250px] h-[250px] bg-[#00000008] flex items-center justify-center">
                    <Image
                      className='w-full h-full object-contain group-hover:scale-[1.2] transition-all duration-500 ease-in-out'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-content">
                    <p className="line-clamp-1 text-[#555] text-[14px] font-medium py-1">
                      {product.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-black font-medium text-[15px] flex items-center gap-1">
                        Rs. <span className="text-lg font-bold">{product.originalPrice}</span>
                        {product.price && (
                          <span className="line-through text-[13px] text-[#555] font-medium">
                            {product.price}
                          </span>
                        )}
                        <span className="text-[11px] text-[#555] font-medium flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#fb7701]"
                            viewBox="0 0 1024 1024"
                            style={{ width: "1em", height: "1em" }}
                            fill="#fb7701"
                            overflow="hidden"
                          >
                            <path d="M433.9 8.5C580.2 94.2 679 249.2 682.6 427c29.6-29.3 51.3-66.4 61.6-107.8l.6-3.1c86.9 67.1 142.7 170.9 142.7 287.4 0 6.9-.2 13.8-.6 20.7.4 6.4.6 12.8.6 19.3 0 202.3-168.1 366.3-375.5 366.3s-375.5-164-375.5-366.3c0-101.3 42.1-192.9 110.3-259.3 88.6-101.4 152.8-223.8 183.4-358.4l3.7-17.3z" />
                          </svg>
                          {randomSold}+sold
                        </span>
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                        className="border-[1.2px] hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-3 py-0.5 flex justify-center items-center">
                        <BiCartAdd className="text-2xl" />
                      </button>
                    </div>
                  </div>
                  {/* 💫 Smooth vertical text swap */}
                  <div className="card-promotional-content overflow-hidden h-[22px] relative">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={activeMessageIndex}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute w-full flex font-[500] gap-1"
                      >
                        <p className="text-[#0a8800] text-[13px]">
                          {messages[activeMessageIndex].title}
                        </p>
                        <span className="text-[14px] text-[#555]">
                          {messages[activeMessageIndex].subtitle}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="deals-rating flex items-center gap-1">
                    <div className="flex items-center text-[13px] gap-1">
                      {[...Array(5)].map((_, index) => (
                        <RiStarFill
                          key={index}
                          className={index < Math.floor(product.rating) ? 'text-black' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className='text-[13px]'>{product.reviewCount}</p>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="block xl:hidden">

      </div>
    </>
  )
}

export default BrowsingHistory;
