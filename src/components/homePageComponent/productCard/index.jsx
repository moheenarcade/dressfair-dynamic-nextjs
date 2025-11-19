"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import { RiStarFill } from "react-icons/ri";
import ProductDetailModal from "@/components/models/ProductDetailModal";

const messages = [
  { title: "Best-Selling Item", subtitle: "in Temporary Tattoos" },
  { title: "Hot Pick", subtitle: "for Trend Lovers" },
  { title: "Top Rated", subtitle: "by 5,000+ Buyers" },
  { title: "Editor’s Choice", subtitle: "Limited Time Offer" },
  { title: "Most Loved", subtitle: "by Happy Customers" },
  { title: "Exclusive Deal", subtitle: "Just for You" },
];

const getRandomRating = () => {
  const ratings = [4.5, 4, 4.2, 4.5, 4.7, 5];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const getRandomSold = () => {
  const soldCounts = ["2k", "5k", "12k", "22k", "32k", "45k", "112k"];
  return soldCounts[Math.floor(Math.random() * soldCounts.length)];
};

const ProductCard = ({ products = [], gridClass }) => {
  console.log(products, "product list here")
  const defaultGrid = "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";


  return (
    <div className={`grid ${gridClass ? gridClass : defaultGrid} gap-1`}>
      {products.map((product, index) => (
        <SingleProduct key={index} product={product} />
      ))}
    </div>
  );
};

const SingleProduct = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <Link href={`/p/${product.sku}`}>
        <div className="single-product p-2 group transition-all duration-500 ease-in-out cursor-pointer hover:bg-white rounded-md hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
          <div className="product-banner w-full h-[260px]">
            <Image
              className="w-full h-full object-cover"
              src={product.image}
              alt={product?.name || "product banner"}
              width={300}
              height={300}
            />
          </div>

          <div className="product-content">
            <p className="line-clamp-2 text-[#555] text-[14px] font-medium py-1">
              {product.name}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-black font-medium text-[15px] flex items-center gap-1">
                Rs. <span className="text-lg font-bold">{product.sale_price}</span>
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


            <div className="deals-rating flex items-center gap-1 mt-1">
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
          </div>
        </div>
      </Link>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        productSku={product.sku}
      />
    </>
  );
};

export default ProductCard;
