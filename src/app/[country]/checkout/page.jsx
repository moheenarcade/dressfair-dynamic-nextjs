"use client"
import CheckoutMain from '@/components/checkoutPageComponent/checkoutMain';
import CheckOutMainMobileView from '@/components/checkoutPageComponent/checkOutMainMobileView';
import React, { useEffect, useState } from 'react';

const Checkout = () => {
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
      <div className="checkout-main container mx-auto hidden xl:block xl:px-2 2xl:px-22">
        <CheckoutMain currency={currency} />
      </div>
      <div className='block xl:hidden lg:px-16'>
        <CheckOutMainMobileView currency={currency}/>
      </div>
    </>
  )
}

export default Checkout;
