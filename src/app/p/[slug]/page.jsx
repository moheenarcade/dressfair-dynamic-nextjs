"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetailMain from "@/components/productDetailPageComponent/productDetailMain";
import { getProductDetails } from "@/lib/api";
import Loader from "@/components/loader";

const ProductDetailPage = () => {
    const { slug } = useParams(); // this is your SKU from url
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  console.log(product , "product detail here ")
    useEffect(() => {
      if (!slug) return;
  
      const fetchProduct = async () => {
        setLoading(true);
        const res = await getProductDetails(slug);
        if (res?.success) setProduct(res.data);
        setLoading(false);
      };
  
      fetchProduct();
    }, [slug]);
  
    if (loading) return <div className="h-[70vh] w-full flex justify-center items-center"><Loader/></div>;
  
    return (
        <>
            <div className='container mx-auto hidden xl:block xl:px-2 2xl:px-22'>
                <ProductDetailMain productDetail={product}/>
            </div>

            <div className='block xl:hidden lg:px-16'>
                <ProductDetailMain productDetail={product}/>
            </div>
        </>
    );
};

export default ProductDetailPage;
