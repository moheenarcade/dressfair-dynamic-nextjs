import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa6';

const ProductStoreInfo = () => {
    return (
        <div className='py-4 md:py-12 px-2 lg:px-0 border-y-4 lg:border-y-0 border-y-gray-100 my-4'>
            <div className="flex items-center gap-2 lg:gap-4 ">
                <div className="">
                    <Image className="rounded-full w-10 lg:w-24 h-10 lg:h-24" width={100} height={100} src="/deals-product4.avif" alt="product store logo" />
                </div>
                <div className="">
                    <h2 className='text-[#222] text-md md:text-[22px] font-semibold'>Dressfair Shoes</h2>
                    <div className="flex items-center gap-1 lg:gap-3">
                        <p className='text-[#000] text-[12px] md:text-[14px] font-semibold'>
                            1.1K+
                            <span className='text-[#888] ml-1 text-[12px] md:text-[14px] font-normal'>
                                Followers
                            </span>
                        </p>
                        <div className="w-px h-3 bg-gray-300"></div>
                        <p className='text-[#000] text-[12px] md:text-[14px] font-semibold'>
                            100K+

                            <span className='text-[#888] ml-1 text-[12px] md:text-[14px] font-normal'>
                                Sold
                            </span>
                        </p>
                        <div className="w-px h-3 bg-gray-300"></div>

                        <p className='text-[#000] gap-1 flex items-center text-[12px] md:text-[14px] font-semibold'>
                            4.7 <FaStar className="text-md" />
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center gap-1 xl:gap-3 pt-2">
                            <button className='py-2 flex gap-1 justify-center items-center px-4 xl:px-6 hover:border-black hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-full font-semibold border text-[12px] xl:text-[16px] border-gray-400 w-[150px] xl:w-[200px]'>
                                <svg className="_2XhhuzVv" alt="" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#000000"><path d="M810 470.7c23.6 0 42.7 19.1 42.7 42.6l-0.1 125.5 125.6 0c23.6 0 42.7 19.1 42.6 42.7 0 23.6-19.1 42.7-42.6 42.7l-125.6-0.1 0.1 125.6c0 23.6-19.1 42.7-42.7 42.6-23.6 0-42.7-19.1-42.7-42.6l0-125.6-125.5 0.1c-23.6 0-42.7-19.1-42.6-42.7 0-23.6 19.1-42.7 42.6-42.7l125.5 0 0-125.5c0-23.6 19.1-42.7 42.7-42.6z m-65.2-374c66.7 0 126.6 40.6 151.4 102.5l17 42.3c1.9 4.7 3.5 9.4 4.8 14.3l1.4 6.1-0.6-2.9 3.1 8c5.8 16.4 9.4 33.5 10.6 51.1l0.5 13.3c0 6.3-0.3 12.6-0.9 18.8-0.6 6.4-1.4 12.8-2.5 19.2-4 23.2-26 38.8-49.3 34.8-23.2-4-38.8-26-34.8-49.2l0.6-4.8 0.8-6.8c1.1-14.4-0.4-29.2-4.5-44.7l0-0.6c-1-3.1-2.2-6.2-3.5-9.2l-2.6-8.2c-0.5-2.5-1.3-5-2.3-7.4l-17-42.4c-11.8-29.5-40.4-48.9-72.2-48.9l-518.9 0c-32 0-60.8 19.6-72.5 49.5l-17 43.5c-0.5 1.3-1 2.7-1.3 4l-2.5 6.6c-6.7 14.2-10.3 29.7-10.3 45.8 0 58.9 47.8 106.7 106.7 106.6 37.9 0 72.3-19.9 91.4-51.7 16.6-27.6 56.5-27.6 73.1 0 19.2 31.9 53.6 51.8 91.5 51.7 37.9 0 72.3-19.9 91.3-51.7 7.3-12.2 19.2-19.1 31.7-20.4 16-2.4 32.8 4.4 42.2 18.9 11.3 17.4 18.2 25.9 25.5 31.1 19.2 13.7 23.6 40.4 9.8 59.5-13.7 19.2-40.4 23.6-59.5 9.9-4.7-3.4-9.1-6.9-13.1-10.7-31.8 28.3-72.3 45.7-116 48.4l-11.9 0.4c-48.1 0-93.1-17.8-127.6-48.5l-0.5-0.4c-31.9 28.5-72.4 45.9-116 48.5l-11.9 0.4c-7.2 0-14.4-0.4-21.4-1.2l0 257.2c0 11.8 9.6 21.3 21.4 21.3l256.5 0c23.6 0 42.7 19.1 42.7 42.7 0 23.6-19.1 42.7-42.7 42.6l-256.5 0c-58.9 0-106.7-47.8-106.7-106.6l-0.1-288.4c-51.4-34.4-85.3-93.1-85.2-159.6 0-24 4.4-47.5 12.9-69.5l4.3-9.9 0.7-2.3 2.1-5.7 17-43.5c24.5-62.6 84.8-103.7 151.9-103.8l518.9 0z"></path></svg> Follow
                            </button>
                            <button className='py-2 px-4 xl:px-6 hover:border-black hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-full font-semibold border border-gray-400 text-[12px] xl:text-[16px] w-[150px] xl:w-[200px]'>
                                Shop all items (24)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductStoreInfo;
