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


const CategroyComponents = () => {
  const params = useParams();
  const slug = params.slug || [];
  const swiperRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const toSlug = (name) =>
    name.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  useEffect(() => {
    if (slug.length === 0) return;

    const categorySlug = slug[0];
    const subcategorySlug = slug[1];

    const foundCategory = categoriesData.find(
      (cat) => toSlug(cat.name) === categorySlug
    );

    if (!foundCategory) return;

    setCategory(foundCategory);

    if (subcategorySlug) {
      const foundSubcategory = foundCategory.subcategories.find(
        (sub) => toSlug(sub.name) === subcategorySlug
      );
      setSubcategory(foundSubcategory || null);
    } else {
      setSubcategory(null);
    }
  }, [slug]);

  useEffect(() => {
    if (!category) return;

    let filtered = [];

    if (subcategory) {
      filtered = products.filter(
        (p) =>
          p.category.toLowerCase() === subcategory.name.toLowerCase() ||
          p.category.toLowerCase() === category.name.toLowerCase()
      );
    } else {
      // Filter by main category
      filtered = products.filter((p) =>
        p.category.toLowerCase().includes(category.name.toLowerCase())
      );
    }

    // Fallback if nothing found
    setFilteredProducts(filtered.length > 0 ? filtered : products);
  }, [category, subcategory]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 xl:px-22 py-8">
        {/* <h1 className="text-2xl font-bold">Category Not Found</h1> */}
      </div>
    );
  }

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

      <div className="block xl:hidden">
        {subcategory && (
          <nav className="flex items-center text-center justify-center space-x-2 text-sm text-gray-500 pb-3 px-2">
            {subcategory && (
              <>
                <span className="text-gray-800 font-semibold text-lg">
                  {subcategory.name}
                </span>
              </>
            )}
          </nav>
        )}
      </div>

      {!subcategory && (
        <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-4 pt-6 pb-6 mb-6 border-b border-b-gray-300 px-2">
          {category.subcategories.map((sub, index) => (
            <Link
              key={index}
              href={`/c/${toSlug(category.name)}/${toSlug(sub.name)}`}
            >
              <div className="single-cat group cursor-pointer flex flex-col items-center ">
                <Image
                  className="w-[90%] h-auto rounded-full group-hover:scale-[1.05] transition-all duration-300 ease-in-out"
                  src={sub.image}
                  alt={sub.name}
                />
                <p className="text-[13px] font-normal text-center mt-1">
                  {sub.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Filters Section */}
      <CategoryFilters
      />
      <div className="pt-6 hidden xl:block">
        <ProductCard products={filteredProducts} />
      </div>

      <div className="block xl:hidden px-2 pt-3">
        <ProductCardMobile products={filteredProducts} />
      </div>
    </>
  );
};

export default CategroyComponents;