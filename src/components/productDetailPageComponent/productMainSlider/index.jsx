"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FaStar } from "react-icons/fa6";
import { ProductReviews } from "../ProductReviews";
import ProductStoreInfo from "../productStoreInfo";
import ProductDetails from "../productDetails";

const ProductMainSlider = () => {
    const { slug } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const productImages = [
        "/deals-product3.avif",
        "/deals-product3.avif",
        "/deals-product3.avif",
        "/deals-product3.avif",
        "/deals-product3.avif",
        "/deals-product3.avif",
        "/deals-product3.avif",
    ];

    return (
        <>
            <div className="flex">
                {/* Thumbnail Gallery (Left Side) */}
                <div className="w-[12%] mr-4 hidden md:block">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        spaceBetween={10}
                        slidesPerView={7}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-thumbs-swiper h-[400px] xl:h-[500px] 2xl:h-[600px]"
                    >
                        {productImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={img}
                                    alt={`thumb-${index}`}
                                    width={80}
                                    height={100}
                                    className="cursor-pointer object-cover w-full h-full rounded-lg border hover:border-gray-400 transition-all"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Main Image Swiper */}
                <div className="w-full lg:w-[86%]">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-main-swiper lg:rounded-xl overflow-hidden"
                    >
                        {productImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={img}
                                    alt={`main-${index}`}
                                    width={600}
                                    height={700}
                                    className="object-contain w-full h-auto lg:rounded-xl"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="hidden lg:block">
            <div className="review-sec pt-6 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <p className="text-[18px] font-semibold tetx-[#222]">1,009 reviews</p>
                    <div className="h-4 bg-black w-px"></div>
                    <div className="product-rating flex items-center gap-1">
                        <p className="text-[18px] font-semibold tetx-[#222]">
                            4.7
                        </p>
                        <FaStar className="text-2xl" />
                        <FaStar className="text-2xl" />
                        <FaStar className="text-2xl" />
                        <FaStar className="text-2xl" />
                        <FaStar className="text-2xl" />
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#0a88000f] rounded-md">
                    <div className="bg-[#0a8800] flex items-center justify-center h-[22px] w-[22px] rounded-sm p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="white" alt="All reviews are from verified purchases"><path d="M557.4 67.6l357.5 136.7c28.3 10.8 46.5 38.5 45.2 68.8l-8.6 199.8c-6.8 157.9-86.7 303.6-216.2 394.3l-97.7 68.3c-72.7 50.8-169.4 50.9-242.1 0l-96.1-67.2c-129.2-90.3-208-236.5-212.4-394.2l-5.6-201.2c-0.8-29.6 16.9-56.5 44.4-67.4l345.9-137.3c27.5-10.9 58.1-11.1 85.7-0.6z m75.6 412.9l-224 0c-61.9 0-112 50.1-112 112l0 76.8c0 24.7 20.1 44.8 44.8 44.8l358.4 0c24.7 0 44.8-20.1 44.8-44.8l0-76.8c0-61.9-50.1-112-112-112z m-112-243.7c-48.1 0-87.1 40.1-87.2 89.6 0 49.5 39 89.6 87.2 89.6 48.1 0 87.1-40.1 87.1-89.6 0-49.5-39-89.6-87.1-89.6z"></path></svg>
                    </div>
                    <span className="pr-2 text-[#0a8800] text-[13px] font-semibold">
                        All reviews are from verified purchases
                    </span>
                </div>
            </div>
            </div>
            <div className="reviews-main-sec hidden lg:block">
                <ProductReviews />
            </div>
            <div className="product-store-info hidden lg:block">
                <ProductStoreInfo />
            </div>
            <div className="product-detail-sec hidden lg:block">
                <ProductDetails />
            </div>
        </>
    )
}

export default ProductMainSlider;
