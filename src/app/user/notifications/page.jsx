"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LuChevronRight } from 'react-icons/lu';
import UserIcon from "../../../../public/usericon.png";
import PromotionalModel from "../../../../public/promotional-model-img.png";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const openModal = (type) => {
    setActiveModal(type);
    setIsOpen(true);
    setEmailEnabled(false);
    setPhoneEnabled(false);
    setError("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveModal("");
    setError("");
    setPhone("");
    setEmail("");
    setEmailEnabled(false);
    setPhoneEnabled(false);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setEmailEnabled(false);
    closeModal();
  };

  const handleSubmitPhoneForm = () => {
    if (!phone.trim()) {
      setError("Phone is required");
      return;
    }
    setError("");
    setPhoneEnabled(false);
    closeModal();
  };

  const renderContent = () => {
    switch (activeModal) {
      case "promotions":
        return (
          <>
            {!emailEnabled ? (
              <div>
                <p className="font-semibold text-[#222] mb-2 text-lg md:text-xl text-center">
                  Promotions
                </p>
                <p className="text-center text-[#757575] text-[14px] font-[500]">
                  Be the first to learn about promotions, daily deals, and other exclusive savings.
                </p>

                <div className="pt-6 border-b border-b-gray-200">
                  <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Push</p>
                  <p className="text-start text-[#757575] text-[14px] font-[500]">
                    Open the Dressfair App on your device and go to your notification settings.
                  </p>
                  <Image className="mx-auto w-60 mt-4" src={PromotionalModel} alt="promotion" width={100} height={100} />
                </div>

                <div className="py-6 border-b border-b-gray-200">
                  <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">In-app notifications</p>
                  <p className="text-start text-[#757575] text-[14px] font-[500]">
                    Open the TEMU App and update notification settings.
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Email</p>
                  <div className="flex items-start justify-between gap-6">
                    <p className="text-[#757575] text-[14px] font-[500]">
                      Seems you don't subscribe to marketing messages, turn on to get notified.
                    </p>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={emailEnabled}
                        onChange={(e) => setEmailEnabled(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="px-12 text-[20px] md:text-[22px] font-bold text-[#222] mb-2">
                  Subscribe to marketing messages
                </h2>
                <p className="text-[#757575] text-[14px] mb-6">
                  Get notified via this email
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={`w-full border rounded-xl px-4 py-3 text-[15px] outline-none ${error ? "border-red-500" : "border-gray-300"} focus:border-black`}
                />
                {error && <p className="text-red-500 text-[13px] mt-2 text-left">{error}</p>}
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-[70%] bg-[#f27a1a] text-white font-semibold py-2.5 rounded-full text-lg"
                >
                  OK
                </button>
                <p className="mt-4 text-[12px] text-[#999] leading-snug">
                  Click OK to consent to receive Temu marketing messages via this email...
                </p>
              </div>
            )}
          </>
        );

      case "orders":
        return (
          <div>
            <p className="font-semibold text-[#222] mb-2 text-lg md:text-xl text-center">
              Order updates
            </p>
            <p className="text-center text-[#757575] text-[14px] font-[500]">
              Receive notifications about order confirmations and shipment updates.
            </p>
            <div className="pt-6 border-b border-b-gray-200">
              <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Push</p>
              <p className="text-start text-[#757575] text-[14px] font-[500]">
                Open the TEMU App on your device and go to your notification settings to make adjustments.
              </p>
              <Image className="mx-auto w-60 mt-4" src={PromotionalModel} alt="promotion" width={100} height={100} />
            </div>
            <div className="py-6">
              <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Email</p>
              <p className="text-[#222] text-[14px] mb-2 font-[500]">moh***ade@gmail.com</p>
              <div className="flex items-start justify-between gap-6">
                <p className="text-[#757575] text-[14px] font-[500]">
                  If you didn't receive the email, please check your promotions or spam folder...
                </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case "chat":
        return !phoneEnabled ? (
          <div>
            <p className="font-semibold text-[#222] mb-2 text-lg md:text-xl text-center">Chat messages</p>
            <p className="text-center text-[#757575] text-[14px] font-[500]">
              Never miss important messages from sellers.
            </p>
            <div className="pt-6 border-b border-b-gray-200">
              <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Push</p>
              <p className="text-start text-[#757575] text-[14px] font-[500]">
                Open the TEMU App on your device and go to your notification settings to make adjustments.
              </p>
              <Image className="mx-auto w-60 mt-4" src={PromotionalModel} alt="promotion" width={100} height={100} />
            </div>
            <div className="py-6 border-b border-b-gray-200">
              <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">SMS</p>
              <div className="flex items-start gap-6">
                <p className="text-start text-[#757575] text-[14px] font-[500]">
                  Seems you don’t have a phone number in your account,
                  <br />
                  <button onClick={() => setPhoneEnabled(true)} className="text-[#fb7701] text-start flex md:items-center hover:underline">
                    add a phone number to get notified <LuChevronRight className="hidden md:block" />
                  </button>
                </p>
                <p className="font-semibold">Off</p>
              </div>
            </div>
            <div className="py-6">
              <p className="text-[15px] md:text-[17px] text-[#222] font-[500] mb-2">Email</p>
              <p className="text-[#222] text-[14px] mb-2 font-[500]">moh***ade@gmail.com</p>
              <div className="flex items-start justify-between gap-6">
                <p className="text-[#757575] text-[14px] font-[500]">
                  If you didn't receive the email, please check your promotions or spam folder.
                </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-[20px] px-12 md:text-[22px] font-bold text-[#222] mb-2">Add a mobile phone number</h2>
            <p className="text-[#757575] text-[14px] mb-6">
              Enter the mobile phone number you would like to associate with your account below.
            </p>
            <div className="border border-gray-300 rounded-lg flex items-center">
              <p className="font-semibold w-24 border-r border-r-gray-300 py-3 px-3">PK +92</p>
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                maxLength={12}
                className={`w-full rounded-xl px-4 text-[15px] outline-none ${error ? "border-red-500" : "border-gray-300"} focus:border-black`}
              />
            </div>
            {error && <p className="text-red-500 text-[13px] mt-2 text-left">{error}</p>}
            <button
              onClick={handleSubmitPhoneForm}
              className="mt-6 w-[70%] bg-[#f27a1a] text-white font-semibold py-2.5 rounded-full text-lg"
            >
              Submit
            </button>
          </div>
        );

      case "activity":
        return (
          <div>
            <p className="font-semibold text-[#222] mb-2 text-lg md:text-xl text-center">
              Customers' activity
            </p>
            <p className="text-center text-[#757575] text-[14px] font-[500]">
              Keep up with the latest shopping trends.
            </p>
            <div className="py-6">
              <p className="text-[16px] text-[#222] font-[500] mb-2">Customers' activity
              </p>
              <div className="flex items-start justify-between gap-6">
                <p className="text-[#757575] text-[14px] font-[500]">
                  Showing others' shopping activities.
                </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
            <div className="border-x overflow-hidden border-x-gray-200 w-full h-40 border-t border-t-gray-200 rounded-t-xl">
              <div className="flex items-center gap-1 bg-gray-100 py-2 px-3">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#21b736]"></div>
              </div>
              <div className="px-4 py-4">
                <div className="bg-[#4c4c4c] w-fit py-1 pl-1 pr-4 rounded-full flex items-center gap-2">
                  <Image className='w-6' width={100} height={100} src={UserIcon} alt="user" />
                  <p className='text-white font-[500]'>
                    added to cart 5 min ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "avatar":
        return (
          <div>
            <p className="font-semibold text-[#222] mb-2 text-lg md:text-xl text-center">
              Avatar and username sharing
            </p>
            <p className="text-center text-[#757575] text-[14px] font-[500]">
              Share your user profile avatar and username with other users when you add a product to cart, purchase a product, or participate in a promotion and event, but it won‘t affect your reviews for product.
            </p>
            <div className="py-6">
              <p className="text-[16px] text-[#222] font-[500] mb-2">
                Avatar and username sharing
              </p>
              <div className="flex items-start justify-between gap-6">
                <p className="text-[#757575] text-[14px] font-[500]">
                  To prevent others from viewing your avatar and username, you can opt out of Avatar and username sharing.
                </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
            <div className="border-x overflow-hidden border-x-gray-200 w-full h-40 border-t border-t-gray-200 rounded-t-xl">
              <div className="flex items-center gap-1 bg-gray-100 py-2 px-3">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#21b736]"></div>
              </div>
              <div className="px-4 py-4">
                <div className="bg-[#4c4c4c] w-fit py-1 pl-1 pr-4 rounded-full flex items-center gap-2">
                  <Image className='w-6' width={100} height={100} src={UserIcon} alt="user" />
                  <p className='text-white font-[500]'>
                    added to cart 5 min ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
          ;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="px-4 lg:px-0">
        <div className="bg-[#0a8800] py-1 px-2 md:px-3 rounded-lg flex items-center gap-2">
          <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-12.000000, -113.000000)" fill-rule="nonzero"><g transform="translate(0.000000, 104.000000)"><g transform="translate(12.000000, 9.000000)"><path d="M7.13079762,0.461624931 L1.89743048,2.53907654 C1.30044787,2.77605637 0.915234766,3.36089652 0.933234451,4.00294301 L1.01847584,7.04349256 C1.088741,9.54984173 2.34170009,11.8748743 4.39645489,13.3117828 L6.043104,14.4632993 C7.18125113,15.2592159 8.69545913,15.2591039 9.83348854,14.4630191 L11.502103,13.2957745 C13.5586284,11.8571749 14.8280197,9.5430059 14.93601,7.03557619 L15.0661797,4.01316386 C15.0944847,3.35594825 14.6992259,2.75430257 14.0847939,2.5193413 L8.67821964,0.451845648 C8.17940799,0.261098075 7.62715858,0.26458814 7.13079762,0.461624931 Z" fill="#FFFFFF"></path><path d="M10.2758189,5.63762678 C10.5280194,5.38997685 10.9332282,5.39366577 11.1808781,5.64586622 C11.4060144,5.87513935 11.4234327,6.23086567 11.235257,6.47971142 L11.1726387,6.55092539 L7.94859226,9.71679954 C7.72899779,9.93243182 7.39127048,9.95868657 7.14289862,9.7912204 L7.07127521,9.73516458 L5.21846035,8.06219279 C4.95611717,7.8253139 4.93547429,7.42061445 5.17235318,7.15827127 C5.38949217,6.91779002 5.74764704,6.88040416 6.00790266,7.05830026 L6.07627471,7.1121641 L7.48115556,8.38130526 L10.2758189,5.63762678 Z" fill="#0A8800"></path></g></g></g></g></svg>
          <h1 className='text-sm lg:text-lg text-white font-semibold'>Dressfair does not ask customers for additional fees via SMS or email.</h1>
        </div>
        <div className="notification-sec md:pt-2 pb-12">
          <div className="single-noti border-b-4 md:border-b border-b-gray-100 py-3 md:py-4">
            <h2 className='text-[#222] text-[14px] md:text-[16px] font-semibold'>Promotions</h2>
            <p className='text-[#757575] text-[13px] md:text-[14px] font-[500] pb-3 md:pb-0 border-b md:border-b-0 border-b-gray-100'>
              Be the first to learn about promotions, daily deals, and other exclusive savings.
            </p>
            <div className="flex items-center justify-between pt-3 md:pt-4">
              <p className='text-[#222] text-[13px] md:text-[14px] font-[500]'>Off: Email</p>
              <button
                onClick={() => openModal("promotions")}
                className="text-[14px] md:text-[15px] bg-[#fb7701] md:bg-transparent text-white md:text-[#222] font-[500] border border-[#fb7701] md:border-gray-300 hover:border-black py-1 px-4 md:px-6 rounded-full"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="single-noti border-b-4 md:border-b border-b-gray-100 py-3 md:py-4">
            <h2 className='text-[#222] text-[14px] md:text-[16px] font-semibold'>Order updates</h2>
            <p className='text-[#757575] text-[13px] md:text-[14px] font-[500] pb-3 md:pb-0 border-b md:border-b-0 border-b-gray-100'>
              Receive notifications about order confirmations and shipment updates.</p>
            <div className="flex items-center justify-between pt-3 md:pt-4">
              <p className='text-[#222] text-[13px] md:text-[14px] font-[500]'>Off: Email</p>
              <button
                onClick={() => openModal("orders")}
                className="text-[14px] md:text-[15px] bg-[#fb7701] md:bg-transparent text-white md:text-[#222] font-[500] border border-[#fb7701] md:border-gray-300 hover:border-black py-1 px-4 md:px-6 rounded-full"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="single-noti border-b-4 md:border-b border-b-gray-100 py-3 md:py-4">
            <h2 className='text-[#222] text-[14px] md:text-[16px] font-semibold'>Chat messages</h2>
            <p className='text-[#757575] text-[13px] md:text-[14px] font-[500] pb-3 md:pb-0 border-b md:border-b-0 border-b-gray-100'>
              Never miss important messages from sellers.</p>
            <div className="flex items-center justify-between pt-3 md:pt-4">
              <p className='text-[#222] text-[13px] md:text-[14px] font-[500] flex items-center gap-2'>Off: Email <span className='flex w-px h-4 bg-gray-300'></span> Off: SMS</p>
              <button
                onClick={() => openModal("chat")}
                className="text-[14px] md:text-[15px] bg-[#fb7701] md:bg-transparent text-white md:text-[#222] font-[500] border border-[#fb7701] md:border-gray-300 hover:border-black py-1 px-4 md:px-6 rounded-full"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="single-noti border-b-4 md:border-b border-b-gray-100 py-3 md:py-4">
            <h2 className='text-[#222] text-[14px] md:text-[16px] font-semibold'>Customers' activity</h2>
            <p className='text-[#757575] text-[13px] md:text-[14px] font-[500] pb-3 md:pb-0 border-b md:border-b-0 border-b-gray-100'>
              Keep up with the latest shopping trends.
            </p>
            <div className="flex items-center items-center justify-between pt-3 md:pt-4">
              <p className='text-[#222] text-[13px] md:text-[14px] font-[500]'>On: Showing others' shopping activities.
              </p>
              <button
                onClick={() => openModal("activity")}
                className="text-[14px] md:text-[15px] bg-[#fb7701] md:bg-transparent text-white md:text-[#222] font-[500] border border-[#fb7701] md:border-gray-300 hover:border-black py-1 px-4 md:px-6 rounded-full"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="single-noti border-b-4 md:border-b border-b-gray-100 py-3 md:py-4">
            <h2 className='text-[#222] text-[14px] md:text-[16px] font-semibold'>Avatar and username sharing</h2>
            <p className='text-[#757575] text-[13px] md:text-[14px] font-[500] pb-3 md:pb-0 border-b md:border-b-0 border-b-gray-100'>
              Share your user profile avatar and username with other users when you add a product to cart, purchase a product, or participate in a promotion and event, but it won‘t affect your reviews for product.
            </p>
            <div className="flex items-center justify-between pt-3 md:pt-4">
              <p className='text-[#222] text-[13px] md:text-[14px] font-[500]'>
                On: Share
              </p>
              <button
                onClick={() => openModal("avatar")}
                className="text-[14px] md:text-[15px] bg-[#fb7701] md:bg-transparent text-white md:text-[#222] font-[500] border border-[#fb7701] md:border-gray-300 hover:border-black py-1 px-4 md:px-6 rounded-full"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[999999] bg-black/60 flex items-end md:items-center justify-center">
          <div className="w-full md:w-[520px] relative z-[9999999] bg-white rounded-t-2xl md:rounded-lg p-5 animate-slideUp md:animate-fadeIn">
            <div className="flex justify-between items-center relative">
              <div></div>
              <h2 className="text-lg font-semibold capitalize text-center"></h2>
              <button onClick={closeModal} className="text-2xl font-bold absolute right-0 top-0">
                <IoCloseOutline />
              </button>
            </div>
            <div className="text-sm text-gray-700">{renderContent()}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Notifications;