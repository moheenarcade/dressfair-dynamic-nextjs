"use client"
import CartMain from '@/components/cartPageComponent/cartMain';
import CartMainMobileView from '@/components/cartPageComponent/cartMainMobileView';
import React, { useEffect, useState } from 'react';

const Cart = () => {
   const [currency, setCurrency] = useState("");
      const [configData, setConfigData] = useState(null);
  
      useEffect(() => {
          const data = localStorage.getItem("configData");
          if (data) {
              const parsed = JSON.parse(data);
              setConfigData(parsed);
              if (parsed.currency_code) setCurrency(parsed.currency_code);
          }
      }, []);

  return (

    <>
      <div className="cart-main container mx-auto hidden xl:block xl:px-2 2xl:px-22">
        <CartMain currency={currency}/>
      </div>

      <div className='block xl:hidden lg:px-16 relative'>
        <CartMainMobileView currency={currency}/>
      </div>
    </>

  )
}

export default Cart;
