"use client";
import { useEffect, useState } from "react";
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
import { getProductDetails } from "@/lib/api";
import Loader from "@/components/loader";
import WhiteLoader from "@/components/whiteLoader";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from 'react-hot-toast';

const product = {
    title: "Men's Winter Casual PU Leather Jacket",
    image: "/deals-product3.avif",
    oldPrice: "27,452",
    price: "13,661",
};

const ProductDetailMain = ({ productDetail }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
    const { addToCart, openCart } = useCart();
    const [currentProduct, setCurrentProduct] = useState(productDetail);
    const [loading, setLoading] = useState(false);
    const [selectedProductSku, setSelectedProductSku] = useState(null);
    // const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizeObj, setSelectedSizeObj] = useState();
    const [validationError, setValidationError] = useState({
        color: false,
        size: false
    });
    // Find the color that matches the current product SKU
    const findMatchingColor = (product) => {
        if (!product?.colors || !product?.sku) return product?.colors?.[0]?.sku || null;

        const matchingColor = product.colors.find(color => color.sku === product.sku);
        return matchingColor ? matchingColor.sku : (product.colors[0]?.sku || null);
    };

    const [selectedColor, setSelectedColor] = useState(
        findMatchingColor(productDetail)
    );

    // Find the first available size (with quantity > 0)
    const findFirstAvailableSize = (sizes) => {
        if (!sizes || !Array.isArray(sizes)) return null;
        return sizes.find(size => Number(size.available_quantity) > 0) || null;
    };

    // const [selectedSizeObj, setSelectedSizeObj] = useState(
    //     findFirstAvailableSize(productDetail?.sizes) || productDetail?.sizes?.[0] || null
    // );
    const [quantity, setQuantity] = useState(1);

    // ProductColorSize states moved to parent
    const [openQty, setOpenQty] = useState(false);
    const [hoveredSizeId, setHoveredSizeId] = useState(null);
    const [showSizeError, setShowSizeError] = useState(false);

    const qtyOptions = [1, 2, 3, 4, 5];
    const availableSizes = (currentProduct?.sizes || []).filter(size => Number(size.available_quantity) > 0);

    useEffect(() => {
        // When component mounts or currentProduct changes, set first available size as default
        const firstAvailableSize = findFirstAvailableSize(currentProduct?.sizes);
        // setSelectedSizeObj(firstAvailableSize || currentProduct?.sizes?.[0] || null);

        setSelectedSizeObj(null);

        // Update selected color when currentProduct changes to match the new product's SKU
        if (currentProduct) {
            const matchingColorSku = findMatchingColor(currentProduct);
            if (matchingColorSku && matchingColorSku !== selectedColor) {
                setSelectedColor(matchingColorSku);
            }
        }
    }, [currentProduct]);

    console.log(productDetail, "productDetail in product detail page here");

    const handleColorChange = async (sku) => {
        setSelectedColor(sku);
        setLoading(true);
        try {
            const res = await getProductDetails(sku);
            if (res?.success) {
                setCurrentProduct(res.data);
            }
        } catch (err) {
            console.error("Error fetching product for selected color:", err);
        } finally {
            setLoading(false);
        }
    };

    // ProductColorSize handlers moved to parent
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

    // Handle add to cart with validation
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

    // Handle buy now with validation
    const handleBuyNow = () => {
        let hasError = false;

        // Reset validation
        setValidationError({ color: false, size: false });


        if (!selectedColor) {
            toast.error("Please select color");
            setValidationError(prev => ({ ...prev, color: true }));
            hasError = true;
            return;
        }

        if (!selectedSizeObj) {
            toast.error("Please select size");
            setValidationError(prev => ({ ...prev, size: true }));
            hasError = true;
            return;
        }

        if (hasError) return;

        // Check if selected size is out of stock
        if (isSelectedSizeOutOfStock()) {
            toast.error("This product is out of stock for the selected size");
            return;
        }

        // Check if requested quantity is more than available
        if (quantity > Number(selectedSizeObj.available_quantity)) {
            toast.error(`Only ${selectedSizeObj.available_quantity} items available in this size`);
            return;
        }

        setIsBuyNowOpen(true);
    };

    // Get the currently selected color name for display
    const getSelectedColorName = () => {
        return currentProduct?.colors?.find(color => color.sku === selectedColor)?.name || "";
    };

    // Handle add to cart with validation
    const handleAddToCartMobile = () => {
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
            false
        );

        toast.success("Product added to cart successfully!");
        onClose();

        // Reset selections
        setSelectedSizeObj(null);
        setSelectedColor(null);
        setQuantity(1);
    };

    const handleMobileAddToCart = () => {
        // If no color or size selected, show the modal
        if (!selectedColor || !selectedSizeObj) {
            setSelectedProductSku(currentProduct.sku);
            setIsModalOpen(true);
            return;
        }

        // If both are selected, do normal add to cart
        handleAddToCartMobile();
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
                    <WhiteLoader />
                </div>
            )}

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
                        <ProductMainSlider productDescription={currentProduct?.product_description} sliderImages={currentProduct} />
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
                        <div className="flex items-start justify-between gap-4 px-2 lg:px-0">
                            <h1 className="text-[16px] text-[#222] font-[500] mb-2">
                                {currentProduct?.name}
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

                            {/* If sale_price exists show old price with line-through */}
                            {currentProduct.sale_price ? (
                                <p className="text-[#000000] text-[20px] font-semibold relative">
                                    <span className="absolute top-[15px] bg-[#FB7701] w-full h-[2.5px]"></span>
                                    {currentProduct.price}
                                </p>
                            ) : (
                                // If sale_price does NOT exist, show price normally
                                <p className="text-[#000000] text-[24px] font-semibold">
                                    Rs. {currentProduct.price}
                                </p>
                            )}

                            {/* Sale price block (only if sale_price exists) */}
                            {currentProduct.sale_price && (
                                <div className="flex items-end text-[#FB7701]">
                                    <Image className="w-4 h-4" src={PriceSection} alt="promotional content" />
                                    <p className="text-[20px] font-semibold leading-[20px]">
                                        Rs. <span className="text-[28px]">{currentProduct.sale_price}</span>
                                    </p>
                                </div>
                            )}

                            {/* Discount badge (only when sale price exists) */}
                            {currentProduct.sale_price && (
                                <p className="text-[#FB7701] text-[15px] font-bold border border-[#FB7701] rounded-sm px-1 leading-[18px]">
                                    {Math.round(
                                        ((currentProduct.price - currentProduct.sale_price) / currentProduct.price) * 100
                                    )}% OFF limited time
                                </p>
                            )}

                            {/* Almost sold out badge - always visible (or you decide when to show) */}
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

                        {/* Product Color & Size Section - Moved from Child Component */}
                        <div className="product-color-size px-2 lg:px-0">
                            {/* Color Section */}
                            <div className="color-sect pb-4">
                                <p className="text-[#222] font-semibold">
                                    Color:{" "}
                                    <span className="capitalize">
                                        {getSelectedColorName()}
                                    </span>
                                </p>

                                <div className="colors flex gap-2 flex-wrap pt-2">
                                    {(currentProduct?.colors || []).map((color, index) => (
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
                                {/* <p className="text-[#222] font-semibold">
                                    Size: <span>{selectedSizeObj?.value || ""}</span>
                                    {selectedSizeObj && isSelectedSizeOutOfStock() && (
                                        <span className="text-red-500 text-sm ml-2">(Out of Stock)</span>
                                    )}
                                </p> */}
                                <p
                                    className={`font-semibold ${validationError.size ? "text-red-500" : "text-[#222]"
                                        }`}
                                >
                                    Size: <span>{validationError.size ? <span className="text-[14px]">Please select a size </span>: selectedSizeObj?.value || ""} {}</span>
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
                                                onMouseEnter={() => setHoveredSizeId(sizeObj.product_option_id)}
                                                onMouseLeave={() => setHoveredSizeId(null)}
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

                        <div className="px-2">
                            <div className="pt-6 flex items-center justify-start gap-2 lg:gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#fb5d01] hover:bg-[#fb7701] hidden lg:block hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">
                                    Add to cart!
                                </button>
                                <button onClick={handleBuyNow} className="bg-[#fb5d01] main-button-buy hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 rounded-full w-[80%] mx-auto lg:w-full transition-all duration-300 ease-in-out">
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
                    <ProductDetails productDescription={currentProduct?.product_description} />
                </div>
                <div className="block: xl:hidden">
                    <ProductListingMobile />
                </div>
                <div className="explore-interest lg:pt-18 hidden xl:block">
                    <h3 className="text-[#222] font-bold text-[18px] px-2">Explore your interests</h3>
                    <ExploreInterestProducts />
                </div>

                <div className="fixed left-0 right-0 w-full bottom-0 py-3 px-4 z-[99] bg-white block lg:hidden">
                    <button
                        onClick={handleMobileAddToCart}

                        className="bg-[#fb5d01] hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-lg py-3 px-3 lg:px-6 rounded-full w-full transition-all duration-300 ease-in-out">
                        Add to cart!
                    </button>
                </div>
            </div>

            {/* Modal */}
            <MobileAddToCartBottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                productSku={selectedProductSku}
            />

            <BuyNowModel
                isOpen={isBuyNowOpen}
                onClose={() => setIsBuyNowOpen(false)}
                product={product}
            />

        </>
    )
}

export default ProductDetailMain;