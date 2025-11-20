"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProductColorSize from "../productDetailPageComponent/productColorSize";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { getProductDetails } from "@/lib/api";
import WhiteLoader from "../whiteLoader";

const MobileAddToCartBottomModal = ({ isOpen, onClose, productSku }) => {
  console.log(productSku, "productSkuproductSkuin mobile bootm model")
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
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);


  const productImages = productDetail?.images?.map(img => img.image) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[99998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom sheet modal */}
          <motion.div
            className="fixed overflow-hidden bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-[99999] p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >

            {/* Modal Content */}
            <div className="max-h-[80vh] overflow-y-auto">
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
                    <WhiteLoader/>
                </div>
            )}
              <div className="">
                <div className="flex justify-between pb-3">
                  <div className="flex gap-2">
                    <Image className="w-18 h-18 rounded-sm" width={100} height={100}
                      src={productImages[0] || "/placeholder.png"}
                      alt={productDetail?.name || "product image"}
                    />
                    <div className="pr-4">
                      <p className="line-clamp-1 text-[14px] text-[#666] font-semibold">
                        {productDetail?.name}
                      </p>
                      <div className="flex gap-1 items-center pt-1">
                        {productDetail?.sale_price && (
                          <p className="line-through text-[#222] text-[14px] font-semibold">
                            {productDetail?.price}
                          </p>
                        )}
                        <p className="text-[#222] text-[14px] font-semibold">Rs.
                          <span className="text-xl">
                            {productDetail?.sale_price || productDetail?.price}
                          </span>
                        </p>
                      </div>
                      {productDetail?.sale_price && (
                        <p className="text-[#fb7701] border border-[#fb7701] rounded-sm px-2 font-semibold w-fit text-[14px]">

                          {Math.round(((productDetail?.price - productDetail?.sale_price) / productDetail?.price) * 100)}% OFF limited time</p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <button onClick={onClose}>
                      <CgClose className="text-xl" />
                    </button>
                  </div>
                </div>
                <ProductColorSize
                  colors={productDetail?.colors || []}
                  sizes={productDetail?.sizes || []}
                  onColorChange={handleColorChange}
                  selectedColor={currentProductSku}
                />
                <button
                  onClick={onClose}
                  className="mt-4 bg-[#fb5d01] hover:bg-[#fb7701] text-white py-3 px-6 rounded-full w-full font-semibold"
                >
                  Confirm Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileAddToCartBottomModal;
