"use client"
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiChatSmile3Line, RiCoupon5Line, RiGitRepositoryPrivateLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import Counrty from "../../../public/pak-eng.avif";
import HeaderTopContent from '../headerTopContent';
import { TfiMenuAlt, TfiUser } from "react-icons/tfi";
import MobileHeaderSearchModel from '../models/mobileHeaderSearchModel';
import MobileCategories from '../mobileCategories';
import MobileUserPopup from "../../components/mobileUserPopup/index";
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";
import CatImage from "../../../public/prsonilized_product.avif";
import { FaChevronRight } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import SearchBarHeader from '../searchBarHeader';
import SignInModal from '../models/SignInModal';
import { BiSupport } from "react-icons/bi";
import { AiOutlineMessage, AiOutlinePropertySafety, AiOutlineSafety, AiOutlineSecurityScan, AiOutlineUserSwitch } from 'react-icons/ai';
import { useUser } from '../../context/UserContext';
import { TbLogout2 } from 'react-icons/tb';
import { BsCreditCard2Front } from 'react-icons/bs';
import { PiBookBookmarkLight } from "react-icons/pi";
import ProductBanner from "../../../public/Solid_gray.png";
import ProductBanner2 from "../../../public/deals-product3.avif";
import { MdAddShoppingCart } from 'react-icons/md';
import { fetchAndSaveCategories, getLocalCategories } from '../../lib/api';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from "@/hooks/useTranslation";

