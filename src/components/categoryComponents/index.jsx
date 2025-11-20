"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import CatImage from "../../../public/deals-product4.avif";
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/homePageComponent/productCard';
import ProductImage from "../../../public/deals-product4.avif";
import ProductImage2 from "../../../public/deals-product3.avif";
import { LuChevronRight } from 'react-icons/lu';
import CategoryFilters from '@/utils/CategoryFilters';
import ProductCardMobile from '@/components/homePageMobile/productCardMobile';
import { fetchAndSaveCategories, getCatalogue, getLocalCategories, getSubCategories } from '@/lib/api';
import Loader from '../loader';
import { FaChevronDown } from 'react-icons/fa6';

const categoriesData = [
  {
    id: 1,
    name: "Featured",
    subcategories: [
      { id: 101, name: "Personalized Products", image: CatImage },
      { id: 102, name: "Accessories", image: CatImage },
      { id: 103, name: "Bags & Wallets", image: CatImage },
      { id: 104, name: "Shoes", image: CatImage },
      { id: 105, name: "Beauty Essentials", image: CatImage },
      { id: 106, name: "Smart Watches", image: CatImage },
      { id: 107, name: "Jewelry Sets", image: CatImage },
      { id: 108, name: "Perfumes", image: CatImage },
      { id: 109, name: "Makeup Kits", image: CatImage },
      { id: 110, name: "Travel Accessories", image: CatImage },
      { id: 111, name: "T-Shirts", image: CatImage },
      { id: 112, name: "Sunglasses", image: CatImage },
      { id: 113, name: "Belts", image: CatImage },
      { id: 114, name: "Hats & Caps", image: CatImage },
      { id: 115, name: "Gift Boxes", image: CatImage },
      { id: 116, name: "Bluetooth Speakers", image: CatImage },
      { id: 117, name: "Gadgets", image: CatImage },
      { id: 118, name: "Stationery", image: CatImage },
      { id: 119, name: "Keychains", image: CatImage },
      { id: 120, name: "Custom Prints", image: CatImage },
    ],
  },
  {
    id: 2,
    name: "Home & Kitchen",
    subcategories: [
      { id: 201, name: "Furniture", image: CatImage },
      { id: 202, name: "Decor", image: CatImage },
      { id: 203, name: "Kitchenware", image: CatImage },
      { id: 204, name: "Bedding", image: CatImage },
      { id: 205, name: "Storage Solutions", image: CatImage },
      { id: 206, name: "Cleaning Supplies", image: CatImage },
      { id: 207, name: "Cookware Sets", image: CatImage },
      { id: 208, name: "Dinnerware", image: CatImage },
      { id: 209, name: "Curtains", image: CatImage },
      { id: 210, name: "Lighting", image: CatImage },
      { id: 211, name: "Wall Art", image: CatImage },
      { id: 212, name: "Rugs", image: CatImage },
      { id: 213, name: "Mirrors", image: CatImage },
      { id: 214, name: "Cushions", image: CatImage },
      { id: 215, name: "Bathroom Accessories", image: CatImage },
      { id: 216, name: "Kitchen Storage", image: CatImage },
      { id: 217, name: "Table Linen", image: CatImage },
      { id: 218, name: "Home Fragrance", image: CatImage },
      { id: 219, name: "Plants & Pots", image: CatImage },
      { id: 220, name: "Outdoor Furniture", image: CatImage },
    ],
  },
  {
    id: 3,
    name: "Electronics",
    subcategories: [
      { id: 301, name: "Smartphones", image: CatImage },
      { id: 302, name: "Laptops", image: CatImage },
      { id: 303, name: "Headphones", image: CatImage },
      { id: 304, name: "Tablets", image: CatImage },
      { id: 305, name: "Smartwatches", image: CatImage },
      { id: 306, name: "Cameras", image: CatImage },
      { id: 307, name: "Gaming Consoles", image: CatImage },
      { id: 308, name: "Monitors", image: CatImage },
      { id: 309, name: "Printers", image: CatImage },
      { id: 310, name: "Drones", image: CatImage },
      { id: 311, name: "Bluetooth Speakers", image: CatImage },
      { id: 312, name: "Chargers & Cables", image: CatImage },
      { id: 313, name: "Power Banks", image: CatImage },
      { id: 314, name: "Projectors", image: CatImage },
      { id: 315, name: "TVs", image: CatImage },
      { id: 316, name: "Earbuds", image: CatImage },
      { id: 317, name: "Computer Accessories", image: CatImage },
      { id: 318, name: "Home Appliances", image: CatImage },
      { id: 319, name: "Wearable Tech", image: CatImage },
      { id: 320, name: "VR Devices", image: CatImage },
    ],
  },
  {
    id: 4,
    name: "Fashion",
    subcategories: [
      { id: 401, name: "Men’s Clothing", image: CatImage },
      { id: 402, name: "Women’s Clothing", image: CatImage },
      { id: 403, name: "Kids’ Clothing", image: CatImage },
      { id: 404, name: "Shoes", image: CatImage },
      { id: 405, name: "Bags", image: CatImage },
      { id: 406, name: "Jewelry", image: CatImage },
      { id: 407, name: "Watches", image: CatImage },
      { id: 408, name: "Hats & Scarves", image: CatImage },
      { id: 409, name: "Belts", image: CatImage },
      { id: 410, name: "Sunglasses", image: CatImage },
      { id: 411, name: "Underwear", image: CatImage },
      { id: 412, name: "Sportswear", image: CatImage },
      { id: 413, name: "Formalwear", image: CatImage },
      { id: 414, name: "Outerwear", image: CatImage },
      { id: 415, name: "Sleepwear", image: CatImage },
      { id: 416, name: "Beachwear", image: CatImage },
      { id: 417, name: "Ethnic Wear", image: CatImage },
      { id: 418, name: "Accessories", image: CatImage },
      { id: 419, name: "Handbags", image: CatImage },
      { id: 420, name: "Seasonal Sale", image: CatImage },
    ],
  },

];

