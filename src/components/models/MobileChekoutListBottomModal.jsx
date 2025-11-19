"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import { FaChevronUp } from "react-icons/fa6";

const MobileChekoutListBottomModal = ({
  isOpen,
  onClose,
  cartItems,
  toggleQtyDropdown,
  updateQty,
  qtyOptions,
  setIsModalOpen
}) => {
  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-[9999998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom sheet modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-[999999999] py-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >

            {/* Modal Content */}
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="relative w-full">
                <div className="border-b border-b-gray-200 pb-3 px-3">
                  <p className="text-center text-lg text-[#000] font-[600]">Price details</p>
                  <p className="text-[#0a8800] flex justify-center items-center gap-1 text-[14px] text-center font-[500]">
                    <IoMdCheckmark className="text-xl" /> Temu purchase protection
                  </p>
                </div>
                <div className="absolute right-2 top-0">
                  <button onClick={onClose}>
                    <CgClose className="text-xl" />
                  </button>
                </div>
                <div className="px-3 flex items-center py-2 gap-2">
                  <p className="text-[#000] text-[16px] font-[500]">Cart (14)</p>
                  <p className="text-[#fb7701] text-[12px]">1 item may sell out today!</p>
                </div>

                <div className="px-3">
                  <div className="cart-product-list py-3 border-y border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-black text-[15px] font-[500]">Item(s) total:</p>
                      <p className="text-[#777777] text-[15px] line-through font-[500]">Rs. 154,992</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-black text-[15px] font-[500]">Item(s) discount:</p>
                      <p className="text-[#fb7701] text-[15px] font-[500]">-Rs. 96,635</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-black text-[15px] font-[500]">Subtotal:</p>
                      <p className="text-[#000] text-[15px] font-[500]">Rs. 104,992</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-b-gray-200">
                    <p className="text-[14px] text-[#222] font-semibold">Shipping:</p>
                    <p className="text-[15px] text-[#0A8800] font-[500] uppercase">Free</p>
                  </div>



                  <div className="pb-22">
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-[14px] text-[#222] font-semibold">
                        Order total (Applicable taxes included):
                      </p>
                      <p className='text-[#0A8800] text-[20px] font-bold'>
                        <span className='text-[15px]'>Rs.</span>102,549
                      </p>
                    </div>
                    <div className="border border-[#0a8800] rounded-md p-2 mt-1 relative">
                      <svg className="box-1bqlm right-2 -top-3 absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 8" width="1em" height="1em" fill="#0a8800" alt="bubble_arrow" style={{ stroke: ' rgb(10, 136, 0)' }}><path d="M0.913721065,9 C2.56449311,9 4.14234104,8.31987419 5.27579998,7.1197412 L10.5459737,1.53955726 C11.3043971,0.73652071 12.5702105,0.700354613 13.3732471,1.45877803 C13.4009372,1.48492978 13.4278746,1.51186717 13.4540263,1.53955726 L18.7242,7.1197412 C19.857659,8.31987419 21.4355069,9 23.0862789,9"></path></svg>
                      <p className="text-[16px] text-[#0a8800] font-[600]">
                        <Image className="inline mr-1" width={20} height={20} src="/dollor-coverd.avif" alt="price coverd" />
                        Submit order now with our Price Match Guarantee.
                      </p>
                    </div>
                    <div className="pt-2 pb-3">
                      <p className='text-[#555555] font-[400] text-[13px]'>
                        By submitting your order, you agree to our <Link href="#" className='text-[#0065BE] underline'>Terms of Use</Link> and <Link href="#" className='text-[#0065BE] underline'>Privacy Policy</Link>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="fixed left-0 right-0 w-full bottom-0 border-t border-t-gray-100 py-3 px-1 md:px-6 z-[99999] bg-white block xl:hidden">
                  <div className="flex items-center gap-1 justify-between bg-white " >
                    <button
                      onClick={onClose}
                      className="w-[35%] flex flex-col mx-auto">
                      <span className="text-[#000000] text-[16px] md:text-xl font-[500] line-through">
                        154,992
                      </span>
                      <div className="flex items-center mx-auto">
                        <span className="text-[14px] font-[600] text-[#FB7701]">
                          Rs. <span className="text-[18px] md:text-2xl">57,357</span>
                        </span>
                        <FaChevronUp className="text-md" />
                      </div>
                    </button>
                    <Link href="#" className="w-[65%]">
                      <button className="bg-[#fb5d01] py-3  w-full hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold flex flex-col justify-center text-lg py-1 px-5 lg:px-6 rounded-full transition-all duration-300 ease-in-out">

                        Submit order (17)
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileChekoutListBottomModal;