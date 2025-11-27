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
import ProductBanner from "../../../public/Solid_gray.png";

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

  console.log(subcategoryList , "subcategory list here ")
  const toSlug = (slug) =>
    slug.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

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
    const foundCategory = categories.find(cat => cat.slug === categorySlug);
    if (!foundCategory) return;

    setActiveCategory(foundCategory);

    if (subcategorySlug) {
      const foundSubcategory = subcategoryList.find(sub => sub.slug === subcategorySlug);
      setSubcategory(foundSubcategory || null);
    } else {
      setSubcategory(null);

      // If no subcategory in URL, load subcategories dynamically
      const categoryId = foundCategory.slug || sessionStorage.getItem("selectedCategorySlug");
      if (categoryId) loadSubcategories(categoryId);
    }
  }, [slug, categories]);

  // Load subcategories dynamically
  const loadSubcategories = async (categoryId) => {
    if (!categoryId) return; // safeguard
    const res = await getSubCategories(categoryId);
    if (res.success && res.data) {
      setSubcategoryList(res.data);
    }
  }

  // Separate useEffect to load subcategories if selectedCategoryId exists
  useEffect(() => {
    const selectedCategoryId = sessionStorage.getItem("selectedCategoryId");
    if (selectedCategoryId) {
      loadSubcategories(selectedCategoryId);
    }
  }, []);


  // Load products
  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (pageNumber) => {
    if (pageNumber === 1) setLoading(true);
    if (pageNumber > 1) setLoadingMore(true);

    // const categoryId = activeCategory?.slug || sessionStorage.getItem("selectedCategorySlug") || '';
    const categorySlugFromUrl = slug[0]; // first slug in URL is category
    const categoryId =
      categorySlugFromUrl ||
      activeCategory?.slug ||
      sessionStorage.getItem("selectedCategorySlug") ||
      '';
    const res = await getCatalogue(pageNumber, categoryId);

    if (res?.success) {
      setProducts(prev =>
        pageNumber === 1 ? res.data : [...prev, ...res.data]
      );
      setHasMore(res.pagination.has_more_pages);
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
          (p.category.toLowerCase() === subcategory.slug.toLowerCase() ||
            p.category.toLowerCase() === activeCategory.slug.toLowerCase())
      );
    } else {
      filtered = products.filter(
        p => p.category && p.category.toLowerCase().includes(activeCategory.slug.toLowerCase())
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
              href={`/c/${toSlug(category.slug)}`}
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

      {activeCategory && !subcategory && subcategoryList.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-4 pt-6 pb-6 mb-6 border-b border-b-gray-300 px-2">
          {subcategoryList.map((sub, index) => (
            <Link key={index} href={`/c/${activeCategory.slug}/${sub.slug}`}>
            <div className="single-cat group cursor-pointer flex flex-col items-center">
              <Image
                className="w-[90%] h-auto rounded-full group-hover:scale-[1.05] transition-all duration-300 ease-in-out"
                src={sub.image || ProductBanner}
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

      <div className="block xl:hidden px-2 pt-3">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductCardMobile products={filteredProducts} />
            {hasMore && (
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