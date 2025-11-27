"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import { toast } from "react-hot-toast";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/utils/cropImage';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImg, setProfileImg] = useState("/deals-product4.avif");
  const fileInputRef = useRef(null);
  const [openCropper, setOpenCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      toast.error("Only PNG and JPEG formats are allowed.");
      return;
    }

    const imgUrl = URL.createObjectURL(file);
    setSelectedFile(imgUrl);
    setOpenCropper(true); // ← open popup to crop
  };


  return (
    <>
      {!isEditing && (
        <div className='user-info'>
          <div className="profile-sec flex flex-col border-b border-b-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <Image className='rounded-full w-16 md:w-20 h-16 md:h-20' width={100} height={100} src={profileImg} alt="user profile" />
              <div className="">
                <div className="flex items-start gap-3">
                  <p className='font-bold text-md md:text-lg'>Moheen dealsarcade</p>
                  <button onClick={() => setIsEditing(true)} className='text-gray-500 mt-1 hover:text-black hover:scale-[1.05] transition-all duration-500 ease-in-out'>
                    <FaRegEdit />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="">
                    <p className='text-[15px] font-semibold text-center'>0</p>
                    <p className='text-center text-[13px] font-[500] text-gray-500'>Total reviews</p>
                  </div>
                  <div className="spacer w-[1px] h-10 bg-gradient-to-b from-[hsla(0,0%,53.3%,0)] via-[#888] to-[hsla(0,0%,53.3%,0)] opacity-60"></div>
                  <div className="">
                    <p className='text-[15px] font-semibold text-center'>0</p>
                    <p className='text-center text-[13px] font-[500] text-gray-500'>Helpfuls</p>
                  </div>
                </div>
              </div>
            </div>

            <p className='flex items-center gap-1 text-[#0a8800] text-[13px] font-[500] mt-4'>
              <IoMdLock />
              Your information and privacy will be kept secure and uncompromised.
            </p>

          </div>

          <div className="">
            <div className="flex flex-col justify-center items-center text-center h-[40vh]">
              <Image width={100} height={100} src="/emptyreviewicon.png" alt='reviews ' />
              <p className='text-lg font-semibold'>Review is empty</p>
              <p className='text-gray-500 text-[14px] font-[500] py-3'>
                You have no completed reviews or the reviews have been deleted.
              </p>
              <Link href="/user/your-reviews" className='text-[14px] md:text-[16px] rounded-full py-2 px-8 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent'>Go to your reviews</Link>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="user-inof-update w-full md:w-[50%]">

          {/* hidden input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="mb-6 relative w-fit">
            <button
              onClick={() => fileInputRef.current.click()}
              className="upload-img absolute hover:scale-[1.08] transition-all duration-500 ease-in-out bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center border-gray-300 border"
            >
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="icon-1r7uj"><path d="M616.2 98.5c32.2 0 61.2 19.6 73.1 49.5l27.5 68.6 208.7 0c32.6 0 59.1 26.4 59.1 59.1l0 590.8c0 32.6-26.4 59.1-59.1 59l-827 0c-32.6 0-59.1-26.4-59.1-59l0-590.8c0-32.6 26.4-59.1 59.1-59.1l208.7 0 27.5-68.6c12-29.9 40.9-49.5 73.1-49.5l208.4 0z m-104.2 275.7c-108.8 0-196.9 88.2-196.9 196.9 0 108.8 88.2 196.9 196.9 196.9 108.8 0 196.9-88.2 196.9-196.9 0-105.9-83.6-192.3-188.4-196.8l-8.5-0.1z M393.8 571.1a118.2 118.2 0 0 0 236.4 0 118.2 118.2 0 0 0-236.4 0z"></path></svg>
            </button>

            <Image className='rounded-full w-16 md:w-20 h-16 md:h-20' width={100} height={100} src={profileImg} alt="user profile" />
          </div>
          <div className="flex flex-col gap-1">
            <label className='font-semibold text-[15px] pl-1'>Name</label>
            <input className='py-3 px-5 text-[15px] rounded-sm outline-0 w-full border border-gray-800' type="text" value="Moheen Dealsarcade" />
          </div>
          <p className='flex items-center gap-1 text-[#0a8800] text-[13px] font-[500] mt-4'>
            <IoMdLock />
            Your information and privacy will be kept secure and uncompromised.
          </p>
          <div className="w-full md:w-[50%] mx-auto pt-12">
            <button onClick={() => setIsEditing(false)} className='text-[14px] w-full md:text-[16px] rounded-full py-2 px-8  text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent'>Save</button>
          </div>
          <div className="text-center text-gray-500 pt-6">
            <p className='text-[15px] font-[500]'>
              How we use your profile avatar and username
            </p>
            <p className='text-[14px] mt-1'>
              Your avatar and username may be shown to others when you add an item to your cart, buy an item, or participate in a promo or event. To opt out, go to 'Notifications→Avatar and username sharing'.
            </p>
          </div>
        </div>
      )}
      {openCropper && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[90%] md:w-[450px] text-center">
            <div className="relative w-full h-[300px] bg-gray-200 rounded overflow-hidden">
              <Cropper
                image={selectedFile}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
              />
            </div>

            <div className="flex justify-center gap-4 py-3">
              <button onClick={() => setZoom(zoom + 0.2)} className="px-3 py-1 rounded bg-gray-300">+</button>
              <button onClick={() => setZoom(zoom - 0.2)} className="px-3 py-1 rounded bg-gray-300">-</button>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-6 rounded bg-gray-400 text-white"
                onClick={() => setOpenCropper(false)}
              >
                Cancel
              </button>

              <button
                className="py-2 px-6 rounded bg-[#fb7701] text-white"
                onClick={async () => {
                  const cropped = await getCroppedImg(selectedFile, croppedAreaPixels);
                  setProfileImg(cropped);
                  setOpenCropper(false);
                }}                
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Profile;
