"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsCreditCard2Front } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineCircleNotifications, MdPayment } from "react-icons/md";
import { PiBookBookmarkLight } from "react-icons/pi";
import { RiCoupon5Line } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { TfiUser } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import OrdersNavbar from "./orders/ordersNavbar";
import ExploreInterestProducts from "@/components/productDetailPageComponent/exploreInterestProducts";
import ProductListingMobile from "@/components/homePageMobile/productListingMobile";

export default function UserLayout({ children }) {
    const pathname = usePathname();
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);

    useEffect(() => {
        if (pathname.includes('/user/orders/')) {
            setIsOrdersOpen(true);
        } else {
            setIsOrdersOpen(false);
        }
    }, [pathname]);

    const dropdownVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1 },
    };

    const isOrdersPage = pathname.includes('/user/orders/');
    const isBrowsingPage = pathname.includes('/user/browsing-history')
    const breadcrumbs = {
        "/user/profile": "Profile",
        "/user/orders/all-orders": "Your orders",
        "/user/orders/processing": "Processing",
        "/user/orders/shipped": "Shipped",
        "/user/orders/delivered": "Delivered",
        "/user/orders/returns": "Returns",
        "/user/orders/cancel": "Cancel",
        "/user/your-reviews": "Your reviews",
        "user/coupons-offers": "Coupons offers",
        "/user/address-settings": "Address settings",
        "/user/coupons-offers": "Coupen offers",
        "/user/followed-stores": "Followed stores",
        "/user/browsing-history": "Browsing history",
        "/user/addresses": "Addresses",
        "/user/country-region-language": "country region language",
        "/user/payment-methods": "Payment methods",
        "/user/account-security": "Account security",
        "/user/permissions": "Permissions",
        "/user/notifications": "Notifications",
    };
    const activePage = breadcrumbs[pathname] || "";
    return (
        <div className="container mx-auto px-0 lg:px-16 xl:px-2 2xl:px-22">
            <div className="hidden lg:block">
                <div className="flex items-center text-[14px] px-2 lg:px-0 font-[500] gap-1 pt-4">
                    <h2 className="">Home</h2>
                    <FaChevronRight className="text-[11px]" />
                    <p>
                        {activePage}
                    </p>
                </div>
            </div>
            <div className="flex">
                <aside className="hidden lg:block w-[220px] py-6">
                    <nav className="flex flex-col gap-1">
                        <Link href="/user/orders/all-orders">
                            <button
                                onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                                className={`flex items-center justify-between w-full text-[#222] text-[14px] font-[500] rounded-sm gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3`}
                            >
                                <div className="flex items-center gap-1">
                                    <PiBookBookmarkLight className="text-2xl" /> Orders
                                </div>
                                <IoChevronDown
                                    className={`transition-transform duration-300 ${isOrdersOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                        </Link>
                        <AnimatePresence>
                            {isOrdersOpen && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex flex-col mt-1 gap-1 text-[#888] text-[12px]"
                                >
                                    <Link
                                        href="/user/orders/all-orders"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/all-orders" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        All Orders
                                    </Link>
                                    <Link
                                        href="/user/orders/processing"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/processing" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        Processing
                                    </Link>
                                    <Link
                                        href="/user/orders/shipped"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/shipped" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        Shipped
                                    </Link>
                                    <Link
                                        href="/user/orders/delivered"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/delivered" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        Delivered
                                    </Link>
                                    <Link
                                        href="/user/orders/returns"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/returns" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        Returns
                                    </Link>
                                    <Link
                                        href="/user/orders/cancel"
                                        className={`flex items-center justify-between pl-[38px] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/orders/cancel" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent"}`}
                                    >
                                        Cancel
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Link
                            href="/user/your-reviews"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/your-reviews" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"}
                                `}
                        >
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M725.3 179.2c89.5 0 162.1 72.6 162.2 162.1l0 299.2c0 89.3-72.2 161.8-161.6 162.1l-110.7 0.4c-3.1 0-6.1 1.4-8.2 3.7l-49.5 55.4c-37.5 42-102 45.6-144 8-2.9-2.6-5.6-5.3-8.2-8.2l-49.1-55.2c-2.1-2.4-5.1-3.7-8.3-3.7l-99.9-0.4c-85.2-0.3-154.1-69.5-154.1-154.7l0-306.6c0-89.5 72.6-162.1 162.1-162.1z m0 68.3l-469.3 0c-51.8 0-93.9 42-93.9 93.8l0 306.6c0 47.6 38.5 86.3 86.2 86.4l99.9 0.4c22.5 0.1 44 9.8 59 26.6l49.1 55.2 2.7 2.7c13.9 12.4 35.2 11.2 47.6-2.6l49.5-55.4c15-16.8 36.4-26.4 58.8-26.5l110.8-0.4c51.7-0.2 93.5-42.2 93.5-93.8l0-299.2c0-51.8-42-93.9-93.9-93.8z m-272.9 112.4c10.4-21.1 36-29.8 57.1-19.4 8.4 4.2 15.2 11 19.4 19.4l22.5 45.6c1.9 3.8 5.5 6.4 9.6 7l50.3 7.3c23.3 3.4 39.5 25 36.1 48.3-1.3 9.3-5.7 17.9-12.4 24.4l-36.4 35.5c-3 2.9-4.4 7.2-3.7 11.3l8.6 50.1c4 23.2-11.6 45.3-34.8 49.3-9.2 1.6-18.8 0.1-27.1-4.3l-45-23.7c-3.7-2-8.2-2-11.9 0l-45 23.7c-20.9 11-46.7 2.9-57.6-17.9-4.4-8.3-5.9-17.8-4.3-27.1l8.6-50.1c0.7-4.2-0.7-8.4-3.7-11.3l-36.3-35.5c-16.9-16.4-17.2-43.5-0.8-60.3 6.5-6.7 15.1-11.1 24.4-12.4l50.3-7.3c4.2-0.6 7.8-3.2 9.6-7z m38.3 57.4l-7.2 14.6c-10.6 21.4-31 36.2-54.6 39.7l-16.1 2.3 11.6 11.3c15.4 15 23.2 35.9 21.8 57.2l-0.9 7-2.8 16 14.4-7.5c19-10 41.4-11 61.1-3l6.4 3 14.4 7.5-2.8-16c-3.6-21.2 2.3-42.7 16-59l4.9-5.2 11.6-11.3-16-2.3c-21.5-3.1-40.3-15.7-51.5-34l-3.2-5.7-7.1-14.6z"></path></svg>

                                Your reviews
                            </div>
                        </Link>
                        <Link
                            href="/user/profile"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/profile" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <TfiUser className="text-xl" /> Your profile
                            </div>
                        </Link>
                        <Link
                            href="/user/coupons-offers"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/coupons-offers" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <RiCoupon5Line className='text-xl' /> Coupons & offers
                            </div>
                        </Link>
                        <Link
                            href="/user/credit-balance"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/credit-balance" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <BsCreditCard2Front className='text-xl' /> Credit balance
                            </div>
                        </Link>
                        <Link
                            href="/user/followed-stores"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/followed-stores" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M672.1 136.5c92.4 0 173.6 61.1 199.1 149.4l0.1 0.9c9.2 22.6 14 47 14 72 0 57.1-24.9 108.3-64 141.5l0 216.5c0 70.7-57.3 128-128 128l-405.3 0c-70.7 0-128-57.3-128-128l0-214.7c-40.3-33.1-66.1-85.1-66.1-143.3 0-34 8.8-66.7 25.2-95l-1.3 2.3 2.8-6.5c32.3-71.6 102.4-119.3 181.3-122.9l9.5-0.2z m-296 356l-5.8 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.3 0.3c-11.8 0-23.4-1.3-34.4-3.7l0 181.2c0 33 26.7 59.7 59.7 59.7l405.3 0c33 0 59.7-26.7 59.8-59.7l0-181.8c-11.8 2.8-24.1 4.3-36.7 4.3-40.3 0-78-15.1-107.5-41.3l-5.9-5.5-5.9 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.2 0.3c-40.3 0-78-15.2-107.6-41.3l-5.9-5.5z m296-287.7l-360.7 0c-57.9 0-109.8 35.3-131.1 88.8l-2.1 4.5c-10.4 17.9-16 38.8-16.1 60.7 0 62.6 45.7 112.2 100.6 112.2 34 0 65.4-19.1 84-50.5 13.2-22.4 45.6-22.4 58.8-0.1 18.7 31.5 50.1 50.6 84.1 50.6 34 0 65.4-19 84-50.5 13.2-22.3 45.5-22.4 58.7 0 18.7 31.5 50.1 50.6 84.1 50.5 54.9 0 100.6-49.6 100.6-112.2 0-16.2-3.1-31.9-10-49.2l-1.3-4.2c-17.2-59.6-71.7-100.6-133.6-100.6z"></path></svg>

                                Followed stores
                            </div>
                        </Link>
                        <Link
                            href="/user/browsing-history"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/browsing-history" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 125.9c213.3 0 386.1 172.9 386.1 386.1 0 213.3-172.9 386.1-386.1 386.1-213.3 0-386.1-172.9-386.2-386.1 0-213.3 172.9-386.1 386.2-386.1z m0 68.2c-175.6 0-317.9 142.3-317.9 317.9 0 175.6 142.3 317.9 317.9 317.9 175.6 0 317.9-142.3 317.8-317.9 0-175.6-142.3-317.9-317.8-317.9z m-10.7 166.4c18.9 0 34.1 15.3 34.1 34.2l0 132.7 74.3 58.4c13.6 10.7 16.9 29.6 8.3 44.1l-2.6 3.8c-11.7 14.8-33.1 17.4-47.9 5.8l-87.3-68.7c-8.2-6.5-13-16.4-13-26.8l0-149.3c0-18.9 15.3-34.1 34.1-34.2z"></path></svg>

                                Browsing history
                            </div>
                        </Link>
                        <Link
                            href="/user/addresses"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/addresses" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 93.9c209.7 0 379.7 169.9 379.7 379.5 0 13.8-0.8 27.7-2.4 42l-0.4 2.8-2.6 17.2c-1.3 7.7-2.8 15.5-4.6 23.8l-3.8 14.8c-17.1 62.2-49.7 118.7-93.8 163.7l-10.4 10.2c-36.9 38.4-91.9 82.7-165.3 133.5-58.1 40.1-134.9 40.1-192.9 0-73.4-50.8-128.3-95.1-164.1-132.3-54-51-92.1-116.8-108.9-189l-0.5-2.2c-2.5-11.1-4.5-22.6-6.1-34.5l-1.3-8c-1.6-14.4-2.4-28.2-2.4-42 0-209.6 170-379.6 379.8-379.5z m0 68.2c-172 0-311.5 139.4-311.5 311.3 0 11.1 0.7 22.5 1.9 34.1l2.6 16.8c1 6.2 2.1 12.1 3.2 17.3l3.9 15.2c15.2 54.6 45.1 103.9 87.3 143.8 33.3 34.6 84.9 76.2 154.9 124.7 34.7 24 80.6 24 115.3 0 70-48.4 121.6-90.1 156.1-125.8 44.3-41.9 75.5-95.8 89.1-154l3.3-16.4 3.2-20.2 1.2-12.8c0.6-7.7 0.9-15.2 0.9-22.7 0-171.9-139.4-311.3-311.4-311.3z m0 179.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.6 40.1 0 72.5-32.5 72.5-72.6 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>

                                Addresses
                            </div>
                        </Link>
                        <Link
                            href="/user/country-region-language"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/country-region-language" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <TbWorld className='text-2xl' /> Country/Region & Language
                            </div>
                        </Link>
                        <Link
                            href="/user/payment-methods"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/payment-methods" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <MdPayment className='text-xl' /> Your payment methods
                            </div>
                        </Link>
                        <Link
                            href="/user/account-security"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/account-security" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <AiOutlineSecurityScan className='text-2xl' /> Account security
                            </div>
                        </Link>
                        <Link
                            href="/user/permissions"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/permissions" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" className="icon-33dOL"><path d="M400 154.9c56.1-32.4 125.2-32.4 181.3 0l173.3 100c56.1 32.4 90.7 92.3 90.7 157l0 200.2c0 64.8-34.6 124.6-90.7 157l-173.3 100c-56.1 32.4-125.2 32.4-181.3 0l-173.3-100c-56.1-32.4-90.7-92.3-90.7-157l0-200.2c0-64.8 34.6-124.6 90.7-157z m147.2 59.1c-35-20.2-78.1-20.2-113.1 0l-173.3 100c-35 20.2-56.5 57.5-56.5 97.9l0 200.2c0 40.4 21.6 77.7 56.5 97.9l173.3 100c35 20.2 78.1 20.2 113.1 0l173.3-100c35-20.2 56.5-57.5 56.5-97.9l0-200.2c0-40.4-21.6-77.7-56.5-97.9z m-56.5 157.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.5 40.1 0 72.5-32.5 72.5-72.5 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>

                                Permissions
                            </div>
                        </Link>
                        <Link
                            href="/user/notifications"
                            className={`flex items-center justify-between text-[#222] text-[14px] font-[500] gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 py-2 px-3 border-l-4 ${pathname === "/user/notifications" ? "bg-[#fff7f0] border-l-[#fb7701]" : "border-l-transparent rounded-sm"
                                }`}
                        >
                            <div className="flex items-center gap-1">
                                <MdOutlineCircleNotifications className='text-2xl' /> Notifications
                            </div>
                        </Link>

                    </nav>
                </aside>
                <main className="flex-1 px-0 py-4 lg:px-6 lg:py-6 bg-white">
                    {isOrdersPage && <OrdersNavbar />}
                    {children}
                </main>

            </div>
            {isOrdersPage || isBrowsingPage &&
                <>
                    <div className="explore-interest pt-2 pb-12 hidden xl:block">
                        <h3 className="text-[#222] font-bold pb-3 text-[22px] px-2">Explore your interests</h3>
                        <ExploreInterestProducts />
                    </div>
                    <div className="block: xl:hidden pt-2 pb-12">
                        <ProductListingMobile />
                    </div>
                </>
            }
        </div>
    );
}
