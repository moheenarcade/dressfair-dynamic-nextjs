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

const CheckoutCartItemSlider = () => {
      const { isCartOpen, closeCart } = useCart();
        const [openQty, setOpenQty] = useState(false);
        const [selectedQty, setSelectedQty] = useState(1);
        const qtyOptions = [0, 1, 2, 3, 4, 5];
    
        const [cartItems, setCartItems] = useState([
            { id: 1, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 2, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 3, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 4, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 5, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
    
            { id: 6, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 7, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 8, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
            { id: 9, img: "/deals-product5.avif", price: 13233, selected: true, qty: 1, openQty: false },
        ]);
    
        const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
    
    
        useEffect(() => {
            if (cartItems.length === 0) {
                closeCart();
            }
        }, [cartItems, closeCart]);
    
        const toggleQtyDropdown = (id) => {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, openQty: !item.openQty } : { ...item, openQty: false }
                )
            );
        };
    
        const toggleSelectAll = () => {
            const updated = cartItems.map((item) => ({
                ...item,
                selected: !allSelected,
            }));
            setCartItems(updated);
        };
    
        const toggleSingle = (id) => {
            const updated = cartItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            );
            setCartItems(updated);
        };
    
        const updateQty = (id, qty) => {
            setCartItems(prev =>
                prev
                    .map(item => (item.id === id ? { ...item, qty, openQty: false } : item))
                    .filter(item => item.qty > 0)
            );
        };
    
    return (
        <>
            <div className="cart-items-list">
                <div className="flex justify-between items-center py-3">
                    <p className='text-[#222] font-[600] text-[16px]'>Item details (<span className='text-[#FB7701]'>17</span>)</p>
                    <button className='flex items-center text-[#222] font-[500] text-[14px] hover:underline'>View all <FiChevronRight /></button>
                </div>
                <div className="checkout-items-slider product-detail-main">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={5}
                        loop={true}
                        navigation={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        className="checkout-items-slider"
                    >
                        {cartItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="checkout-single-item cursor-pointer hover:shadow-md">
                                    <Image width="200" height="200" src={item.img} alt="product banner" />
                                    <div className="price-sec flex flex-wrap items-center gap-1 py-1">
                                        <p className="text-sm font-semibold text-[#fb7701]">Rs <span className="text-[16px]">12,000</span></p>
                                        <p className="text-[13px] font-semibold text-[#767676]">
                                            <span className="line-through">25,000</span>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default CheckoutCartItemSlider;
