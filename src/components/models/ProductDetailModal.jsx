"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FaStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import PriceSection from "../../../public/priceicons.avif";
import ProductColorSize from "../productDetailPageComponent/productColorSize";
import { FaChevronRight } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { getProductDetails } from "@/lib/api";
import Loader from "../loader";

export default function ProductDetailModal({ isOpen, onClose, productSku }) {
    const { openCart } = useCart();
    const { slug } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState(null);
    const [currentProductSku, setCurrentProductSku] = useState(productSku);

    console.log(productDetail, "productDetailproductDetailproductDetailproductDetailproductDetail")
     // Function to handle color change
    const handleColorChange = async (newColorSku) => {
        setLoading(true);
        setCurrentProductSku(newColorSku);
        
        try {
            const res = await getProductDetails(newColorSku);
            if (res?.success) {
                setProductDetail(res.data);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update when productSku prop changes (when modal opens with different product)
    useEffect(() => {
        if (!isOpen || !productSku) return;
        if (currentProductSku === productSku && productDetail) return;

        const fetchProduct = async () => {
            setLoading(true);
            setCurrentProductSku(productSku);
            const res = await getProductDetails(productSku);
            if (res?.success) setProductDetail(res.data);
            setLoading(false);
        };

        fetchProduct();
    }, [isOpen, productSku]);

    useEffect(() => {
        setThumbsSwiper(null);
      }, [productDetail]);

    const productImages = productDetail?.images?.map(img => img.image) || [];


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-[99999999999999]"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999] bg-white rounded-lg shadow-xl w-[90%] max-w-4xl p-5 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center relative">
                            <div></div>
                            <button onClick={onClose} className="hover:scale-[1.08] transition-all duration-300 ease-in-out text-2xl absolute -top-3 -right-3">
                                <IoClose />
                            </button>
                        </div>

                        {loading ? (
                            // Loader Section
                            <div className="flex justify-center items-center h-[400px]">
                                <Loader/>
                                {/* <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div> */}
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex flex-wrap max-h-[600px] pb-28 overflow-y-auto">
                                    <div className="w-full md:w-[50%] z-[-1]">
                                        <div className="flex flex-col pr-4 product-detail-main">
                                            {/* Main Image Swiper */}
                                            <div className="">
                                                <Swiper
                                                    spaceBetween={10}
                                                    navigation={true}
                                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                                    modules={[FreeMode, Navigation, Thumbs]}
                                                    className="product-main-swiper overflow-hidden"
                                                >
                                                    {productImages.map((img, index) => (
                                                        <SwiperSlide key={index}>
                                                            <Image
                                                                src={img}
                                                                alt={`main-${index}`}
                                                                width={600}
                                                                height={700}
                                                                className="object-contain w-full h-auto "
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                            {/* Thumbnail Gallery (Left Side) */}
                                            <div className="pt-2">
                                                <Swiper
                                                    onSwiper={setThumbsSwiper}
                                                    spaceBetween={10}
                                                    slidesPerView={7}
                                                    freeMode={true}
                                                    direction="horizontal"

                                                    watchSlidesProgress={true}
                                                    modules={[FreeMode, Navigation, Thumbs]}
                                                    className="product-thumbs-swiper "
                                                >
                                                    {productImages.map((img, index) => (
                                                        <SwiperSlide key={index}>
                                                            <Image
                                                                src={img}
                                                                alt={`thumb-${index}`}
                                                                width={80}
                                                                height={100}
                                                                className="cursor-pointer object-cover w-full h-full rounded-lg border hover:border-gray-400 transition-all"
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-[50%] pr-4 ">
                                        <p className="text-[#222] text-[16px] line-clamp-3">
                                            {productDetail?.name}
                                        </p>

                                        <div className="text-[#aaa] text-[14px] flex items-center gap-1 font-semibold pt-3">
                                            <p>691 sold</p>
                                            <p>Sold by</p>
                                            <p className="bg-[#0000000a] rounded-full w-6 h-6 flex items-center justify-center text-center text-[#dd2c2a] p-1 text-[13px]">TH</p>
                                        </div>

                                        <div className="prices-sec flex items-center flex-wrap gap-2 pb-3 px-2 lg:px-0">
                                            {productDetail?.sale_price && (
                                                <p className="text-[#000000] text-[20px] font-semibold relative line-through">
                                                    Rs. {productDetail?.price}
                                                </p>
                                            )}

                                            <div className="flex items-end text-[#FB7701]">
                                                <p className="text-[20px] font-semibold leading-[20px]">
                                                    Rs. <span className="text-[28px]">
                                                        {productDetail?.sale_price || productDetail?.price}
                                                    </span>
                                                </p>
                                            </div>

                                            {productDetail?.sale_price && (
                                                <p className="text-[#FB7701] text-[15px] font-bold border border-[#FB7701] rounded-sm px-1 leading-[18px]">
                                                    {Math.round(((productDetail?.price - productDetail?.sale_price) / productDetail?.price) * 100)}% OFF
                                                </p>
                                            )}
                                        </div>
                                        <ProductColorSize 
                                        colors={productDetail?.colors || []} 
                                        sizes={productDetail?.sizes || []} 
                                        onColorChange={handleColorChange} // Pass the callback
                                        selectedColor={currentProductSku} // Pass current selected color
                                    />
                                        <div className="bg-white px-3 w-[50%] right-4 py-4 fixed bottom-[0px]">
                                            <button onClick={() => {
                                                openCart();
                                            }} className="bg-[#fb5d01] hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">Add to cart!</button>

                                            <div className="pt-2 text-[15px]">
                                                <Link href={`/p/${productDetail?.sku}`} className="flex hover:underline items-center gap-1">
                                                    All details <FaChevronRight className="text-[13px]" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
