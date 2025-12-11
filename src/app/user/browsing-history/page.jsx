"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { LuCheck, LuChevronRight } from "react-icons/lu";
import Product1 from "../../../../public/delas-prodcuct2.avif";
import { RiStarFill } from "react-icons/ri";
import DealTimer from '../../../components/homePageComponent/dealTimer/index';
import Product2 from "../../../../public/deals-product3.avif";
import Product3 from "../../../../public/deals-product4.avif";
import Product4 from "../../../../public/delas-prodcuct2.avif";
import Product5 from "../../../../public/dealsproduct1.avif";
import { motion, AnimatePresence } from "framer-motion";
import { BiCartAdd, BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';

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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [randomRating] = useState(getRandomRating());
  const [randomSold] = useState(getRandomSold());
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * 10000) + 12000;
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % messages.length);
    }, randomInterval);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div className="hidden lg:block">
        <div className="flex items-center justify-between px-2 mb-3">
          <p className='text-lg font-semibold'>Today</p>
          <button className='hover:text-[#fb7701]'>
            Manage
          </button>
        </div>
        <div className="hidden xl:block ">
          <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-1">
            {products?.slice(0, 4).map((product) => (
              <div key={product.id}>
                <Link href="#">
                  <div className="single-product p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                    <div className="product-img overflow-hidden w-full object-cover h-[250px] bg-[#00000008] flex items-center justify-center">
                      <Image
                        className='w-full h-full object-cover transition-all duration-500 ease-in-out'
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
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
            {products?.slice(0, 4).map((product, index) => (
              <Link key={index} href={`/p/${product.sku}`}>
                <div
                  className="single-product xl:p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]"
                >
                  <div className="product-banner w-full aspect-square">
                    <Image
                      className="w-full h-full object-cover rounded-sm"
                      src={product.image}
                      alt={product.name || "product banner"}
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="product-content">
                    <p className="line-clamp-1 text-[#555] text-[13px] font-medium py-1">
                      {product.name}
                    </p>
                    <div className="deals-rating flex items-center gap-1">
                      <div className="flex items-center text-[13px] gap-1">
                        {[...Array(5)].map((_, index) => (
                          <RiStarFill
                            key={index}
                            className={
                              index < Math.floor(randomRating) ? "text-black" : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-[#777] font-semibold">{randomRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <p className="text-black flex-wrap font-medium text-[13px] flex items-center md:gap-1">
                        Rs.<span className="text-[15px] font-bold">{product.originalPrice}</span>

                        <span className="text-[11px] text-[#555] font-medium flex items-center">
                          <svg xmlns='http://www.w3.org/2000/svg' className='text-[#fb7701]' viewBox='0 0 1024 1024' style={{ width: '1em', height: '1em' }} fill='#fb7701' overflow='hidden'><path d='M433.9 8.5C580.2 94.2 679 249.2 682.6 427c29.6-29.3 51.3-66.4 61.6-107.8l.6-3.1c86.9 67.1 142.7 170.9 142.7 287.4 0 6.9-.2 13.8-.6 20.7.4 6.4.6 12.8.6 19.3 0 202.3-168.1 366.3-375.5 366.3s-375.5-164-375.5-366.3c0-101.3 42.1-192.9 110.3-259.3 88.6-101.4 152.8-223.8 183.4-358.4l3.7-17.3z' fill='#fb7701' /></svg>
                          {randomSold}+sold
                        </span>
                      </p>
                      <button

                        className="border hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-2 py-[1px] flex justify-center items-center">
                        <BiCartAdd className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-12">
          <div className="flex items-center justify-between px-2 mb-3">
            <p className='text-lg font-semibold'>Nov 26, 2025</p>
          </div>
        </div>
        <div className="hidden xl:block">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-1">
            {products?.slice(0, 2).map((product) => (
              <div key={product.id}>
                <Link href="#">
                  <div className="single-product p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                    <div className="product-img overflow-hidden w-full h-[250px] bg-[#00000008] flex items-center justify-center">
                      <Image
                        className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-500 ease-in-out'
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
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
            {products?.slice(0, 4).map((product, index) => (
              <Link key={index} href={`/p/${product.sku}`}>
                <div
                  className="single-product xl:p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]"
                >
                  <div className="product-banner w-full aspect-square">
                    <Image
                      className="w-full h-full object-cover rounded-sm"
                      src={product.image}
                      alt={product.name || "product banner"}
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="product-content">
                    <p className="line-clamp-1 text-[#555] text-[13px] font-medium py-1">
                      {product.name}
                    </p>
                    <div className="deals-rating flex items-center gap-1">
                      <div className="flex items-center text-[13px] gap-1">
                        {[...Array(5)].map((_, index) => (
                          <RiStarFill
                            key={index}
                            className={
                              index < Math.floor(randomRating) ? "text-black" : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-[#777] font-semibold">{randomRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <p className="text-black flex-wrap font-medium text-[13px] flex items-center md:gap-1">
                        Rs.<span className="text-[15px] font-bold">{product.originalPrice}</span>

                        <span className="text-[11px] text-[#555] font-medium flex items-center">
                          <svg xmlns='http://www.w3.org/2000/svg' className='text-[#fb7701]' viewBox='0 0 1024 1024' style={{ width: '1em', height: '1em' }} fill='#fb7701' overflow='hidden'><path d='M433.9 8.5C580.2 94.2 679 249.2 682.6 427c29.6-29.3 51.3-66.4 61.6-107.8l.6-3.1c86.9 67.1 142.7 170.9 142.7 287.4 0 6.9-.2 13.8-.6 20.7.4 6.4.6 12.8.6 19.3 0 202.3-168.1 366.3-375.5 366.3s-375.5-164-375.5-366.3c0-101.3 42.1-192.9 110.3-259.3 88.6-101.4 152.8-223.8 183.4-358.4l3.7-17.3z' fill='#fb7701' /></svg>
                          {randomSold}+sold
                        </span>
                      </p>
                      <button

                        className="border hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-2 py-[1px] flex justify-center items-center">
                        <BiCartAdd className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="block lg:hidden relative">
        <div className="sticky top-0 bg-white z-50 pt-1">
          <div className="flex items-center justify-between px-4">
            <p className='invisible'>
              Manage
            </p>
            <p className='text-md font-semibold'>Browsing history</p>
            <button className='text-[#222] text-sm font-[500]'>
              Manage
            </button>
          </div>
          <div className="bg-[#FEEFE1] py-1 mt-3 flex items-center justify-between border-t border-t-gray-200 text-[#0A8800] font-[600]">
            <div className="flex items-center gap-1 px-2">
              <LuCheck />
              <p className='text-[12px]'>Free shipping</p>
            </div>
            <div className="h-6 w-px"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 0%, #000, rgba(255,255,255,0) 100%)' }}></div>
            <div className="flex items-center gap-1 px-2">
              <LuCheck />
              <p className='text-[12px]'>Price adjustment within 30 days</p>
              <FiChevronRight />
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <p className='text-[#222] px-4 font-[500] pt-2 text-[15px]'>Items you viewed dropped in price</p>
            <div className="flex gap-2 mt-2 border-b-6  border-b-gray-100 pb-3 px-4">
              <Image className='w-18 h-18 rounded-sm' width={100} height={100} src="/deals-product3.avif" alt="product" />
              <div className="flex flex-col justify-between">
                <div className="">
                  <p className='line-clamp-1 text-[#222] text-[13px] font-[500]'>1pc Tuxedo Sam 20oz Stainless Steel Tumbler with Straw - Cute Penguin Design, Durable 304 Stainless Steel, Perfect for Hot & Cold Drinks, Ideal Gift for Friends, Penguin Gifts, Family, Travel, Office, Outdoor Activities, Birthday, Christmas</p>
                  <p className='text-[12px] font-[500] text-[#fb7701]'>Rs.32 cheaper than before</p>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <p className='text-[#222] font-[600]'><span className='text-[12px]'>RS.</span>5,833</p>
                    <p className='line-through text-gray-400 text-sm font-[500]'>10,007</p>
                  </div>
                  <button className="border hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-2 py-[1px] flex justify-center items-center">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path><path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="today border-b-6  border-b-gray-100">
              <p className='text-md font-semibold px-4 pt-3'>Today</p>
              <div className="flex gap-2 mt-2 pb-3 px-4">
                <Image className='w-[40%] h-auto rounded-sm' width={100} height={100} src="/deals-product3.avif" alt="product" />
                <div className="flex flex-col justify-between">
                  <div className="">
                    <p className='line-clamp-1 text-[#222] text-[15px] font-[500]'>1pc Tuxedo Sam 20oz Stainless Steel Tumbler with Straw - Cute Penguin Design, Durable 304 Stainless Steel, Perfect for Hot & Cold Drinks, Ideal Gift for Friends, Penguin Gifts, Family, Travel, Office, Outdoor Activities, Birthday, Christmas</p>
                    <p className='bg-[#e6edfe] rounded-sm px-2 text-[12px] font-[500] w-fit'>
                      Brand: SANRIO
                    </p>

                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className='text-[12px] font-[500] text-[#fb7701]'>Rs.32 cheaper than before</p>
                    <div className="flex items-center gap-2">
                      <p className='text-[#222] font-[600]'><span className='text-[12px]'>RS.</span>5,833</p>
                      <p className='line-through text-gray-400 text-sm font-[500]'>10,007</p>
                      <p className='border border-[#fb7701] rounded-sm text-[#fb7701] px-1 text-[11px] font-semibold'>
                        -47%
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <button className='bg-[#fb7701] text-white py-1 px-8 rounded-full font-semibold text-[11px] md:text-lg'>
                        Add to cart
                      </button>
                      <div
                        className="relative inline-block"
                        ref={dropdownRef}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        {/* Button */}
                        <button
                          className="text-2xl p-2"
                          onClick={() => setOpen((prev) => !prev)}
                        >
                          <BiDotsHorizontalRounded />
                        </button>

                        {/* Dropdown */}
                        {open && (
                          <div
                            className="absolute right-0 -mt-2 w-30 bg-white shadow-lg rounded-md shadow-xl border border-gray-100 z-50"
                          >
                            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                              Find similar
                            </button>
                            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded border-t border-t-gray-100">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2  pb-3 px-4">
                <Image className='w-[40%] h-auto rounded-sm' width={100} height={100} src="/deals-product3.avif" alt="product" />
                <div className="flex flex-col justify-between">
                  <div className="">
                    <p className='line-clamp-1 text-[#222] text-[15px] font-[500]'>1pc Tuxedo Sam 20oz Stainless Steel Tumbler with Straw - Cute Penguin Design, Durable 304 Stainless Steel, Perfect for Hot & Cold Drinks, Ideal Gift for Friends, Penguin Gifts, Family, Travel, Office, Outdoor Activities, Birthday, Christmas</p>
                    <p className='bg-[#e6edfe] rounded-sm px-2 text-[12px] font-[500] w-fit'>
                      Brand: SANRIO
                    </p>

                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className='text-[12px] font-[500] text-[#fb7701]'>Rs.32 cheaper than before</p>
                    <div className="flex items-center gap-2">
                      <p className='text-[#222] font-[600]'><span className='text-[12px]'>RS.</span>5,833</p>
                      <p className='line-through text-gray-400 text-sm font-[500]'>10,007</p>
                      <p className='border border-[#fb7701] rounded-sm text-[#fb7701] px-1 text-[11px] font-semibold'>
                        -47%
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <button className='bg-[#fb7701] text-white py-1 px-8 rounded-full font-semibold text-[11px] md:text-lg'>

                        Add to cart
                      </button>
                      <div
                        className="relative inline-block"
                        ref={dropdownRef}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        {/* Button */}
                        <button
                          className="text-2xl p-2"

                        >
                          <BiDotsHorizontalRounded />
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrowsingHistory;
