import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

const CoupenCode = () => {

    return (
        <>
            <form className='coupen-code'>
                <div className="flex items-center gap-3 justify-between">
                    <input required className='border border-[#949494] rounded-sm w-full py-1.5 text-[15px] bg-white text-[#000] outline-0 px-3' type="text" placeholder='Enter coupen code' />
                    <button className='hover:border-black hover:scale-[1.03] transition-all duration-300 ease-in-out border border-[#949494] rounded-full py-1.5 px-4 font-semibold'>
                        Apply
                    </button>
                </div>
            </form>
            <div className="pt-3 border-b border-b-gray-200 pb-3">
                <button className='flex items-center justify-between w-full text-[#222222] text-[14px] font-semibold'>
                    <p className='hover:underline'>Apply coupon code</p>
                    <FaChevronRight />
                </button>
            </div>
        </>
    )
}

export default CoupenCode;
