import StarRatingFilters from '@/components/starRatingComponent/starRatingFilters';
import React from 'react';

const StarRated = () => {

  return (
    <>
      <div className='container mx-auto hidden xl:block xl:px-2 2xl:px-22 py-4 xl:py-6'>
        <StarRatingFilters />
      </div>
      <div className='block xl:hidden lg:px-16'>
        <StarRatingFilters />
      </div>
    </>
  )
}

export default StarRated;
