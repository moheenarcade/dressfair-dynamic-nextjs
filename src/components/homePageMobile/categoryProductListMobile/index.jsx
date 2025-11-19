"use client";
import React, { useState, useRef } from "react";
import ProductImage from "../../../../public/deals-product4.avif";
import ProductImage2 from "../../../../public/deals-product3.avif";
import ProductCardMobile from '../productCardMobile';
import { LuChevronRight } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { BsCheckLg } from "react-icons/bs";
import Image from "next/image";

const products = [
    { id: 1, title: "Men's Jacket - Milano Italia", price: 1899, rating: 5, sold: '1k', image: ProductImage, category: "Men" },
    { id: 2, title: "Wireless Earbuds Pro 5.0", price: 2999, rating: 5, sold: '23k', image: ProductImage2, category: "Electronics" },
    { id: 3, title: "Smart Watch Series 8", price: 8499, rating: 4.5, sold: '2k', image: ProductImage, category: "Electronics" },
    { id: 4, title: "Stylish Handbag for Women", price: 2499, rating: 4.5, sold: '12k', image: ProductImage2, category: "Crafts" },
    { id: 5, title: "Casual Sneakers for Men", price: 3599, rating: 4.5, sold: '21k', image: ProductImage, category: "Men" },
    { id: 6, title: "Hair Dryer Pro 2200W", price: 1999, rating: 4.5, sold: '32k', image: ProductImage, category: "Beauty" },
    { id: 7, title: "Smart Home Security Camera", rating: 5, price: 5499, sold: '2k', image: ProductImage2, category: "Electronics" },
    { id: 8, title: "Toy Car Set for Kids", rating: 4.5, price: 1499, sold: '23k', image: ProductImage, category: "Crafts" },
];

const tabsProductList = [
    "All",
    "5-Star Rated",
    "Best-Selling Items",
    "New In",
    "Men",
    "Crafts",
];


const CategoryProductListMobile = () => {
    const tabsContainerRef = useRef(null);
    const swiperRef = useRef(null);
    const [activeTab, setActiveTab] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState(null);
    // ✅ Filter logic
    const filteredProducts = products.filter((p) => {
        if (activeTab === "All") return true;
        if (activeTab === "5-Star Rated") return p.rating === 5;
        if (activeTab === "Best-Selling Items") return parseInt(p.sold) > 10;
        if (activeTab === "New In") return p.id > 5;
        return p.category === activeTab;
    });
    const handleTabClick = (tab) => {
        setActiveTab(tab);

        // Smooth scroll to keep active tab visible
        const tabElement = document.getElementById(`tab-${tab}`);
        if (tabElement && tabsContainerRef.current) {
            tabsContainerRef.current.scrollTo({
                left: tabElement.offsetLeft - tabsContainerRef.current.offsetLeft,
                behavior: "smooth",
            });
        }
    };
    return (
        <>
            <div className="relative">
                <div className="bg-[#FEEFE1] py-2 px-3 flex items-center justify-between sticky top-0">
                    <p className="text-black text-sm font-semibold flex items-center gap-1 ">
                        <BsCheckLg className="text-[#0b8a00] text-xl" />
                        Free shipping for you
                    </p>
                    <p className="text-[13px] flex items-center gap-1 text-[#4b4743] font-semibold">
                        Limited-time offer
                        <LuChevronRight />
                    </p>
                </div>
                <div className="tabs-main pt-3 pb-4 px-2">
                    {/* Tabs */}

                    <div
                        ref={tabsContainerRef}
                        className="overflow-x-auto scrollbar-hide whitespace-nowrap"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                    >
                        <ul className="flex items-start text-[#777777] font-semibold text-[15px] min-w-max px-2">
                            {tabsProductList.map((tab) => (
                                <li
                                    key={tab}
                                    id={`tab-${tab}`}
                                    onClick={() => handleTabClick(tab)}
                                    className={`cursor-pointer overflow-hidden w-20 pb-4 flex flex-col justify-center items-center text-center transition-all duration-300
               ${activeTab === tab
                                            ? 'text-black border-black'
                                            : 'hover:text-gray-800'
                                        }`}
                                >
                                    <Image className={`rounded-full h-16 w-16 border-[1.5px] p-[1.8px] mb-1 ${activeTab === tab ? "border-black" : "border-transparent"}`} src={ProductImage2} alt="category" />
                                    <p className={`text-[10px] w-fit mx-auto px-2 py-1 leading-2.5 rounded-full text-wrap line-clamp-2 ${activeTab === tab ? "bg-black text-white" : ""}`}>{tab}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-1">
                        <ProductCardMobile products={filteredProducts} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryProductListMobile;
