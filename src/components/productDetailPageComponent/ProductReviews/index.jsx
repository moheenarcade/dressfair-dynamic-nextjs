"use client"
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "shazib Mujaddadi",
    flag: "/flags/pk.png",
    date: "Jun 9, 2025",
    rating: 4,
    text: "very good",
    avatar: "/deals-product5.avif",
  },
  {
    id: 2,
    name: "74***54",
    flag: "/flags/fr.png",
    date: "Aug 13, 2025",
    rating: 5,
    text: "Both of my orders arrived on time, with fast delivery. Thank you, Temu. I am very happy with the delivery and my two pairs of shoes.",
    avatar: "/deals-product5.avif",
  },
  {
    id: 3,
    name: "50***38",
    flag: "/flags/sa.png",
    date: "Jan 1, 2025",
    rating: 5,
    text:
      "Very excellent and a wonderful model. ".repeat(10) +
      "Very excellent and a wonderful model.",
    avatar: "/deals-product5.avif",
  },
  {
    id: 4,
    name: "yu***zt",
    flag: "/flags/kz.png",
    date: "Nov 5, 2024",
    rating: 5,
    text:
      "The shape and size are perfect! They are lightweight, beautiful, and the sole is comfortable and springy. We'll see how the material holds up over time.",
    avatar: "/deals-product5.avif",
  },
];

export const ProductReviews = () => {
  const [expanded, setExpanded] = useState({});
  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="reviews mt-6 border-t border-gray-200 pt-4">
      {reviews.map((review) => {
        const isExpanded = expanded[review.id];
        const isLong = review.text.length > 180;
        const displayText = isExpanded
          ? review.text
          : review.text.slice(0, 180) + (isLong ? "..." : "");

        return (
          <div key={review.id} className="mb-4 border-b border-gray-100 pb-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.name}
                width={40}
                height={40}
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-[#222]">{review.name}</p>
               
                  <p className="text-gray-500 text-sm">on {review.date}</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 pt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-[18px] ${
                    i < review.rating ? "text-black" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="pt-2 text-[15px] text-[#222] leading-snug">
              {displayText}
              {isLong && (
                <button
                  onClick={() => toggleReadMore(review.id)}
                  className="ml-1 text-[#646464] font-medium underline text-sm"
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </p>
          </div>
        );
      })}

      <div className="flex justify-center">
        <button className="py-2 px-8 font-semibold text-sm lg:text-md hover:border-black hover:scale-[1.02] transition-all duration-300 ease-in-out  border border-gray-500 rounded-full">
            See all reviews
        </button>
      </div>
    </div>
  );
};
