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
import { useCart } from "@/context/CartContext";

const MobileCartListBottomModal = ({
  isOpen,
  onClose,
}) => {
      const {
          cartItems,
          updateQty,
          toggleSingle,
          toggleSelectAll,
          isCartOpen,
          closeCart,
          subtotal,
          totalQty,
          allSelected,
          removeItem,
  
      } = useCart();

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
                  <p className="text-[#000] text-[16px] font-[500]">Cart ({totalQty})</p>
                  <p className="text-[#fb7701] text-[12px]">1 item may sell out today!</p>
                </div>

                <div className="cart-item-slider">
                  <div className="cart-item-slider py-3">
                    <Swiper
                      spaceBetween={5}
                      slidesPerView={3}
                      centeredSlides={false}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        320: {     // mobile
                          slidesPerView: 3,
                          spaceBetween: 5,
                        },
                        480: {     // small mobile
                          slidesPerView: 3,
                          spaceBetween: 6,
                        },
                        640: {     // tablets
                          slidesPerView: 5,
                          spaceBetween: 8,
                        },
                        1024: {    // desktop
                          slidesPerView: 6,
                          spaceBetween: 10,
                        },
                      }}

                      modules={[Autoplay, Pagination, Navigation]}
                      className="cartSwiper"
                    >
                      {cartItems?.map((item) => (
                        <SwiperSlide key={item.id}>
                          <div className="single-item shadow-lg p-1 border border-gray-200 rounded-sm">
                            <Image className="w-full" width={100} height={100} src={item.images[0] || "/placeholder.png"} alt="product banner" />
                            <div className="flex items-center justify-start gap-1">
                              <p className="text-[14px] font-[600] text-center"><span className="text-[11px]">Rs.</span>{item.sale_price}</p>
                              <p className="text-[#8d8c8c] text-[13px] font-semibold relative w-fit"><span className="absolute top-[9px] bg-[#FB7701] w-full h-[2px]"></span>Rs.{item.price}</p>
                            </div>
                            {/* <p className="text-[#fb7701] text-[13px] font-[500]">
                              47% OFF
                            </p> */}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                <div className="px-3">
                  <div className="cart-product-list py-3 border-y border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-black text-[15px] font-[500]">Item(s) total:</p>
                      <p className="text-[#777777] text-[15px] line-through font-[500]">Rs. {subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-black text-[15px] font-[500]">Item(s) discount:</p>
                      <p className="text-[#fb7701] text-[15px] font-[500]">-Rs. {subtotal}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-black text-[15px] font-[600]">Total:</p>
                    <p className="text-[#0a8800] text-[17px] font-[600]">
                      <span className="bg-[#fb7701] py-[2px] px-1 rounded-sm text-[12px] text-white mr-1">
                        62% OFF
                      </span>
                      <span className="text-[14px]">Rs.</span>
                      {subtotal}
                    </p>
                  </div>
                  <div className="border border-[#0a8800] rounded-md p-2 mt-1 relative">
                    <svg className="box-1bqlm right-2 -top-3 absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 8" width="1em" height="1em" fill="#0a8800" alt="bubble_arrow" style={{ stroke: ' rgb(10, 136, 0)' }}><path d="M0.913721065,9 C2.56449311,9 4.14234104,8.31987419 5.27579998,7.1197412 L10.5459737,1.53955726 C11.3043971,0.73652071 12.5702105,0.700354613 13.3732471,1.45877803 C13.4009372,1.48492978 13.4278746,1.51186717 13.4540263,1.53955726 L18.7242,7.1197412 C19.857659,8.31987419 21.4355069,9 23.0862789,9"></path></svg>
                    <p className="text-[15px] text-[#0a8800] font-[600]">
                      <Image className="inline mr-1" width={15} height={15} src="/dollor-coverd.avif" alt="price coverd" />
                      Your order is covered by our Price Match Guarantee. Proceed to checkout now!
                    </p>
                  </div>
                  <p className="text-[13px] text-[#777676] font-[500] pt-1 pb-22">
                    Please refer to your final actual payment amount.
                  </p>
                </div>

                <div className="fixed left-0 right-0 w-full bottom-0 py-3 px-1 md:px-6 z-[99999] bg-white block xl:hidden">
                  <div className="flex items-center gap-1 justify-between rounded-full py-2 px-3 bg-white" style={{ boxShadow: "0 .04rem .1rem 0 rgba(0, 0, 0, .16)" }}>
                    <button
                      onClick={onClose}
                      className="w-[35%] flex flex-col mx-auto">
                      {/* <span className="text-[#000000] text-[16px] md:text-xl font-[500] line-through">
                        154,992
                      </span> */}
                      <div className="flex items-center mx-auto">
                        <span className="text-[14px] font-[600] text-[#FB7701]">
                          Rs. <span className="text-[18px] md:text-2xl">{subtotal}</span>
                        </span>
                        <FaChevronUp className="text-md" />
                      </div>
                    </button>
                    <Link href="/checkout" className="w-[65%]">
                      <button className="bg-[#fb5d01] w-full hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold flex flex-col justify-center text-[13px] py-1 px-5 lg:px-6 rounded-full transition-all duration-300 ease-in-out">
                        <span className="text-[15px] md:text-xl">Last day for 62.9% off</span>
                        <span className="text-[12px] md:text-md">Checkout (14) | 10 : 46  : 37</span>
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

export default MobileCartListBottomModal;