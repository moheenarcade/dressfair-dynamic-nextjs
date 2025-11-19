"use client"
import HeroSection from '@/components/homePageComponent/heroSection';
import React, { useState, useRef } from 'react';
import WhyChosseMobileSec from '../whyChosseMobileSec';
import LightingDealsMobile from '../lightingDealsMobile';
import PromotionalSliderMobile from '../promotionalSliderMobile';
import ProductListingMobile from '../productListingMobile';
import CategoryProductListMobile from '../categoryProductListMobile';

const TopTabsSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabsContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const tabs = [
    'All', 'Women', 'Home', 'Sports', 'Men', 'Crafts',
    'Electronics', 'Jewelry', 'Kids', 'Toy', 'Bags',
    'Beauty', 'Office'
  ];

  // Scroll active tab into view
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const tabElement = document.getElementById(`tab-${tab}`);
    if (tabElement && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const scrollLeft = tabElement.offsetLeft - container.offsetLeft;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  // Swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    const currentIndex = tabs.indexOf(activeTab);

    // threshold: minimal swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < tabs.length - 1) {
        handleTabClick(tabs[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        handleTabClick(tabs[currentIndex - 1]);
      }
    }
  };

  return (
    <>
      <div className='tabs-main pt-2 pb-2 px-2'>
        <div
          ref={tabsContainerRef}
          className='overflow-x-auto scrollbar-hide whitespace-nowrap'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ul className='flex text-[#777777] font-semibold gap-4 text-[15px] min-w-max px-2'>
            {tabs.map((tab) => (
              <li
                key={tab}
                id={`tab-${tab}`}
                className={`cursor-pointer transition-all duration-200 ${activeTab === tab
                  ? 'text-black border-b-3 border-black font-bold'
                  : 'hover:text-gray-800'
                  }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab content with swipe gesture */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="overflow-hidden"
      >
        {activeTab === 'All' && (
          <>
            <HeroSection />
            <WhyChosseMobileSec />
            <LightingDealsMobile />
            <PromotionalSliderMobile />
            <ProductListingMobile />
          </>
        )}
        {activeTab === 'Women' && (
          <>
            <CategoryProductListMobile />
          </>
        )}

        {activeTab === 'Home' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Sports' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Men' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Crafts' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Electronics' &&
          <>
            <CategoryProductListMobile />
          </>}

        {activeTab === 'Jewelry' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Kids' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Toy' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Bags' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Beauty' &&
          <>
            <CategoryProductListMobile />
          </>
        }
        {activeTab === 'Office' &&
          <>
            <CategoryProductListMobile />
          </>
        }
      </div>
    </>
  );
};

export default TopTabsSection;
