"use client"
import CheckoutTermConditions from '@/components/checkoutPageComponent/checkoutTermsConditions';
import AddPaymentCardModal from '@/components/models/AddPaymentCardModal';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { GoChevronRight } from 'react-icons/go';
import { IoMdLock } from 'react-icons/io';

const PaymentMethods = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='payment-main px-4 lg:px-0'>
        <div className="">
          <h1 className='text-[#000] text-[20px] font-semibold'>Your payment methods</h1>
          <Link href="#" className='pt-1 flex items-center gap-1 text-[#0a8800] text-[15px] font-[500]'>
            <IoMdLock />
            All data is safeguarded
            <GoChevronRight />
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center border-b border-b-gray-200 py-6">
          <Image className='w-32' width={200} height={200} src="/cardpayemnticon.png" alt='card payment' />
          <div className="">
            <p className='text-[#000] text-md font-semibold'>Save cards for a faster checkout</p>
            <div className="flex items-center gap-4 text-[12px] py-2">
              <p className='flex items-center gap-1 text-[#757575]'>
                <Image className='w-4' width={100} height={100} src="/securepaymenticon.avif" alt='payment icon' />
                Secure payment</p>
              <p className='flex items-center gap-1 text-[#757575]'>
                <Image className='w-4' width={100} height={100} src="/convenstinalpayment-icon.avif" alt='payment icon' />
                Convenient payment</p>

            </div>
            <button
              onClick={() => setShowModal(true)}
              className='mt-2 text-[14px] md:text-[16px] rounded-full py-2 px-8 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-bold border-2 border-transparent'>
              +  Add a credit or debit card
            </button>
          </div>
          <div className="pt-4 flex flex-wrap gap-2">
            <Image width={40} height={40} src="/dinerclub.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/jazzcash.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/googlepay.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/jcbpayment.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/maestro.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/mastercard.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/unionpay.avif" alt="payemnt system" />
            <Image width={40} height={40} src="/visapaymewnt.avif" alt="payemnt system" />
          </div>
        </div>
        <div className="py-6">
          <CheckoutTermConditions />
        </div>
      </div>

      <AddPaymentCardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default PaymentMethods;
