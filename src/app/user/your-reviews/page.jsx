import Image from 'next/image';
import React from 'react';

const YourReviews = () => {
  return (
    <div className=''>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="no-reviews-sec flex flex-col justify-center items-center text-center">
          <Image width={100} height={100} src="/reviewsicon.png" alt='no reviews' />
          <h1 className='font-[600] text-[18px] text-[#222]'>You don't have any reviews</h1>
          <p className='text-[14px] text-[#888] font-[500]'>You have no completed reviews or your reviews have been deleted.</p>
        </div>
      </div>
    </div>
  )
}

export default YourReviews;
