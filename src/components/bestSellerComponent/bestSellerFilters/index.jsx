"use client";
import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import ProductCard from "../../homePageComponent/productCard/index";
import ProductImage from "../../../../public/deals-product4.avif";
import ProductImage2 from "../../../../public/deals-product3.avif";
import ProductCardMobile from "@/components/homePageMobile/productCardMobile";
import { IoIosArrowDown } from "react-icons/io";
import { getCatalogue } from "@/lib/api";
import Loader from "@/components/loader";

const options = [
    { value: "Recommended", label: "Recommended" },
    { value: "Beauty & Health", label: "Beauty & Health" },
    { value: "Women's Fashion", label: "Women's Fashion" },
    { value: "Home & Kitchen", label: "Home & Kitchen" },
    { value: "Men's Fashion", label: "Men's Fashion" },
    { value: "Electronics", label: "Electronics" },
    { value: "Toys", label: "Toys" },
    { value: "Fitness", label: "Fitness" },
];

const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "white",
        borderColor: "black",
        boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
        "&:hover": { borderColor: "black" },
        borderRadius: "9999px",
        paddingLeft: "8px",
        fontWeight: "500",
        paddingRight: "8px",
        minHeight: "38px",
        fontSize: "15px",
        cursor: "pointer",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "12px",
        marginTop: "6px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 4px 24px 0px",
        zIndex: "10",
        top: "33px",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? "#f0f0f0"
            : state.isSelected
                ? "#efefef"
                : "white",
        color: "#000",
        cursor: "pointer",
        fontSize: "14px",
        padding: "8px 12px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }),
};

const DropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;
    return (
        <components.DropdownIndicator {...props}>
            <FaChevronDown
                className={`transition-transform duration-300 ${menuIsOpen ? "rotate-180" : "rotate-0"
                    }`}
            />
        </components.DropdownIndicator>
    );
};

const CustomOption = (props) => {
    const { isSelected, label } = props;
    return (
        <components.Option {...props}>
            {label}
            {isSelected && <FaCheck className="text-black text-[12px]" />}
        </components.Option>
    );
};

const categories = [
    "Recommended", "Men's Fashion", "Women's Fashion", "Electronics", "Mobiles",
    "Home & Kitchen", "Beauty & Health", "Sports", "Toys", "Gadgets",
    "Books", "Automotive", "Jewelry", "Footwear", "Accessories",
    "Stationery", "Gaming", "Pets", "Travel", "Music",
    "Outdoor", "Smart Home", "Baby Products", "Office Supplies", "Fitness"
];

const BestSellerFilters = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [mobileDaysOpen, setmMobileDaysOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedCategory, setSelectedCategory] = useState("Recommended");
    const [selectedDays, setSelectedDays] = useState(30);
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
    const handleMouseEnter = () => setMenuIsOpen(true);
    const handleMouseLeave = () => setMenuIsOpen(false);
    const dropdownCategoryRef = useRef(null);
    const dropdownRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

  
      useEffect(() => {
          loadProducts(page);
      }, [page]);
  
      const loadProducts = async (pageNumber) => {
          if (pageNumber > 1) setLoadingMore(true);
  
          const res = await getCatalogue(pageNumber);
          if (res?.success) {
              if (pageNumber === 1) {
                  setProducts(res.data);
              } else {
                  setProducts(prev => [...prev, ...res.data]);
              }
  
              setHasMore(res.pagination.has_more_pages);
          }
  
          setLoading(false);
          setLoadingMore(false);
      };
  
  
    //   const filteredProducts =
    //       selectedCategory === "Recommended"
    //           ? products
    //           : products.filter((p) => p.category === selectedCategory);
  


    const filteredProducts = products.filter((p) => {
        const categoryMatch =
            selectedCategory === "Recommended" || p.category === selectedCategory;
        const daysMatch =
            selectedDays === 30 ||
            (selectedDays === 14 && p.id % 2 === 0) ||
            (selectedDays === 7 && p.id % 3 === 0);
        return categoryMatch && daysMatch;
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                dropdownCategoryRef.current &&
                !dropdownCategoryRef.current.contains(event.target)
            ) {
                setmMobileDaysOpen(false);
                setMobileCategoryOpen(false);
            }
        };

        const handleScroll = () => {
            setmMobileDaysOpen(false);
            setMobileCategoryOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className="best-seller-filters">
            <div className="hidden xl:block">
                <div className="flex justify-between items-center pb-4 px-3">
                    {/* Left side: Days filter */}
                    <div className="flex items-center gap-4">
                        <p className="text-[#222222] text-[14px] font-semibold">
                            Best-Selling Items
                        </p>

                        <ul className="flex items-center gap-4">
                            {[30, 14, 7].map((days) => (
                                <li
                                    key={days}
                                    onClick={() => setSelectedDays(days)}
                                    className={`text-[#222222] text-[14px] font-semibold border rounded-full py-2 px-3 cursor-pointer transition-all duration-300 ease-in-out
                ${selectedDays === days
                                            ? "border-black shadow-md scale-[1.05]"
                                            : "border-[#ddd] hover:shadow-lg hover:scale-[1.02]"
                                        }`}
                                >
                                    Within last {days} days
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side: Category dropdown */}
                    <div className="flex items-center gap-2 relative z-[1]">
                        <label
                            htmlFor=""
                            className="text-[#888888] text-[13px] font-semibold"
                        >
                            Filter by category
                        </label>

                        <div
                            className="relative w-[250px]"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Select
                                options={options}
                                value={selectedOption}
                                onChange={(opt) => {
                                    setSelectedOption(opt);
                                    setSelectedCategory(opt.value);
                                    setMenuIsOpen(false); // close on select
                                }}
                                styles={customStyles}
                                menuIsOpen={menuIsOpen}
                                components={{
                                    DropdownIndicator,
                                    Option: CustomOption,
                                }}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ProductCard products={filteredProducts} />
                        {hasMore && (
                            <div className="flex justify-center mt-6">
                                {loadingMore ? (
                                    <button
                                        className="flex items-center gap-4 justify-center py-2 lg:py-3 px-6 lg:px-12 text-lg font-[500] text-gray-500 rounded-full cursor-not-allowed"
                                        disabled
                                    >
                                        <div className="smallloader mx-auto"></div>
                                        loading...
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center gap-2 justify-center py-2 lg:py-3 px-6 lg:px-12 font-semibold text-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#fb6d01] bg-[#fb7701] text-white rounded-full"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        See More <FaChevronDown />
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="mobile-cards-list block xl:hidden">
                <h1 className="text-center font-bold text-xl py-2">Best Sellers</h1>
                <div className="mobile-filters-best-seller border-t border-t-gray-300 px-2 pt-4 relative">
                    <div className="flex items-center justify-between gap-4 pb-4" >

                        <div className="w-[50%]" ref={dropdownRef}>
                            <div
                                onClick={() => {
                                    setmMobileDaysOpen(prev => !prev);
                                    setMobileCategoryOpen(false); // close category dropdown
                                }}
                                className="bg-[#f6f6f6] rounded-full w-full text-center flex justify-center items-center py-1 px-2"
                            >
                                <p className="text-[14px] font-semibold flex justify-between gap-1 items-center">
                                    Within last {selectedDays} days <IoIosArrowDown />
                                </p>
                            </div>
                            {mobileDaysOpen && (
                                <div className="within-days-list py-2 bg-white w-full absolute top-14 left-0 right-0 px-3 border-t border-t-gray-300 z-[9999]">
                                    <ul className="font-semibold text-[13px]">
                                        {[30, 14, 7].map((days) => (
                                            <li
                                                key={days}
                                                onClick={() => {
                                                    setSelectedDays(days);
                                                    setmMobileDaysOpen(false);
                                                }}
                                                className={`py-2 px-1 flex justify-between items-center border-b border-b-gray-200 ${selectedDays === days ? "text-black" : "text-[#828282]"
                                                    }`}
                                            >
                                                Within last {days} days
                                                {selectedDays === days && <FaCheck className="text-black" />}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="w-[50%]" ref={dropdownCategoryRef}>
                            <div
                                onClick={() => {
                                    setMobileCategoryOpen(prev => !prev);
                                    setmMobileDaysOpen(false); // close days dropdown
                                }}
                                className="bg-[#f6f6f6] rounded-full w-full flex justify-center items-center py-1 px-2 cursor-pointer"
                            >
                                <p className="text-[14px] font-semibold flex justify-between gap-1 items-center">
                                    {selectedCategory} <IoIosArrowDown />
                                </p>
                            </div>

                            {mobileCategoryOpen && (
                                <div className="category-mobile-list py-2 bg-white w-full absolute top-14 left-0 right-0 px-3 border-t border-t-gray-300 z-[9999] shadow-lg rounded-md">
                                    <ul className="font-semibold text-[13px] flex gap-2 flex-wrap max-h-[50vh] overflow-y-auto">
                                        {categories.map((cat) => (
                                            <li
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setMobileCategoryOpen(false);
                                                }}
                                                className={`py-1 px-2 border rounded-full flex justify-between items-center cursor-pointer hover:bg-gray-100 ${selectedCategory === cat ? "text-black font-bold border-black" : "text-black border-gray-300"
                                                    }`}
                                            >
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <div className="px-2">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <ProductCardMobile products={filteredProducts} />
                            {hasMore && (
                                <div className="flex justify-center my-6">
                                    {loadingMore ? (
                                        <button
                                            className="flex items-center gap-4 justify-center py-2 lg:py-3 px-6 lg:px-12 text-lg font-[500] text-gray-500 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            <div className="smallloader mx-auto"></div>
                                           
                                        </button>
                                    ) : (
                                        <button
                                        className="flex items-center gap-2 text-black border border-gray-500 justify-center py-[6px] lg:py-3 px-5 lg:px-12 font-semibold text-sm transition-all duration-300 ease-in-out hover:scale-[1.02] bg-transparent rounded-full"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        See More
                                    </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BestSellerFilters;
