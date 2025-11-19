"use client";
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../../homePageComponent/productCard/index';
import ProductImage from "../../../../public/deals-product4.avif";
import ProductImage2 from "../../../../public/deals-product3.avif";

const categories = [
    "Recommended", "Men's Fashion", "Women's Fashion", "Electronics", "Mobiles",
    "Home & Kitchen", "Beauty & Health", "Sports", "Toys", "Gadgets",
    "Books", "Automotive", "Jewelry", "Footwear", "Accessories",
    "Stationery", "Gaming", "Pets", "Travel", "Music",
    "Outdoor", "Smart Home", "Baby Products", "Office Supplies", "Fitness"
];

const products = [
    { id: 1, title: "Men's Jacket - Milano Italia", sold: '2k', rating: 5, price: 1899, oldPrice: 3944, image: ProductImage, category: "Men's Fashion" },
    { id: 2, title: "Wireless Earbuds Pro 5.0", sold: '2k', rating: 4.5, price: 2999, oldPrice: 4999, image: ProductImage2, category: "Electronics" },
    { id: 3, title: "Smart Watch Series 8", sold: '2k', rating: 4.3, price: 8499, oldPrice: 10999, image: ProductImage, category: "Electronics" },
    { id: 4, title: "Stylish Handbag for Women", sold: '2k', rating: 5, price: 2499, oldPrice: 3299, image: ProductImage2, category: "Women's Fashion" },
    { id: 5, title: "Casual Sneakers for Men", sold: '2k', rating: 5, price: 3599, oldPrice: 4599, image: ProductImage, category: "Footwear" },
    { id: 6, title: "Hair Dryer Pro 2200W", sold: '2k', rating: 5, price: 1999, oldPrice: 2899, image: ProductImage, category: "Beauty & Health" },
    { id: 7, title: "Smart Home Security Camera", sold: '2k', rating: 5, price: 5499, oldPrice: 6999, image: ProductImage2, category: "Smart Home" },
    { id: 8, title: "Toy Car Set for Kids", sold: '112k', rating: 5, price: 1499, oldPrice: 2299, image: ProductImage, category: "Toys" },
    { id: 9, title: "Laptop Backpack", sold: '32k', rating: 5, price: 2299, oldPrice: 2999, image: ProductImage, category: "Accessories" },
    { id: 10, title: "Running Shoes", sold: '3k', rating: 5, price: 4999, oldPrice: 5999, image: ProductImage2, category: "Fitness" },
    { id: 11, title: "Men's Jacket - Milano Italia", sold: '12k', rating: 5, price: 1899, oldPrice: 3944, image: ProductImage, category: "Men's Fashion" },
    { id: 12, title: "Wireless Earbuds Pro 5.0", sold: '42k', rating: 5, price: 2999, oldPrice: 4999, image: ProductImage2, category: "Electronics" },
    { id: 13, title: "Smart Watch Series 8", sold: '1k', rating: 5, price: 8499, oldPrice: 10999, image: ProductImage, category: "Electronics" },
    { id: 14, title: "Stylish Handbag for Women", sold: '2k', rating: 5, price: 2499, oldPrice: 3299, image: ProductImage, category: "Women's Fashion" },
    { id: 15, title: "Casual Sneakers for Men", sold: '22k', rating: 5, price: 3599, oldPrice: 4599, image: ProductImage2, category: "Footwear" },
    { id: 16, title: "Hair Dryer Pro 2200W", sold: '3222k', rating: 5, price: 1999, oldPrice: 2899, image: ProductImage2, category: "Beauty & Health" },
    { id: 17, title: "Smart Home Security Camera", sold: '122k', rating: 5, price: 5499, oldPrice: 6999, image: ProductImage, category: "Smart Home" },
    { id: 18, title: "Toy Car Set for Kids", sold: '222k', rating: 5, price: 1499, oldPrice: 2299, image: ProductImage2, category: "Toys" },
    { id: 19, title: "Laptop Backpack", sold: '2k', rating: 5, price: 2299, oldPrice: 2999, image: ProductImage, category: "Accessories" },
    { id: 20, title: "Running Shoes", sold: '32k', rating: 5, price: 4999, oldPrice: 5999, image: ProductImage2, category: "Fitness" },

];


const ExploreInterestProducts = () => {
    const swiperRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("Recommended");

    // 🔹 Filter products based on selected category
    const filteredProducts =
        selectedCategory === "Recommended"
            ? products // Show all
            : products.filter((p) => p.category === selectedCategory);

    return (
        <>
            <ProductCard products={filteredProducts} />
        </>
    )
}

export default ExploreInterestProducts;

