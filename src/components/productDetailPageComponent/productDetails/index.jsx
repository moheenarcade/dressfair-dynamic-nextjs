"use client";
import React, { useState } from "react";
import DOMPurify from "dompurify";

const ProductDetails = ({ productDescription }) => {
  const [showMore, setShowMore] = useState(false);

  // Clean up inline styles (optional, keep images responsive)
  const cleanInlineStyles = (html) => {
    return html.replace(/style="([^"]*)"/g, (match, style) => {
      const cleanedStyle = style
        .replace(/(width|height|position|left|top|right|bottom|transform|margin|padding|cursor|display):[^;]*;?/g, "")
        .trim();
      return cleanedStyle ? `style="${cleanedStyle}"` : "";
    });
  };

  const sanitizedDescription = DOMPurify.sanitize(cleanInlineStyles(productDescription || ""), {
    ALLOWED_TAGS: ["p", "br", "img", "div", "b", "strong", "i", "em", "ul", "ol", "li"],
    ALLOWED_ATTR: ["src", "alt", "style"],
  });

  return (
    <section className="product-details relative px-2 lg:px-0">
      <h2 className="text-[17px] md:text-[20px] font-semibold text-[#222] mb-4">
        Product Details
      </h2>

      <div
        className={`overflow-hidden transition-all duration-500 relative ${
          showMore ? "max-h-[3000px]" : "max-h-[350px]"
        }`}
      >
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />

        {/* Gradient shadow */}
        {!showMore && (
          <div className="absolute bottom-0 left-0 w-full h-[160px] bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
        )}
      </div>

      <div className="text-center flex justify-center items-center relative z-20 mt-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#222] flex items-center gap-1 font-semibold text-sm px-4 py-2 rounded transition"
        >
          {showMore ? "See Less" : "See More"}
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            className="UwGeB8k4"
          >
            <path d="M846.6 329.7c19.9-17.2 49.9-15 67.1 4.9 15.4 17.9 15.2 44 0.5 61.6l-5.4 5.5-365.3 315.5c-15.9 13.7-38.5 15.2-55.8 4.6l-6.3-4.6-366.1-315.5c-19.9-17.1-22.1-47.2-5-67 15.4-17.9 41.3-21.5 60.8-9.6l6.2 4.6 335.1 288.7 334.2-288.7z"></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
