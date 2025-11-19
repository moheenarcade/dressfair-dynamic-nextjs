"use client";
import { useState } from "react";
import ProductDetailMain from "@/components/productDetailPageComponent/productDetailMain";

const ProductDetailPage = () => {

    return (
        <>
            <div className='container mx-auto hidden xl:block xl:px-2 2xl:px-22'>
                <ProductDetailMain />
            </div>

            <div className='block xl:hidden lg:px-16'>
                <ProductDetailMain />
            </div>
        </>
    );
};

export default ProductDetailPage;
