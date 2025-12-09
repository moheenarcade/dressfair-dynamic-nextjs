import Link from 'next/link';
import React from 'react'

const Permissions = () => {
  return (
    <div className='permission-main'>
      <div className="">
        <div className="">
          <h1>Temu DOES NOT obtain your permissions on the browser
          </h1>
          <p>
            To learn about the permissions of Temu App,
            <Link href="#">
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Permissions;
