import CartMain from '@/components/cartPageComponent/cartMain';
import CartMainMobileView from '@/components/cartPageComponent/cartMainMobileView';
import React from 'react';

const Cart = () => {

  return (

    <>
      <div className="cart-main container mx-auto hidden xl:block xl:px-2 2xl:px-22">
        <CartMain />
      </div>

      <div className='block xl:hidden lg:px-16 relative'>
        <CartMainMobileView />
      </div>
    </>

  )
}

export default Cart;
