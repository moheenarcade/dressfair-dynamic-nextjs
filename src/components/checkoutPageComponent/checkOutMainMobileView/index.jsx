"use client"
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import CheckoutTermConditions from '../checkoutTermsConditions';
import { BsCheckLg } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import CheckoutCartItemSliderMobile from '../checkoutCartItemSliderMobile';
import { FaChevronRight, FaChevronUp } from 'react-icons/fa6';
import MobileChekoutListBottomModal from '@/components/models/MobileChekoutListBottomModal';
import MobileChekoutAddressList from '@/components/models/MobileChekoutAddressList';
import CartItemsDetailCheckoutMobile from '@/components/models/cartItemsDetailCheckoutMobile';

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

const CheckOutMainMobileView = () => {
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
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openQty, setOpenQty] = useState(false);
    const [selectedQty, setSelectedQty] = useState(1);
    const qtyOptions = [0, 1, 2, 3, 4, 5];
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [showMobileAddressModel, setShowMobileAddressModel] = useState(false);
    const [showCartItemsModel, setShowCartItemsModel] = useState(false);





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
        const handleClickOutside = () => setShowMoreMenu(false);
        if (showMoreMenu) document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showMoreMenu]);


    return (

        <>
            <h1 aria-label="Shopping cart"></h1>

            <div className="checkout-header fixed w-full top-0 bg-white right-0 left-0 z-[99999]">
                <div className="flex items-center justify-between py-2 px-3">
                   <Link href="/cart"> <GoChevronLeft className='text-3xl' /></Link>
                    <p className='font-semibold text-[19px]'>
                        Checkout ({totalQty})
                    </p>
                    <p className='invisible'>
                        <GoChevronLeft className='text-3xl' />
                    </p>
                </div>
                <div className="px-3">
                    <div className="flex items-center border border-[#0A8800] py-px rounded-sm overflow-hidden">
                        <BsCheckLg className="text-xl bg-white text-[#0A8800] w-6 shrink-0" />
                        <div className="relative overflow-hidden whitespace-nowrap w-full">
                            <p className="text-[14px] text-[#0A8800] font-[700] inline-block animate-marquee">
                                Free shipping for you · Never overpay with our Price Match Guarantee · Rs.280 Credit for delay · All data is safeguarded &nbsp;&nbsp;&nbsp;
                            </p>
                            <p className="text-[14px] text-[#0A8800] font-[700] inline-block animate-marquee">
                                Free shipping for you · Never overpay with our Price Match Guarantee · Rs.280 Credit for delay · All data is safeguarded &nbsp;&nbsp;&nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" pt-5 bg-white">
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowMobileAddressModel(true);
                    }}
                    className="overflow-hidden flex gap-2 cursor-pointer bg-white relative rounded-sm p-3">
                    <CiLocationOn className='text-xl mt-1' />
                    <div className="">
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
                    </div>
                    <button className='absolute right-1 top-1 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:scale-[1.08] transition-all duration-300 ease-in-out'>
                        <FaRegEdit />
                    </button>
                    <div className="mobileaddress absolute right-0 left-0 bottom-0 h-2" ></div>
                </div>
            </div>
            <div className="px-3 border-y border-y-gray-100 border-y-4 pb-3">
                <CheckoutCartItemSliderMobile />
            </div>

            <div className="payment-method mt-4 border-b border-b-gray-200 pb-3 px-4">
                <p className='text-[#222] font-[600] flex items-center gap-2 text-[18px] mb-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true"><path d="M462.4 85.2c27.7-11.1 58.7-11.3 86.5-0.4l324.9 125.6c29 11.2 47.8 39.5 46.9 70.6l-6.5 214.4c-4.2 137.7-72.5 265.5-184.7 345.4l-85.3 60.8c-81.8 58.2-191.5 58.2-273.2 0l-80.5-57.3c-114.3-81.4-183-212.4-184.9-352.7l-2.8-212c-0.4-30.3 17.9-57.8 46.1-69.1z m64.3 56.9c-13.4-5.2-28.2-5.1-41.5 0.2l-313.5 125.3c-4.6 1.8-7.5 6.3-7.5 11.1l2.9 212.1c1.6 120.8 60.7 233.5 159.1 303.5l80.4 57.2c60.4 43 141.5 43 201.9 0l85.4-60.8c96.5-68.8 155.3-178.7 158.9-297.1l6.5-214.5c0.1-5-2.9-9.6-7.6-11.4z m169.1 261.2l3.8 3.3c12 12 12 31.4 0 43.4l-188.3 188.3c-12 12-31.4 12-43.4 0l-115.9-115.9c-12-12-12-31.4 0-43.4 12-12 31.4-12 43.5 0l94.1 94.1 166.6-166.5c10.8-10.8 27.6-11.9 39.6-3.3z"></path></svg>
                    Payment methods</p>
                <div className="space-y-1 w-full">
                    {paymentMethods.map((item) => (
                        <label
                            key={item.id}
                            className={`flex items-center gap-3 py-2 border-b border-b-gray-200 w-full cursor-pointer transition relative
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
                            <Image src={item.icon} alt={item.label} width={30} height={30} />
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[15px] font-[600] text-[#222]">{item.label}</span>
                                {item.providers && (
                                    <div className="flex items-center gap-1">
                                        {item.providers.map((logo, i) => (
                                            <Image key={i} src={logo} alt="provider" width={25} height={18} />
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


            <div className="w-full lg:w-[50%] px-3 py-3 border-y border-y-4 border-y-gray-100">
                <p className='text-[#0A8800] text-[16px] font-[600] pb-1'>Shipping: FREE</p>
                <div className="">
                    <p className='flex items-center cursor-pointer text-[#000000] text-[13px] font-[500]'>Delivery: 7-17 business days <FiChevronRight /></p>
                    <p className='flex items-center gap-1 text-[12px] py-1 cursor-pointer text-[#757575] font-[500]'>Get a Rs.280 Credit for late delivery
                        <svg className="cursorPointer _2vX5r2QW" alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#cdcdcd"><path d="M512 7.3c278.7 0 504.7 226 504.7 504.7 0 278.7-226 504.7-504.7 504.7-278.7 0-504.7-226-504.7-504.7 0-278.7 226-504.7 504.7-504.7z m-16 679.1c-35 0-63.3 28.3-63.3 63.3 0 35 28.3 63.3 63.3 63.3 35 0 63.3-28.3 63.3-63.3 0-35-28.3-63.3-63.3-63.3z m6.5-496.8c-62.5 0-111.4 17.7-147.7 53.2-18.8 18-33.9 50.6-45.3 98-5.1 21.3 8 42.7 29.3 47.8 3 0.7 6.1 1.1 9.2 1.1 26.4 0 49.3-18.4 54.9-44.3 3.9-18 8.7-30.8 14.4-38.4 16-23.6 42.2-34.6 79.3-34.6 28.7 0 51.5 7.6 67.5 23.6 15.2 16 23.6 38 23.6 65.8 0 21.1-7.6 41.4-22.8 59.9l-10.1 11.8c-54.9 48.9-87.8 84.4-98.7 107.2-4.7 9-8.5 23.7-11.7 44.3-3.6 23.9 12.9 46.2 36.8 49.8 2.2 0.3 4.3 0.5 6.5 0.5 26.4 0 49.1-18.6 54.4-44.4 2-9.7 4.3-17.1 6.8-22.3 7.6-15.2 18.6-29.5 33.8-42.2 40.5-35.4 65-58.2 72.5-66.7 20.3-27 31.2-61.6 31.3-103.8 0-51.5-16.9-92-50.7-121.5-33.8-30.4-78.5-44.7-133.3-44.8z"></path></svg>
                    </p>
                    <p className='flex items-center cursor-pointer text-[13px] text-[#757575] font-[500]'>Courier company:   TCS,   Leopards,  etc. <FiChevronRight /></p>
                </div>
            </div>

            <div className="pt-3 px-3 pb-3">
                <button className='flex items-center justify-between w-full text-[#222222] text-[17px] font-semibold'>
                    <p className='hover:underline'>Apply coupon code</p>
                    <FaChevronRight className='text-[15px]' />
                </button>
            </div>

            <div className="px-3 border-y-4 pb-4 border-y-gray-100">
                <div className="border-b border-b-gray-200 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[16px] text-[#222] font-semibold">Item(s) total:</p>
                        <p className="text-[17px] text-[#555] line-through ">Rs. {subtotal}</p>
                    </div>
                    {/* <div className="flex items-center justify-between mb-3">
                        <p className="text-[16px] text-[#222] font-semibold">Item(s) discount:</p>
                        <p className="text-[17px] font-semibold text-[#fb7701]">-Rs.54,070</p>
                    </div> */}
                    <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#222] font-semibold">Subtotal:</p>
                        <p className="text-[17px] text-[#222] font-[500]">Rs.{subtotal}</p>
                    </div>
                </div>
                <div className="flex items-start justify-between pt-3">
                    <p className="text-[17px] text-[#222] font-semibold">
                        Order total (Applicable taxes included):
                    </p>
                    <p className='text-[#0A8800] text-[20px] font-bold'>
                        <span className='text-[15px]'>Rs.</span>{subtotal}
                    </p>
                </div>
                <div className="border border-[#0a8800] rounded-md p-2 mt-1 relative">
                    <svg className="box-1bqlm right-6 -top-3 absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 8" width="1em" height="1em" fill="#0a8800" alt="bubble_arrow" style={{ stroke: ' rgb(10, 136, 0)' }}><path d="M0.913721065,9 C2.56449311,9 4.14234104,8.31987419 5.27579998,7.1197412 L10.5459737,1.53955726 C11.3043971,0.73652071 12.5702105,0.700354613 13.3732471,1.45877803 C13.4009372,1.48492978 13.4278746,1.51186717 13.4540263,1.53955726 L18.7242,7.1197412 C19.857659,8.31987419 21.4355069,9 23.0862789,9"></path></svg>
                    <p className="text-[16px] text-[#0a8800] font-[600]">
                        <Image className="inline mr-1" width={20} height={20} src="/dollor-coverd.avif" alt="price coverd" />
                        Submit order now with our Price Match Guarantee.
                    </p>
                </div>
                <div className="pt-2 pb-3 border-b-4 mb-4 border-b-gray-100">
                    <p className='text-[#555555] font-[400] text-[13px]'>
                        By submitting your order, you agree to our <Link href="#" className='text-[#0065BE] underline'>Terms of Use</Link> and <Link href="#" className='text-[#0065BE] underline'>Privacy Policy</Link>.
                    </p>
                </div>

                <CheckoutTermConditions />
            </div>


            <div className="fixed left-0 right-0 w-full bottom-0 py-3 border-t border-t-gray-100 px-1 md:px-6 z-[9] bg-white block xl:hidden">
                <div className="flex items-center gap-1 justify-between rounded-full bg-white">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                        className="w-[35%] flex flex-col">
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
                    <Link href="#" className="w-[65%] ">
                        <button className="bg-[#fb5d01] py-3  w-full hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold flex flex-col justify-center text-lg py-1 px-5 lg:px-6 rounded-full transition-all duration-300 ease-in-out">

                            Submit order ({totalQty})
                        </button>
                    </Link>
                </div>
            </div>


            {/* Modal -PRICE DETAIL with props */}
            <MobileChekoutListBottomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cartItems={cartItems}
                toggleQtyDropdown={toggleQtyDropdown}
                updateQty={updateQty}
                qtyOptions={qtyOptions}
                setIsModalOpen={setIsModalOpen}
            />

            <MobileChekoutAddressList
                isOpen={showMobileAddressModel}
                onClose={() => setShowMobileAddressModel(false)}
                cartItems={cartItems}
                toggleQtyDropdown={toggleQtyDropdown}
                updateQty={updateQty}
                qtyOptions={qtyOptions}
                setShowMobileAddressModel={setShowMobileAddressModel}

            />



        </>
    )
}

export default CheckOutMainMobileView;
