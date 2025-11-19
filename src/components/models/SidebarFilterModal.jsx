"use client";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

const SidebarFilterModal = ({ 
  isOpen, 
  onClose, 
  selectedFilters, 
  onFilterChange,
  onResetAll 
}) => {
  const filtersConfig = [
    { label: "Sort by: Relevance", type: "single", options: ["Relevance", "Price: Low to High", "Price: High to Low", "Newest Arrivals", "Best Rated"] },
    { label: "Color", type: "multi-color", options: ["Red", "Blue", "Green", "Yellow", "Black", "White"] },
    { label: "Size", type: "multi", options: ["S", "M", "L", "XL", "XXL", "Free Size"] },
    { label: "Type", type: "multi", options: ["Casual", "Formal", "Party", "Evening", "Summer"] },
    { label: "Style", type: "multi", options: ["Modern", "Classic", "Vintage", "Bohemian", "Minimalist"] },
    { label: "Material", type: "multi", options: ["Cotton", "Polyester", "Silk", "Wool", "Linen", "Denim"] },
    { label: "Closure Type", type: "multi", options: ["Zipper", "Buttons", "Hook & Eye", "Velcro", "Elastic"] },
    { label: "Dress Length", type: "multi", options: ["Mini", "Knee Length", "Midi", "Maxi", "Ankle"] },
    { label: "Neck Style", type: "multi", options: ["Round", "V-Neck", "Collar", "Boat Neck", "Square"] },
    { label: "Sleeve Length", type: "multi", options: ["Sleeveless", "Short", "3/4", "Long"] },
    { label: "Pattern", type: "multi", options: ["Solid", "Striped", "Floral", "Plaid", "Polka Dot", "Print"] },
    { label: "Occasion", type: "multi", options: ["Casual", "Formal", "Wedding", "Party", "Office", "Beach"] },
    { label: "Season", type: "multi", options: ["Spring", "Summer", "Fall", "Winter", "All Season"] },
  ];

  const handleSelect = (label, value) => {
    onFilterChange(label, value);
  };

  const handleResetFilter = (label) => {
    if (label === "Sort by: Relevance") {
      onFilterChange(label, "Relevance");
    } else {
      onFilterChange(label, []);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="relative flex flex-col w-full max-w-sm bg-white shadow-xl h-full mr-auto transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <LiaTimesSolid size={20} />
          </button>
        </div>

        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtersConfig.map((filter, index) => (
            <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  {filter.label === "Sort by: Relevance" 
                    ? `Sort by: ${selectedFilters[filter.label]}`
                    : `${filter.label} ${selectedFilters[filter.label]?.length > 0 ? `(${selectedFilters[filter.label].length})` : ''}`
                  }
                </h3>
             
              </div>

              {/* Single Select (Sort) */}
              {filter.type === "single" && (
                <div className="space-y-2">
                  {filter.options.map((option, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={filter.label}
                        value={option}
                        checked={selectedFilters[filter.label] === option}
                        onChange={() => handleSelect(filter.label, option)}
                        className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Multi Select - Color */}
              {filter.type === "multi-color" && (
                <div className="grid grid-cols-6 flex-wrap gap-2">
                  {filter.options.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(filter.label, option)}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 p-[2px] transition-all duration-150 ${
                          selectedFilters[filter.label]?.includes(option)
                            ? "border-black scale-110"
                            : "border-gray-300"
                        }`}
                      >
                        <div
                          className="w-full h-full rounded-full shadow-sm"
                          style={{ backgroundColor: option.toLowerCase() }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Multi Select - Regular */}
              {filter.type === "multi" && (
                <div className="flex flex-wrap gap-2">
                  {filter.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(filter.label, option)}
                      className={`px-2 py-[2px] rounded-full border-2 transition-all duration-150 text-[12px] font-medium ${
                        selectedFilters[filter.label]?.includes(option)
                          ? "border-black bg-black text-white scale-105"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onResetAll}
              className="flex-1 py-2 lg:py-3 px-4 border border-gray-400 text-gray-700 font-semibold rounded-full hover:border-gray-600 transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 lg:py-3 px-4 rounded-full bg-[#fb7701] text-white font-semibold hover:bg-[#e56a00] transition-colors"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilterModal;