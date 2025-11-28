"use client"
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { GiCheckMark } from 'react-icons/gi';
import { GoChevronRight } from 'react-icons/go';
import CheckoutCartItemSlider from '../checkoutCartItemSlider';
import CoupenCode from '../coupenCode';
import CheckoutTermConditions from '../checkoutTermsConditions';
import AddressModal from '@/components/models/AddressModal';
import EditAddressModal from '@/components/models/EditAddressModal';

const paymentMethods = [
    {
        id: "cod",
        label: "Cash on Delivery",
        icon: "/cashondel.png",
    },
    {
        id: "paypal",
        label: "PayPal",
        icon: "/paypal.png",
    },
    {
        id: "card",
        label: "Card",
        icon: "/cardiocnpay.avif",
        providers: [
            "/visapaymewnt.avif",
            "/mastercard.avif",
            "/amarcan.avif",
        ],
    },
    {
        id: "jazzcash",
        label: "JazzCash",
        icon: "/jazzcash.avif",
        subtitle: "Rs.50,000 order max. applies",
        disabled: true,
    },
    {
        id: "easypaisa",
        label: "Easypaisa",
        icon: "/easypasaicon.avif",
        subtitle: "Rs.50,000 order max. applies",
        disabled: true,
    },
];

const CheckoutMain = () => {
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
        totalDiscount,
        originalTotal

    } = useCart();
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAddressToEdit, setSelectedAddressToEdit] = useState(null);

    return (
        <>
            <h1 aria-label="Shopping cart"></h1>
            <div className="breadcrupms pb-3">
                <ul className="flex items-center gap-1 text-[#777] text-sm pt-6">
                    <Link href="/"><li>Home</li></Link>
                    <GoChevronRight />
                    <li className="text-black">Checkout</li>
                </ul>
            </div>
            <div className="flex justify-between relative pb-10">
                <div className="w-full xl:w-[65%]">
                    <div className="free-shipping flex items-center justify-between bg-[#e6f3e5] py-2 px-3 rounded-md">
                        <p className='flex gap-3 items-center text-[16px] text-[#000000] font-semibold'><GiCheckMark className='text-[#088703] text-xl' />
                            <span className='w-px h-4 bg-[#088703]'></span>
                            Free shipping special for you</p>
                        <p className='text-[14px] text-[#000000]'>
                            Limited-time offer
                        </p>
                    </div>
                    <div className="checkout-addresses flex justify-between gap-16 border-b border-b-gray-200 pb-6">
                        <div className="w-full lg:w-[50%] ">
                            <div className="flex items-center justify-between py-3">
                                <p className='text-[#222] font-[600] text-[16px]'>Shipping address</p>
                                <button onClick={() => setIsAddressModalOpen(true)} className='flex items-center gap-1 text-[#222] text-[14px] hover:underline'>
                                    Change address  <FiChevronRight />
                                </button>
                            </div>
                            <div onClick={() => setIsAddressModalOpen(true)} className="default-addresses overflow-hidden cursor-pointer relative border border-gray-200 rounded-sm p-3">
                                <div className="flex items-center gap-3">
                                    <p className='text-black font-bold'>test</p>
                                    <p className='text-black text-[15px]'>+92 433 4343434</p>
                                </div>
                                <p className='text-[15px] font-bold text-[#FB7701]'>
                                    test address
                                </p>
                                <p className='text-black text-[15px] font-semibold'>
                                    ARIF WALA, Punjab Pakistan
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedAddressToEdit({
                                            name: "test",
                                            phone: "+92 433 4343434",
                                            address: "test address",
                                            city: "ARIF WALA, Punjab Pakistan",
                                        });
                                        setIsEditModalOpen(true);
                                    }}
                                    className='absolute right-1 top-1 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:scale-[1.08] transition-all duration-300 ease-in-out'>
                                    <FaRegEdit />
                                </button>

                            </div>
                        </div>
                        <div className="w-full lg:w-[50%]">
                            <p className='text-[#0A8800] text-[16px] font-[600] py-3'>Shipping: FREE</p>
                            <div className="">
                                <p className='flex items-center cursor-pointer text-[#000000] text-[13px] font-[500]'>Delivery: 7-17 business days <FiChevronRight /></p>
                                <p className='flex items-center gap-1 text-[12px] py-1 cursor-pointer text-[#757575] font-[500]'>Get a Rs.280 Credit for late delivery
                                    <svg className="cursorPointer _2vX5r2QW" alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#cdcdcd"><path d="M512 7.3c278.7 0 504.7 226 504.7 504.7 0 278.7-226 504.7-504.7 504.7-278.7 0-504.7-226-504.7-504.7 0-278.7 226-504.7 504.7-504.7z m-16 679.1c-35 0-63.3 28.3-63.3 63.3 0 35 28.3 63.3 63.3 63.3 35 0 63.3-28.3 63.3-63.3 0-35-28.3-63.3-63.3-63.3z m6.5-496.8c-62.5 0-111.4 17.7-147.7 53.2-18.8 18-33.9 50.6-45.3 98-5.1 21.3 8 42.7 29.3 47.8 3 0.7 6.1 1.1 9.2 1.1 26.4 0 49.3-18.4 54.9-44.3 3.9-18 8.7-30.8 14.4-38.4 16-23.6 42.2-34.6 79.3-34.6 28.7 0 51.5 7.6 67.5 23.6 15.2 16 23.6 38 23.6 65.8 0 21.1-7.6 41.4-22.8 59.9l-10.1 11.8c-54.9 48.9-87.8 84.4-98.7 107.2-4.7 9-8.5 23.7-11.7 44.3-3.6 23.9 12.9 46.2 36.8 49.8 2.2 0.3 4.3 0.5 6.5 0.5 26.4 0 49.1-18.6 54.4-44.4 2-9.7 4.3-17.1 6.8-22.3 7.6-15.2 18.6-29.5 33.8-42.2 40.5-35.4 65-58.2 72.5-66.7 20.3-27 31.2-61.6 31.3-103.8 0-51.5-16.9-92-50.7-121.5-33.8-30.4-78.5-44.7-133.3-44.8z"></path></svg>
                                </p>
                                <p className='flex items-center cursor-pointer text-[13px] text-[#757575] font-[500]'>Courier company:   TCS,   Leopards,  etc. <FiChevronRight /></p>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-b-gray-200 pb-3">
                        <CheckoutCartItemSlider />
                    </div>
                    <div className="payment-method mt-4 border-b border-b-gray-200 pb-3">
                        <p className='text-[#222] font-[600] text-[16px] mb-3'>Payment methods</p>
                        <div className="space-y-1 w-fit">
                            {paymentMethods.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition relative
                                ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                                ${selectedPayment === item.id ? "" : ""}
                            `}
                                    onClick={() => !item.disabled && setSelectedPayment(item.id)}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedPayment === item.id}
                                        disabled={item.disabled}
                                        onChange={() => !item.disabled && setSelectedPayment(item.id)}
                                        className="w-4 h-4 hidden"
                                    />
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <div
                                            className={
                                                selectedPayment === item.id
                                                    ? "w-5 h-5 border-black flex items-center justify-center border-2 rounded-full bg-white"
                                                    : "w-5 h-5 border-gray-500 border-2 rounded-full"
                                            }
                                            onClick={() => !item.disabled && setSelectedPayment(item.id)}
                                        >
                                            {selectedPayment === item.id && (
                                                <div className="h-3 w-3 rounded-full bg-black"></div>
                                            )}
                                        </div>
                                    </label>
                                    <Image src={item.icon} alt={item.label} width={40} height={40} />
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[15px] font-[600] text-[#222]">{item.label}</span>
                                        {item.providers && (
                                            <div className="flex items-center gap-1">
                                                {item.providers.map((logo, i) => (
                                                    <Image key={i} src={logo} alt="provider" width={35} height={18} />
                                                ))}
                                            </div>
                                        )}
                                        {item.subtitle && (
                                            <span className="text-[13px] text-gray-500">{item.subtitle}</span>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-[30%] self-start lg:sticky top-4 h-fit">
                    <p className="text-[#222] text-[18px] font-semibold">Order Summary</p>
                    <div className="py-3">
                        <CoupenCode />
                    </div>
                    <div className="">
                        <div className="border-b border-b-gray-200 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[14px] text-[#222] font-semibold">Item(s) total:</p>
                                <p className="text-[15px] text-[#555] line-through ">Rs. {originalTotal}</p>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[14px] text-[#222] font-semibold">Item(s) discount:</p>
                                <p className="text-[15px] font-semibold text-[#fb7701]">-Rs.{totalDiscount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[14px] text-[#222] font-semibold">Subtotal:</p>
                                <p className="text-[15px] text-[#222] font-[500]">Rs.{subtotal}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-b-gray-200">
                            <p className="text-[14px] text-[#222] font-semibold">Shipping:</p>
                            <p className="text-[15px] text-[#0A8800] font-[500] uppercase">Free</p>
                        </div>
                        <div className="">
                            <div className="flex items-center justify-between pt-3">
                                <p className="text-[14px] text-[#222] font-semibold">
                                    Order total (Applicable taxes included):
                                </p>
                                <p className='text-[#0A8800] text-[20px] font-bold'>
                                    <span className='text-[15px]'>Rs.</span>{subtotal}
                                </p>
                            </div>
                            <div className="border border-[#0a8800] rounded-md p-2 mt-1 relative">
                                <svg className="box-1bqlm right-2 -top-3 absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 8" width="1em" height="1em" fill="#0a8800" alt="bubble_arrow" style={{ stroke: ' rgb(10, 136, 0)' }}><path d="M0.913721065,9 C2.56449311,9 4.14234104,8.31987419 5.27579998,7.1197412 L10.5459737,1.53955726 C11.3043971,0.73652071 12.5702105,0.700354613 13.3732471,1.45877803 C13.4009372,1.48492978 13.4278746,1.51186717 13.4540263,1.53955726 L18.7242,7.1197412 C19.857659,8.31987419 21.4355069,9 23.0862789,9"></path></svg>
                                <p className="text-[16px] text-[#0a8800] font-[600]">
                                    <Image className="inline mr-1" width={20} height={20} src="/dollor-coverd.avif" alt="price coverd" />
                                    Submit order now with our Price Match Guarantee.
                                </p>
                            </div>
                            <div className="pt-2 pb-3 border-b border-b-gray-200">
                                <p className='text-[#555555] font-[400] text-[13px]'>
                                    By submitting your order, you agree to our <Link href="#" className='text-[#0065BE] underline'>Terms of Use</Link> and <Link href="#" className='text-[#0065BE] underline'>Privacy Policy</Link>.
                                </p>
                            </div>
                            <div className="py-6">
                                <button className='hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-full py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold'>
                                    Submit order
                                </button>
                            </div>
                            <CheckoutTermConditions />
                        </div>
                    </div>
                </div>
            </div>

            <EditAddressModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                address={selectedAddressToEdit}
            />
            <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
        </>
    )
}

export default CheckoutMain;
