"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi';
import { IoIosLock } from 'react-icons/io';

const Permissions = () => {
  const [hideMoreTab, setHideMoretab] = useState(false);

  return (
    <div className='permission-main px-4 lg:px-0'>
      <div className="block lg:hidden">
        <div className="fixed w-full top-0 bg-white right-0 left-0 z-[99999] border-b border-b-gray-200">
          <div className="flex items-center justify-between py-4 px-3" >
            <a href="/user/orders/all-orders">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.28 5.22a.75.75 0 0 1 0 1.06L9.56 12l5.72 5.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z"></path></svg>
            </a>
            <p class="font-semibold text-[19px]">Permissions</p>
            <p class="invisible"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.28 5.22a.75.75 0 0 1 0 1.06L9.56 12l5.72 5.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z"></path></svg>
            </p>
          </div>
        </div>
      </div>
      {hideMoreTab && (
        <div className="pb-10">
          <div className="flex pb-4 flex-col md:flex-row justify-center md:justify-start text-center items-center gap-2">
            <div className="bg-[#0a88000f] w-12 h-12 rounded-full flex items-center justify-center">
              <IoIosLock className='text-2xl text-[#0a8800]' />
            </div>
            <div className="">
              <h1 className='text-[#0a8800] font-semibold text-md md:text-lg'>
                The Temu App will only access certain device features with your permission
              </h1>

            </div>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="Camera  border border-gray-200 rounded-md p-2 md:p-4 relative">
              <p className='py-px px-1 rounded-sm absolute top-0 right-0 text-[12px] font-semibold bg-[#ececec]'>
                Only for iOS
              </p>
              <div className="flex items-center justify-between">
                <p className='flex items-center gap-2 text-md font-semibold'>
                  Camera
                </p>
              </div>
              <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
                On iOS devices, the Temu App will only access your camera with your permission so that you can use it for item reviews, image searches, etc. On Android devices, the Temu App does not request permission to access your camera. You can still use the Android system's built-in camera app to take photos for leave a review, search items, etc., without Temu accessing your camera.
              </p>
            </div>
            <div className="Activities  border border-gray-200 rounded-md p-2 md:p-4 relative">
              <p className='py-px px-1 rounded-sm absolute top-0 right-0 text-[12px] font-semibold bg-[#ececec]'>
                Only for iOS
              </p>
              <div className="flex items-center justify-between">
                <p className='flex items-center gap-2 text-md font-semibold'>
                  Live Activities
                </p>

              </div>
              <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
                Live Activities are a type of real-time push notification. It's an iOS feature that provide real-time updates from the lock screen and the dynamic island. You can enable it to get order updates, view payment statuses, etc.
              </p>
            </div>
            <div className="Notifications  border border-gray-200 rounded-md p-2 md:p-4">
              <div className="flex items-center justify-between">
                <p className='flex items-center gap-2 text-md font-semibold'>
                  Notifications
                </p>
              </div>
              <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
                Enable notifications to get updates on your orders, learn about new promotions, etc. so we can provide you with a better shopping experience.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center md:justify-start text-center items-center gap-2">
        <div className="bg-[#0a88000f] w-12 h-12 rounded-full flex items-center justify-center">
          <IoIosLock className='text-2xl text-[#0a8800]' />
        </div>
        <div className="">
          <h1 className='text-[#0a8800] font-semibold text-md md:text-lg'>Temu DOES NOT obtain your permissions on the browser
          </h1>
          {!hideMoreTab && (
            <p className='text-[12px] md:text-sm text-start text-[#222] font-[500] flex items-center gap-1'>
              To learn about the permissions of Temu App,
              <button onClick={() => setHideMoretab(true)} className='text-[#fb7701] flex items-center gap-1'>
                click here
                <FiChevronRight />
              </button>
            </p>
          )}
        </div>
      </div>

      <div className="pt-6">
        <div className="grid grid-col-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="contact flex items-center justify-between border border-gray-200 rounded-md p-2 md:p-4">
            <p className='flex items-center gap-2 text-md font-semibold'>
              <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" className="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2"><rect id="3" x="0" y="0" width="40" height="40"></rect><circle id="4" stroke="#000000" stroke-width="1.5" cx="10" cy="10" r="8.13888889"></circle><circle id="5" stroke="#000000" stroke-width="1.5" cx="10" cy="8.33333333" r="2.58333333"></circle><path d="M15.6555865,15.7717778 C14.2375826,14.2703213 12.228214,13.3333333 10,13.3333333 C7.8072622,13.3333333 5.82645653,14.2407227 4.4125913,15.700493" id="6" stroke="#000000" stroke-width="1.5"></path></g></g></svg>
              Contacts
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
          </div>
          <div className="Bluetooth flex items-center justify-between border border-gray-200 rounded-md p-2 md:p-4">
            <p className='flex items-center gap-2 text-md font-semibold'>
              <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" className="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2"><rect id="3" x="0" y="0" width="20" height="20"></rect><path d="M6.31331761,16.2679151 L13.6790906,3.76574457 C13.6818941,3.76098616 13.6880242,3.75940136 13.6927826,3.76220483 C13.6942361,3.7630612 13.6954494,3.76427139 13.6963095,3.76572277 L17.6705081,10.4723692 C17.6733236,10.4771205 17.6717544,10.4832546 17.6670031,10.4860701 C17.6654598,10.4869846 17.663699,10.4874671 17.6619052,10.4874671 L2.31797401,10.4874671 C2.31245116,10.4874671 2.30797401,10.48299 2.30797401,10.4774671 C2.30797401,10.4756654 2.30846079,10.4738971 2.3093829,10.4723492 L6.30467887,3.76566421 C6.3075054,3.76091947 6.31364313,3.75936445 6.31838787,3.76219098 C6.31983049,3.76305038 6.32103346,3.76425921 6.32188584,3.76570598 L13.6876816,16.2679151 L13.6876816,16.2679151" id="4" stroke="#000000" stroke-width="1.5" stroke-linecap="round" transform="translate(9.989916, 10.009539) rotate(-270.000000) translate(-9.989916, -10.009539) "></path></g></g></svg>
              Bluetooth
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
          </div>
          <div className="Microphone  border border-gray-200 rounded-md p-2 md:p-4">
            <div className="flex items-center justify-between">
              <p className='flex items-center gap-2 text-md font-semibold'>
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" class="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2"><rect id="3" x="0" y="0" width="20" height="20"></rect><g id="4" transform="translate(2.777778, 2.000000)"><path d="M14.4444444,6.27900357 L14.4444444,6.27900357 L14.4444444,6.33333333 C14.4444444,10.3220565 11.2109454,13.5555556 7.22222222,13.5555556 C3.23349903,13.5555556 0,10.3220565 0,6.33333333 L0,6.27851613 L0,6.27851613" id="5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><g id="6" transform="translate(3.333333, 0.000000)" stroke="#000000" stroke-width="1.5"><rect id="7" x="0" y="0" width="7.77777778" height="10.5555556" rx="3.88888889"></rect></g><rect id="8" fill="#000000" x="6.38888889" y="13.5555556" width="1.66666667" height="3.33333333"></rect><rect id="9" fill="#000000" x="3.88888889" y="15.2" width="6.66666667" height="1.66666667" rx="0.833333333"></rect></g></g></g></svg>
                Microphone
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
            </div>
            <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
              Temu does not request to access your microphone on the browser. Even though the browser may request access to your microphone permissions in situations like leaving a review with video, etc. Temu will only use the microphone permissions you grant to the Chrome browser to take videos.
            </p>
          </div>
          <div className="Location  border border-gray-200 rounded-md p-2 md:p-4">
            <div className="flex items-center justify-between">
              <p className='flex items-center gap-2 text-md font-semibold'>
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" class="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2"><rect id="3" x="0" y="0" width="20" height="20"></rect><g id="4" transform="translate(2.650000, 1.800000)" stroke="#000000" stroke-width="1.5"><g id="4"><path d="M7.33233979,0 C3.2828885,0 0,3.3102459 0,7.39344262 C0,7.66968852 0.017330985,7.94190164 0.0466603441,8.2107541 C0.0533261076,8.26586885 0.0646579054,8.31829508 0.0713236689,8.3727377 C0.100653028,8.59857377 0.139314456,8.82104918 0.188641106,9.04016393 C0.191307411,9.0502459 0.193973716,9.05965574 0.196640022,9.07040984 C0.527928465,10.5074262 1.27249424,11.7817869 2.30102154,12.7617541 C3.78881994,14.3217705 5.73455629,15.4227213 7.33233979,16.1311475 C8.93012329,15.4220492 10.8758596,14.3217705 12.363658,12.7617541 C13.3915188,11.7817869 14.1367511,10.5074262 14.4680396,9.07040984 C14.4700393,9.05965574 14.4733722,9.0502459 14.4760385,9.04016393 C14.5246986,8.82104918 14.56336,8.59857377 14.5933559,8.3727377 C14.6000217,8.31829508 14.6113535,8.26586885 14.6173527,8.2107541 C14.6473486,7.94190164 14.6646796,7.66968852 14.6646796,7.39344262 C14.6646796,3.3102459 11.3817911,0 7.33233979,0 Z" id="Path"></path><path d="M7.39344262,9.40983607 C6.27958689,9.40983607 5.37704918,8.5064918 5.37704918,7.39344262 C5.37704918,6.27958689 6.27958689,5.37704918 7.39344262,5.37704918 C8.50729836,5.37704918 9.40983607,6.27958689 9.40983607,7.39344262 C9.40983607,8.5064918 8.50729836,9.40983607 7.39344262,9.40983607 Z" id="Path"></path></g></g></g></g></svg>
                Location
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
            </div>
            <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
              In most countries/regions, such as Pakistan, the US, the UK, etc., Temu does not request access to your location on the browser. For users in the Middle East only, the browser might request access to your location permissions. Temu will only use the location permissions you grant to the Chrome browser to make it easier for users to accurately fill in their shipping address.
            </p>
          </div>
          <div className="Photos  border border-gray-200 rounded-md p-2 md:p-4">
            <div className="flex items-center justify-between">
              <p className='flex items-center gap-2 text-md font-semibold'>
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" class="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2" transform="translate(10.000000, 10.000000) scale(-1, 1) translate(-10.000000, -10.000000) "><rect id="3" x="0" y="0" width="20" height="20"></rect><g id="4" transform="translate(1.111111, 2.222222)"><rect id="5" stroke="#000000" stroke-width="1.5" x="0.75" y="0.75" width="16.2777778" height="14.0555556" rx="2"></rect><path d="M0.797952228,11.9875289 L3.61925898,9.28263124 C3.73130759,9.17520584 3.90679969,9.17099576 4.02387073,9.27292456 L6.51172907,11.4389974 C6.70608888,11.6082183 6.99722823,11.6019981 7.18418322,11.4246305 L12.5863792,6.29946828 C12.7012319,6.19050541 12.8809871,6.18954484 12.9969978,6.29727402 L17.1296438,10.1349089 L17.1296438,10.1349089" id="6" stroke="#000000" stroke-width="1.5"></path><circle id="7" fill="#000000" cx="5.83333333" cy="5.83333333" r="1.38888889"></circle></g></g></g></svg>
                Photos
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
            </div>
            <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
              Temu does not request access to your photos on the browser. Even though the browser may request access to your photos permissions in situations like leaving a review, searching items, etc., Temu will only use the photo permissions you grant to the Chrome browser to upload images.
            </p>
          </div>
          <div className="Camera border border-gray-200 rounded-md p-2 md:p-4">
            <div className="flex items-center justify-between">
              <p className='flex items-center gap-2 text-md font-semibold'>
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" class="icon-3SjiJ"><g id="1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2"><rect id="3" x="0" y="0" width="20" height="20"></rect><path d="M2.67971296,6.27019051 L4.95772362,5.5 L4.95772362,5.5 L5.80276168,3.3193339 C5.87734971,3.12685549 6.06255518,3 6.26898025,3 L13.6791555,3 C13.8819361,3 14.0646359,3.12247534 14.1416707,3.31005369 L15.0410404,5.5 L15.0410404,5.5 L17.320167,6.27024592 C17.7264916,6.40756602 18,6.78870553 18,7.21760705 L18,15 C18,16.1045695 17.1045695,17 16,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L2,7.21751105 C2,6.78865615 2.2734499,6.40754718 2.67971296,6.27019051 Z" id="5" stroke="#000000" stroke-width="1.5"></path><circle id="4" stroke="#000000" stroke-width="1.5" cx="10" cy="10.5" r="3"></circle></g></g></svg>              Camera
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
            </div>
            <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
              Temu does not request permission to access your camera on the browser. Even when we use the camera to leave a review, search items, etc., Temu will only use the camera permissions you grant to the Chrome browser to take photos.
            </p>
          </div>
          <div className="Others border border-gray-200 rounded-md p-2 md:p-4">
            <div className="flex items-center justify-between">
              <p className='flex items-center gap-2 text-md font-semibold'>
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" class="icon-3SjiJ"><g id="11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="22"><rect id="33" x="0" y="0" width="20" height="20"></rect><circle id="44" fill="#000000" cx="10" cy="10" r="1.5"></circle><circle id="55" fill="#000000" cx="4" cy="10" r="1.5"></circle><circle id="66" fill="#000000" cx="16" cy="10" r="1.5"></circle></g></g></svg>                Others
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1.4rem" height="1.4rem" fill="#fc3310" className="stopIcon-FGX6G"><path d="M512 28.4c267.1 0 483.6 216.5 483.6 483.6 0 267.1-216.5 483.6-483.6 483.6-267.1 0-483.6-216.5-483.6-483.6 0-267.1 216.5-483.6 483.6-483.6z m-299.1 220.6c-61.7 70.1-99.2 162.2-99.1 263 0 219.9 178.3 398.2 398.2 398.2 100.8 0 192.8-37.4 263-99.1z m299.1-135.2c-88.4 0-170 28.8-236.1 77.5l556.8 556.8c48.7-66.1 77.5-147.7 77.5-236.1 0-219.9-178.3-398.2-398.2-398.2z"></path></svg>
            </div>
            <p className='text-[#777] md:text-[#222] text-sm pt-1 md:pt-3'>
              In addition to the above device features, Temu will not request access to any other device features, such as your calendar, reminders, etc.
            </p>
          </div>
        </div>

        <div className="pb-6 md:pb-12">
          <p className='text-[#777] md:text-[#222] text-sm pt-6'>
            Temu believes in being transparent and requesting a minimal amount of permissions. You can also learn more about how we operate to protect our user's privacy in the <Link href="#" className='text-black underline'>Privacy policy,</Link> which includes details about how we handle information that does not involve requesting permission or personal privacy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Permissions;
