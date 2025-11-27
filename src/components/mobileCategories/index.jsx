"use client";
import React, { useEffect, useState } from "react";
import { TbChevronRight } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import Image from 'next/image';
import Link from "next/link";
import ProductBanner from "../../../public/Solid_gray.png";
import { getLocalCategories } from "@/lib/api";

const MobileCategories = ({ onClose, categories }) => {
    const [activeCategory, setActiveCategory] = useState(categories?.[0] || null);

    useEffect(() => {
        const storedSlug = sessionStorage.getItem("selectedCategorySlug");
        const localCats = getLocalCategories(); 
        if (storedSlug) {
            const foundCategory = categories.find(cat => cat.slug === storedSlug);
            if (foundCategory) setActiveCategory(foundCategory);
        } else {
            setActiveCategory(localCats[0] || null);
        }
    }, [categories]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (

        <>
            <div className="mobile-cat-sec bg-white w-full h-[100vh] lg:h-screen fixed block xl:hidden z-[99999999999]">
                <div className="cat-top-strip bg-[#FEEFE1] px-2 py-2 flex justify-between items-center">
                    <p className='flex items-center gap-1 text-[#000000] text-sm'>
                        <FaCheck className='text-[#0b8802] text-lg' />
                        <span className='font-semibold'> Free shipping for you</span>
                    </p>
                    <p className='flex items-center gap-1 text-[#4B4743] text-[12px] font-semibold'>
                        Limited-time offer
                        <TbChevronRight className='text-lg' />
                    </p>
                </div>

                <div className="cat-list h-full flex">
                    {/* Left Side Categories */}
                    <div className="left-side bg-[#f6f6f6] w-[36%] h-full overflow-y-scroll pb-12">
                        <ul className="mobile-cat-list text-[13px] font-semibold">
                            {categories?.length > 0 &&
                                categories.map((cat) => (
                                    <li
                                        key={cat.slug}
                                        onMouseEnter={() => setActiveCategory(cat)}

                                        onClick={() => {
                                            setActiveCategory(cat);
                                            sessionStorage.setItem("selectedCategorySlug", cat.slug);
                                            sessionStorage.setItem("selectedCategoryId", cat.id);

                                        }}
                                        className={`py-2 px-2 border-l-3 cursor-pointer ${activeCategory && activeCategory.slug === cat.slug
                                            ? "border-l-[#fb7701] bg-white text-black"
                                            : "border-l-transparent hover:border-l-[#fb7701] hover:bg-white text-[#555]"
                                            }`}
                                    >
                                        {cat.name}
                                    </li>

                                ))}
                        </ul>
                    </div>

                    <div className="right-side w-full px-2 pt-2 overflow-y-scroll pb-30">
                        {activeCategory?.sub_categories?.length > 0 ? (
                            <>
                                <p className="text-[14px] font-semibold text-black">
                                    {activeCategory.name}
                                </p>

                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-3">
                                    {activeCategory.sub_categories.map((sub) => (
                                        <>
                                            <Link
                                                key={sub.slug}
                                                href={`/c/${sub?.slug && sub.slug ? sub.slug : activeCategory?.slug}`}
                                                onClick={() => {
                                                    sessionStorage.setItem(
                                                        "selectedCategorySlug",
                                                        sub?.slug && sub.slug.trim() !== "" ? sub.slug : activeCategory?.slug
                                                    );
                                                    onClose();
                                                }}
                                                className="flex flex-col items-center text-center cursor-pointer group hover:scale-[1.06] transition-all duration-500 ease-in-out"
                                            >
                                                <Image
                                                    src={sub.image || ProductBanner}
                                                    alt={sub.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-[80px] h-[80px] rounded-full object-cover"
                                                />
                                                <p className="mt-2 text-[14px]">{sub.name}</p>
                                            </Link>
                                        </>
                                    ))}
                                </div>

                            </>
                        ) : (
                            <p className="text-gray-500">No sub-categories available</p>
                        )}
                    </div>

                </div>
            </div>
        </>

    )
}

export default MobileCategories;
