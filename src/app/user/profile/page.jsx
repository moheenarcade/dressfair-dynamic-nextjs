import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';

const Profile = () => {
  return (
    <>
      <div className="profile-sec flex flex-col border-b border-b-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <Image className='rounded-full w-16 md:w-20 h-16 md:h-20' width={100} height={100} src="/deals-product4.avif" alt="user profile" />
          <div className="">
            <div className="flex items-start gap-3">
              <p className='font-bold text-md md:text-lg'>Moheen dealsarcade</p>
              <button className='text-gray-500 mt-1'>
                <FaRegEdit />
              </button>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="">
                <p className='text-[15px] font-semibold text-center'>0</p>
                <p className='text-center text-[13px] font-[500] text-gray-500'>Total reviews</p>
              </div>
              <div className="spacer w-[1px] h-10 bg-gradient-to-b from-[hsla(0,0%,53.3%,0)] via-[#888] to-[hsla(0,0%,53.3%,0)] opacity-60"></div>
              <div className="">
                <p className='text-[15px] font-semibold text-center'>0</p>
                <p className='text-center text-[13px] font-[500] text-gray-500'>Helpfuls</p>
              </div>
            </div>
          </div>
        </div>

        <p className='flex items-center gap-1 text-[#0a8800] text-[13px] font-[500] mt-4'>
          <IoMdLock />
          Your information and privacy will be kept secure and uncompromised.
        </p>

      </div>

      <div className="">
        <div className="flex flex-col justify-center items-center text-center h-[40vh]">
          <Image width={100} height={100} src="/emptyreviewicon.png" alt='reviews ' />
          <p className='text-lg font-semibold'>Review is empty</p>
          <p className='text-gray-500 text-[14px] font-[500] py-3'>
            You have no completed reviews or the reviews have been deleted.
          </p>
          <Link href="/user/your-reviews" className='text-[14px] md:text-[16px] rounded-full py-2 px-8 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent'>Go to your reviews</Link>
        </div>
      </div>
    </>
  )
}

export default Profile;
