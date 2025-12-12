import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { GrApple } from 'react-icons/gr';
import { MdLock } from 'react-icons/md';
import { RiTwitterXFill } from 'react-icons/ri';
import { SiFacebook } from 'react-icons/si';

const CreditBalance = () => {
  return (
    <>
      <div className="cradit-data-main w-full 2xl:w-[80%] px-4 lg:px-0">
        <div className="border-b border-b-gray-200 pb-6 md:pb-8 flex flex-col justify-center md:justify-start text-center md:text-start items-center md:items-start">
          <h1 className='flex items-center gap-1 text-xl font-semibold'>
            Credit balance
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#777" class="_2ETx7N4H"><path d="M512 39.4c261 0 472.6 211.6 472.6 472.6 0 261-211.6 472.6-472.6 472.6-261 0-472.6-211.6-472.6-472.6 0-261 211.6-472.6 472.6-472.6z m0 72.7c-220.9 0-399.9 179-399.9 399.9 0 220.9 179 399.9 399.9 399.9 220.9 0 399.9-179 399.9-399.9 0-220.9-179-399.9-399.9-399.9z m-72.7 643.1c-20.1 0-36.4-16.3-36.4-36.4 0-17.8 12.9-32.7 29.9-35.7l6.5-0.6 43.4 0 0-195.7-14.3 0c-17.8 0-32.7-12.9-35.8-29.8l-0.5-6.6c0-17.8 12.9-32.7 29.8-35.7l6.5-0.6 50.7 0c17.8 0 32.7 12.9 35.7 29.8l0.6 6.5 0 232.1 29.3 0c20.1 0 36.4 16.3 36.4 36.3 0 17.8-12.9 32.7-29.9 35.8l-6.5 0.6-145.4 0z"></path><path d="M502 354.5c32.6 0 59.1-26.4 59.1-59.1 0-32.6-26.4-59.1-59.1-59.1-32.6 0-59.1 26.4-59.1 59.1 0 32.6 26.4 59.1 59.1 59.1z"></path></svg>
            </button>
          </h1>
          <p className='flex items-center gap-1 text-[#0a8800] text-sm font-[500]'>
            <MdLock />
            All data is safeguarded
          </p>
          <div className="pt-2 md:pt-6">
            <p className='text-[#757575] text-lg font-[500]'>Total(PKR):</p>
            <p className='text-3xl font-[500] text-[#222]'>
              Rs.0
            </p>
          </div>
        </div>
        <div className="pt-4 lg:pt-12">
          <p className='font-semibold text-lg'>
            History
          </p>
        </div>
        <div className="table-sec pt-6 hidden xl:block">
          <table className="min-w-full text-left">
            <thead className='border-b border-b-gray-200'>
              <tr className="">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 hidden">
                <td className="px-4 py-2">2025-12-12</td>
                <td className="px-4 py-2">Credit added</td>
                <td className="px-4 py-2">Rs.500</td>
                <td className="px-4 py-2">Rs.500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="py-4 lg:py-12 flex flex-col justify-center items-center text-center text-md font-semibold">
          <div className="w-32 text-[#777]">
            <svg className='text-[#777]' viewBox="0 0 120 120"><g stroke="none" stroke-width="1" transform="translate(19.500000, 22.500000)"><path d="M80.7974684,34.9367089 L0,34.9367089 L0,69.4367089 C0,72.1981326 2.23857625,74.4367089 5,74.4367089 L75.7974684,74.4367089 C78.5588921,74.4367089 80.7974684,72.1981326 80.7974684,69.4367089 L80.7974684,34.9367089 Z M2,36.936 L78.7974684,36.936 L78.7974684,69.4367089 C78.7974684,71.0935631 77.4543226,72.4367089 75.7974684,72.4367089 L5,72.4367089 L4.82372721,72.4316162 C3.24891996,72.3403697 2,71.0343897 2,69.4367089 L2,36.936 Z" fill-rule="nonzero"></path><path d="M14.2054149,15 L14.2054149,17 L13.2054149,17 C11.7553026,17 10.4258471,17.7929036 9.727478,19.0588386 L9.62751959,19.2522366 L2.051,34.936 L78.7969248,34.9351305 L71.2211726,19.2522366 C70.5871883,17.9397981 69.296596,17.0843975 67.8598255,17.0059068 L67.6432773,17 L66.6432773,17 L66.6432773,15 L67.6432773,15 C69.852347,15 71.8735181,16.2218615 72.91089,18.1636136 L73.0220645,18.3823008 L80.5978167,34.0651947 C81.077201,35.057589 80.6648711,36.2525646 79.6744289,36.7353035 C79.4569121,36.8413205 79.2224201,36.9066097 78.9824897,36.9284847 L78.8017025,36.9367089 L2.04698972,36.9367089 C0.943880663,36.9367089 0.0514508177,36.04028 0.0514508177,34.9367089 C0.0514508177,34.6952427 0.0950758447,34.4562594 0.179731278,34.2311999 L0.250875513,34.0651947 L7.82662767,18.3823008 C8.79003372,16.3879121 10.7667168,15.0948224 12.9607763,15.0050027 L13.2054149,15 L14.2054149,15 Z"></path><path d="M16.9077884,35.9873943 L18.9077884,35.9873943 L18.9077884,29.1873941 L16.9077884,29.1873941 L16.9077884,35.9873943 Z M16.9077884,25.1873941 L18.9077884,25.1873941 L18.9077884,18.3873939 L16.9077884,18.3873939 L16.9077884,25.1873941 Z M16.9077884,14.3873939 L18.9077884,14.3873939 L18.9077884,7.5873937 L16.9077884,7.5873937 L16.9077884,14.3873939 Z M19.4037636,3.24112547 C19.9213931,2.46701764 20.7647894,2 21.6820905,2 L23.9186598,2 L23.9186598,0 L21.6820905,0 C20.0854985,0 18.623921,0.809325926 17.7412086,2.12941016 L17.1853509,2.96068765 L18.8479059,4.07240296 L19.4037636,3.24112547 Z M27.9186598,0 L27.9186598,2 L34.71866,2 L34.71866,0 L27.9186598,0 Z M38.71866,0 L38.71866,2 L45.5186602,2 L45.5186602,0 L38.71866,0 Z M49.5186602,0 L49.5186602,2 L56.3186604,2 L56.3186604,0 L49.5186602,0 Z M60.7901264,2.3203096 C61.6845519,2.80189826 62.2700047,3.75470487 62.293055,4.82476799 L62.2949275,6.62430987 L64.2949261,6.62199801 L64.2928224,4.80207597 C64.2539981,2.99009192 63.2657825,1.38180115 61.7382878,0.559346813 L60.8578065,0.0852661029 L59.909645,1.84622888 L60.7901264,2.3203096 Z M64.2937709,10.6231546 L62.2937709,10.6231546 L62.2937709,17.4231548 L64.2937709,17.4231548 L64.2937709,10.6231546 Z M64.2937709,21.4231548 L62.2937709,21.4231548 L62.2937709,28.223155 L64.2937709,28.223155 L64.2937709,21.4231548 Z M64.2937709,32.223155 L62.2937709,32.223155 L62.2937709,35.9873943 L64.2937709,35.9873943 L64.2937709,32.223155 Z"></path><rect transform="translate(40.600894, 20.485281) rotate(-315.000000) translate(-40.600894, -20.485281) " x="29.6008936" y="19.4852814" width="22" height="2" rx="1"></rect><rect transform="translate(40.600894, 20.485281) scale(-1, 1) rotate(-315.000000) translate(-40.600894, -20.485281) " x="29.6008936" y="19.4852814" width="22" height="2" rx="1"></rect></g></svg>
          </div>
          <p>
            You don't have any activities
          </p>
        </div>
        <div className="pb-12 pt-4">
          <p className='text-md font-semibold mb-3'>Can’t find your coupon(s)?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cursor-pointer border border-[#fb7701] rounded-sm py-3 px-3 flex items-center justify-between gap-1 hover:shadow-lg hover:scale-[1.02] transition-all duration-[0.3s] ease-in-out">
              <p className='text-sm font-[500]'>
                Try signing in with another account
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FcGoogle />
                  <GrApple />
                  <SiFacebook />
                  <RiTwitterXFill />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" class="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
              </div>
            </div>
            <div className="cursor-pointer border border-[#fb7701] rounded-sm py-3 px-3 flex items-center justify-between gap-1 hover:shadow-lg hover:scale-[1.02] transition-all duration-[0.3s] ease-in-out">
              <p className='text-sm font-[500]'>
                Self-service to find coupon(s)              </p>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" class="_2O9fTBL7"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreditBalance;
