"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;


const cities = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"];
const areas = {
    Dubai: ["Jumeirah", "Deira", "Bur Dubai", "Business Bay"],
    "Abu Dhabi": ["Al Reem Island", "Khalifa City", "Corniche"],
    Sharjah: ["Al Majaz", "Al Nahda", "Al Qasimia"],
    Ajman: ["Al Nuaimiya", "Ajman Corniche", "Al Rashidiya"],
};

const BuyNowModel = ({ isOpen, onClose, product }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isAreaOpen, setIsAreaOpen] = useState(false);
    const [configData, setConfigData] = useState(null);
    const [phoneCode, setPhoneCode] = useState("");
    const [mobileLenght, setMobileLenght] = useState('');
    const [currency, setCurrency] = useState("");
    console.log(product, "product data in buy now form")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const allowedDigits = mobileLenght - (phoneCode?.toString().length || 0);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    useEffect(() => {
        const data = localStorage.getItem("configData");
        if (data) {
            const parsed = JSON.parse(data);
            setConfigData(parsed);
            if (parsed.phone_code) setPhoneCode(parsed.phone_code);
            if (parsed.mobile_lenght) setMobileLenght(parsed.mobile_lenght);
            if (parsed.currency_code) setCurrency(parsed.currency_code);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" })); 
    };


    const handleMobileChange = (e) => {
        let val = e.target.value.replace(/\D/g, ""); // only digits
    
        if (val.length > allowedDigits) return; // enforce max length
    
        setFormData(prev => ({ ...prev, mobile: val }));
        setErrors(prev => ({ ...prev, mobile: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Invalid email";
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d+$/.test(formData.mobile)) {
            newErrors.mobile = "Only numbers are allowed";
        } else {
            const effectiveLength = formData.mobile.startsWith("0")
                ? formData.mobile.length - 1
                : formData.mobile.length;
            if (effectiveLength !== allowedDigits) {
                newErrors.mobile = `Mobile number must be exactly ${allowedDigits} digits`;
            }
        }

        if (!selectedCity) newErrors.city = "City is required";
        if (!selectedArea) newErrors.area = "Area is required";

        if (!formData.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const toggleCityDropdown = () => {
        setIsCityOpen(!isCityOpen);
        setIsAreaOpen(false);
    };

    const toggleAreaDropdown = () => {
        if (!selectedCity) return;
        setIsAreaOpen(!isAreaOpen);
        setIsCityOpen(false);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedArea("");
        setErrors(prev => ({ ...prev, city: "", area: "" }));
        setIsCityOpen(false);
    };

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setErrors(prev => ({ ...prev, area: "" }));
        setIsAreaOpen(false);
    };

    const getDiscountPercent = (price, salePrice) => {
        if (!price || !salePrice) return 0;

        const original = Number(price);
        const sale = Number(salePrice);

        if (isNaN(original) || isNaN(sale) || original <= sale) return 0;

        return Math.round(((original - sale) / original) * 100);
    };
    const discountPercent = getDiscountPercent(product?.price, product?.salePrice);
    const showDiscount = discountPercent > 1;

    const getUnitPrice = (product) => {
        if (!product) return 0;

        const sale = Number(product.salePrice);
        const price = Number(product.price);

        if (!isNaN(sale) && sale > 0) return sale;
        if (!isNaN(price) && price > 0) return price;

        return 0;
    };

    const quantity = Number(product?.quantity) || 1;
    const unitPrice = getUnitPrice(product);
    const grandTotal = unitPrice * quantity;

    const buildOrderPayload = () => {
        return {
          customer: {
            name: formData.name,
            email: formData.email,
            mobile: `${phoneCode}${formData.mobile}`,
            city: selectedCity,
            area: selectedArea,
            address: formData.address,
          },
      
          product: {
            id: product?.id,
            name: product?.name,
            sku: product?.selectedColorSku,
            color: product?.selectedColor,
            size: product?.selectedSize,
            sizeId: product?.sizeId,
            quantity: quantity,
            unitPrice: unitPrice,
            originalPrice: product?.price,
            salePrice: product?.salePrice || null,
          },
      
          pricing: {
            currency: currency,
            subtotal: unitPrice * quantity,
            shippingFee: 0,
            discountPercent: showDiscount ? discountPercent : 0,
            grandTotal: grandTotal,
          },
      
          meta: {
            source: "buy_now_modal",
            createdAt: new Date().toISOString(),
          }
        };
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const payload = {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_mobile: `${phoneCode}${formData.mobile}`,
          customer_city_id: selectedCity,
          customer_city_name: selectedCity,
          customer_area_name: selectedArea,
          customer_address: formData.address,
          product_id: product?.id,
          product_option_id: product?.sizeId,
          product_color: product?.selectedColor,
          product_quantity: Number(product?.quantity) || 1,
          shipping_charges: 0,
          total_price: grandTotal,
          product_price : unitPrice,
        };
      
        try {
          const storeId = localStorage.getItem("store_id"); // optional headers
          const { data } = await axios.post(
            `${API}/checkout/buy/now/order`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
                "spa-store-id": storeId,
              },
            }
          );
      
          if (data.success) {
            toast.success("Order placed successfully 🎉");
            setFormData({ name: "", email: "", mobile: "", address: "" });
            setSelectedCity("");
            setSelectedArea("");
            onClose();
          } else {
            throw new Error(data.message || "Failed to place order");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || error.message || "Failed to place order. Please try again.");
        }
      };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-[999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed inset-0 z-[99999999999999999] flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg pt-4 pb-6 px-6 my-3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        >
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 bg-white z-10">
                                <h3 className="text-lg font-semibold text-gray-800">Order Now</h3>
                                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
                                    <CgClose className="text-xl" />
                                </button>
                            </div>

                            <div className="flex gap-3 items-start py-4">
                                <div className="relative">
                                    <p className="absolute -right-2 -top-2 flex items-center justify-center text-sm font-semibold text-white bg-[#fb7701] rounded-full w-6 h-6">{product?.quantity}</p>
                                    <Image
                                        src={product?.images?.[0]?.image || "/Placeholder_view_vector.png"}
                                        width={80}
                                        height={80}
                                        alt={product?.name || "Product"}
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[14px] text-gray-700 font-semibold line-clamp-1">
                                        {product?.name || "No Porduct Name"}
                                    </p>
                                    <div className="flex gap-px items-center pt-1">

                                        <div className="flex gap-3 pl-2">
                                            <p className="text-gray-700 text-[12px] ">
                                                Color: <span className="font-semibold">{product?.selectedColor}</span>
                                            </p>
                                            <p className="text-gray-700 text-[12px]">
                                                Size: <span className="font-semibold">{product?.selectedSize}</span>
                                            </p>
                                        </div>
                                    </div>
                                    {showDiscount && (
                                        <div className="flex items-center pt-1">
                                            <p className="text-[#fb7701] border border-[#fb7701] rounded-sm px-2 font-semibold w-fit text-[10px] md:text-[13px]">
                                                {discountPercent}% OFF limited time
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-md p-3">
                                <div className="price flex items-center justify-between">
                                    <p className="text-[14px] font-[500]">Price</p>
                                    <div className="flex gap-1">
                                        {showDiscount && (
                                            <p className="line-through text-gray-500 text-[13px] font-semibold">
                                                {currency} {product?.price}
                                            </p>
                                        )}
                                        <p className="text-gray-900 text-[14px] font-semibold">
                                            {unitPrice} {currency}
                                        </p>
                                    </div>
                                </div>

                                <div className="price flex items-center justify-between">
                                    <p className="text-[14px] font-[500]">Quantity</p>
                                    <p className="text-gray-900 text-[14px] font-semibold">
                                        {quantity}
                                    </p>
                                </div>

                                <div className="price flex items-center justify-between">
                                    <p className="text-[14px] font-[500]">Shipping Fee</p>
                                    <p className="text-gray-900 text-[14px] font-semibold">
                                        Free
                                    </p>
                                </div>

                                <div className="price flex items-center justify-between mt-1 pt-1 border-t border-gray-200">
                                    <p className="text-[16px] font-[600]">Grand Total</p>
                                    <p className="text-gray-900 text-[16px] font-semibold">
                                        {grandTotal.toFixed(2)} {currency}
                                    </p>
                                </div>
                            </div>


                            <form className="pt-4 space-y-2" onSubmit={handleSubmit}>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                    />
                                    {errors.name && <p className="text-red-500 text-[12px] absolute bottom-[-16px]">{errors.name}</p>}
                                </div>

                                <div className="relative mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                    />
                                    {errors.email && <p className="text-red-500 text-[12px] absolute bottom-[-16px]">{errors.email}</p>}
                                </div>

                                <div className="flex gap-1 mb-5 relative">
                                    <p className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-fit">
                                        +{phoneCode}
                                    </p>
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleMobileChange}
                                        placeholder={`Enter ${allowedDigits} digits`}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                    />
                                    {errors.mobile && <p className="text-red-500 text-[12px] absolute bottom-[-16px]">{errors.mobile}</p>}
                                </div>

                                {/* City Dropdown */}
                                <div className="relative mb-5">
                                    <button
                                        type="button"
                                        onClick={toggleCityDropdown}
                                        className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 focus:ring-1 focus:ring-[#fb5d01] focus:border-[#fb5d01]"
                                    >
                                        {selectedCity || "Choose a city"}
                                        <IoIosArrowDown
                                            className={`transition-transform duration-300 ${isCityOpen ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>
                                    {errors.city && <p className="text-red-500 text-[12px] mt-1 absolute bottom-[-16px]">{errors.city}</p>}
                                    {isCityOpen && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-10 max-h-40 overflow-y-auto"
                                        >
                                            {cities.map((city) => (
                                                <li
                                                    key={city}
                                                    onClick={() => handleCitySelect(city)}
                                                    className="px-3 py-2 text-sm hover:bg-[#fb5d01]/10 cursor-pointer"
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </div>

                                {/* Area Dropdown */}
                                <div className="relative mb-4">
                                    <button
                                        type="button"
                                        disabled={!selectedCity}
                                        onClick={toggleAreaDropdown}
                                        className={`w-full flex justify-between items-center border rounded-md px-3 py-2 mt-1 text-sm transition ${selectedCity ? "border-gray-300 text-gray-700" : "border-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        {selectedArea || (selectedCity ? "Choose an area" : "Select a city first")}
                                        <IoIosArrowDown
                                            className={`transition-transform duration-300 ${isAreaOpen ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>
                                    {errors.area && <p className="text-red-500 text-[12px] mt-1 absolute bottom-[-16px]">{errors.area}</p>}
                                    {isAreaOpen && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-10 max-h-40 overflow-y-auto"
                                        >
                                            {areas[selectedCity]?.map((area) => (
                                                <li
                                                    key={area}
                                                    onClick={() => handleAreaSelect(area)}
                                                    className="px-3 py-2 text-sm hover:bg-[#fb5d01]/10 cursor-pointer"
                                                >
                                                    {area}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </div>

                                <div className="relative mb-5 md:mb-8">
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your delivery address"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-[#fb5d01] focus:border-[#fb5d01] outline-none text-sm"
                                        rows={2}
                                    ></textarea>
                                    {errors.address && <p className="text-red-500 text-[12px] absolute bottom-[-16px]">{errors.address}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#fb5d01] hover:bg-[#fb7701] text-white font-semibold py-3 rounded-full text-md transition-all duration-300 ease-in-out"
                                >
                                    Place Order Now
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BuyNowModel;
