"use client";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";

export default function CartSidebar() {
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
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isCartOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-[15%] xl:w-[12%] 2xl:w-[14%] bg-white shadow-xl z-[999998989899898998] border-l border-gray-200"
      >
        <div className="relative">
        </div>
        <div className="px-4 py-3 overflow-y-hidden h-[calc(100%-20px)]">
          <div className="cart-header">
            <div className="subtotal flex items-center justify-center gap-2 rounded-sm bg-[url('/subtottol-cart.avif')] bg-cover bg-center p-3">
              <div className="flex items-center relative">
                <p className="text-[12px] absolute -top-3 right-0 font-semibold text-white">
                  323
                </p>
                <FaOpencart className="text-white text-xl" />

              </div>
              <p className="text-[14px] text-white font-semibold">
                Subtotal
              </p>
            </div>

            <div className="total-price-cart text-center py-2">
              <p className="text-lg text-[#222] font-semibold">RS. 12,313</p>
            </div>

            <div className="free-shipping-tag bg-[#fff3e7] flex items-center p-2 rounded-sm gap-2">
              <FiCheck className="text-[#0b8800] text-lg" />
              <p className="text-[13px] font-semibold">Free shipping on all orders</p>
            </div>

            <div className="checkout-btns flex flex-col gap-2 pt-4 pb-4 border-b border-b-gray-200">
              <Link href="/checkout" className="hover:bg-[#fb7701] text-center hover:scale-[1.03] text-sm xl:text-md transition-all duration-300 ease-in-out w-full py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold">
                Checkout (12)
              </Link>
              <Link href="/cart" className="w-full text-center py-[10px] px-4 rounded-full text-[#222] border-gray-500 hover:border-black border text-sm xl:text-md font-semibold">
                Go to cart
              </Link>
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


              <div className="cart-items px-5 pt-4 flex flex-col gap-5 h-[65vh] pb-14 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="single-item">
                    <div className="relative border border-gray-100 overflow-hidden rounded-md">
                      <button
                        className="absolute top-2 left-2"
                        onClick={() => toggleSingle(item.id)}
                      >
                        {item.selected ? (
                          <BsCheckCircleFill className="text-xl text-[#222]" />
                        ) : (
                          <GoCircle className="text-xl text-black" />
                        )}
                      </button>

                      <Image
                        className="w-full"
                        width={100}
                        height={100}
                        src={item.img}
                        alt="product banner"
                      />
                    </div>

                    <p className="text-center text-[#222] text-[14px] font-semibold py-2">
                      <span className="text-[12px]">RS.</span>{item.price}
                    </p>
                    <div className="select-qty-option relative w-[100px] mx-auto">
                      <div
                        className="border border-[#aaa] font-semibold rounded-sm px-3 py-px text-sm cursor-pointer flex justify-between items-center bg-white"
                        onClick={() => toggleQtyDropdown(item.id)}
                      >
                        <span>{item.qty}</span>
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
                ))}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
