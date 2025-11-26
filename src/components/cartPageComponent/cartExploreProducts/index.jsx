"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../../homePageComponent/productCard/index';
import ProductImage from "../../../../public/deals-product4.avif";
import ProductImage2 from "../../../../public/deals-product3.avif";
import { FaChevronDown } from 'react-icons/fa6';
import Loader from '@/components/loader';
import { getCatalogue } from '@/lib/api';

const CartExploreProducts = () => {
    const swiperRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("Recommended");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadProducts(page);
    }, [page]);

    const loadProducts = async (pageNumber) => {
        if (pageNumber > 1) setLoadingMore(true);

        const res = await getCatalogue(pageNumber);
        if (res?.success) {
            if (pageNumber === 1) {
                setProducts(res.data);
            } else {
                setProducts(prev => [...prev, ...res.data]);
            }

            setHasMore(res.pagination.has_more_pages);
        }

        setLoading(false);
        setLoadingMore(false);
    };


    const filteredProducts =
        selectedCategory === "Recommended"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    return (
        <div className=''>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <ProductCard products={filteredProducts}
                        gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                    />
                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            {loadingMore ? (
                                <button
                                    className="flex items-center gap-4 justify-center py-2 lg:py-3 px-6 lg:px-12 text-lg font-[500] text-gray-500 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    <div className="smallloader mx-auto"></div>
                                    loading...
                                </button>
                            ) : (
                                <button
                                    className="flex items-center gap-2 justify-center py-2 lg:py-3 px-6 lg:px-12 font-semibold text-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#fb6d01] bg-[#fb7701] text-white rounded-full"
                                    onClick={() => setPage(page + 1)}
                                >
                                    See More <FaChevronDown />
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default CartExploreProducts;
