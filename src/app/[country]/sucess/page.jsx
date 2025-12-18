import Link from 'next/link';
import React from 'react'

const Success = () => {

    return (
        <>
            <div className='container mx-auto px-4 xl:px-2 2xl:px-22 py-20'>
                <div className="bg-white w-full md:w-[80%] xl:w-[50%] mx-auto rounded-lg shadow-lg px-4 md:px-12 py-12 md:py-20 border border-gray-100">
                    <h1 className='text-3xl text-center'>Thank you for ordering! </h1>
                    <p className='text-center text-lg py-3'>
                    Your order id <span className='font-semibold'>#559</span> has been sucessful!
                    </p>
                    <div className="flex justify-center items-center flex-wrap gap-2 pt-8">
                        <Link href="#" className='w-full md:w-[48%] hover:bg-[#fb7701] hover:text-white hover:scale-[1.03] hover:border-[#fb7701] border border-gray-300 rounded-sm font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 transition-all duration-300 ease-in-out text-center'>
                            view order
                        </Link>
                        <Link href="#" className='w-full md:w-[48%] text-center bg-[#fb5d01] hover:bg-[#fb7701] hover:scale-[1.03] text-white font-semibold text-md lg:text-lg py-2 xl:py-3 px-3 lg:px-6 rounded-sm transition-all duration-300 ease-in-out'>
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success;
