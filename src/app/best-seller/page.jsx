import BestSellerFilters from '@/components/bestSellerComponent/bestSellerFilters';
import React from 'react';

const BestSeller = () => {

  return (
    <>
    <div className='container mx-auto hidden xl:block xl:px-2 2xl:px-22 xl:py-6'>
      <BestSellerFilters />
    </div>

    <div className='best-selller-mobile block xl:hidden px-2 lg:px-16 xl:py-6'>
      <BestSellerFilters />
    </div>
    </>
  )
}

export default BestSeller;
