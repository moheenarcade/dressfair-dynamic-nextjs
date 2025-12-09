"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuCheck, LuChevronRight } from 'react-icons/lu';
import { MdLock } from 'react-icons/md';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';

const CheckoutTermConditions = () => {

    return (
        <>
            <div className="">
                <div className="">
                    <p className='text-[#0a8800] text-[14px] font-semibold'>
                        <Image className="inline mr-1" width={20} height={20} src="/dollor-coverd.avif" alt="price coverd" />
                        Never overpay with our Price Match Guarantee
                    </p>
                    <p className='text-[#555] text-[14px] pt-1 font-[500]'>
                        With our Price Match policy, we'll match any lower prices found elsewhere, ensuring you can shop with confidence and never overpay.
                    </p>
                </div>
                <div className="pt-4">
                    <p className="inline mr-2 text-[#0a8800] text-[14px] font-semibold">
                        <TbTruckDelivery className="text-[#088901] text-2xl inline mr-1" />
                        Delivery guarantee
                    </p>
                    <ul className="flex flex-wrap gap-x-2">
                        <div>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />Rs.280 Credit for delay</li>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />Return if item damaged</li>
                        </div>
                        <div>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />15-day no update refund</li>
                            <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-center gap-1"><LuCheck className="text-lg text-[#088901]" />30-day no delivery refund</li>
                        </div>
                    </ul>
                    <Link href="#" className="flex font-[500] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                        Learn more <LuChevronRight />
                    </Link>
                </div>

                <div className="pt-4">
                    <p className="inline mr-2 text-[#0a8800] text-[14px] font-semibold">
                        <RiSecurePaymentFill className="text-[#088901] text-2xl inline mr-1" />
                        Temu protects your card information
                    </p>
                    <ul className="flex flex-col gap-x-2">
                        <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                            <LuCheck className="text-lg text-[#088901]" />
                            Temu follows the Payment Card Industry Data Security Standard (PCI DSS) when handling card data
                        </li>
                        <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                            <LuCheck className="text-lg text-[#088901]" />
                            Card information is secure and uncompromised
                        </li>
                        <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                            <LuCheck className="text-lg text-[#088901]" />
                            All data is safeguarded
                        </li>
                        <li className="text-[#555] text-[14px] pt-1 font-[500] flex items-start gap-1">
                            <LuCheck className="text-lg text-[#088901]" />
                            Temu never sells your card information
                        </li>
                    </ul>
                    <div className="pt-2 flex flex-wrap gap-2">
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/pcj.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/visasecure.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/id-check.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/safekey.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/protectbuy.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/j-secure.avif" alt="payemnt system" />
                        <Image className="w-auto h-[30px]" width={40} height={40} src="/apwg.avif" alt="payemnt system" />
                    </div>
                </div>

                <div className="pt-4">
                    <p className="inline mr-2 text-[#0a8800] text-[14px] font-semibold">
                        <MdLock className="text-[#088901] text-xl inline" />
                        Secure privacy
                    </p>
                    <p className="text-[#555] text-[14px] pt-1 font-[500]">
                        Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.
                    </p>
                    <Link href="#" className="flex font-[500] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                        Learn more <LuChevronRight />

                    </Link>
                </div>
                <div className="pt-4">
                    <p className="inline mr-2 text-[#088901] text-[14px] font-semibold">
                        <RiSecurePaymentFill className="text-[#088901] text-2xl inline" />
                        Temu Purchase Protection
                    </p>
                    <p className="text-[#555] text-[14px] pt-1 font-[500]">
                        Shop confidently on Temu knowing that if something goes wrong, we've always got your back.
                    </p>
                    <Link href="#" className="flex font-[500] hover:text-black w-fit items-center gap-1 text-[#555] text-[14px] pt-1">
                        See program terms<LuChevronRight />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CheckoutTermConditions;
