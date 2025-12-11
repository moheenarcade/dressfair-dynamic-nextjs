"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiCartAdd } from "react-icons/bi";
import { RiStarFill } from 'react-icons/ri';
import Link from 'next/link';
import MobileAddToCartBottomModal from '@/components/models/MobileAddToCartBottomModal';
import { CgClose } from 'react-icons/cg';
import ProductColorSize from '@/components/productDetailPageComponent/productColorSize';

const getRandomRating = () => {

    const ratings = [4.5, 4, 4.2, 4.5, 4.7, 5];
    return ratings[Math.floor(Math.random() * ratings.length)];
};

const getRandomSold = () => {
    const soldCounts = ["2k", "5k", "12k", "22k", "32k", "45k", "112k"];
    return soldCounts[Math.floor(Math.random() * soldCounts.length)];
};

const ProductCardMobile = ({ products = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [randomRating] = useState(getRandomRating());
    const [randomSold] = useState(getRandomSold());
    const [selectedProductSku, setSelectedProductSku] = useState(null);

    // console.log(products, "mobile product list ")
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2">
                {products.map((product, index) => (
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
                                        Rs.<span className="text-[15px] font-bold">{product.sale_price}</span>

                                        <span className="text-[11px] text-[#555] font-medium flex items-center">
                                            <svg xmlns='http://www.w3.org/2000/svg' className='text-[#fb7701]' viewBox='0 0 1024 1024' style={{ width: '1em', height: '1em' }} fill='#fb7701' overflow='hidden'><path d='M433.9 8.5C580.2 94.2 679 249.2 682.6 427c29.6-29.3 51.3-66.4 61.6-107.8l.6-3.1c86.9 67.1 142.7 170.9 142.7 287.4 0 6.9-.2 13.8-.6 20.7.4 6.4.6 12.8.6 19.3 0 202.3-168.1 366.3-375.5 366.3s-375.5-164-375.5-366.3c0-101.3 42.1-192.9 110.3-259.3 88.6-101.4 152.8-223.8 183.4-358.4l3.7-17.3z' fill='#fb7701' /></svg>
                                            {randomSold}+sold
                                        </span>

                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            e.stopPropagation(); 
                                            setSelectedProductSku(product.sku);
                                            setIsModalOpen(true);
                                        }}
                                        className="border hover:scale-[1.05] transition-all duration-500 ease-in-out border-black rounded-full px-2 py-[1px] flex justify-center items-center">
                                        <BiCartAdd className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            {/* Modal */}
            <MobileAddToCartBottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
              productSku={selectedProductSku} 
                />
        </>
    )
}

export default ProductCardMobile;
