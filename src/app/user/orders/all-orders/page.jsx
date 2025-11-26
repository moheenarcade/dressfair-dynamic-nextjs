"use client"
import Link from 'next/link';
import { pathname, usePathname } from 'next/navigation';
import React from 'react'
import { FiSearch } from 'react-icons/fi';

const Orders = () => {
    const pathname = usePathname();

    return (
        <div className=''>
           all orders

           
        </div>
    )
}

export default Orders;