const Header = () => {
    const pathname = usePathname();
    const { t } = useTranslation();
    const { language, toggleLanguage } = useLanguage();

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
    const isHomePage = pathname === '/' || pathname === '/home';
    const [showMobileSearchModel, setMobileSearchModel] = useState(false);
    const [showMobileCategory, setMobileCategory] = useState(false);
    const [showUserMobileDropdown, setShowUserMobileDropdown] = useState(false);
    const [showMobileUser, setShowMobileUser] = useState(false);
    const popupRef = useRef(null);
    const buttonRef = useRef(null);

    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, logout } = useUser();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userDropdownRef = useRef(null);
    const mobileCategoriesContainerRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(categories?.[0] || null);

    console.log(categories, "category list");

    const handleLogout = () => {
        logout();
        setShowUserDropdown(false);
    };

    // Fetch categories from API and save in localStorage
    useEffect(() => {
        const loadCategories = async () => {
            const apiData = await fetchAndSaveCategories(); // fetch & save
            const localCats = getLocalCategories(); // get localStorage data
            setCategories(localCats);
            setActiveCategory(localCats[0] || null); // first category active by default
        };
        loadCategories();
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowMobileUser(false);
            }
        };

        if (showMobileUser) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileUser]);

    useEffect(() => {
        if (showMegaMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showMegaMenu]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMobileCategory && mobileCategoriesContainerRef.current && !mobileCategoriesContainerRef.current.contains(event.target)) {
                setMobileCategory(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMobileCategory]);

    useEffect(() => {
        setShowMegaMenu(false);
    }, [pathname]);

    const handleMegaMenuLinkClick = () => {
        setShowMegaMenu(false);
    };


    return (
        <>
            <header>
                <div className={`pb-2 border-b hidden xl:block ${isHomePage ? 'bg-[#E02222] border-b-[#E02222]' : 'bg-white border-b-[#DFDFDF]'}`}>
                    <HeaderTopContent />
                    <nav className='container mx-auto px-2 2xl:px-22 z-[99999999999]'>
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-[50px] shrink-0">
                                <Link href="/">
                                    <Image className="w-full h-auto" width={200} height={300} src='/DFlogo.png' alt="Logo" />
                                </Link>
                            </div>

                            {/* Menu Links */}
                            <ul className="flex items-center shrink-0">
                                <Link href="/best-seller">
                                    <li className={` ${isHomePage ? "text-white " : "text-[#222222]"} relative flex items-center gap-1 font-semibold cursor-pointer  text-[14px] px-3 py-1 group rounded-md `}>
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100 `}></span>
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            fill={`${isHomePage ? "white" : "#222222"} `}
                                            className="relative z-10"
                                        >
                                            <title>{t('Best_Selling_Items')}</title>


                                            <path d="M542.7 34.1c58.8 0 110.7 40.1 127.6 98.8l0.7 2.5 0.5 1.1c0.3 0.9 0.6 1.8 0.9 2.7l0.7 2.8c6.2 29.5 9.5 59.1 9.5 88.8 0 26.2-2.4 52.3-7.2 78l-1.8 9.2 145.4 0.1c2.5 0 5 0.2 7.5 0.5l1.1 0.1 2.7 0.2c41.3 3.2 79.2 25.6 102.2 61.6l2.6 4.2c15.3 25.2 22.4 54.8 20.2 84.5l0.1-1.4 0.1-1.1 0 1.1c0.1 5.4-0.3 10.6-1.2 15.3l-0.8 3.4-74 340c-2.1 8.1-5.5 15.7-10.1 22.4l0.4-0.8 1.2-1.8-1.6 3.2c-9.9 18.7-23.9 34.8-40.8 47l-4.6 3.2c-21.9 14.4-47 21.9-72.5 21.9-0.9 0-1.7 0-2.5-0.1l-612.3-0.2c-36.4 0-66.4-29.7-68.2-67.4l-0.1-3.6c-0.1-1.6-0.2-2.7 0-4l0.3-389.6c0-34.8 24.3-64.4 57.2-70.1l3.4-0.4c102-11.9 169.3-32.5 200-59 42.2-36.2 80.1-108.7 80.1-154.3 0-78.4 59-138.7 133.3-138.8z m-218.4 460.8c-28.3 0-51.2 22.9-51.2 51.2l0 204.8c0 28.3 22.9 51.2 51.2 51.2 28.3 0 51.2-22.9 51.2-51.2l0-204.8c0-28.3-22.9-51.2-51.2-51.2z"></path>
                                        </svg>
                                        {/* 🔹 active indicator bar */}
                                        {pathname === "/best-seller" && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#FB7701] rounded-full"></div>
                                        )}
                                        <span className="relative z-10">{t('Best_Selling_Items')}</span>
                                    </li>
                                </Link>
                                <Link href="/star-rated">
                                    <li className={` ${isHomePage ? "text-white " : "text-[#222222]"} relative group flex items-center gap-1 font-semibold cursor-pointer  text-[14px] px-3 py-1 `}>
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100 `}></span>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="relative z-10" alt="" aria-label="" fill={`${isHomePage ? "white" : "#222222"} `} aria-hidden="true"><title>5-Star Rated</title><path d="M848.7 133.8c62.1 0 112.5 52.1 112.4 116.3l0 481c0 64.2-50.4 116.3-112.4 116.3l-212.5 0c-8.9 0-17.5 3.6-23.6 10.1l-86.8 90.5-0.8 0.8c-13 12.6-33.7 12.3-46.4-0.6l-88.5-90.9c-6.2-6.3-14.6-9.9-23.4-9.9l-191.4 0c-59.3 0-107.9-47.4-112.1-107.6l-0.3-8.7 0-481c0-64.2 50.4-116.3 112.4-116.3z m-329.7 178.4c-10-3.4-20.8 2.1-24.1 12.4l-34.2 106.1-108.2 0.8c-6 0-11.7 3-15.2 8-6.3 8.8-4.5 21.1 4 27.6l87.1 66.4-32.7 106.6c-1.8 5.9-0.8 12.4 2.7 17.4 6.1 8.9 18.1 10.9 26.6 4.6l88-65.1 88 65.1c4.9 3.6 11.1 4.6 16.8 2.7 10-3.3 15.6-14.4 12.4-24.7l-32.6-106.6 87-66.4c4.8-3.7 7.7-9.5 7.8-15.7 0.1-10.9-8.4-19.8-19-19.9l-108.1-0.8-34.2-106.1c-1.9-5.9-6.4-10.5-12.1-12.4z"></path></svg>
                                        <span className="relative z-10">
                                            {t('5_Star_Rated')}
                                        </span>
                                        {/* 🔹 active indicator bar */}
                                        {pathname === "/star-rated" && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#FB7701] rounded-full"></div>
                                        )}
                                    </li>
                                </Link>
                                <Link href="/new-in">

                                    <li className={` ${isHomePage ? "text-white " : "text-[#222222]"} relative group flex items-center gap-1 font-semibold cursor-pointer text-[14px] px-3 py-1 `}>
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100 `}></span>
                                        <span className="relative z-10">
                                            {t('New_In')}
                                        </span>
                                        {/* 🔹 active indicator bar */}
                                        {pathname === "/new-in" && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#FB7701] rounded-full"></div>
                                        )}
                                    </li>
                                </Link>

                                {/* Categories trigger and mega menu */}
                                <div
                                    className="relative z-[999999999999]"
                                    onMouseEnter={() => setShowMegaMenu(true)}
                                    onMouseLeave={(e) => {
                                        const toElement = e.relatedTarget;
                                        if (toElement && e.currentTarget.contains(toElement)) return;
                                        setShowMegaMenu(false);
                                    }}

                                >
                                    <li
                                        onMouseEnter={() => {
                                            setShowMegaMenu(true);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`${isHomePage ? "text-white" : "text-[#222222]"} relative cursor-pointer flex items-center gap-2 group py-1 px-3 text-[14px] font-semibold `}>
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>
                                        <span className="relative z-10">
                                            {t('Categories')}
                                        </span>
                                        <IoIosArrowDown className="relative z-10" />
                                    </li>

                                    {/* Overlay (dark background) */}
                                    {showMegaMenu && (
                                        <div
                                            className="fixed top-30 inset-0 bg-black/50 z-[9999998]"
                                            onClick={() => setShowMegaMenu(false)}
                                        ></div>
                                    )}
                                    {showMegaMenu && (
                                        <div
                                            className="absolute left-1/2 top-[30px] transform -translate-x-1/2 z-[60]
                 w-0 h-0 
                 border-l-[10px] border-l-transparent 
                 border-r-[10px] border-r-transparent 
                 border-b-[10px] border-b-white
                 "
                                        />
                                    )}
                                    {/* Mega Menu */}
                                    <div
                                        className={`fixed left-0 top-[110px] mx-auto right-0 overflow-hidden rounded-md bg-white shadow-lg transition-all duration-300 ease-in-out ${showMegaMenu ? "opacity-100 visible z-[9999999]" : "opacity-0 invisible z-[-1]"
                                            }`}
                                        style={{ height: "70vh", width: "50%" }}
                                        onMouseEnter={() => setShowMegaMenu(true)}
                                        onMouseLeave={() => setShowMegaMenu(false)}
                                    >
                                        <div className="flex h-full">
                                            {/* Left Side Categories */}
                                            <div className="w-1/4 bg-[#f6f6f6] border-r border-gray-200 overflow-y-auto">
                                                <ul>
                                                    {categories?.length > 0 &&
                                                        categories.map((cat) => (
                                                            <Link
                                                                key={cat.slug}
                                                                onClick={() => {
                                                                    sessionStorage.setItem("selectedCategorySlug", cat.slug);
                                                                    sessionStorage.setItem("selectedCategoryId", cat.id);
                                                                    handleMegaMenuLinkClick();
                                                                }}
                                                                href={`/c/${cat.slug}`}
                                                            >
                                                                <li
                                                                    key={cat.slug}
                                                                    onMouseEnter={() => setActiveCategory(cat)}
                                                                    onClick={() => {
                                                                        sessionStorage.setItem('selectedCategorySlug', cat.slug);
                                                                    }}
                                                                    className={`py-3 px-4 flex justify-between items-center cursor-pointer text-sm font-semibold ${activeCategory?.id === cat.id
                                                                        ? "bg-white text-black border-l-4 border-[#fb7701]"
                                                                        : "text-gray-600 hover:bg-white hover:text-black border-l-4 border-l-transparent"
                                                                        }`}
                                                                >
                                                                    {language == 'ar' ? cat.name : cat.name}
                                                                    <GoChevronRight className="text-[14px] text-gray-400" />
                                                                </li>
                                                            </Link>
                                                        ))}
                                                </ul>
                                            </div>

                                            {/* Right Side Subcategories */}
                                            <div className="w-3/4 p-4 overflow-y-auto">
                                                <h3 className="font-bold text-lg mb-4">{activeCategory?.name}</h3>
                                                {activeCategory?.sub_categories?.length > 0 ? (
                                                    <div className="grid grid-cols-5 gap-4">
                                                        {activeCategory.sub_categories.map((sub) => (
                                                            <>
                                                                <Link
                                                                    key={sub.slug}

                                                                    href={`/c/${sub?.slug && sub.slug ? sub.slug : activeCategory?.slug}`}
                                                                    onClick={() => {
                                                                        sessionStorage.setItem(
                                                                            "selectedCategorySlug",
                                                                            sub?.slug && sub.slug.trim() !== "" ? sub.slug : activeCategory?.slug
                                                                        );
                                                                        handleMegaMenuLinkClick();
                                                                    }}
                                                                    className="flex flex-col items-center text-center cursor-pointer group hover:scale-[1.06] transition-all duration-500 ease-in-out"
                                                                >
                                                                    <Image
                                                                        src={sub.image || ProductBanner}
                                                                        alt={sub.name}
                                                                        width={80}
                                                                        height={80}
                                                                        className="w-[80px] h-[80px] rounded-full object-cover"
                                                                    />
                                                                    <p className="mt-2 text-[14px]">{sub.name}</p>
                                                                </Link>
                                                            </>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">No sub-categories available</p>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </ul>

                            {/* Search Bar (Auto-width Section) */}
                            <SearchBarHeader />

                            <ul className="flex items-center shrink-0">
                                {user && (
                                    <li
                                        ref={userDropdownRef}
                                        className={`${isHomePage ? "text-white" : "text-[#222222]"} relative group py-1 px-3 flex items-center gap-1 cursor-pointer`}
                                        onMouseEnter={() => setShowUserDropdown(true)}
                                        onMouseLeave={() => setShowUserDropdown(false)}
                                    >
                                        <Link href="/user/orders/all-orders" className='flex items-center gap-1'>
                                            <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>
                                            <FaRegUser className="text-xl relative z-10" />

                                            <span className="leading-4 relative z-10">
                                                {user ? (
                                                    <>
                                                        <p className="text-[13px] max-w-[120px] line-clamp-1 overflow-hidden whitespace-nowrap"> {user.name || user.email || user.phone}</p>
                                                        <b className="text-[14px]">
                                                            {t('Order_Account')}
                                                        </b>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-[13px]">
                                                            {
                                                                t('Sign_in_Register')
                                                            }
                                                        </span> <br />
                                                        <b className="text-[14px]">
                                                            {t('Order_Account')}
                                                        </b>
                                                    </>
                                                )}
                                            </span>
                                        </Link>
                                        {/* User Dropdown Menu */}
                                        {user && showUserDropdown && (
                                            <ul
                                                className="absolute left-1/2 top-full py-3 mt-1 w-68 bg-white text-black rounded-r-md shadow-lg z-20 transform -translate-x-1/2"
                                            >
                                                <div
                                                    className="absolute left-1/2 top-[-8px] transform -translate-x-1/2 z-[60]
                                                 w-0 h-0 
                                                 border-l-[10px] border-l-transparent 
                                                 border-r-[10px] border-r-transparent 
                                                 border-b-[10px] border-b-white"
                                                />
                                                <div className="relative">

                                                    <div className="browsing-history shadow-lg top-[-12px] bottom-[-12px] z-[9999999] absolute bg-white w-62 right-full py-4 rounded-l-lg border-r border-r-gray-200">
                                                        <p className='font-bold px-4 text-[#1f1f1f] flex items-center gap-2'>Browsing History <FaChevronRight className='text-sm' /></p>
                                                        <ul className='pt-4 flex flex-col gap-3 overflow-y-auto h-[450px] px-4'>
                                                            <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li> <li className='flex gap-2'>
                                                                <div className="product-banner w-16 h-16">
                                                                    <Image className='w-full h-full' src={ProductBanner2} alt='product banner' />
                                                                </div>
                                                                <div className="product-content">
                                                                    <p className='text-black text-[13px] line-clamp-1'>Mens Breathable Shoes</p>
                                                                    <p className='text-[12px] text-yellow-500'>only 17 left</p>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className='text-black tetx-md font-semibold'>Rs. <span className='text-lg '>721</span></p>
                                                                        <MdAddShoppingCart className='text-xl' />
                                                                    </div>
                                                                </div>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <ul className='px-1'>
                                                        <Link href="/user/orders/all-orders">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <PiBookBookmarkLight className='text-xl' />
                                                                Your orders
                                                            </li>
                                                        </Link>
                                                        <Link href="/user/your-reviews">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M725.3 179.2c89.5 0 162.1 72.6 162.2 162.1l0 299.2c0 89.3-72.2 161.8-161.6 162.1l-110.7 0.4c-3.1 0-6.1 1.4-8.2 3.7l-49.5 55.4c-37.5 42-102 45.6-144 8-2.9-2.6-5.6-5.3-8.2-8.2l-49.1-55.2c-2.1-2.4-5.1-3.7-8.3-3.7l-99.9-0.4c-85.2-0.3-154.1-69.5-154.1-154.7l0-306.6c0-89.5 72.6-162.1 162.1-162.1z m0 68.3l-469.3 0c-51.8 0-93.9 42-93.9 93.8l0 306.6c0 47.6 38.5 86.3 86.2 86.4l99.9 0.4c22.5 0.1 44 9.8 59 26.6l49.1 55.2 2.7 2.7c13.9 12.4 35.2 11.2 47.6-2.6l49.5-55.4c15-16.8 36.4-26.4 58.8-26.5l110.8-0.4c51.7-0.2 93.5-42.2 93.5-93.8l0-299.2c0-51.8-42-93.9-93.9-93.8z m-272.9 112.4c10.4-21.1 36-29.8 57.1-19.4 8.4 4.2 15.2 11 19.4 19.4l22.5 45.6c1.9 3.8 5.5 6.4 9.6 7l50.3 7.3c23.3 3.4 39.5 25 36.1 48.3-1.3 9.3-5.7 17.9-12.4 24.4l-36.4 35.5c-3 2.9-4.4 7.2-3.7 11.3l8.6 50.1c4 23.2-11.6 45.3-34.8 49.3-9.2 1.6-18.8 0.1-27.1-4.3l-45-23.7c-3.7-2-8.2-2-11.9 0l-45 23.7c-20.9 11-46.7 2.9-57.6-17.9-4.4-8.3-5.9-17.8-4.3-27.1l8.6-50.1c0.7-4.2-0.7-8.4-3.7-11.3l-36.3-35.5c-16.9-16.4-17.2-43.5-0.8-60.3 6.5-6.7 15.1-11.1 24.4-12.4l50.3-7.3c4.2-0.6 7.8-3.2 9.6-7z m38.3 57.4l-7.2 14.6c-10.6 21.4-31 36.2-54.6 39.7l-16.1 2.3 11.6 11.3c15.4 15 23.2 35.9 21.8 57.2l-0.9 7-2.8 16 14.4-7.5c19-10 41.4-11 61.1-3l6.4 3 14.4 7.5-2.8-16c-3.6-21.2 2.3-42.7 16-59l4.9-5.2 11.6-11.3-16-2.3c-21.5-3.1-40.3-15.7-51.5-34l-3.2-5.7-7.1-14.6z"></path></svg>
                                                                Your reviews
                                                            </li>
                                                        </Link>
                                                        <Link href="/user/profile">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <TfiUser className="text-xl" />
                                                                Your profile
                                                            </li>
                                                        </Link>
                                                        <Link href="/user/coupons-offers">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <RiCoupon5Line className='text-xl' />
                                                                Coupon & offers
                                                            </li>
                                                        </Link>
                                                        <Link href="/user/credit-balance">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <BsCreditCard2Front className='text-xl' />
                                                                Credit balance
                                                            </li>
                                                        </Link>
                                                        <Link href="/user/followed-stores">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200 '>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M672.1 136.5c92.4 0 173.6 61.1 199.1 149.4l0.1 0.9c9.2 22.6 14 47 14 72 0 57.1-24.9 108.3-64 141.5l0 216.5c0 70.7-57.3 128-128 128l-405.3 0c-70.7 0-128-57.3-128-128l0-214.7c-40.3-33.1-66.1-85.1-66.1-143.3 0-34 8.8-66.7 25.2-95l-1.3 2.3 2.8-6.5c32.3-71.6 102.4-119.3 181.3-122.9l9.5-0.2z m-296 356l-5.8 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.3 0.3c-11.8 0-23.4-1.3-34.4-3.7l0 181.2c0 33 26.7 59.7 59.7 59.7l405.3 0c33 0 59.7-26.7 59.8-59.7l0-181.8c-11.8 2.8-24.1 4.3-36.7 4.3-40.3 0-78-15.1-107.5-41.3l-5.9-5.5-5.9 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.2 0.3c-40.3 0-78-15.2-107.6-41.3l-5.9-5.5z m296-287.7l-360.7 0c-57.9 0-109.8 35.3-131.1 88.8l-2.1 4.5c-10.4 17.9-16 38.8-16.1 60.7 0 62.6 45.7 112.2 100.6 112.2 34 0 65.4-19.1 84-50.5 13.2-22.4 45.6-22.4 58.8-0.1 18.7 31.5 50.1 50.6 84.1 50.6 34 0 65.4-19 84-50.5 13.2-22.3 45.5-22.4 58.7 0 18.7 31.5 50.1 50.6 84.1 50.5 54.9 0 100.6-49.6 100.6-112.2 0-16.2-3.1-31.9-10-49.2l-1.3-4.2c-17.2-59.6-71.7-100.6-133.6-100.6z"></path></svg>
                                                                Followed stores</li>
                                                        </Link>
                                                        <Link href="/user/browsing-history">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 125.9c213.3 0 386.1 172.9 386.1 386.1 0 213.3-172.9 386.1-386.1 386.1-213.3 0-386.1-172.9-386.2-386.1 0-213.3 172.9-386.1 386.2-386.1z m0 68.2c-175.6 0-317.9 142.3-317.9 317.9 0 175.6 142.3 317.9 317.9 317.9 175.6 0 317.9-142.3 317.8-317.9 0-175.6-142.3-317.9-317.8-317.9z m-10.7 166.4c18.9 0 34.1 15.3 34.1 34.2l0 132.7 74.3 58.4c13.6 10.7 16.9 29.6 8.3 44.1l-2.6 3.8c-11.7 14.8-33.1 17.4-47.9 5.8l-87.3-68.7c-8.2-6.5-13-16.4-13-26.8l0-149.3c0-18.9 15.3-34.1 34.1-34.2z"></path></svg>
                                                                Browsing history</li>
                                                        </Link>
                                                        <Link href="/user/addresses">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 93.9c209.7 0 379.7 169.9 379.7 379.5 0 13.8-0.8 27.7-2.4 42l-0.4 2.8-2.6 17.2c-1.3 7.7-2.8 15.5-4.6 23.8l-3.8 14.8c-17.1 62.2-49.7 118.7-93.8 163.7l-10.4 10.2c-36.9 38.4-91.9 82.7-165.3 133.5-58.1 40.1-134.9 40.1-192.9 0-73.4-50.8-128.3-95.1-164.1-132.3-54-51-92.1-116.8-108.9-189l-0.5-2.2c-2.5-11.1-4.5-22.6-6.1-34.5l-1.3-8c-1.6-14.4-2.4-28.2-2.4-42 0-209.6 170-379.6 379.8-379.5z m0 68.2c-172 0-311.5 139.4-311.5 311.3 0 11.1 0.7 22.5 1.9 34.1l2.6 16.8c1 6.2 2.1 12.1 3.2 17.3l3.9 15.2c15.2 54.6 45.1 103.9 87.3 143.8 33.3 34.6 84.9 76.2 154.9 124.7 34.7 24 80.6 24 115.3 0 70-48.4 121.6-90.1 156.1-125.8 44.3-41.9 75.5-95.8 89.1-154l3.3-16.4 3.2-20.2 1.2-12.8c0.6-7.7 0.9-15.2 0.9-22.7 0-171.9-139.4-311.3-311.4-311.3z m0 179.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.6 40.1 0 72.5-32.5 72.5-72.6 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>
                                                                Addresses</li>
                                                        </Link>
                                                        <Link href="/user/account-security">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <AiOutlineSecurityScan className='text-xl' />
                                                                Account security</li>
                                                        </Link>
                                                        <Link href="/user/account-security">
                                                            <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M400 154.9c56.1-32.4 125.2-32.4 181.3 0l173.3 100c56.1 32.4 90.7 92.3 90.7 157l0 200.2c0 64.8-34.6 124.6-90.7 157l-173.3 100c-56.1 32.4-125.2 32.4-181.3 0l-173.3-100c-56.1-32.4-90.7-92.3-90.7-157l0-200.2c0-64.8 34.6-124.6 90.7-157z m147.2 59.1c-35-20.2-78.1-20.2-113.1 0l-173.3 100c-35 20.2-56.5 57.5-56.5 97.9l0 200.2c0 40.4 21.6 77.7 56.5 97.9l173.3 100c35 20.2 78.1 20.2 113.1 0l173.3-100c35-20.2 56.5-57.5 56.5-97.9l0-200.2c0-40.4-21.6-77.7-56.5-97.9z m-56.5 157.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.5 40.1 0 72.5-32.5 72.5-72.5 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>
                                                                Permission</li>
                                                        </Link>
                                                        {user && (
                                                            <div className='border-t border-t-gray-200 pt-2 mt-2'>
                                                                <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal px-3 py-2 rounded-sm hover:bg-gray-200'>
                                                                    <AiOutlineUserSwitch className="text-2xl" />
                                                                    Switch accounts</li>
                                                                <li onClick={handleLogout} className='cursor-pointer px-3 flex items-center gap-1 text-[15px] font-normal py-2 rounded-sm hover:bg-gray-200'>
                                                                    <TbLogout2 className='text-2xl' />
                                                                    Sign out</li>
                                                            </div>
                                                        )}
                                                    </ul>
                                                </div>
                                            </ul>
                                        )}
                                    </li>
                                )}

                                {!user && (
                                    <li
                                        onClick={() => setShowSignInModal(true)}
                                        className={`${isHomePage ? "text-white" : "text-[#222222]"} relative group py-1 px-3 flex items-center gap-1 cursor-pointer`}
                                    >
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>
                                        <FaRegUser className="text-xl relative z-10" />
                                        <span className="leading-4 relative z-10">
                                            <span className="text-[13px]">{t('Sign_in_Register')}</span> <br />
                                            <b className="text-[14px]">
                                                {t('Order_Account')}
                                            </b>
                                        </span>
                                    </li>
                                )}

                                <li className={`${isHomePage ? "text-white" : "text-[#222222]"} relative group py-1 px-3 cursor-pointer font-semibold flex gap-1 items-center text-[14px]`}>

                                    <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>

                                    <span className="relative z-10 flex items-center gap-1">
                                        <RiChatSmile3Line className="text-xl" />
                                        {t('Support')}
                                    </span>


                                    <ul
                                        className="absolute left-1/2 top-full py-3 mt-1 w-62 bg-white invisible group-hover:visible text-black rounded-md shadow-lg opacity-0 translate-y-2 
    group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out z-20 transform -translate-x-1/2"
                                    >
                                        <div
                                            className="absolute left-1/2 top-[-8px] transform -translate-x-1/2 z-[60]
                 w-0 h-0 
                 border-l-[10px] border-l-transparent 
                 border-r-[10px] border-r-transparent 
                 border-b-[10px] border-b-white
                 "
                                        />
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><BiSupport className='text-lg' />
                                            Support center</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><AiOutlineSafety className='text-lg' />Safety center</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><RiChatSmile3Line className='text-lg' />Chat with dressfair</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><AiOutlinePropertySafety className='text-lg' />Dressfair purchase protection</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><RiGitRepositoryPrivateLine className='text-lg' />Privacy policy</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer tetx-[14px] font-[500] flex items-center gap-1"><AiOutlineMessage className='text-lg' />Term of use</li>
                                    </ul>
                                </li>
                                <li className={`${isHomePage ? "text-white" : "text-[#222222]"} relative group py-1 px-3 cursor-pointer font-semibold text-[14px]`}>
                                    <span className={` ${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>
                                    <span className="relative z-10 flex items-center gap-1">
                                        <Image className='w-4 h-4 rounded-full' src={Counrty} alt="country flag" />
                                        {language === "ar" ? 'العربية' : 'English'}
                                    </span>

                                    {/* Dropdown menu */}
                                    <ul
                                        className="absolute left-1/2 top-full py-3 mt-1 w-62 bg-white invisible group-hover:visible text-black rounded-md shadow-lg opacity-0 translate-y-2 
    group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out z-20 transform -translate-x-1/2"
                                    >
                                        <div
                                            className="absolute left-1/2 top-[-8px] transform -translate-x-1/2 z-[60]
                 w-0 h-0 
                 border-l-[10px] border-l-transparent 
                 border-r-[10px] border-r-transparent 
                 border-b-[10px] border-b-white
                 "
                                        />
                                        <div className="px-4 py-2">
                                            <label className='text-[17px] font-normal'>
                                                {t('Language')}
                                            </label>
                                            <div className="lang-radio py-3 border-b border-b-gray-200">
                                                <div className='flex items-center gap-2 text-[15px] font-normal'><div className='bg-white rounded-full border-4 border-black w-4 h-4'></div>
                                                    {language === "ar" ? 'العربية' : 'English'}
                                                </div>
                                            </div>

                                            <div className="pt-3">
                                                <label className='text-[17px] font-normal'>Currency</label>
                                                <div className="lang-radio pb-3 pt-2 border-b border-b-gray-200">
                                                    <p className='flex items-center gap-2 text-[15px] font-normal'>PKR: <b>Rs.</b></p>
                                                </div>
                                            </div>

                                            <div className="pt-3">
                                                <p className="text-gray-600 font-normal flex gap-2">
                                                    <Image
                                                        className="w-4 h-4 rounded-full inline-block"
                                                        src={Counrty}
                                                        alt="country flag"
                                                    />
                                                    <span>You are shopping on Temu Pakistan.</span>
                                                </p>
                                                <Link href="/user/country-region-language">
                                                    <button className='mt-3 py-1 px-2 rounded-full font-semibold text-md border hover:border-black hover:scale-[1.02] transition-all duration-500 ease-in-out border-gray-500 w-full text-center'>
                                                        Change country/region
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li className={` ${isHomePage ? "text-white" : "text-[#222222]"} relative group py-1 px-3 cursor-pointer `}>
                                    <Link href="/cart">
                                        <span className={`${isHomePage ? "bg-[#BA0000]" : "bg-[#eeeeee]"} absolute inset-0 min-w-[50px] mx-auto h-[50px] my-auto rounded-full scale-0 origin-center transition-transform duration-500 ease-in-out group-hover:scale-100`}></span>
                                        <FiShoppingCart className="text-xl relative z-10" />
                                        <span className='absolute text-[12px] font-semibold right-[5px] text-white px-1 -top-3 bg-[#fb7701] min-w-5 h-5 text-center rounded-full'>
                                            {totalQty}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="mobile-header py-1 px-2 lg:px-16 border-b-[#DFDFDF] border-b block xl:hidden">
                    <div className="flex justify-between items-center gap-4">
                        <div className="w-[50px] shrink-0">
                            <Link href="/">
                                <Image
                                    className="w-full h-auto"
                                    width={200}
                                    height={300}
                                    src="/DFlogo.png"
                                    alt="Logo"
                                />
                            </Link>
                        </div>

                        {/* Responsive Search Box */}
                        <div onClick={() => setMobileSearchModel(true)} className="flex-1 min-w-[80px] max-w-[800px] bg-[#ececec] rounded-full py-2 px-3 flex items-center gap-2">
                            <FiSearch className="text-gray-600 text-[clamp(16px,1.5vw,20px)]" />
                            <p className="font-[500] text-gray-600 text-[clamp(14px,1.2vw,16px)] truncate">
                                Search
                            </p>
                        </div>

                        <button className='menu-icons-mobile' onClick={() => setMobileCategory(prev => !prev)}>
                            <TfiMenuAlt className="text-2xl" />
                        </button>
                        <div className="relative user-dropdown-container">

                            <button
                                ref={buttonRef}
                                className="menu-icons-mobile"
                                onClick={() => setShowMobileUser(prev => !prev)}
                            >
                                <FaRegUser className="text-2xl" />
                            </button>

                        </div>
                        <button className='relative'>
                            <Link href="/cart">
                                <FiShoppingCart className="text-2xl" />
                            </Link>
                            <span className='absolute text-[12px] font-semibold right-[-6px] text-white px-1 -top-3 bg-[#fb7701] min-w-5 h-5 text-center rounded-full'>
                                {totalQty}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {showMobileUser && (
                <div ref={popupRef}>
                    <MobileUserPopup
                        onOpenSignIn={() => {
                            setShowSignInModal(true);
                            setShowMobileUser(false);
                        }}
                        onClose={() => setShowMobileUser(false)}
                    />
                </div>
            )}

            <SignInModal
                isOpen={showSignInModal}
                onClose={() => setShowSignInModal(false)}
            />
            <div ref={mobileCategoriesContainerRef}>
                {showMobileCategory && (
                    <MobileCategories categories={categories} onClose={() => setMobileCategory(false)} />
                )}
            </div>
            <MobileHeaderSearchModel isOpen={showMobileSearchModel} onClose={() => setMobileSearchModel(false)} />
        </>
    )
}

export default Header;
