"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoCircle } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import toast from "react-hot-toast";

const ManageCartBottomModal = ({ isOpen, onClose }) => {
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


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay Background */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[99999998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom Modal */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[99999999999999] shadow-xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
                            <button className="text-black " onClick={onClose}>
                                Done
                            </button>
                            <p className="text-[17px] font-semibold text-black">Manage cart</p>
                            <button onClick={onClose}>
                                <CgClose className="text-[22px]" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto px-4 pb-20 pt-6 flex flex-col gap-4">

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
                                    <div className="flex gap-4">
                                        <div className="border border-gray-100 overflow-hidden rounded-md">
                                            <Image
                                                className="w-[120px] h-auto"
                                                width={130}
                                                height={130}
                                                src={item.images[0] || "/placeholder.png"}
                                                alt="product banner"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <div className="flex gap-2 items-start">
                                                <p className="line-clamp-2 text-[#666] text-[12px] lg:text-xl font-[500]">
                                                    {item.name}
                                                </p>

                                            </div>
                                            <div className="flex justify-between w-full items-center border-b border-b-gray-200">
                                                <div className="text-center text-[#fb7701] text-[16px] lg:text-2xl font-semibold py-2 flex items-center gap-1">
                                                    <span className="text-[12px] lg:text-xl">Rs.</span>{item.sale_price}
                                                     <p className="text-[#757575] text-[11px] lg:text-lg font-normal relative"><span className="absolute top-[8px] lg:top-[13] bg-[#FB7701] w-full h-[2px]"></span>Rs. {item.price}</p>
                                                    {/* <p className="text-[#fb7701] border border-[#fb7701] px-1 p-px rounded-sm text-[10px] lg:text-lg">
                                                        -47%
                                                    </p>  */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="fixed bottom-0 bg-white py-2 px-2 z-[999999] w-full right-0 left-0 border-t border-t-gray-200">
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
                                        className="border border-gray-500 text-black text-sm font-[600] rounded-full py-1 px-3"
                                        onClick={() => {
                                            let anyRemoved = false;
                                            cartItems.forEach((item) => {
                                                if (item.selected) {
                                                    removeItem(
                                                        item.product_id,
                                                        item.color?.sku,
                                                        item.size?.product_option_id ?? null
                                                    );
                                                    anyRemoved = true;
                                                }
                                            });

                                            if (anyRemoved) {
                                                toast.success("Selected items removed from cart");
                                            } else {
                                                toast.error("No items selected");
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ManageCartBottomModal;
