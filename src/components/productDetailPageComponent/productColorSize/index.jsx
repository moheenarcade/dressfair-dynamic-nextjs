"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const ProductColorSize = ({
    colors = [],
    sizes = [],
    selectedColor: propSelectedColor,
    selectedQty: propSelectedQty,
    onColorChange,
    onSizeChange,
    onQtyChange
}) => {
    const [selectedColor, setSelectedColor] = useState(propSelectedColor || null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [openQty, setOpenQty] = useState(false);
    const [hoveredSizeId, setHoveredSizeId] = useState(null);
    const availableSizes = sizes.filter(size => Number(size.available_quantity) > 0);
    const qtyOptions = [1, 2, 3, 4, 5];
    const [selectedQty, setSelectedQty] = useState(propSelectedQty ?? 1);
    const [showSizeError, setShowSizeError] = useState(false); 
    
    // Sync with parent's selected color
    useEffect(() => {
        setSelectedColor(propSelectedColor);
    }, [propSelectedColor]);

    // Handle color selection
    const handleColorSelect = (colorSku) => {
        setSelectedColor(colorSku);
        if (onColorChange) {
            onColorChange(colorSku); // Notify parent
        }
    };

    // Sync with parent's selected color
    useEffect(() => {
        setSelectedColor(propSelectedColor);
    }, [propSelectedColor]);

    // Sync with parent's quantity
    useEffect(() => {
        setSelectedQty(propSelectedQty ?? 1);
    }, [propSelectedQty]);

    // Handle quantity select
    const handleQtySelect = (qty) => {
        setSelectedQty(qty);
        if (onQtyChange) onQtyChange(qty); // notify parent
        setOpenQty(false);
    };


    return (
        <div className="product-color-size px-2 lg:px-0">
            {/* Color Section */}
            <div className="color-sect pb-4">
                <p className="text-[#222] font-semibold">
                    Color:{" "}
                    <span className="capitalize">
                        {selectedColor
                            ? colors.find(c => c.sku === selectedColor)?.name || selectedColor
                            : ""}                    </span>
                </p>

                <div className="colors flex gap-2 flex-wrap pt-2">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => handleColorSelect(color.sku)}
                            className={`single-color cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col justify-center items-center w-fit border-2 rounded-md overflow-hidden
                    ${selectedColor === color.sku ? "border-black" : "border-[#aaa]"}
                `}
                        >
                            <Image
                                className="w-18 xl:w-22 h-auto"
                                width={50}
                                height={50}
                                src={color.image}
                                alt={color.sku}
                            />
                            <p className="px-1 py-1 xl:py-2 text-[#222] text-[12px] font-bold">
                                {color.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Size Section */}
            <div className="size-sec pb-4">
                <p className="text-[#222] font-semibold">
                    Size: <span>{selectedSize?.value || ""}</span>
                </p>

                <div className="sizes pt-2 flex items-center gap-2 flex-wrap">
                    {availableSizes.length > 0 ? (
                        availableSizes.map((sizeObj) => (
                            <div
                                key={sizeObj.product_option_id}
                                onClick={() => {
                                    setSelectedSize(sizeObj);
                                    if (onSizeChange) onSizeChange(sizeObj);
                                }}
                                onMouseEnter={() => setHoveredSizeId(sizeObj.product_option_id)}
                                onMouseLeave={() => setHoveredSizeId(null)}
                                className={`relative single-size cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out py-1 px-4 text-[#222] text-[14px] font-bold w-fit rounded-full border-2
          ${selectedSize?.product_option_id === sizeObj.product_option_id ? "border-black" : "border-[#aaa]"}`}
                            >
                                {sizeObj.value}

                                {/* Custom Tooltip */}
                                {hoveredSizeId === sizeObj.product_option_id && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded shadow-md whitespace-nowrap z-[9899999999999]">
                                        Available quantity: {sizeObj.available_quantity}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500 text-sm">Out of stock</p>
                    )}
                </div>

                <div className="flex pt-2 gap-1 items-center text-[14px] text-[#757575] font-[500]">
                    <svg
                        className="_300bKV8h"
                        alt=""
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 1024 1024"
                        width="1em"
                        height="1em"
                        fill="#757575"
                        aria-hidden="true"
                    >
                        <path d="M512 7.3c278.7 0 504.7 226 504.7 504.7 0 278.7-226 504.7-504.7 504.7-278.7 0-504.7-226-504.7-504.7 0-278.7 226-504.7 504.7-504.7z m0 73.2c-238.3 0-431.5 193.2-431.5 431.5 0 238.3 193.2 431.5 431.5 431.5 238.3 0 431.5-193.2 431.5-431.5 0-238.3-193.2-431.5-431.5-431.5z m-73.1 676.1c-20.2 0-36.6-16.4-36.6-36.5 0-20.2 16.4-36.6 36.6-36.6l43.6-0.1 0-196.8-14.3 0c-18 0-32.9-12.9-36-30l-0.6-6.5c0-20.2 16.4-36.6 36.6-36.6l50.9 0c20.2 0 36.6 16.4 36.6 36.6l0 233.3 29.4 0.1c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.5l-146.2 0z m63.8-500.6c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.9-54.8 0-30.3 24.6-54.9 54.9-54.9z"></path>
                    </svg>
                    95% of customers say these fit true to size
                </div>
            </div>
            <div className="qty-sect relative flex items-center gap-2 pt-1">
                <p className="text-[#222] font-semibold pb-1">Qty</p>

                <div
                    className="select-qty-option relative w-[100px]"
                    onClick={() => setOpenQty(!openQty)}
                >
                    <div className="border border-[#aaa] font-semibold rounded-sm px-3 py-1 text-sm cursor-pointer flex justify-between items-center bg-white">
                        <span>{selectedQty}</span>
                        <span className={`transform transition-transform duration-300 ${openQty ? "rotate-180" : ""}`}>
                            <IoIosArrowDown />
                        </span>
                    </div>

                    <AnimatePresence>
                        {openQty && (
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
                                        onClick={() => handleQtySelect(qty)}
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
    );
};

export default ProductColorSize;
