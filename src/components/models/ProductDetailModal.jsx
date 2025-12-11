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
import { FaChevronRight } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { getProductDetails } from "@/lib/api";
import Loader from "../loader";
import { toast } from 'react-hot-toast';
import { IoIosArrowDown } from "react-icons/io";

export default function ProductDetailModal({ isOpen, onClose, productSku }) {
    const { openCart, addToCart } = useCart();
    const { slug } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState(null);
    const [currentProductSku, setCurrentProductSku] = useState(productSku);
    const [validationError, setValidationError] = useState({
        color: false,
        size: false
    });
    // New state variables for color/size selection
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizeObj, setSelectedSizeObj] = useState();
    const [quantity, setQuantity] = useState(1);
    const [openQty, setOpenQty] = useState(false);
    const [hoveredSizeId, setHoveredSizeId] = useState(null);
    const qtyOptions = [1, 2, 3, 4, 5];

    // console.log(productDetail, "productDetailproductDetailproductDetailproductDetailproductDetail")

    // Helper functions
    const findMatchingColor = (product) => {
        if (!product?.colors || !product?.sku) return product?.colors?.[0]?.sku || null;
        const matchingColor = product.colors.find(color => color.sku === product.sku);
        return matchingColor ? matchingColor.sku : (product.colors[0]?.sku || null);
    };

    const findFirstAvailableSize = (sizes) => {
        if (!sizes || !Array.isArray(sizes)) return null;
        return sizes.find(size => Number(size.available_quantity) > 0) || null;
    };

    const availableSizes = (productDetail?.sizes || []).filter(size => Number(size.available_quantity) > 0);

    // Function to handle color change
    const handleColorChange = async (newColorSku) => {
        setLoading(true);
        setCurrentProductSku(newColorSku);
        setSelectedColor(newColorSku);

        // Reset selected size when color changes
        setSelectedSizeObj(null);

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
            if (res?.success) {
                setProductDetail(res.data);
                // Set initial color and size
                const matchingColor = findMatchingColor(res.data);
                setSelectedColor(matchingColor);

                const firstAvailableSize = findFirstAvailableSize(res.data?.sizes);
                setSelectedSizeObj(null);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [isOpen, productSku]);

    useEffect(() => {
        setThumbsSwiper(null);
    }, [productDetail]);

    // Color and Size handlers
    const handleColorSelect = (colorSku) => {
        setSelectedColor(colorSku);
        handleColorChange(colorSku);
        setValidationError(prev => ({ ...prev, color: false }));
    };

    const handleSizeSelect = (sizeObj) => {
        setSelectedSizeObj(sizeObj);

        setValidationError(prev => ({ ...prev, size: false }));

    };

    const handleQtySelect = (qty) => {
        setQuantity(qty);
        setOpenQty(false);
    };

    // Check if selected size is out of stock
    const isSelectedSizeOutOfStock = () => {
        if (!selectedSizeObj) return true;
        return Number(selectedSizeObj.available_quantity) <= 0;
    };

    // Get the currently selected color name for display
    const getSelectedColorName = () => {
        return productDetail?.colors?.find(color => color.sku === selectedColor)?.name || "";
    };

    // Add to cart function
    // const handleAddToCart = () => {

    //     if (!selectedColor) {
    //         toast.error("Please select color");
    //         return;
    //     }

    //     if (!selectedSizeObj) {
    //         toast.error("Please select size");
    //         return;
    //     }

    //     // Check if selected size is out of stock
    //     if (isSelectedSizeOutOfStock()) {
    //         toast.error("This product is out of stock for the selected size");
    //         return;
    //     }

    //     // Check if requested quantity is more than available
    //     if (quantity > Number(selectedSizeObj.available_quantity)) {
    //         toast.error(`Only ${selectedSizeObj.available_quantity} items available in this size`);
    //         return;
    //     }

    //     addToCart(
    //         productDetail,
    //         selectedColor,
    //         selectedSizeObj,
    //         quantity,
    //         true
    //     );

    //     toast.success("Product added to cart successfully!");
    //     onClose();

    //     // Reset size selection
    //     setSelectedSizeObj(null);
    //     setQuantity(1); // optional: reset quantity
    // };

    const handleAddToCart = () => {
        let hasError = false;

        // Reset validation
        setValidationError({ color: false, size: false });

        if (!selectedColor) {
            toast.error("Please select color");
            setValidationError(prev => ({ ...prev, color: true }));
            hasError = true;
        }

        if (!selectedSizeObj) {
            toast.error("Please select size");
            setValidationError(prev => ({ ...prev, size: true }));
            hasError = true;
        }

        if (hasError) return;

        // Check if selected size is out of stock
        if (isSelectedSizeOutOfStock()) {
            toast.error("This product is out of stock for the selected size");
            return;
        }

        if (quantity > Number(selectedSizeObj.available_quantity)) {
            toast.error(`Only ${selectedSizeObj.available_quantity} items available in this size`);
            return;
        }

        addToCart(
            productDetail,
            selectedColor,
            selectedSizeObj,
            quantity,
            true
        );

        toast.success("Product added to cart successfully!");
        onClose();

        // Reset selections
        setSelectedSizeObj(null);
        setSelectedColor(null);
        setQuantity(1);
    };

    const handleModalClose = () => {
        onClose();
        setSelectedSizeObj(null);
        setSelectedColor(null); // optional: reset color too
        setQuantity(1); // optional
    };


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
                        className="fixed inset-0 bg-black z-[999999999]"
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
                            <button onClick={handleModalClose} className="hover:scale-[1.08] transition-all duration-300 ease-in-out text-2xl absolute -top-3 -right-3">
                                <IoClose />
                            </button>
                        </div>


                        <div className="relative">
                            <div className="flex flex-wrap max-h-[600px] pb-28 overflow-y-auto">
                                <div className="w-full md:w-[50%] z-[1]">
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

                                    {/* Product Color & Size Section - Replaced Child Component */}
                                    <div className={`product-color-size`}>
                                        {/* Color Section */}
                                        <div className="color-sect pb-4">
                                            <p className="text-[#222] font-semibold">
                                                Color:{" "}
                                                <span className="capitalize">
                                                    {getSelectedColorName()}
                                                </span>
                                            </p>



                                            <div className="colors flex gap-2 flex-wrap pt-2">
                                                {(productDetail?.colors || []).map((color, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleColorSelect(color.sku)}
                                                        className={`single-color cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col justify-center items-center w-fit border-2 rounded-md overflow-hidden
                                                    ${selectedColor === color.sku ? "border-black" : "border-[#aaa]"}
                                                    ${validationError.color && !selectedColor ? "border-red-500" : ""}
                                                `}
                                                    >
                                                        <Image
                                                            className="w-16 h-16 object-cover"
                                                            width={50}
                                                            height={50}
                                                            src={color.image}
                                                            alt={color.sku}
                                                        />
                                                        <p className="px-1 py-1 text-[#222] text-[12px] font-bold">
                                                            {color.name}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Size Section */}
                                        <div className="size-sec pb-4">

                                            <p
                                                className={`font-semibold ${validationError.size ? "text-red-500" : "text-[#222]"
                                                    }`}
                                            >
                                                Size: <span>{validationError.size ? <span className="text-[14px]">Please select a size </span> : selectedSizeObj?.value || ""} { }</span>
                                                {selectedSizeObj && isSelectedSizeOutOfStock() && (
                                                    <span className="text-red-500 text-sm ml-2">(Out of Stock)</span>
                                                )}
                                            </p>

                                            <div className="sizes pt-2 flex items-center gap-2 flex-wrap">
                                                {availableSizes.length > 0 ? (
                                                    availableSizes.map((sizeObj) => (
                                                        <div
                                                            key={sizeObj.product_option_id}
                                                            onClick={() => handleSizeSelect(sizeObj)}
                                                            className={`relative single-size cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out py-1 px-4 text-[#222] text-[14px] font-bold w-fit rounded-full border-2
        ${selectedSizeObj?.product_option_id === sizeObj.product_option_id ? "border-black" : "border-[#aaa]"}
        ${Number(sizeObj.available_quantity) <= 0 ? "opacity-50 cursor-not-allowed" : ""}
        ${validationError.size && !selectedSizeObj ? "border-red-500" : ""}
    `}
                                                        >
                                                            {sizeObj.value}

                                                            {/* Custom Tooltip */}
                                                            {hoveredSizeId === sizeObj.product_option_id && (
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded shadow-md whitespace-nowrap z-[9899999999999]">
                                                                    {Number(sizeObj.available_quantity) > 0
                                                                        ? `Available quantity: ${sizeObj.available_quantity}`
                                                                        : "Out of stock"
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-red-500 text-sm">Out of stock — unable to add to cart</p>
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

                                        {/* Quantity Section */}
                                        <div className="qty-sect relative flex items-center gap-2 pt-1">
                                            <p className="text-[#222] font-semibold pb-1">Qty</p>

                                            <div
                                                className="select-qty-option relative w-[100px]"
                                                onClick={() => setOpenQty(!openQty)}
                                            >
                                                <div className="border border-[#aaa] font-semibold rounded-sm px-3 py-1 text-sm cursor-pointer flex justify-between items-center bg-white">
                                                    <span>{quantity}</span>
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

                                    <div className="bg-white px-3 w-[50%] right-4 py-4 fixed bottom-[0px]">
                                        <button onClick={handleAddToCart} className="bg-[#fb5d01] hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">
                                            Add to cart!
                                        </button>

                                        <div className="pt-2 text-[15px]">
                                            <Link href={`/p/${productDetail?.sku}`} className="flex hover:underline items-center gap-1">
                                                All details <FaChevronRight className="text-[13px]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {loading && (
                                <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-50">
                                    <Loader />
                                </div>
                            )}
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
