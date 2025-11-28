"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const OrdersNavbar = () => {
 const pathname = usePathname();
 
  return (
    <>
          <div className="order-navbar px-4 lg:px-0 flex flex-col md:flex-row items-center justify-between">
                        <ul className='flex gap-2 lg:gap-3 text-[#757575] text-[13px] md:text-[15px] font-[500]'>
                            <Link href="/user/orders/all-orders">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/all-orders"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        All orders
                                    </li>
                                    {pathname === "/user/orders/all-orders" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>

                            <Link href="/user/orders/processing">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/processing"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Processing
                                    </li>
                                    {pathname === "/user/orders/processing" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>
                            <Link href="/user/orders/shipped">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/shipped"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Shipped
                                    </li>
                                    {pathname === "/user/orders/shipped" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>

                            <Link href="/user/orders/delivered">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/delivered"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Delivered
                                    </li>
                                    {pathname === "/user/orders/delivered" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>

                            <Link href="/user/orders/returns">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/returns"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Returns
                                    </li>
                                    {pathname === "/user/orders/returns" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>
                            <Link href="/user/orders/cancel">
                                <div className="flex flex-col items-center">
                                    <li
                                        className={`cursor-pointer hover:text-black transition-all duration-300 ease-in-out ${pathname === "/user/orders/cancel"
                                            ? "font-bold text-black"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Cancel
                                    </li>
                                    {pathname === "/user/orders/cancel" && (
                                        <div className="w-6 h-1 rounded-full bg-black mt-1"></div>
                                    )}
                                </div>
                            </Link>
                        </ul>
                        <div className="order-search mt-4 lg:mt-0 flex items-center gap-1 pr-4 w-full md:w-[30%] text-[14px] rounded-full border border-[#949494]">
                            <input className='w-full h-full py-3 px-4 outline-0' type="search" placeholder='item name / order ID / Tracking No.' />
                            <button>
                                <FiSearch className='text-xl text-[#222]' />
                            </button>
                        </div>
                    </div>
    </>
  )
}

export default OrdersNavbar;
