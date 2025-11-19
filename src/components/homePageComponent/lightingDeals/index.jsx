"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'
import { LuChevronRight } from "react-icons/lu";
import Product1 from "../../../../public/delas-prodcuct2.avif";
import { RiStarFill } from "react-icons/ri";
import DealTimer from '../dealTimer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Product2 from "../../../../public/deals-product3.avif";
import Product3 from "../../../../public/deals-product4.avif";
import Product4 from "../../../../public/delas-prodcuct2.avif";
import Product5 from "../../../../public/dealsproduct1.avif";

// Generate random dates for different timer states
const getRandomDate = (hoursFromNow) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date;
};

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

const LightingDeals = () => {
    const swiperRef = useRef(null);

    return (
        <div className='lighting-deals container mx-auto px-2 2xl:px-22 pb-12 relative'>
            <Link href="#">
                <div className="bg-[url('/ligting-delas-bg.avif')] bg-cover bg-center bg-no-repeat py-3 px-4 flex items-center justify-center">
                    <div className="flex items-center text-white justify-center">
                        <svg className="text-white" fill='white' alt="" aria-label="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" aria-hidden="true"><path d="M347.4 8.1l376.3 0c14.9 0 26.9 12.1 27 26.9 0 3.7-0.8 7.4-2.3 10.8l-135 309.4 0 0 264.6 0c14.9 0 26.9 12.1 27 26.9 0 6.9-2.6 13.5-7.4 18.5l-572.1 607.7c-10.2 10.8-27.3 11.3-38.1 1.1-7.2-6.8-10.1-17-7.6-26.6l103.7-388.4 0 0-236.8 0c-14.9 0-26.9-12.1-26.9-27 0-3.2 0.6-6.5 1.7-9.5l200.7-532.4c4-10.5 14-17.4 25.2-17.4z"></path></svg>
                        <p className='text-2xl font-extrabold italic pr-6'>Lightning deals</p>
                        <p className='font-semibold text-[15px]'>Limited time offer</p>
                        <LuChevronRight className='text-xl' />
                    </div>
                </div>
            </Link>

            <div className="lighting-deals-cards mt-8 relative">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    spaceBetween={10}
                    slidesPerView={5}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.4,
                            spaceBetween: 5
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        }
                    }}
                    className="lighting-deals-swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Link href="#">
                            <div className="single-lighting-deals-card group">
                                <div className="product-img overflow-hidden w-full md:w-[250px] h-[250px] bg-[#00000008] flex items-center justify-center">
                                    <Image
                                        className='w-full h-full object-contain group-hover:scale-[1.2] transition-all duration-500 ease-in-out'
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="product-content">
                                    <div className="price-sec flex flex-wrap items-center gap-1 py-1">
                                        <p className='text-sm font-semibold text-[#fb7701]'>
                                            Rs <span className='text-[16px]'>{product.price.toLocaleString()}</span>
                                        </p>
                                        <p className='text-[12px] font-semibold text-[#555]'>
                                            <span className='line-through'>{product.originalPrice.toLocaleString()}</span> {product.sold}  sold
                                        </p>

                                        <p className='text-[#fb7701] border-[#fb7701] border rounded-sm text-[13px] flex items-center justify-center px-1 h-5 font-semibold text-center'>
                                            -{product.discount}%
                                        </p>
                                    </div>
                                </div>
                                {/* Pass different endDate for each product */}
                                <DealTimer endDate={product.endDate} />
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
                                {/* <h3 className="product-name text-sm font-medium mt-1 line-clamp-2 min-h-[2.5rem]">
                                    {product.name}
                                </h3> */}
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button className="swiper-button-prev-custom absolute top-1/2 left-0 xl:-left-4 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="swiper-button-next-custom absolute top-1/2 right-0 xl:-right-4 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default LightingDeals;