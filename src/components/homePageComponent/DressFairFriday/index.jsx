"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../productCard';
import { getCatalogue } from '@/lib/api';
import Loader from '@/components/loader';
import { FaChevronDown } from 'react-icons/fa6';

const categories = [
    "Recommended", "Men's Fashion", "Women's Fashion", "Electronics", "Mobiles",
    "Home & Kitchen", "Beauty & Health", "Sports", "Toys", "Gadgets",
    "Books", "Automotive", "Jewelry", "Footwear", "Accessories",
    "Stationery", "Gaming", "Pets", "Travel", "Music",
    "Outdoor", "Smart Home", "Baby Products", "Office Supplies", "Fitness"
];

const DressfairFriday = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("Recommended");
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadProducts(page);
    }, [page]);

    const loadProducts = async (pageNumber) => {
        if (pageNumber > 1) setLoadingMore(true);

        const res = await getCatalogue(pageNumber);
        if (res?.success) {
            if (pageNumber === 1) {
                setProducts(res.data);
            } else {
                setProducts(prev => [...prev, ...res.data]);
            }

            setHasMore(res.pagination.has_more_pages);
        }

        setLoading(false);
        setLoadingMore(false);
    };


    const filteredProducts =
        selectedCategory === "Recommended"
            ? products
            : products.filter((p) => p.category === selectedCategory);


    return (
        <div className='dressfair-friday container mx-auto px-2 2xl:px-22 pb-12'>
            <div className="pb-6">
                <h2 className='text-[#cb0904] text-center uppercase font-black text-[22px]'>Dressfair Friday</h2>
                <h3 className='text-black text-[20px] font-extrabold uppercase text-center'>EXPLORE YOUR INTERESTS</h3>
            </div>

            <div className="product-list-cat pb-4 relative px-2">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.category-swiper-next',
                        prevEl: '.category-swiper-prev',
                    }}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    freeMode={false}
                    loop={true}
                    // loopedSlides={categories.length}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 8
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10
                        },
                        1280: {
                            slidesPerView: 8,
                            spaceBetween: 10
                        }
                    }}
                    className="category-swiper"
                >
                    {categories.map((cat, index) => (
                        <SwiperSlide key={index} className="!w-auto">
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className={`single-cat flex items-center justify-center w-fit py-1 lg:py-2 px-3 lg:px-6 border rounded-full transition-all duration-500 ease-in-out font-semibold text-[12px] md:text-sm text-nowrap ${selectedCategory === cat
                                    ? "bg-black text-white border-black"
                                    : "border-[#757575] text-black hover:shadow-md hover:scale-[1.02]"
                                    }`}
                            >
                                {cat}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button className="category-swiper-prev absolute top-[14px] md:top-[18px] left-0 xl:-left-4 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="category-swiper-next absolute top-[14px] md:top-[18px] right-0 xl:-right-4 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <ProductCard products={filteredProducts} />
                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            {loadingMore ? (
                                <button
                                    className="flex items-center gap-4 justify-center py-2 lg:py-3 px-6 lg:px-12 text-lg font-[500] text-gray-500 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    <div className="smallloader mx-auto"></div>
                                    loading...
                                </button>
                            ) : (
                                <button
                                    className="flex items-center gap-2 justify-center py-2 lg:py-3 px-6 lg:px-12 font-semibold text-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#fb6d01] bg-[#fb7701] text-white rounded-full"
                                    onClick={() => setPage(page + 1)}
                                >
                                    See More <FaChevronDown />
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DressfairFriday;