import CheckoutMain from '@/components/checkoutPageComponent/checkoutMain';
import CheckOutMainMobileView from '@/components/checkoutPageComponent/checkOutMainMobileView';
import React from 'react';

const Checkout = () => {

  return (

    <>
      <div className="checkout-main container mx-auto hidden xl:block xl:px-2 2xl:px-22">
        <CheckoutMain />
      </div>
      <div className='block xl:hidden lg:px-16'>
        <CheckOutMainMobileView />
      </div>
    </>
  )
}

export default Checkout;
