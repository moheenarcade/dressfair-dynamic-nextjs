import React, { useState } from 'react';
import SignInModal from '../models/SignInModal';
import { useUser } from '../../context/UserContext';
import { RiMessage3Line } from "react-icons/ri";
import { TbLogout2 } from 'react-icons/tb';
import { AiOutlineUserSwitch } from 'react-icons/ai';


const MobileUserPopup = ({ onOpenSignIn }) => {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const { user, logout } = useUser();
    const handleLogout = () => {
        logout();
        setShowUserDropdown(false);
    };
    return (
        <>
            <div className='bg-white rounded-[5px] shadow-lg z-[999999999999999999] left-0 right-0 md:right-4 -mt-2 absolute w-[90%] md:w-[400px] mx-auto md:mr-0 border-[1px] border-[#dfdfdf]'>
                <div className="relative">

                    <div className="p-4">
                        {!user && (
                            <button  onClick={onOpenSignIn} className='bg-[#fb7701] cursor-pointer py-2 px-4 w-full rounded-full text-white text-lg font-semibold '>
                                SIGN IN / REGISTER
                            </button>
                        )}
                        {user && (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <div className="userAvator w-8 h-8 bg-[#771e9c] rounded-full flex items-center justify-center text-white">
                                        <span>M</span>
                                    </div>
                                    <p className='text-black font-semibold text-md line-clamp-1 whitespace-nowrap max-w-[120px]'>user name</p>
                                </div>
                                <button className='flex items-center gap-1 border border-black rounded-full py-1 px-2'>
                                    <RiMessage3Line /> Messages
                                </button>
                            </div>
                        )}
                        <div className="flex justify-center items-center text-center text-[13px] gap-4 pt-4">
                            <div className="flex items-center flex-col">
                                <div className="bg-black rounded-full w-10 h-10 flex justify-center items-center">
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="topIcon-2KivG"><path fill="#FFFFFF" d="M714.8 115.2c101.3 0 183.4 82.1 183.3 183.4l0 426.8c0 101.3-82.1 183.4-183.3 183.4l-405.6 0c-101.3 0-183.4-82.1-183.3-183.4l0-426.8c0-101.3 82.1-183.4 183.3-183.4z m0 68.3l-405.6 0c-63.6 0-115.1 51.5-115.1 115.1l0 426.8c0 63.6 51.5 115.1 115.1 115.1l405.6 0c63.6 0 115.1-51.5 115.1-115.1l0-426.8c0-63.6-51.5-115.1-115.1-115.1z m-183.7 392.5c18.9 0 34.1 15.3 34.1 34.1 0 18.9-15.3 34.1-34.1 34.2l-166.3 0c-18.9 0-34.1-15.3-34.1-34.2 0-18.9 15.3-34.1 34.1-34.1l166.3 0z m85.4-192c18.9 0 34.1 15.3 34.2 34.1 0 18.9-15.3 34.1-34.2 34.2l-251.7 0c-18.9 0-34.1-15.3-34.1-34.2 0-18.9 15.3-34.1 34.1-34.1l251.7 0z"></path></svg>
                                </div>
                                <p>Your orders</p>
                            </div>
                            <div className="flex items-center flex-col">
                                <div className="bg-black rounded-full w-10 h-10 flex justify-center items-center">
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="topIcon-2KivG"><path fill="#FFFFFF" d="M765.9 157.9c96.6 0 174.9 78.3 174.9 174.9l0 77.4c0 14.9-9.7 28.1-23.9 32.6-30 9.4-50.8 37.3-50.8 69.2 0 31.9 20.8 59.8 50.8 69.2 14.2 4.5 23.9 17.7 23.9 32.6l0 77.4c0 96.6-78.3 174.9-174.9 174.9l-507.8 0c-96.6 0-174.9-78.3-174.9-174.9l0-77.4c0-14.9 9.7-28.1 23.9-32.6 30-9.4 50.8-37.3 50.8-69.2 0-31.9-20.8-59.8-50.8-69.2-14.2-4.5-23.9-17.7-23.9-32.6l0-77.4c0-96.6 78.3-174.9 174.9-174.9z m0 68.2l-507.8 0c-58.9 0-106.7 47.8-106.6 106.7l0 54.9 4.7 2.6c40.2 23.4 67 65.8 69.7 113.7l0.2 8c0 51.2-27.5 97-69.9 121.7l-4.7 2.5 0 55c0 56.6 44 102.8 99.6 106.4l7 0.3 507.8 0c58.9 0 106.7-47.8 106.6-106.7l0-55-4.7-2.5c-40.2-23.4-67-65.8-69.7-113.7l-0.2-8c0-51.2 27.5-97 69.9-121.7l4.7-2.6 0-54.9c0-56.6-44-102.8-99.6-106.4l-7-0.3z m-121.6 375.5c25.9 0 46.9 21 46.9 46.9 0 24.2-18.3 44.1-41.8 46.7l-5.1 0.3c-25.9 0-46.9-21-47-47 0-24.2 18.3-44.1 41.9-46.6l5.1-0.3z m0-136.5c25.9 0 46.9 21 46.9 46.9 0 24.2-18.3 44.1-41.8 46.7l-5.1 0.2c-25.9 0-46.9-21-47-46.9 0-24.2 18.3-44.1 41.9-46.7l5.1-0.2z m0-136.6c25.9 0 46.9 21 46.9 47 0 24.2-18.3 44.1-41.8 46.6l-5.1 0.3c-25.9 0-46.9-21-47-46.9 0-24.2 18.3-44.1 41.9-46.7l5.1-0.3z"></path></svg>
                                </div>
                                <p>
                                    Coupons & offers
                                </p>
                            </div>
                            <div className="flex items-center flex-col">
                                <div className="bg-black rounded-full w-10 h-10 flex justify-center items-center">
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="topIcon-2KivG"><path fill="#FFFFFF" d="M776.5 168.5c96.6 0 174.9 78.3 175 175l0 337c0 96.6-78.3 174.9-175 175l-529 0c-96.6 0-174.9-78.3-175-175l0-337c0-96.6 78.3-174.9 175-175z m0 68.3l-529 0c-58.9 0-106.7 47.8-106.7 106.7l0 337c0 58.9 47.8 106.7 106.7 106.7l529 0c58.9 0 106.7-47.8 106.7-106.7l0-18.2c-14.1 6.2-29.8 9.7-46.2 9.7l-173.5 0c-88.4 0-160-71.6-160-160 0-88.4 71.6-160 160-160l173.5 0c16.4 0 32.1 3.5 46.2 9.7l0-18.2c0-58.9-47.8-106.7-106.7-106.7z m60.5 183.5l-173.5 0c-50.7 0-91.7 41.1-91.8 91.7 0 50.7 41.1 91.7 91.8 91.7l173.5 0c25.5 0 46.2-20.7 46.2-46.1l0-91.2c0-25.5-20.7-46.2-46.2-46.1z m-150.1 44.8c25.9 0 46.9 21 46.9 46.9 0 25.9-21 46.9-46.9 46.9-25.9 0-46.9-21-46.9-46.9 0-25.9 21-46.9 46.9-46.9z"></path></svg>
                                </div>
                                <p>
                                    Credit balance
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-2 bg-[#f6f6f6]'>
                    </div>
                    <ul className='px-4'>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M725.3 179.2c89.5 0 162.1 72.6 162.2 162.1l0 299.2c0 89.3-72.2 161.8-161.6 162.1l-110.7 0.4c-3.1 0-6.1 1.4-8.2 3.7l-49.5 55.4c-37.5 42-102 45.6-144 8-2.9-2.6-5.6-5.3-8.2-8.2l-49.1-55.2c-2.1-2.4-5.1-3.7-8.3-3.7l-99.9-0.4c-85.2-0.3-154.1-69.5-154.1-154.7l0-306.6c0-89.5 72.6-162.1 162.1-162.1z m0 68.3l-469.3 0c-51.8 0-93.9 42-93.9 93.8l0 306.6c0 47.6 38.5 86.3 86.2 86.4l99.9 0.4c22.5 0.1 44 9.8 59 26.6l49.1 55.2 2.7 2.7c13.9 12.4 35.2 11.2 47.6-2.6l49.5-55.4c15-16.8 36.4-26.4 58.8-26.5l110.8-0.4c51.7-0.2 93.5-42.2 93.5-93.8l0-299.2c0-51.8-42-93.9-93.9-93.8z m-272.9 112.4c10.4-21.1 36-29.8 57.1-19.4 8.4 4.2 15.2 11 19.4 19.4l22.5 45.6c1.9 3.8 5.5 6.4 9.6 7l50.3 7.3c23.3 3.4 39.5 25 36.1 48.3-1.3 9.3-5.7 17.9-12.4 24.4l-36.4 35.5c-3 2.9-4.4 7.2-3.7 11.3l8.6 50.1c4 23.2-11.6 45.3-34.8 49.3-9.2 1.6-18.8 0.1-27.1-4.3l-45-23.7c-3.7-2-8.2-2-11.9 0l-45 23.7c-20.9 11-46.7 2.9-57.6-17.9-4.4-8.3-5.9-17.8-4.3-27.1l8.6-50.1c0.7-4.2-0.7-8.4-3.7-11.3l-36.3-35.5c-16.9-16.4-17.2-43.5-0.8-60.3 6.5-6.7 15.1-11.1 24.4-12.4l50.3-7.3c4.2-0.6 7.8-3.2 9.6-7z m38.3 57.4l-7.2 14.6c-10.6 21.4-31 36.2-54.6 39.7l-16.1 2.3 11.6 11.3c15.4 15 23.2 35.9 21.8 57.2l-0.9 7-2.8 16 14.4-7.5c19-10 41.4-11 61.1-3l6.4 3 14.4 7.5-2.8-16c-3.6-21.2 2.3-42.7 16-59l4.9-5.2 11.6-11.3-16-2.3c-21.5-3.1-40.3-15.7-51.5-34l-3.2-5.7-7.1-14.6z"></path></svg>
                            Your reviews
                        </li>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M672.1 136.5c92.4 0 173.6 61.1 199.1 149.4l0.1 0.9c9.2 22.6 14 47 14 72 0 57.1-24.9 108.3-64 141.5l0 216.5c0 70.7-57.3 128-128 128l-405.3 0c-70.7 0-128-57.3-128-128l0-214.7c-40.3-33.1-66.1-85.1-66.1-143.3 0-34 8.8-66.7 25.2-95l-1.3 2.3 2.8-6.5c32.3-71.6 102.4-119.3 181.3-122.9l9.5-0.2z m-296 356l-5.8 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.3 0.3c-11.8 0-23.4-1.3-34.4-3.7l0 181.2c0 33 26.7 59.7 59.7 59.7l405.3 0c33 0 59.7-26.7 59.8-59.7l0-181.8c-11.8 2.8-24.1 4.3-36.7 4.3-40.3 0-78-15.1-107.5-41.3l-5.9-5.5-5.9 5.5c-27.3 24.1-61.5 38.9-98.3 41l-9.2 0.3c-40.3 0-78-15.2-107.6-41.3l-5.9-5.5z m296-287.7l-360.7 0c-57.9 0-109.8 35.3-131.1 88.8l-2.1 4.5c-10.4 17.9-16 38.8-16.1 60.7 0 62.6 45.7 112.2 100.6 112.2 34 0 65.4-19.1 84-50.5 13.2-22.4 45.6-22.4 58.8-0.1 18.7 31.5 50.1 50.6 84.1 50.6 34 0 65.4-19 84-50.5 13.2-22.3 45.5-22.4 58.7 0 18.7 31.5 50.1 50.6 84.1 50.5 54.9 0 100.6-49.6 100.6-112.2 0-16.2-3.1-31.9-10-49.2l-1.3-4.2c-17.2-59.6-71.7-100.6-133.6-100.6z"></path></svg>
                            Followed stores</li>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 125.9c213.3 0 386.1 172.9 386.1 386.1 0 213.3-172.9 386.1-386.1 386.1-213.3 0-386.1-172.9-386.2-386.1 0-213.3 172.9-386.1 386.2-386.1z m0 68.2c-175.6 0-317.9 142.3-317.9 317.9 0 175.6 142.3 317.9 317.9 317.9 175.6 0 317.9-142.3 317.8-317.9 0-175.6-142.3-317.9-317.8-317.9z m-10.7 166.4c18.9 0 34.1 15.3 34.1 34.2l0 132.7 74.3 58.4c13.6 10.7 16.9 29.6 8.3 44.1l-2.6 3.8c-11.7 14.8-33.1 17.4-47.9 5.8l-87.3-68.7c-8.2-6.5-13-16.4-13-26.8l0-149.3c0-18.9 15.3-34.1 34.1-34.2z"></path></svg>
                            Browsing history</li>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M490.7 93.9c209.7 0 379.7 169.9 379.7 379.5 0 13.8-0.8 27.7-2.4 42l-0.4 2.8-2.6 17.2c-1.3 7.7-2.8 15.5-4.6 23.8l-3.8 14.8c-17.1 62.2-49.7 118.7-93.8 163.7l-10.4 10.2c-36.9 38.4-91.9 82.7-165.3 133.5-58.1 40.1-134.9 40.1-192.9 0-73.4-50.8-128.3-95.1-164.1-132.3-54-51-92.1-116.8-108.9-189l-0.5-2.2c-2.5-11.1-4.5-22.6-6.1-34.5l-1.3-8c-1.6-14.4-2.4-28.2-2.4-42 0-209.6 170-379.6 379.8-379.5z m0 68.2c-172 0-311.5 139.4-311.5 311.3 0 11.1 0.7 22.5 1.9 34.1l2.6 16.8c1 6.2 2.1 12.1 3.2 17.3l3.9 15.2c15.2 54.6 45.1 103.9 87.3 143.8 33.3 34.6 84.9 76.2 154.9 124.7 34.7 24 80.6 24 115.3 0 70-48.4 121.6-90.1 156.1-125.8 44.3-41.9 75.5-95.8 89.1-154l3.3-16.4 3.2-20.2 1.2-12.8c0.6-7.7 0.9-15.2 0.9-22.7 0-171.9-139.4-311.3-311.4-311.3z m0 179.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.6 40.1 0 72.5-32.5 72.5-72.6 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>
                            Addresses</li>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M844.8 718.9c0 69.5-56.4 125.9-125.9 125.9-69.5 0-125.9-56.4-125.8-125.9l0-95.1c0-68.8 55.8-124.6 124.6-124.6l58.8 0 0-11.2c0-156.3-127.9-283.2-285.8-283.2-157.9 0-285.9 126.9-285.9 283.2l0 11.2 58.9 0c66.3 0 120.6 51.9 124.4 117.3l0.2 7.3 0 95.1c0 69.5-56.4 125.9-125.9 125.9-69.5 0-125.9-56.4-125.9-125.9l0-230.9c0-194.2 158.6-351.5 354.2-351.5 195.5 0 354.1 157.3 354.1 351.5l0 230.9z m-581.1-151.4l-58.9 0 0 151.4c0 31.8 25.8 57.6 57.6 57.6 31.8 0 57.6-25.8 57.6-57.6l0-95.1c0-31.1-25.2-56.3-56.3-56.3z m512.8 0l-58.8 0c-31.1 0-56.3 25.2-56.4 56.3l0 95.1c0 31.8 25.8 57.6 57.6 57.6 31.8 0 57.6-25.8 57.6-57.6l0-151.4z"></path></svg>
                            Customer support</li>
                        <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3'>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="icon-33dOL"><path d="M400 154.9c56.1-32.4 125.2-32.4 181.3 0l173.3 100c56.1 32.4 90.7 92.3 90.7 157l0 200.2c0 64.8-34.6 124.6-90.7 157l-173.3 100c-56.1 32.4-125.2 32.4-181.3 0l-173.3-100c-56.1-32.4-90.7-92.3-90.7-157l0-200.2c0-64.8 34.6-124.6 90.7-157z m147.2 59.1c-35-20.2-78.1-20.2-113.1 0l-173.3 100c-35 20.2-56.5 57.5-56.5 97.9l0 200.2c0 40.4 21.6 77.7 56.5 97.9l173.3 100c35 20.2 78.1 20.2 113.1 0l173.3-100c35-20.2 56.5-57.5 56.5-97.9l0-200.2c0-40.4-21.6-77.7-56.5-97.9z m-56.5 157.2c77.8 0 140.8 63 140.8 140.8 0 77.7-63 140.8-140.8 140.8-77.8 0-140.8-63.1-140.8-140.8 0-77.8 63-140.8 140.8-140.8z m0 68.3c-40.1 0-72.5 32.5-72.6 72.5 0 40 32.5 72.5 72.6 72.5 40.1 0 72.5-32.5 72.5-72.5 0-40.1-32.5-72.5-72.5-72.5z"></path></svg>
                            Settings</li>
                        {user && (
                            <>
                                <li className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3 border-b border-b-gray-200'>
                                    <AiOutlineUserSwitch className="text-2xl" />
                                    Switch accounts</li>
                                <li onClick={handleLogout} className='cursor-pointer flex items-center gap-1 text-[15px] font-normal py-3'>
                                    <TbLogout2 className='text-2xl' />
                                    Sign out</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <SignInModal
                isOpen={showSignInModal}
                onClose={() => setShowSignInModal(false)}
            />
        </>
    )
}

export default MobileUserPopup;