const CategroyComponents = () => {
  const params = useParams();
  const slug = params.slug || [];

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategory, setSubcategory] = useState(null);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const toSlug = (name) =>
    name.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Fetch main categories from API
  useEffect(() => {
    const loadCategories = async () => {
      const apiData = await fetchAndSaveCategories();
      const localCats = getLocalCategories();
      setCategories(localCats);
      setActiveCategory(localCats[0] || null);
    };
    loadCategories();
  }, []);

  // Detect category and subcategory from URL
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const categorySlug = slug[0];
    const subcategorySlug = slug[1];

    const foundCategory = categories.find(cat => toSlug(cat.name) === categorySlug);
    if (!foundCategory) return;

    setActiveCategory(foundCategory);

    if (subcategorySlug) {
      const foundSubcategory = subcategoryList.find(sub => toSlug(sub.name) === subcategorySlug);
      setSubcategory(foundSubcategory || null);
    } else {
      setSubcategory(null);

      // If no subcategory in URL, load subcategories dynamically
      const categoryId = foundCategory.id || sessionStorage.getItem("selectedCategoryId");
      if (categoryId) loadSubcategories(categoryId);
    }
  }, [slug, categories]);

  // Load subcategories dynamically
  const loadSubcategories = async (categoryId) => {
    const res = await getSubCategories(categoryId);
    if (res.success && res.data) {
      setSubcategoryList(res.data);
    }
  }

  // Load products
  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (pageNumber) => {
    if (pageNumber === 1) setLoading(true);
    if (pageNumber > 1) setLoadingMore(true);

    const categoryId = activeCategory?.id || sessionStorage.getItem("selectedCategoryId") || '';
    const res = await getCatalogue(pageNumber, categoryId);

    if (res?.success) {
      setProducts(prev =>
        pageNumber === 1 ? res.data : [...prev, ...res.data]
      );
      setHasMore(res.pagination.current_page < res.pagination.last_page);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  // Filter products by category/subcategory
  useEffect(() => {
    if (!activeCategory) return;

    let filtered = [];
    if (subcategory) {
      filtered = products.filter(
        p => p.category &&
          (p.category.toLowerCase() === subcategory.name.toLowerCase() ||
            p.category.toLowerCase() === activeCategory.name.toLowerCase())
      );
    } else {
      filtered = products.filter(
        p => p.category && p.category.toLowerCase().includes(activeCategory.name.toLowerCase())
      );
    }
    setFilteredProducts(filtered.length > 0 ? filtered : products);
  }, [activeCategory, subcategory, products]);


  return (
    <>
      <div className="hidden xl:block">
        {subcategory && (
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 px-2">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <LuChevronRight />
            <Link
              href={`/c/${toSlug(category.name)}`}
              className="hover:text-gray-700"
            >
              {category.name}
            </Link>
            {subcategory && (
              <>
                <LuChevronRight />
                <span className="text-gray-800 font-medium">
                  {subcategory.name}
                </span>
              </>
            )}
          </nav>
        )}
      </div>


      {!subcategory && subcategoryList.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-4 pt-6 pb-6 mb-6 border-b border-b-gray-300 px-2">
          {subcategoryList.map((sub, index) => (
            <Link key={index} href={`/c/${toSlug(activeCategory.name)}/${toSlug(sub.name)}`}>
              <div className="single-cat group cursor-pointer flex flex-col items-center">
                <Image
                  className="w-[90%] h-auto rounded-full group-hover:scale-[1.05] transition-all duration-300 ease-in-out"
                  src="/deals-product4.avif"
                  alt={sub.name}
                  width={200}
                  height={200}
                />
                <p className="text-[13px] font-normal text-center mt-1">{sub.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Filters Section */}
      <CategoryFilters
      />
      <div className="pt-6 hidden xl:block">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductCard products={filteredProducts} />
            {filteredProducts.length > 0 && hasMore && (
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

      <div className="block xl:hidden px-2 pt-3">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductCardMobile products={filteredProducts} />
            {filteredProducts.length > 0 && hasMore && (
              <div className="flex justify-center my-6">
                {loadingMore ? (
                  <button
                    className="flex items-center gap-4 justify-center py-2 lg:py-3 px-6 lg:px-12 text-lg font-[500] text-gray-500 rounded-full cursor-not-allowed"
                    disabled
                  >
                    <div className="smallloader mx-auto"></div>

                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 text-black border border-gray-500 justify-center py-[6px] lg:py-3 px-5 lg:px-12 font-semibold text-sm transition-all duration-300 ease-in-out hover:scale-[1.02] bg-transparent rounded-full"
                    onClick={() => setPage(page + 1)}
                  >
                    See More
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CategroyComponents;