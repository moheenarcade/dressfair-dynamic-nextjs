"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { FaFreeCodeCamp, FaStar } from "react-icons/fa6";
import PromotionalContent from "../../../../public/productdetail-promotional-content.avif";
import { LuCheck } from "react-icons/lu";
import PriceSection from "../../../../public/priceicons.avif";
import { HiQuestionMarkCircle } from "react-icons/hi";
import ProductMainSlider from "@/components/productDetailPageComponent/productMainSlider";
import ProductColorSize from "@/components/productDetailPageComponent/productColorSize";
import { FaShippingFast } from "react-icons/fa";
import { RiCashLine } from "react-icons/ri";
import ExploreInterestProducts from "@/components/productDetailPageComponent/exploreInterestProducts";
import { ProductReviews } from "@/components/productDetailPageComponent/ProductReviews";
import ProductStoreInfo from "@/components/productDetailPageComponent/productStoreInfo";
import ProductDetails from "@/components/productDetailPageComponent/productDetails";
import ProductListingMobile from "@/components/homePageMobile/productListingMobile";
import MobileAddToCartBottomModal from "../../../components/models/MobileAddToCartBottomModal";
import { CgClose } from "react-icons/cg";
import BuyNowModel from "../../../components/models/BuyNowModel";
import { useCart } from "@/context/CartContext";

const product = {
    title: "Men's Winter Casual PU Leather Jacket",
    image: "/deals-product3.avif",
    oldPrice: "27,452",
    price: "13,661",
};

const ProductDetailMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
    const { openCart } = useCart();

    return (
        <>
            <div className="product-detail-main relative lg:pt-3 pb-12">
                <div className="flex flex-col lg:flex-row lg:gap-12 items-start">

                    <div className="w-full lg:w-[52%] flex flex-col ">
                        <div className="breadcrupms pb-3 hidden lg:block">
                            <ul className="flex items-center gap-1 text-[#777] text-sm">
                                <Link href="/"><li>Home</li></Link>
                                <GoChevronRight />
                                <Link href="#"><li>Mens clothing</li></Link>
                                <GoChevronRight />
                                <li className="text-black">Mens winter clothing</li>
                            </ul>
                        </div>
                        <ProductMainSlider />
                    </div>

                    <div className="w-full lg:w-[44%] lg:pt-8 self-start lg:sticky top-4 h-fit">
                        <div className="block lg:hidden">
                            <div className="promotional-sec mb-4 flex items-center gap-6 bg-[#eb0101] lg:rounded-md overflow-hidden">
                                <Image className="w-30 h-10" src={PromotionalContent} alt="promotional content" />
                                <div className="flex items-center gap-3">
                                    <p className="text-white flex items-center gap-1 font-semibold text-[12px] lg:text-[16px]"><LuCheck /> Free shipping</p>
                                    <div className="bg-white h-4 w-px"></div>
                                    <p className="text-white flex items-center gap-1 font-semibold text-[12px] lg:text-[16px]"><LuCheck /> Rs.280 Credit for delay</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 px-2 lg:px-0">
                            <h1 className="text-[16px] text-[#222] font-[500] mb-2">
                                Men's Winter Casual PU Leather Jacket, Stand Collar, Zippered Sleeves, Pockets, Classic Fashion Style Coat
                            </h1>
                            <button className="hover:scale-[1.04] transition-all duration-300 ease-in-out">
                                <svg className="product-share" alt="" aria-label="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" aria-hidden="true"><path d="M320 380.6c16 0 29 13 29 29 0 16-13 29-29 29l-42.7 0c-31.1 0-56.3 25.2-56.3 56.3l0 298.7c0 31.1 25.2 56.3 56.3 56.3l469.4 0c31.1 0 56.3-25.2 56.3-56.3l0-298.7c0-31.1-25.2-56.3-56.3-56.3l-42.7 0c-16 0-29-13-29-29 0-16 13-29 29-29l42.7 0c63.2 0 114.3 51.2 114.3 114.3l0 298.7c0 63.2-51.2 114.3-114.3 114.3l-469.4 0c-63.2 0-114.3-51.2-114.3-114.3l0-298.7c0-63.2 51.2-114.3 114.3-114.3l42.7 0z m213.7-251.8l120.7 120.7c11.3 11.3 11.3 29.7 0 41-11.3 11.3-29.7 11.3-41 0l-72.4-72.3 0 340.7c0 16-13 29-29 29-16 0-29-13-29-29l0-338.4-70 70c-10.5 10.5-26.9 11.3-38.2 2.4l-2.8-2.4c-11.3-11.3-11.3-29.7 0-41l120.7-120.7c11.3-11.3 29.7-11.3 41 0z"></path></svg>
                            </button>
                        </div>

                        <div className="flex items-center justify-between px-2 lg:px-0">
                            <div className="flex items-center gap-1">
                                <p className="text-[#757575] text-[15px]">2.8K+ sold</p>
                                <div className="bg-black h-3 w-px"></div>
                                <p className="flex items-center gap-1">
                                    Sold by.
                                    <Image className="w-4 h-4 rounded-full" src={PromotionalContent} alt="promotional content" />
                                    <GoChevronRight />
                                </p>
                            </div>

                            <div className="product-rating flex items-center gap-1">
                                <p>
                                    4.7
                                </p>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>

                        <div className="prices-sec flex items-center flex-wrap gap-2 pt-3 pb-4 px-2 lg:px-0">
                            <p className="text-[#000000] text-[20px] font-semibold relative">
                                <span className="absolute top-[15px] bg-[#FB7701] w-full h-[2.5px]"></span>
                                27452
                            </p>
                            <div className="flex items-end text-[#FB7701]">
                                <Image className="w-4 h-4" src={PriceSection} alt="promotional content" />
                                <p className="text-[20px] font-semibold leading-[20px]">Rs. <span className="text-[28px]">13,661</span></p>
                            </div>
                            <p className="text-[#FB7701] text-[15px] font-bold border border-[#FB7701] rounded-sm px-1 leading-[18px]">
                                50% OFF limited time
                            </p>
                            <p className="text-[#FB7701] flex items-center gap-2 text-[15px] font-bold border border-[#FB7701] rounded-sm px-1 leading-[18px]">
                                ALMOST SOLD OUT <HiQuestionMarkCircle />
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="promotional-sec mb-4 flex items-center gap-6 bg-[#eb0101] xl:rounded-md overflow-hidden">
                                <Image className="w-24 xl:w-30 h-10" src={PromotionalContent} alt="promotional content" />
                                <div className="flex items-center gap-3 text-[12px] xl:text-[16px]">
                                    <p className="text-white flex items-center gap-1 font-semibold"><LuCheck /> Free shipping</p>
                                    <div className="bg-white h-4 w-px"></div>
                                    <p className="text-white flex items-center gap-1 font-semibold"><LuCheck /> Rs.280 Credit for delay</p>
                                </div>
                            </div>
                        </div>
                        <ProductColorSize />
                        <div className="px-2">
                            <div className="pt-6 flex items-center justify-start gap-2 lg:gap-4">
                                <button onClick={() => {
                                 
                                    openCart();
                                }} className="bg-[#fb5d01] hover:bg-[#fb7701] hidden lg:block hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">
                                    Add to cart!
                                </button>
                                <button onClick={() => setIsBuyNowOpen(true)} className="bg-[#fb5d01] main-button-buy hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 rounded-full w-[80%] mx-auto lg:w-full transition-all duration-300 ease-in-out">
                                    Buy now
                                </button>
                            </div>
                        </div>
                        <div className="shipping-info px-2 lg:px-0 pt-8 pb-4 lg:pb-0">
                            <div className="pb-1 lg:pb-3 border-b border-b-gray-300">
                                <p className="text-[14px] md:text-[16px] flex items-center gap-2 text-[#0A8800] font-semibold">
                                    <FaShippingFast className="text-xl" />
                                    Fast Shipping</p>
                                <p className="text-gray-600 text-[13px] md:text-[14px]">Normally delivered in 2-3 days</p>
                            </div>
                            <div className="py-1 lg:py-3 border-b border-b-gray-300">
                                <p className="text-[14px] md:text-[16px] flex items-center gap-2 text-[#0A8800] font-semibold">
                                    <FaFreeCodeCamp className="text-xl" />
                                    Free Shipping</p>
                                <p className="text-gray-600 text-[13px] md:text-[14px]">Free Shipping Over Shopping 150 AED.</p>
                            </div>
                            <div className="py-1 lg:py-3 md:border-b border-b-gray-300">
                                <p className="text-[14px] md:text-[16px] flex items-center gap-2 text-[#0A8800] font-semibold">
                                    <RiCashLine />
                                    Cash On Delivery</p>
                                <p className="text-gray-600 text-[13px] md:text-[14px]">Pay when you receive your order</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review-sec pt-2 border-t border-t-gray-300 px-2 lg:px-0 flex flex-col gap-2 justify-between block lg:hidden">
                    <div className="flex items-center gap-2 border-b border-b-gray-300 pb-2">
                        <div className="product-rating flex items-center gap-[1px]">
                            <p className="text-[18px] font-semibold tetx-[#222]">
                                4.7
                            </p>
                            <FaStar className="text-lg" />
                            <FaStar className="text-lg" />
                            <FaStar className="text-lg" />
                            <FaStar className="text-lg" />
                            <FaStar className="text-lg" />
                        </div>
                        <p className="">
                            (1,232)
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#0a88000f] rounded-md">
                        <div className="bg-[#0a8800] flex items-center justify-center h-[22px] w-[22px] rounded-sm p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="white" alt="All reviews are from verified purchases"><path d="M557.4 67.6l357.5 136.7c28.3 10.8 46.5 38.5 45.2 68.8l-8.6 199.8c-6.8 157.9-86.7 303.6-216.2 394.3l-97.7 68.3c-72.7 50.8-169.4 50.9-242.1 0l-96.1-67.2c-129.2-90.3-208-236.5-212.4-394.2l-5.6-201.2c-0.8-29.6 16.9-56.5 44.4-67.4l345.9-137.3c27.5-10.9 58.1-11.1 85.7-0.6z m75.6 412.9l-224 0c-61.9 0-112 50.1-112 112l0 76.8c0 24.7 20.1 44.8 44.8 44.8l358.4 0c24.7 0 44.8-20.1 44.8-44.8l0-76.8c0-61.9-50.1-112-112-112z m-112-243.7c-48.1 0-87.1 40.1-87.2 89.6 0 49.5 39 89.6 87.2 89.6 48.1 0 87.1-40.1 87.1-89.6 0-49.5-39-89.6-87.1-89.6z"></path></svg>
                        </div>
                        <span className="pr-2 text-[#0a8800] text-[13px] font-semibold">
                            All reviews are from verified purchases
                        </span>
                    </div>
                </div>
                <div className="reviews-main-sec px-2 lg:px-0 block lg:hidden">
                    <ProductReviews />
                </div>

                <div className="product-store-info block lg:hidden">
                    <ProductStoreInfo />
                </div>
                <div className="product-detail-sec block lg:hidden">
                    <ProductDetails />
                </div>
                <div className="block: xl:hidden">
                    <ProductListingMobile />
                </div>
                <div className="explore-interest lg:pt-18 hidden xl:block">
                    <h3 className="text-[#222] font-bold text-[18px] px-2">Explore your interests</h3>
                    <ExploreInterestProducts />
                </div>

                <div className="fixed left-0 right-0 w-full bottom-0 py-3 px-4 z-[99999] bg-white block lg:hidden">
                    <button onClick={() => setIsModalOpen(true)} className="bg-[#fb5d01] hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-lg py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">
                        Add to cart!
                    </button>
                </div>
            </div>


            {/* Modal */}
            <MobileAddToCartBottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="">
                    <div className="flex justify-between pb-3">
                        <div className="flex gap-2">
                            <Image className="w-18 h-18 rounded-sm" width={100} height={100} src='/deals-product3.avif' alt="product " />
                            <div className="pr-4">
                                <p className="line-clamp-1 text-[14px] text-[#666] font-semibold">New Fashion Men's Four Seasons Comfy Casual Running Shoes</p>
                                <div className="flex gap-1 items-center pt-1">
                                    <p className="line-through text-[#222] text-[14px] font-semibold">44,127</p>
                                    <p className="text-[#222] text-[14px] font-semibold">Rs. <span className="text-xl">12,252</span></p>
                                </div>
                                <p className="text-[#fb7701] border border-[#fb7701] rounded-sm px-2 font-semibold w-fit text-[14px]">72% OFF limited time</p>
                            </div>
                        </div>
                        <div className="">
                            <button onClick={() => setIsModalOpen(false)}>
                                <CgClose className="text-xl" />
                            </button>
                        </div>
                    </div>
                    <ProductColorSize />
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="mt-4 bg-[#fb5d01] hover:bg-[#fb7701] text-white py-3 px-6 rounded-full w-full font-semibold"
                    >
                        Confirm Add to Cart
                    </button>
                </div>
            </MobileAddToCartBottomModal>

            <BuyNowModel
                isOpen={isBuyNowOpen}
                onClose={() => setIsBuyNowOpen(false)}
                product={product}
            />

        </>
    )
}

export default ProductDetailMain;
