"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Import your images
import SliderImage1 from "../../../../public/mobilepromotionalsliderimg1.avif";
import SliderImage2 from "../../../../public/mobileprmotionalsliderimg2.avif";
import SliderImage3 from "../../../../public/mobilesliderimg3.avif";
import SliderImage4 from "../../../../public/mboilesliderimg4.avif";

const PromotionalSliderMobile = () => {
  const slides = [SliderImage1, SliderImage3, SliderImage4];

  return (
    <>
      <div className="px-3 lg:px-0 py-3 mobile-promo-slider">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className=" overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                className="w-full object-contain"
                src={slide}
                alt={`promotional banner ${index + 1}`}
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="bg-[#f6f6f6] h-[4px] w-full"></div>
    </>
  );
};

export default PromotionalSliderMobile;
