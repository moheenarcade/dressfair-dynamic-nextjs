import Image from 'next/image';
import React from 'react';
import HeroSmallBanner from "../../../../public/herosmall-banner.avif";

const HeroSection = () => {

  return (
    <div className=''>
      <div className="">
        <Image className='w-full h-auto' width={1200} height={600} src={HeroSmallBanner} alt='hero banner'/>
      </div>
    </div>
  )
}

export default HeroSection;
