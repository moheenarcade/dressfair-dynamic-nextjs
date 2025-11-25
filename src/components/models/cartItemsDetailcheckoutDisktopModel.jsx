"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoCircle } from "react-icons/go";
import toast from "react-hot-toast";

const CartItemsDetailcheckoutDisktopModel = ({ isOpen, onClose, product }) => {
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
        const [openQty, setOpenQty] = useState(false);
        const [selectedQty, setSelectedQty] = useState(1);
        const qtyOptions = [0, 1, 2, 3, 4, 5];
    
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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-[999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal wrapper (scrollable container) */}
                    <motion.div
                        className="fixed inset-0 z-[99999999999999999] flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Actual modal box */}
                        <motion.div
                            className="relative bg-white rounded-2xl shadow-lg w-[600px] pt-4 pb-6 px-4 my-3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 bg-white z-10">
                                <p></p>
                                <h3 className="text-lg font-semibold text-gray-800">Item details
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 rounded-full transition"
                                >
                                    <CgClose className="text-xl" />
                                </button>
                            </div>

                        <div className="cart-items pt-4 max-h-[500px] px-6 overflow-y-auto flex flex-col gap-5 mt-4 pb-10">
                            {cartItems?.map((item) => (
                                <div key={item.id} className="single-item flex gap-4 items-center">
                             
                                    <div className="flex w-full gap-4">
                                        <div className="border border-gray-100 overflow-hidden rounded-md">
                                            <Image
                                                className="w-[120px] h-auto"
                                                width={100}
                                                height={100}
                                                src={item.images[0] || "/placeholder.png"}
                                                alt="product banner"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full justify-between">
                                            <div className="flex gap-2 justify-between items-start">
                                                <p className="line-clamp-1 text-[#222] text-[15px] font-[400]">
                                                    {item.name}
                                                </p>
                                                <button onClick={() => handleRemoveItem(item)}>
                                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" aria-hidden="true" fill="#888"><path d="M603.4 96c47.7 0 86.9 36.4 91.3 82.9l0.5 8.8-0.1 75.1 168.9 0c24.7 0 44.8 20.1 44.8 44.8 0 22.7-16.9 41.4-38.7 44.4l-6.1 0.4-20.5 0-46.2 436.2c-5.5 52.1-47.2 92.3-98.5 96.9l-9.7 0.4-354.2 0c-52.4 0-96.8-37.2-106.7-87.7l-1.5-9.6-46.2-436.2-20.5 0c-24.7 0-44.8-20.1-44.8-44.8 0-22.7 16.9-41.4 38.7-44.3l6.1-0.5 169 0 0-75.1c0-47.7 36.4-86.9 82.9-91.3l8.8-0.4 182.7 0z m149.9 256.4l-482.7 0 45.2 426.7c0.9 8.4 7.1 15 15 16.8l4.1 0.4 354.2 0c8.4 0 15.7-5.4 18.2-13.1l0.9-4.1 45.1-426.7z m-149.9-166.8l-182.7 0c-0.8 0-1.5 0.4-1.8 1.1l-0.3 1 0 75.1 186.9 0 0.1-75.1c0-0.8-0.4-1.5-1.1-1.8l-1.1-0.3z"></path></svg>
                                                </button>
                                            </div>
                                            <div className="flex justify-between w-full items-center border-b border-b-gray-200 pb-2">
                                                <div className="text-center text-[#222222] text-[18px] font-semibold py-2 flex items-center gap-1">
                                                    <span className="text-[14px]">Rs.</span>{item.sale_price}
                                                     <p className="text-[#757575] text-[14px] font-normal relative"><span className="absolute top-[10px] bg-[#FB7701] w-full h-[2px]"></span>{item.price}</p>
                                                    <p className="text-[#fb7701] border border-[#fb7701] px-1 p-px rounded-sm text-[12px]">
                                                        -{item.discount_percent}%
                                                    </p> 
                                                </div>
                                                 
                                                <div className="select-qty-option relative w-[90px]">
                                                    <div
                                                        className="border border-[#aaa] font-semibold rounded-sm px-3 py-px text-sm cursor-pointer flex justify-between items-center bg-white"
                                                        onClick={() =>
                                                            toggleQtyDropdown(`${item.product_id}-${item.color.sku}-${item.size.product_option_id}`)
                                                        }
                                                    >
                                                          Qty<span>{item.qty}</span>
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
                           
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartItemsDetailcheckoutDisktopModel;
