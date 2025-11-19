"use client"
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FiSearch } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import Image from "next/image";
import DLogo from "../../../public/df-logo.png";
import { RxCross2 } from "react-icons/rx";

const recentItemsMock = [
    "shoes",
    "rings for girls",
    "bags",
    "heels",
    "jackets",
];

const popularItemsMock = [
    "jewelry for women",
    "jewellery for girls",
    "phone things",
    "hand bags",
    "jackets",
    "makeup",
];

const SearchBarHeader = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/home';
    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [recentItems, setRecentItems] = useState(recentItemsMock);
    const [popularItems] = useState(popularItemsMock);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
                setIsDeleteMode(false); // exit delete mode when closing
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setSearchText(e.target.value);
        setShowDropdown(e.target.value.length > 0);
    };

    const handleToggleDeleteMode = () => {
        setIsDeleteMode((prev) => !prev);
    };

    const handleDeleteItem = (item) => {
        setRecentItems((prev) => prev.filter((i) => i !== item));
    };

    return (
        <div className="relative w-full max-w-[500px]">
            {/* Search Input */}
            <div className={`${isHomePage ? "border-white" : "border-black"} bg-white border-2 rounded-full flex items-center justify-between pl-4 pr-1 w-full h-[43px] `}>
                <input
                    ref={inputRef}
                    className="h-full w-full text-[14px] rounded-full outline-0"
                    type="search"
                    placeholder="Search Dressfair"
                    value={searchText}
                    onChange={handleChange}
                />
                <button className="bg-[#222] rounded-full py-[6px] px-3 cursor-pointer">
                    <FiSearch className="text-white text-2xl" />
                </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className="absolute top-[50px] left-0 w-full bg-white shadow-lg rounded-md p-3 z-50"
                >
                    {/* Recent Searches */}
                    <div className="pt-2 pb-3 relative">
                        <div
                            className="absolute left-1/2 top-[-18px] transform -translate-x-1/2 z-[60]
                 w-0 h-0 
                 border-l-[10px] border-l-transparent 
                 border-r-[10px] border-r-transparent 
                 border-b-[10px] border-b-white
                 "
                        />
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-black font-semibold text-md">
                                Recently searched
                            </p>
                            {recentItems.length > 0 && (
                                <button
                                    onClick={handleToggleDeleteMode}
                                    className="text-gray-500 text-sm"
                                >
                                    {isDeleteMode ? "Done" : <MdDeleteSweep className="text-xl" />}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            {recentItems
                                .filter((item) =>
                                    item.toLowerCase().includes(searchText.toLowerCase())
                                )
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer flex items-center gap-1 hover:bg-[#e4e4e4] bg-[#f9f9f9] rounded-full py-1 pl-2 pr-2 w-fit relative"
                                    >
                                        <Image src={DLogo} alt="dressfair" className="w-5 h-5" />
                                        <p className="text-[14px] font-medium">{item}</p>
                                        {isDeleteMode && (
                                            <button
                                                onClick={() => handleDeleteItem(item)}
                                                className="ml-1 text-gray-500 hover:text-red-500"
                                            >
                                                <RxCross2 className="text-sm" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Popular Right Now */}
                    <div className="pt-2">
                        <p className="text-black font-semibold text-md mb-2">
                            Popular right now
                        </p>
                        <div className="flex items-center flex-wrap gap-2">
                            {popularItems
                                .filter((item) =>
                                    item.toLowerCase().includes(searchText.toLowerCase())
                                )
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer flex items-center gap-1 hover:bg-[#e4e4e4] bg-[#f9f9f9] rounded-full py-1 pl-2 pr-2 w-fit"
                                    >
                                        <Image src={DLogo} alt="dressfair" className="w-5 h-5" />
                                        <p className="text-[14px] font-medium">{item}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBarHeader;
