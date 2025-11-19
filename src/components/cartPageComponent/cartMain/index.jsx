"use client";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoCircle } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { GoChevronRight } from 'react-icons/go';
import { GiCheckMark } from "react-icons/gi";
import CartExploreProducts from "../cartExploreProducts";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { MdLock } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { LuCheck, LuChevronRight } from "react-icons/lu";
import { RiSecurePaymentFill } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";


const CartMain = () => {
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
            <h1 aria-label="Shopping cart"></h1>
            <div className="breadcrupms pb-3">
                <ul className="flex items-center gap-1 text-[#777] text-sm pt-6">
                    <Link href="/"><li>Home</li></Link>
                    <GoChevronRight />
                    <li className="text-black">Cart</li>
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

                    <div className="cart-list pt-3">
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={toggleSelectAll}
                        >
                            {allSelected ? (
                                <BsCheckCircleFill className="text-xl text-[#222] border border-white" />
                            ) : (
                                <GoCircle className="text-xl text-black" />
                            )}

                            <p className="text-[14px] text-[#222] font-[600]">
                                Select all ({cartItems.filter(item => item.selected).length})
                            </p>
                        </div>

                        <div className="cart-items pt-4 flex flex-col gap-5 border-t border-t-gray-200 mt-4 pb-10">
                            {cartItems.map((item) => (
                                <div key={item.id} className="single-item flex gap-4 items-center">
                                    <button
                                        className=" "
                                        onClick={() => toggleSingle(item.id)}
                                    >
                                        {item.selected ? (
                                            <BsCheckCircleFill className="text-xl text-[#222]" />
                                        ) : (
                                            <GoCircle className="text-xl text-black" />
                                        )}
                                    </button>
                                    <div className="flex gap-4">
                                        <div className="border border-gray-100 overflow-hidden rounded-md">
                                            <Image
                                                className="w-[220px] h-auto"
                                                width={100}
                                                height={100}
                                                src={item.img}
                                                alt="product banner"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <div className="flex gap-2 items-start">
                                                <p className="line-clamp-1 text-[#222] text-[15px] font-[400]">24-Hour Long-Lasting Body & Deodorant Spray - Non-Sticky, Refreshing Aroma, Elegant Design for Men & Women, Perfect for Dates, Outdoor Activities, Ideal Gift, Daily Use</p>
                                                <button>
                                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" aria-hidden="true" fill="#888"><path d="M603.4 96c47.7 0 86.9 36.4 91.3 82.9l0.5 8.8-0.1 75.1 168.9 0c24.7 0 44.8 20.1 44.8 44.8 0 22.7-16.9 41.4-38.7 44.4l-6.1 0.4-20.5 0-46.2 436.2c-5.5 52.1-47.2 92.3-98.5 96.9l-9.7 0.4-354.2 0c-52.4 0-96.8-37.2-106.7-87.7l-1.5-9.6-46.2-436.2-20.5 0c-24.7 0-44.8-20.1-44.8-44.8 0-22.7 16.9-41.4 38.7-44.3l6.1-0.5 169 0 0-75.1c0-47.7 36.4-86.9 82.9-91.3l8.8-0.4 182.7 0z m149.9 256.4l-482.7 0 45.2 426.7c0.9 8.4 7.1 15 15 16.8l4.1 0.4 354.2 0c8.4 0 15.7-5.4 18.2-13.1l0.9-4.1 45.1-426.7z m-149.9-166.8l-182.7 0c-0.8 0-1.5 0.4-1.8 1.1l-0.3 1 0 75.1 186.9 0 0.1-75.1c0-0.8-0.4-1.5-1.1-1.8l-1.1-0.3z"></path></svg>
                                                </button>
                                            </div>
                                            <div className="flex justify-between w-full items-center border-b border-b-gray-200 pb-2">
                                                <div className="text-center text-[#222222] text-[18px] font-semibold py-2 flex items-center gap-1">
                                                    <span className="text-[14px]">Rs.</span>{item.price}
                                                    <p className="text-[#757575] text-[14px] font-normal relative"><span className="absolute top-[10px] bg-[#FB7701] w-full h-[2px]"></span>27452</p>
                                                    <p className="text-[#fb7701] border border-[#fb7701] px-1 p-px rounded-sm text-[12px]">
                                                        -47%
                                                    </p>
                                                </div>
                                                <div className="select-qty-option relative w-[90px]">
                                                    <div
                                                        className="border border-[#aaa] font-semibold rounded-sm px-3 py-1 text-sm cursor-pointer flex justify-between items-center bg-white"
                                                        onClick={() => toggleQtyDropdown(item.id)}
                                                    >
                                                        Qty <span>{item.qty}</span>
                                                        <span
                                                            className={`transform transition-transform duration-300 ${item.openQty ? "rotate-180" : ""
                                                                }`}
                                                        >
                                                            <IoIosArrowDown />
                                                        </span>
                                                    </div>

                                                    <AnimatePresence>
                                                        {item.openQty && (
                                                            <motion.ul
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-px rounded-md shadow-md overflow-hidden z-50"
                                                            >
                                                                {qtyOptions.map((qty) => (
                                                                    <motion.li
                                                                        key={qty}
                                                                        whileHover={{ backgroundColor: "#f3f3f3" }}
                                                                        className="px-3 py-2 text-sm cursor-pointer font-semibold"
                                                                        onClick={() => updateQty(item.id, qty)}
                                                                    >
                                                                        {qty}
                                                                    </motion.li>
                                                                ))}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-explore-more-pro">
                            <h2 className="text-[#222] text-[20px] font-semibold px-2">Explore Dressfair's picks</h2>

                            <CartExploreProducts />
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[30%] pt-4 self-start lg:sticky top-4 h-fit">
                    <p className="text-[#222] text-[18px] font-semibold">Order Summary</p>

                    <div className="border-b border-b-gray-200 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[15px] text-[#222]">Item(s) total:</p>
                            <p className="text-[15px] text-[#555] line-through">Rs.85,614</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-[15px] text-[#222]">Item(s) discount:</p>
                            <p className="text-[15px] font-semibold text-[#fb7701]">-Rs.54,070</p>
                        </div>
                    </div>

                    <div className="pt-4 pb-8">
                        <div className="flex justify-between items-center">
                            <p className="text-[16px] text-[#222] font-semibold">Total</p>
                            <p className="text-[#0a8800] text-[20px] font-semibold">Rs.31,544</p>
                        </div>
                    </div>

                    <Link href="/checkout" className="hover:bg-[#fb7701] hover:scale-[1.03] text-md transition-all duration-300 ease-in-out w-full py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">
                      <button className="w-full">  Checkout (7)</button>
                    </Link>
                    <p className="text-[13px] text-[#555555] flex items-start pt-3">
                        <HiMiniExclamationCircle className="mt-1 mr-1" />
                        Item availability and pricing are not guaranteed until payment is final.
                    </p>

                    <div className="pt-4">
                        <p className="mb-3 mr-2 text-[#222] text-[14px] font-[500]">
                            <MdLock className="text-[#088901] text-2xl inline" />
                            You will not be charged until you review this order on the next page
                        </p>
                        <div className="">
                            <p className="inline mr-2 text-[#222] text-[14px] font-bold">
                                <AiFillSafetyCertificate className="text-[#088901] text-2xl inline" />
                                Safe Payment Options
                            </p>
                            <p className="text-[#222] text-[14px]">
                                <span className="text-[#0A8800]">
                                    Temu is committed to protecting your payment information.
                                </span>
                                We follow PCI DSS standards, use strong encryption, and perform regular reviews of its system to protect your privacy.
                            </p>

                            <div className="pt-2">
                                <p className="text-[#222] text-[14px] font-[500]">
                                    1.Payment methods
                                </p>
                                <div className="pt-2 flex flex-wrap gap-2">

                                    <Image width={40} height={40} src="/jazzcash.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/amarcan.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/aplepay.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/dinerclub.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/jazzcash.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/discover.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/googlepay.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/jcbpayment.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/maestro.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/mastercard.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/unionpay.avif" alt="payemnt system" />
                                    <Image width={40} height={40} src="/visapaymewnt.avif" alt="payemnt system" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-[#222] text-[14px] font-[500]">
                                    2.Security certification
                                </p>
                                <div className="pt-2 flex flex-wrap gap-2">
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/pcj.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/visasecure.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/id-check.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/safekey.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/protectbuy.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/j-secure.avif" alt="payemnt system" />
                                    <Image className="w-auto h-[30px]" width={40} height={40} src="/apwg.avif" alt="payemnt system" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="inline mr-2 text-[#222] text-[14px] font-bold">
                                    <MdLock className="text-[#088901] text-2xl inline" />
                                    Secure privacy
                                </p>
                                <p className="text-[#555] text-[14px] pt-1 font-[400]">
                                    Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.
                                </p>
                                <Link href="#" className="flex font-[400] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                                    Learn more <LuChevronRight />

                                </Link>
                            </div>

                            <div className="pt-4">
                                <p className="inline mr-2 text-[#222] text-[14px] font-bold">
                                    <RiSecurePaymentFill className="text-[#088901] text-2xl inline" />
                                    Temu Purchase Protection
                                </p>
                                <p className="text-[#555] text-[14px] pt-1 font-[400]">
                                    Shop confidently on Temu knowing that if something goes wrong, we've always got your back.
                                </p>
                                <Link href="#" className="flex font-[400] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                                    See program terms<LuChevronRight />
                                </Link>
                            </div>
                            <div className="pt-4">
                                <p className="inline mr-2 text-[#222] text-[14px] font-bold">
                                    <TbTruckDelivery className="text-[#088901] text-2xl inline" />
                                    Delivery guarantee
                                </p>
                                <ul className="flex flex-wrap gap-x-2">
                                    <p>
                                        <li className="text-[#555] text-[14px] pt-1 font-[400] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />Rs.280 Credit for delay</li>
                                        <li className="text-[#555] text-[14px] pt-1 font-[400] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />Return if item damaged</li>
                                    </p>
                                    <p>
                                        <li className="text-[#555] text-[14px] pt-1 font-[400] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />15-day no update refund</li>
                                        <li className="text-[#555] text-[14px] pt-1 font-[400] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />30-day no delivery refund</li>
                                    </p>
                                </ul>
                                <Link href="#" className="flex font-[400] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                                    Learn more <LuChevronRight />

                                </Link>
                            </div>
                            <div className="pt-4">

                                <Link href="#" className="flex font-bold hover:text-black w-fit items-center gap-1 text-[#222] text-[14px] pt-1">
                                    <RiSecurePaymentFill className="text-[#088901] text-2xl inline" />
                                    Temu's Tree Planting Program <LuChevronRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default CartMain;
