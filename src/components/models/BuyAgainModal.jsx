"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoCircle } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";

const BuyAgainModal = ({ isOpen, onClose, order }) => {
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

    const [selectedQty, setSelectedQty] = useState(1);
    const qtyOptions = [0, 1, 2, 3, 4, 5];
    useEffect(() => {
        if (cartItems.length === 0) {
            closeCart();
        }
    }, [cartItems, closeCart]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    // Local state to manage which dropdown is open
    const [openQtyId, setOpenQtyId] = useState(null);

    useEffect(() => {
        if (cartItems.length === 0) {
            closeCart();
        }
    }, [cartItems, closeCart]);

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

    const toggleQtyDropdown = (id) => {
        setOpenQtyId(openQtyId === id ? null : id);
    };

    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999999999999] p-2">
            <div className="bg-white w-full max-w-[500px] rounded-md shadow-lg p-4 animate-fadeIn">
                <div className="relative flex justify-center items-center mb-4">
                    <h2 className="text-lg text-center font-semibold">Buy this again          </h2>
                    <button onClick={onClose} className="absolute right-2 top-0 text-xl hover:scale-105 transition-all">
                        <IoClose />
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto pb-20 pt-6 flex flex-col gap-4">

                    {cartItems?.map((item) => (
                        <div key={item.id} className="single-item flex gap-1 items-center">
                            <button
                                className=" "
                                onClick={() =>
                                    toggleSingle(item.product_id, item.color.sku, item.size.product_option_id)
                                }
                            >
                                {item.selected ? (
                                    <BsCheckCircleFill className="text-xl text-[#222]" />
                                ) : (
                                    <GoCircle className="text-xl text-black" />
                                )}
                            </button>
                            <div className="flex gap-4 w-full">
                                <div className="border border-gray-100 overflow-hidden rounded-md">
                                    <Image
                                        className="w-[100px] h-auto"
                                        width={130}
                                        height={130}
                                        src={item.images[0] || "/placeholder.png"}
                                        alt="product banner"
                                    />
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex gap-2 items-start">
                                        <p className="line-clamp-2 text-[#666] text-[12px] lg:text-[15px] font-[500]">
                                            {item.name}
                                        </p>

                                    </div>

                                    <div className="flex justify-between w-full items-center border-b border-b-gray-200">
                                        <div className="text-center text-[#fb7701] text-[16px] font-semibold py-2 flex items-center gap-1">
                                            <span className="text-[15px]">Rs.</span>{item.sale_price}
                                            <p className="text-[#757575] text-[11px] lg:text-[15px] font-normal relative"><span className="absolute top-[8px] lg:top-[11] bg-[#FB7701] w-full h-[2px]"></span>Rs. {item.price}</p>
                                        </div>
                                        <div className="select-qty-option relative w-[60px]">
                                    <div
                                        className="border border-[#aaa] font-semibold rounded-sm px-3 py-px text-sm cursor-pointer flex justify-between items-center bg-white"
                                        onClick={() =>
                                            toggleQtyDropdown(`${item.product_id}-${item.color.sku}-${item.size.product_option_id}`)
                                        }
                                    >
                                        <span>{item.qty}</span>
                                        <span
                                            className={`transform transition-transform duration-300 ${openQtyId === `${item.product_id}-${item.color.sku}-${item.size.product_option_id}`
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        >
                                            <IoIosArrowDown />
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {openQtyId === `${item.product_id}-${item.color.sku}-${item.size.product_option_id}` && (
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
                                                        className={`px-3 py-2 text-sm cursor-pointer font-semibold ${qty === 0 ? "text-red-500 hover:text-red-600" : ""
                                                            }`}
                                                        onClick={() => handleUpdateQty(item, qty)}
                                                    >
                                                        {qty === 0 ? "0" : qty}
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

                <div className=" bottom-0 bg-white py-2 px-2 z-[999999] w-full right-0 left-0 border-t border-t-gray-200">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={toggleSelectAll}
                        >
                            {allSelected ? (
                                <BsCheckCircleFill className="text-2xl text-[#222] border border-white" />
                            ) : (
                                <GoCircle className="text-2xl text-black" />
                            )}

                            <p className="text-[16px] text-[#222] font-[600]">
                                All
                            </p>
                        </div>
                        <button
                            className="py-2 px-8 font-semibold rounded-full bg-[#fb7701] hover:bg-[#fb5d01fc] text-white transition-all"
                        >
                            Add to cart
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyAgainModal;
