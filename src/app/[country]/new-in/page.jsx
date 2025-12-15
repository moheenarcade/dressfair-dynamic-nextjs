import NewInFilters from '@/components/newInComponent/newInFilters';
import React from 'react';

const NewIn = () => {

  return (
    <>
      <div className='container mx-auto hidden xl:block xl:px-2 2xl:px-22 py-4 xl:py-6'>
        <NewInFilters />
      </div>

      <div className='block xl:hidden lg:px-16'>
        <div className="pt-4">
          <NewInFilters />
        </div>
      </div>
    </>
  )
}

export default NewIn;
