"use client"
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GrApple } from "react-icons/gr";
import { RiTwitterXFill } from 'react-icons/ri';
import { SiFacebook } from 'react-icons/si';


const CoupensOffers = () => {
  const [activeTab, setActiveTab] = useState("unused");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do coupons work?",
      answer: "You can apply coupons during checkout to get discounts based on their rules."
    },
    {
      question: "Why is my coupon expired?",
      answer: "Coupons have a validity period. Once expired, they cannot be applied."
    },
    {
      question: "How many coupons can I use?",
      answer: "Only one coupon can be applied per order unless stated otherwise."
    }
  ];

  return (
    <>
      <div className="coupon-main w-full 2xl:w-[80%] px-4 lg:px-0">
        <div className="">
          <p className='font-semibold text-lg text-center'>Coupons & offers</p>

        </div>
        <div className="sticky lg:relative top-0 z-[9] bg-white py-3">
          <div className="tabs-sec flex items-center justify-between font-[500] border-b lg:border-b-0 pb-2 border-b-gray-100">
            <ul className="flex items-center gap-6 md:gap-12 text-gray-500">
              <li
                className={`cursor-pointer relative ${activeTab === "unused" ? "text-black font-semibold under" : ""
                  }`}
                onClick={() => setActiveTab("unused")}
              >
                {activeTab === "unused" && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222] rounded-full"></div>
                )}
                Unused
              </li>
              <li
                className={`cursor-pointer relative ${activeTab === "used" ? "text-black font-semibold" : ""
                  }`}
                onClick={() => setActiveTab("used")}
              >
                {activeTab === "used" && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222] rounded-full"></div>
                )}
                Used
              </li>
              <li
                className={`cursor-pointer relative ${activeTab === "expired" ? "text-black font-semibold" : ""
                  }`}
                onClick={() => setActiveTab("expired")}
              >
                {activeTab === "expired" && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222] rounded-full"></div>
                )}
                Expired
              </li>
            </ul>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`cursor-pointer relative ${activeTab === "faqs" ? "text-black font-semibold" : ""
                }`}
            >
              {activeTab === "faqs" && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222] rounded-full"></div>
              )}
              FAQs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="content mt-6">
          {activeTab === "unused" && (
            <>
              <form>
                <div className="flex gap-4">
                  <input className='rounded-sm py-2 px-3 border border-[#949494] w-full md:w-[40%]' type="text" placeholder='Enter your coupon' />
                  <button type='button' className='border border-[#949494] py-2 px-6 rounded-full font-semibold hover:border-black hover:scale-[1.02] transition-all duration-[0.3s] ease-in-out '>
                    Apply
                  </button>
                </div>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-6 md:mt-8">
                <div className="border border-[#949494] rounded-sm px-2 py-2 cursor-pointer hover:scale-[1.01] transition-all duration-[0.3s] ease-in-out flex items-center justify-between">
                  <p className='text-sm font-[500]'>
                    Seller's exclusive coupon for specific item
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
                </div>
                <div className="border border-[#949494] rounded-sm px-2 py-2 cursor-pointer hover:scale-[1.01] transition-all duration-[0.3s] ease-in-out flex items-center justify-between">
                  <p className='text-sm font-[500]'>
                    Dressfair's exclusive coupon for specific item
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
                </div>
                <div className="border border-[#949494] rounded-sm px-2 py-2 cursor-pointer hover:scale-[1.01] transition-all duration-[0.3s] ease-in-out flex items-center justify-between">
                  <p className='text-sm font-[500]'>
                    Exclusive store threshold coupons
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
                </div>
              </div>

              <div className="py-12 md:py-20 flex flex-col justify-center items-center text-center text-md font-semibold">
                <svg alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="8rem" height="8rem" fill="#cdcdcd"><path d="M840.5 243.2c23.6 0 42.7 19.1 42.7 42.7l0 452.2c0 23.6-19.1 42.7-42.7 42.7l-657 0c-23.6 0-42.7-19.1-42.7-42.7l0-452.2c0-23.6 19.1-42.7 42.7-42.7z m0 17.1l-657 0c-14.1 0-25.6 11.5-25.6 25.6l0 452.2c0 13.6 10.7 24.8 24.1 25.6l1.5 0 657 0c14.1 0 25.6-11.5 25.6-25.6l0-452.2c0-13.6-10.7-24.8-24.1-25.6l-1.5 0z m-205.1 390.9l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.7l0-17.1c13 0 25-5.3 33.8-14.4z m-80.4-27c1.5 12.7 8.1 24.2 18.3 31.9l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.5l17-2z m-117 3.6l15 8.3-18.5 33.2-14.9-8.2 18.4-33.3z m206.1-57c12.6 11.2 20.8 27.3 21.5 45.4l-17.1 0.6c-0.5-12.9-6.2-24.8-15.7-33.2l11.3-12.8z m-155.6-34l14.9 8.2-29.7 53.8-15-8.3 29.8-53.7z m108.1 18.1l1.3 17c-12.8 1-24.5 7.2-32.6 17l-13.2-10.8c10.7-13.1 26.6-21.8 44.5-23.2z m-57.6-109.2l14.9 8.3-29.8 53.7-14.9-8.3 29.8-53.7z m-82.8-7.8l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.6l0-17c13 0 25-5.3 33.8-14.4z m-80.4-27.1c1.5 12.7 8.1 24.2 18.3 32l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.6l17-2z m213.7-56.1l14.9 8.2-29.8 53.8-14.9-8.3 29.8-53.7z m-124.6 2.8c12.6 11.2 20.8 27.3 21.5 45.3l-17.1 0.7c-0.5-12.9-6.2-24.8-15.7-33.3l11.3-12.7z m-47.5-16l1.3 17c-12.8 1-24.5 7.2-32.6 17.1l-13.2-10.9c10.7-13.1 26.6-21.8 44.5-23.2z"></path></svg>
                <p>
                  You don't have any coupons or offers available
                </p>
              </div>
            </>
          )}

          {activeTab === "used" && (
            <>
              <div className="py-12 md:py-20 flex flex-col justify-center items-center text-center text-md font-semibold">
                <svg alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="8rem" height="8rem" fill="#cdcdcd"><path d="M840.5 243.2c23.6 0 42.7 19.1 42.7 42.7l0 452.2c0 23.6-19.1 42.7-42.7 42.7l-657 0c-23.6 0-42.7-19.1-42.7-42.7l0-452.2c0-23.6 19.1-42.7 42.7-42.7z m0 17.1l-657 0c-14.1 0-25.6 11.5-25.6 25.6l0 452.2c0 13.6 10.7 24.8 24.1 25.6l1.5 0 657 0c14.1 0 25.6-11.5 25.6-25.6l0-452.2c0-13.6-10.7-24.8-24.1-25.6l-1.5 0z m-205.1 390.9l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.7l0-17.1c13 0 25-5.3 33.8-14.4z m-80.4-27c1.5 12.7 8.1 24.2 18.3 31.9l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.5l17-2z m-117 3.6l15 8.3-18.5 33.2-14.9-8.2 18.4-33.3z m206.1-57c12.6 11.2 20.8 27.3 21.5 45.4l-17.1 0.6c-0.5-12.9-6.2-24.8-15.7-33.2l11.3-12.8z m-155.6-34l14.9 8.2-29.7 53.8-15-8.3 29.8-53.7z m108.1 18.1l1.3 17c-12.8 1-24.5 7.2-32.6 17l-13.2-10.8c10.7-13.1 26.6-21.8 44.5-23.2z m-57.6-109.2l14.9 8.3-29.8 53.7-14.9-8.3 29.8-53.7z m-82.8-7.8l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.6l0-17c13 0 25-5.3 33.8-14.4z m-80.4-27.1c1.5 12.7 8.1 24.2 18.3 32l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.6l17-2z m213.7-56.1l14.9 8.2-29.8 53.8-14.9-8.3 29.8-53.7z m-124.6 2.8c12.6 11.2 20.8 27.3 21.5 45.3l-17.1 0.7c-0.5-12.9-6.2-24.8-15.7-33.3l11.3-12.7z m-47.5-16l1.3 17c-12.8 1-24.5 7.2-32.6 17.1l-13.2-10.9c10.7-13.1 26.6-21.8 44.5-23.2z"></path></svg>
                <p>
                  You don't have any used coupons or offers
                </p>
                <p className='text-sm text-gray-600 font-[400] pt-1'>
                  Only coupons that were used in the last 3 months are shown on this list.
                </p>
              </div>
            </>
          )}

          {activeTab === "expired" && (
            <>
              <div className="py-12 md:py-20 flex flex-col justify-center items-center text-center text-md font-semibold">
                <svg alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="8rem" height="8rem" fill="#cdcdcd"><path d="M840.5 243.2c23.6 0 42.7 19.1 42.7 42.7l0 452.2c0 23.6-19.1 42.7-42.7 42.7l-657 0c-23.6 0-42.7-19.1-42.7-42.7l0-452.2c0-23.6 19.1-42.7 42.7-42.7z m0 17.1l-657 0c-14.1 0-25.6 11.5-25.6 25.6l0 452.2c0 13.6 10.7 24.8 24.1 25.6l1.5 0 657 0c14.1 0 25.6-11.5 25.6-25.6l0-452.2c0-13.6-10.7-24.8-24.1-25.6l-1.5 0z m-205.1 390.9l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.7l0-17.1c13 0 25-5.3 33.8-14.4z m-80.4-27c1.5 12.7 8.1 24.2 18.3 31.9l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.5l17-2z m-117 3.6l15 8.3-18.5 33.2-14.9-8.2 18.4-33.3z m206.1-57c12.6 11.2 20.8 27.3 21.5 45.4l-17.1 0.6c-0.5-12.9-6.2-24.8-15.7-33.2l11.3-12.8z m-155.6-34l14.9 8.2-29.7 53.8-15-8.3 29.8-53.7z m108.1 18.1l1.3 17c-12.8 1-24.5 7.2-32.6 17l-13.2-10.8c10.7-13.1 26.6-21.8 44.5-23.2z m-57.6-109.2l14.9 8.3-29.8 53.7-14.9-8.3 29.8-53.7z m-82.8-7.8l12.3 11.8c-11.6 12.1-28 19.7-46.1 19.6l0-17c13 0 25-5.3 33.8-14.4z m-80.4-27.1c1.5 12.7 8.1 24.2 18.3 32l-10.3 13.6c-13.5-10.3-22.9-25.8-25-43.6l17-2z m213.7-56.1l14.9 8.2-29.8 53.8-14.9-8.3 29.8-53.7z m-124.6 2.8c12.6 11.2 20.8 27.3 21.5 45.3l-17.1 0.7c-0.5-12.9-6.2-24.8-15.7-33.3l11.3-12.7z m-47.5-16l1.3 17c-12.8 1-24.5 7.2-32.6 17.1l-13.2-10.9c10.7-13.1 26.6-21.8 44.5-23.2z"></path></svg>
                <p>
                  You don't have any expired coupons or offers
                </p>
                <p className='text-sm text-gray-600 font-[400] pt-1'>
                  Only coupons that were expired within 3 months are shown on this list.
                </p>
              </div>
            </>
          )}

          {activeTab === "faqs" && (
            <div className="w-full pt-8 pb-12">
              <h2 className="text-xl font-bold mb-4">FAQs</h2>

              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center p-4 text-left font-medium"
                    >
                      <span>{item.question}</span>

                      <span
                        className={`transition-transform duration-300 ${openFAQ === index ? "rotate-180" : ""
                          }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${openFAQ === index ? "max-h-40 p-4" : "max-h-0 p-0"
                        }`}
                    >
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pb-12">
          <p className='text-md font-semibold mb-3'>Can’t find your coupon(s)?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cursor-pointer border border-[#fb7701] rounded-sm py-3 px-3 flex items-center justify-between gap-1 hover:shadow-lg hover:scale-[1.02] transition-all duration-[0.3s] ease-in-out">
              <p className='text-sm font-[500]'>
                Try signing in with another account
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FcGoogle />
                  <GrApple />
                  <SiFacebook />
                  <RiTwitterXFill />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
              </div>
            </div>
            <div className="cursor-pointer border border-[#fb7701] rounded-sm py-3 px-3 flex items-center justify-between gap-1 hover:shadow-lg hover:scale-[1.02] transition-all duration-[0.3s] ease-in-out">
              <p className='text-sm font-[500]'>
                Self-service to find coupon(s)              </p>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoupensOffers;
