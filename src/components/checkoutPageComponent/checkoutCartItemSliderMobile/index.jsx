"use client"
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CartItemsDetailCheckoutMobile from '@/components/models/cartItemsDetailCheckoutMobile';

const CheckoutCartItemSliderMobile = () => {
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
        const [openQty, setOpenQty] = useState(false);
            const [showCartItemsModel, setShowCartItemsModel] = useState(false);
        
        const [selectedQty, setSelectedQty] = useState(1);
        const qtyOptions = [0, 1, 2, 3, 4, 5];


        useEffect(() => {
            if (cartItems.length === 0) {
                closeCart();
            }
        }, [cartItems, closeCart]);

        // Local state to manage which dropdown is open
        const [openQtyId, setOpenQtyId] = useState(null);
    
        useEffect(() => {
            if (cartItems.length === 0) {
                closeCart();
            }
        }, [cartItems, closeCart]);
    
        const toggleQtyDropdown = (id) => {
            setOpenQtyId(openQtyId === id ? null : id);
        };
    
        // Handle quantity update with toast
        const handleUpdateQty = (item, newQty) => {
            const { product_id, color, size } = item;
            const currentQty = item.qty;
    
            if (newQty === 0) {
                removeItem(product_id, color.sku, size.product_option_id);
                toast.success("Item removed from cart successfully!");
            } else {
                updateQty(product_id, color.sku, size.product_option_id, newQty);
    
                if (newQty > currentQty) {
                    toast.success(`Quantity increased to ${newQty}`);
                } else if (newQty < currentQty) {
                    toast.success(`Quantity decreased to ${newQty}`);
                }
            }
            setOpenQtyId(null);
        };
    
        // Handle item removal with toast
        const handleRemoveItem = (item) => {
            const { product_id, color, size } = item;
            removeItem(product_id, color.sku, size.product_option_id);
            toast.success("Item removed from cart successfully!");
        };

    
        useEffect(() => {
            if (cartItems.length === 0) {
                closeCart();
            }
        }, [cartItems, closeCart]);
    
       
    return (
        <>
            <div className="cart-items-list">
                <div className="flex justify-between items-center py-3">
                    <p className='text-[#222] font-[600] text-[16px] md:text-xl'>Item details (<span className=''>{totalQty}</span>)</p>
                    <button 
                     onClick={(e) => {
                        e.stopPropagation();
                        setShowCartItemsModel(true);
                    }}
                    className='flex items-center text-[#817c7c] font-[500] text-[13px] md:text-md hover:underline'>View details <FiChevronRight /></button>
                </div>
                <div className="checkout-items-slider">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3.2}
                        loop={true}
                        navigation={false}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {          // mobile
                              slidesPerView: 3.2,
                              spaceBetween: 8,
                            },
                            640: {        // sm
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            768: {        // md
                              slidesPerView: 5.5,
                              spaceBetween: 12,
                            },
                            1024: {       // lg
                              slidesPerView: 5.5,
                              spaceBetween: 14,
                            },
                          
                          }}
                        modules={[Navigation, Autoplay]}
                        className="checkout-items-slider"
                    >
                        {cartItems?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="checkout-single-item cursor-pointer hover:shadow-md">
                                    <Image width="200" height="200" src={item.images[0] || "/placeholder.png"} alt="product banner" />
                                    <div className="price-sec flex flex-wrap items-center gap-1 py-1">
                                        <p className="text-[12px] font-semibold text-[#fb7701]">Rs <span className="text-[13px]">{item.sale_price}</span></p>
                                        <p className="text-[10px] font-semibold text-[#767676]">
                                            <span className="line-through">Rs.{item.price}</span>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <CartItemsDetailCheckoutMobile
             isOpen={showCartItemsModel}
             onClose={() => setShowCartItemsModel(false)}
             cartItems={cartItems}
             toggleQtyDropdown={toggleQtyDropdown}
             updateQty={updateQty}
             qtyOptions={qtyOptions}
             setIsModalOpen={setShowCartItemsModel}
            />
        </>
    )
}

export default CheckoutCartItemSliderMobile;
