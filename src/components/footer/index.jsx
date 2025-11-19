"use client"
import React, { useState } from "react";
import Footer1 from "../../../public/temofooter1.avif";
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook, FaSnapchat } from 'react-icons/fa6';
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import FooterBnak1 from "../../../public/footer-banke1.png";
import FooterBnak2 from "../../../public/footer-2.png";
import { FaChevronDown } from "react-icons/fa6";


const faqsData = [
  {
    title: "Company info",
    items: [
      "About Temu",
      "Contact us",
      "Press",
      "Temu's Tree Planting Program",
      "Affiliate & Influencer Program: Join to Earn",
    ],
  },
  {
    title: "Customer service",
    items: [
      "Return and refund policy",
      "Intellectual property policy",
      "Shipping info",
      "Report suspicious activity",
    ],
  },
  {
    title: "Help",
    items: [
      "Support center & FAQ",
      "Safety center",
      "Dressfair purchase protection",
      "Sitemap",
      "Partner with Dressfair",
    ],
  },
];


const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (

    <footer>
      <div className='bg-[#1e1e1e] hidden xl:block'>
        <div className="container mx-auto px-2 2xl:px-22 py-8">
          <div className="flex justify-between pb-8">
            <div className="">
              <p className="text-white text-[14px] font-bold">Company info</p>
              <ul className='flex flex-col gap-2 mt-4 font-medium'>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  About Dressfair
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Dressfair – Shop Like a Billionaire
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Affiliate & Influencer Program: Join to Earn
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Contact us
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Careers
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Press
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Temu's Tree Planting Program
                </li>
              </ul>
            </div>
            <div className="">
              <p className="text-white text-[14px] font-[700]">Customer service</p>
              <ul className='flex flex-col gap-2 mt-4 font-medium'>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Return and refund policy
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Intellectual property policy
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Shipping info
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Report suspicious activity
                </li>

              </ul>
            </div>
            <div className="">
              <p className="text-white text-[14px] font-[700]">Help</p>
              <ul className='flex flex-col gap-2 mt-4 font-medium'>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Support center & FAQ
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Safety center
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Dressfair purchase protection
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Sitemap
                </li>
                <li className='text-[#bbb] text-[13px] cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                  Partner with Dressfair
                </li>
              </ul>
            </div>
            <div className="">
              <p className="text-white text-[14px] font-bold">Download the Dressfair App</p>

              <ul className='flex flex-col gap-2 mt-4 font-medium'>
                <li className='flex items-center gap-6 '>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>Price-drop alerts</p>
                  </div>
                  <span className='h-4 w-px bg-white'> </span>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>
                      Track orders any time
                    </p>
                  </div>
                </li>
                <li className='flex items-center gap-6'>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>Faster & more secure</p>
                  </div>
                  <span className='h-4 w-px bg-white'> </span>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>
                      Low stock items alerts
                    </p>
                  </div>
                </li>
                <li className='flex items-center gap-6'>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>Exclusive offers</p>
                  </div>
                  <span className='h-4 w-px bg-white'> </span>
                  <div className="text-white flex items-center gap-1 w-full lg:w-[50%]">
                    <Image className='w-6' src={Footer1} alt="ICON" />
                    <p className='text-[13px] line-clamp-1'>
                      Coupons & offers alerts
                    </p>
                  </div>
                </li>
              </ul>
              <div className="flex gap-4 flex-wrap mt-4">
                {/* App Store Button */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="flex items-center gap-2 rounded-full  text-white border-1 px-4 py-2  transition"
                >
                  <Image
                    src="https://aimg.kwcdn.com/upload_aimg/pc/5c5f0a0f-db6f-4205-a0d3-c745b6c672ea.png.slim.png?imageView2/2/w/120/q/70/format/avif"
                    alt="App Store"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px]">Download on the</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="flex items-center gap-2 rounded-full  text-white border-1 px-4 py-2  transition"
                >
                  <Image
                    src="https://aimg.kwcdn.com/upload_aimg/pc/427c29ba-bef6-439c-9d4c-edbdde47c7e0.png.slim.png?imageView2/2/w/120/q/70/format/avif"
                    alt="Google Play"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px]">Get it on</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </div>
                </a>
              </div>
              <div className="mt-8">
                <p className='text-white text-[14px] font-bold'>Connect with Dressfair</p>

                <ul className='mt-2 flex gap-3 flex-wrap'>
                  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
                    <FaInstagram className='text-white text-3xl' />
                  </li>
                  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
                    <FaFacebook className='text-white text-3xl' />
                  </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
                    <FaSnapchat className='text-white text-3xl' />
                  </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
                    <AiFillTikTok className='text-white text-3xl' />
                  </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
                    <IoLogoWhatsapp className='text-white text-3xl' />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap pb-8">
            <div className="w-full lg:w-[50%]">
              <p className="text-white text-[14px] font-bold mb-2">Security certification</p>
              <Image className='w-full lg:w-[60%]' src={FooterBnak1} alt="bank support" />
            </div>
            <div className="w-full lg:w-[50%]">
              <p className="text-white text-[14px] font-bold mb-2">We accept</p>
              <Image className='w-full lg:w-[80%]' src={FooterBnak2} alt="bank support" />
            </div>
          </div>
          <div className="border-t-[1] border-t-[#ffffff1a] pt-6">
            <ul className='flex justify-center gap-4 items-center text-[#aaa] text-[12px] font-[500]'>
              <li>
                © 2022－2025 Whaleco Inc.
              </li>
              <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                Terms of use
              </li>
              <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                Privacy policy
              </li>
              <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                Your privacy choices
              </li>
              <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
                Ad Choices
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mobile-footer block xl:hidden bg-[#f5f5f5] py-3 lg:px-16">
        <div className="footer-faqs">

          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            const isLast = index === faqsData.length - 1;

            // combine classes:
            // - default: border-b
            // - remove border if open OR if last item
            const containerClasses = [
              "single-faqs",
              "bg-white",
              "overflow-hidden",
              // conditional border class
              isOpen || isLast ? "" : "border-b border-b-gray-200",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={index} className={containerClasses}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full py-3 px-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <p className="text-md text-black font-semibold">{faq.title}</p>
                  <FaChevronDown
                    className={`text-gray-600 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>

                {/* Animated open/close */}
                <div
                  id={`faq-panel-${index}`}
                  className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden bg-[#f5f5f5]`}
                >
                  <ul className="flex flex-col gap-3 text-[15px] px-4 py-3">
                    {faq.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-700 hover:text-black transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <ul className='pt-4 flex justify-center gap-3 flex-wrap bg-white pb-4'>
          <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
            <FaInstagram className='text-[#7f7f7f] text-2xl' />
          </li>
          <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
            <FaFacebook className='text-[#7f7f7f] text-2xl' />
          </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
            <FaSnapchat className='text-[#7f7f7f] text-2xl' />
          </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
            <AiFillTikTok className='text-[#7f7f7f] text-2xl' />
          </li>  <li className='p-2 transition-all duration-500 ease-in-out cursor-pointer w-fit h-fit rounded-full hover:bg-[#343434] flex items-center justify-center'>
            <IoLogoWhatsapp className='text-[#7f7f7f] text-2xl' />
          </li>
        </ul>

        <div className="py-6 px-4">
          <p className="text-center text-[#aaa] text-[12px] font-[500] pb-5">    © 2022－2025 Whaleco Inc.</p>
          <ul className='flex flex-wrap justify-center gap-4 items-center text-[#aaa] text-[12px] font-[500] '>

            <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
              Terms of use
            </li>
            <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
              Privacy policy
            </li>
            <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
              Your privacy choices
            </li>
            <li className='underline cursor-pointer hover:text-white hover:underline transition-all duration-[0.5s] ease-in-out'>
              Ad Choices
            </li>
          </ul>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
