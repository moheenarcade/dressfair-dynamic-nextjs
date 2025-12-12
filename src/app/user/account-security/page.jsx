
"use client";
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from "react-icons/si";
import { ImAppleinc } from "react-icons/im";
import { GoChevronRight } from 'react-icons/go';
import CombineModel from '@/components/models/CombineModel';
import { TiEye } from "react-icons/ti";
import { IoEyeOff } from 'react-icons/io5';


const AccountSecurity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [deleteStep, setDeleteStep] = useState(1); // 1: initial, 2: confirmation, 3: final
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [passwordForDelete, setPasswordForDelete] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const passwordStrength = () => {
    if (password.length < 1) return "-";
    if (password.length < 8) return "Weak";
    if (/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) return "Strong";
    return "Medium";
  };

  const isFormValid = () => {
    return (
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      password === confirmPassword
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    console.log("Password updated:", password);
    setIsModalOpen(false);
  };

  const openModal = (type) => {
    setActiveModal(type);
    setIsModalOpen(true);

    if (type === "deleteaccount") {
      setDeleteStep(1);
      setIsDeleteConfirmed(false);
      setDeleteReason("");
      setPasswordForDelete("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal("");

    setDeleteStep(1);
    setIsDeleteConfirmed(false);
    setDeleteReason("");
    setPasswordForDelete("");
  };

  // Modal Content Based on Button
  const renderModalContent = () => {
    switch (activeModal) {
      case "phone":
        return (
          <>
            <div className='flex flex-col items-center text-center justify-center md:px-12'>
              <h1 className='text-[18px] md:text-[22px] font-semibold'>Add a mobile phone number</h1>
              <p className='text-sm pt-2 font-[500]'>
                Enter the mobile phone number you would like to associate with your account below.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center md:px-12 gap-6 pt-6 pb-12 md:pb-6">
              <div className="flex items-center border border-gray-600 rounded-md px-3 w-full">
                <p className='w-22 h-full py-3 border-r border-r-gray-600'>PK +92</p>
                <input className='w-full py-3 outline-0 px-2' type="number" />
              </div>
              <button className='bg-[#fb7701] hover:bg-[#fb7601ee] py-3 px-2 rounded-full text-white font-semibold hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out w-full md:w-[80%]'>
                Submit
              </button>
            </div>
          </>
        );
      case "email":
        return (
          <>
            <div className='flex flex-col items-center text-center justify-center md:px-12'>
              <h1 className='text-[18px] md:text-[22px] font-semibold'>
                Enter the verification code
              </h1>
              <p className='text-sm pt-2 font-[500] text-start md:text-center'>
                To continue, complete this verification step. We've sent a verification code to the email <span className='text-[#fb7701]'>moheendealsarcade@gmail.com</span>. Please enter it below.
              </p>
            </div>
            <div className="md:px-12">
              <div className="otp-sec pt-6">
                <div className="grid grid-cols-6 gap-2 md:gap-3 mx-auto">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      maxLength={1}
                      value={digit}
                      ref={(el) => (inputRefs.current[i] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="
          w-full aspect-square
          border border-gray-300 rounded-lg
          text-center text-xl font-semibold
          focus:outline-none focus:ring-2 focus:ring-[#fb7701]
        "
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-end pt-2">
                <button className='text-[14px] font-[500] hover:underline text-[#fb7701]'>
                  Resend code
                </button>
              </div>
            </div>
            <div className="text-[14px] py-6">
              <p className='pb-2'>Didn't receive the email?</p>
              <ul className='flex flex-col gap-1'>
                <li className='text-[#757575]'>
                  1. Make sure your email address is correct.
                </li>
                <li className='text-[#757575]'>
                  2. Please check your spam folder.
                </li>
                <li>
                  3. If you still don't see the email, try another way to verify your identity
                </li>
              </ul>
            </div>
          </>
        );
      case "password":
        return (
          <>
            <div className='flex flex-col items-center text-center justify-center md:px-12'>
              <h1 className='text-[18px] md:text-[22px] font-semibold'>
                Add a password
              </h1>
              <p className='text-sm pt-2 font-[500] text-start md:text-center'>
                Enter the password you would like to associate with your account below.
              </p>
            </div>

            <div className="py-6 md:px-4">

              {/* New Password */}
              <div className="mb-4">
                <label className='font-semibold'>New password <span>*</span></label>
                <div className="relative">
                  <input
                    className={`w-full py-2.5 px-4 rounded-sm border 
                  ${password.length < 8 && password.length > 0 ? "border-red-500" : "border-gray-300"}`}
                    type={showPassword ? "text" : "password"}
                    placeholder='Minimum 8 characters required'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-xl top-1/2 -translate-y-1/2 text-[#fb7701]"
                  >
                    {showPassword ? <IoEyeOff /> : <TiEye />}
                  </button>
                </div>

                {/* Error */}
                {password.length > 0 && password.length < 8 && (
                  <p className="text-red-500 text-sm pt-1">Password must be at least 8 characters.</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className='font-semibold'>Confirm new password <span>*</span></label>
                <div className="relative">
                  <input
                    className={`w-full py-2.5 px-4 rounded-sm border
                  ${confirmPassword && confirmPassword !== password ? "border-red-500" : "border-gray-300"}`}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Minimum 8 characters required'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-xl right-3 top-1/2 -translate-y-1/2 text-[#fb7701]"
                  >
                    {showConfirmPassword ? <IoEyeOff /> : <TiEye />}
                  </button>
                </div>

                {/* Error */}
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-red-500 text-sm pt-1">Passwords do not match.</p>
                )}
              </div>

              {/* Password Strength */}
              <div className="pt-4">
                <p className='text-[15px] font-semibold text-[#222]'>
                  Password quality: {passwordStrength()}
                </p>
                <p className='text-[#777] text-sm font-[500] pt-1'>
                  Don't use a password from another site, or something too obvious like your pet's name.
                </p>

                {/* Submit Button */}
                <div className="flex items-center justify-center pt-6">
                  <button
                    disabled={!isFormValid()}
                    onClick={handleSubmit}
                    className={`py-3 px-2 rounded-full text-white font-semibold w-full md:w-[80%]
                    transition-all duration-300 
                  ${isFormValid() ? "bg-[#fb7701] hover:bg-[#fb7601ee] hover:scale-[1.04]" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    Submit
                  </button>
                </div>
              </div>

            </div>
          </>

        );
      case "2fa":
        return (
          <>
            <>
              <div className="flex flex-col items-center text-center justify-center md:px-12">
                <h1 className="text-[18px] md:text-[22px] font-semibold">
                  Add a password
                </h1>
                <p className="text-sm pt-2 font-[500] text-start md:text-center">
                  Enter the password you would like to associate with your account below.
                </p>
              </div>

              <div className="py-6 md:px-4">

                {/* New Password */}
                <div className="mb-4">
                  <input
                    id="newpassword"
                    className="w-full py-2.5 px-4 focus:ring-[#222] outline-[#222] rounded-sm border"
                    type="password"
                    placeholder="Minimum 8 characters required"
                  />
                </div>
                {/* Password Quality */}
                <div className="pt-4">
                  <p className="text-[15px] font-semibold text-[#222]">
                    Password quality: -
                  </p>
                  <p className="text-[#777] text-sm font-[500] pt-1">
                    Don't use a password from another site, or something too obvious
                    like your pet's name.
                  </p>

                  <div className="flex items-center justify-center pt-6">
                    <button
                      className="
            bg-[#fb7701] hover:bg-[#fb7601ee]
            py-3 px-2 rounded-full text-white font-semibold
            hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out
            w-full md:w-[80%]
          "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>

          </>
        );
      case "Signinactivity":
        return (
          <>
            <div className="flex flex-row justify-center md:justify-start gap-2 border-b border-b-gray-200 pb-6">
              <div className="bg-[#0a88000f] w-12 h-12 rounded-full flex justify-center items-center">
                <Image width={100} height={100} src="/securepayment.avif" alt="secure account" />
              </div>
              <div className="w-full">
                <h1 className='text-[#0a8800] font-semibold text-md md:text-lg'>
                  Your account is protected
                </h1>
                <p className='text-[12px] md:text-sm text-start text-[#222] font-[500] flex items-center gap-1'>
                  Your Dressfair account is protected by advanced security. Keeping this information up-to-date safeguards your account even more.</p>
              </div>
            </div>
            <div className="pt-6">
              <p className='font-semibold text-md text-[#222]'>
                Review sign in activity for this account and sign out on any you don't recognize.
              </p>
              <div className="mt-4 border border-gray-200 rounded-sm p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="">
                    <div className='flex items-center gap-1 pb-2'>
                      <Image className='w-6' width={50} height={50} src="/googlechromelogo.avif" alt='google chrome logo' />
                      <p className='font-semibold text-[15px]'>Chrome on Mac OS X computer</p>
                    </div>
                    <p className='text-gray-600 text-sm font-[500] mb-1'>
                      Signed in since: Dec 11, 2025, 6:47 pm PKT
                    </p>
                    <p className='text-gray-600 text-sm font-[500]'>
                      IP address: 119.73.124.213 (Islamabad, Pakistan)
                    </p>
                  </div>
                  <p className='text-sm text-[#fb7701]'>
                    This session
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case "deleteaccount":
        return (
          <>
          {deleteStep === 1 && (
            <>
              <div className="">
                <p className='text-md font-semibold'>How to delete your Dressfair account</p>
                <p className='text-sm font-[500] py-1 md:py-2'>
                  Dear Dressfair customer,
                </p>
                <p className='text-sm font-[500]'>
                  You are about to submit a request for us to permanently delete your Dressfair account. If you proceed, Dressfair will delete the data and content in your account in accordance with applicable law and as described in the Privacy Policy. This includes communication records, files, and images, as well as any unused coupons and credits, which will no longer be usable after your account is deleted. Please be aware that you will no longer be able to make purchases on the Dressfair app or Dressfair.com once your account is deleted.
                </p>
              </div>
              <div className="pt-4 md:pt-6">
                <p className='text-[15px] font-semibold'>
                  Before permanently deleting your Dressfair account, we recommend that you:
                </p>
                <ul className='pt-3 list-disc pl-3 flex flex-col gap-1 md:gap-2'>
                  <li className='text-[13px] font-[500]'>
                    Review your account one more time and confirm that all information in your account can be deleted forever. Please make sure to save any information in your account that you need for your records before permanently deleting your account.
                  </li>
                  <li className='text-[13px] font-[500] text-[#fb7701]'>
                    Check that there are no incomplete or post-sale orders, or ongoing processes in your account, as you will not have access to them after you delete your account.
                  </li>
                  <li className='text-[13px] font-[500] text-[#fb7701]'>
                    Use any available coupons and credits before deleting your account, as they will not be available anymore once the account is deleted.
                  </li>
                </ul>
                
                {/* Checkbox and Continue Button */}
                <div className="flex flex-col justify-start items-start pt-4 md:pt-6">
                  {/* <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="deleteConfirm"
                      checked={isDeleteConfirmed}
                      onChange={(e) => setIsDeleteConfirmed(e.target.checked)}
                      className="w-4 h-4 text-[#fb7701] bg-gray-100 border-gray-300 rounded-full focus:ring-[#fb7701] focus:ring-0"
                    />
                    <label 
                      htmlFor="deleteConfirm" 
                      className='text-sm font-[500] cursor-pointer'
                    >
                      I want to permanently delete my Dressfair account.
                    </label>
                  </div> */}

<div className="flex items-center gap-2 mb-4 relative">
  <input
    type="checkbox"
    id="deleteConfirm"
    checked={isDeleteConfirmed}
    onChange={(e) => setIsDeleteConfirmed(e.target.checked)}
    className="peer w-5 h-5 rounded-full appearance-none 
               border border-gray-300 cursor-pointer 
               checked:bg-[#fb7701] checked:border-[#fb7701]"
  />

  {/* Check Icon */}
  <svg
    className="absolute left-[2px] top-[2px] w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>

  <label htmlFor="deleteConfirm" className="text-sm font-[500] cursor-pointer">
    I want to permanently delete my Dressfair account.
  </label>
</div>

                  
                  <button
                    onClick={() => {
                      if (isDeleteConfirmed) {
                        setDeleteStep(2);
                      } else {
                        // Show validation message
                        alert("Please check the box to confirm you want to delete your account.");
                      }
                    }}
                    disabled={!isDeleteConfirmed}
                    className={`w-fit border  rounded-full font-[500] py-1.5 px-6 hover:scale-[1.02] hover:shadow-lg transition-all duration-[0.3s] ease-in-out 
                      ${isDeleteConfirmed ? 'bg-[#fb7701] text-white hover:bg-[#fb7601ee] hover:border-[#fb7601ee]' : 'border-gray-500 bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}
    
          {deleteStep === 2 && (
            <>
              <div className="">
                <p className='text-md font-semibold mb-4'>Confirm Account Deletion</p>
                
                {/* Reason for deletion */}
                <div className="mb-6">
                  <label className='block text-sm font-semibold mb-2'>
                    Please tell us why you're deleting your account (optional)
                  </label>
                  <textarea
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb7701]"
                    placeholder="Share your feedback to help us improve..."
                  />
                </div>
                
                {/* Password verification */}
                <div className="mb-6">
                  <label className='block text-sm font-semibold mb-2'>
                    Enter your password to confirm deletion
                  </label>
                  <div className="relative">
                    <input
                      type={showDeletePassword ? "text" : "password"}
                      value={passwordForDelete}
                      onChange={(e) => setPasswordForDelete(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fb7701]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDeletePassword(!showDeletePassword)}
                      className="absolute right-3 text-xl top-1/2 -translate-y-1/2 text-[#fb7701]"
                    >
                      {showDeletePassword ? <IoEyeOff /> : <TiEye />}
                    </button>
                  </div>
                </div>
                
                {/* Warning message */}
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className='text-sm text-red-600 font-semibold mb-2'>⚠️ Warning: This action cannot be undone</p>
                  <p className='text-xs text-red-600'>
                    Once you delete your account, all your data will be permanently removed. This includes:
                  </p>
                  <ul className='text-xs text-red-600 list-disc pl-5 mt-2'>
                    <li>Order history and tracking information</li>
                    <li>Saved addresses and payment methods</li>
                    <li>Wishlists and saved items</li>
                    <li>All account settings and preferences</li>
                  </ul>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-gray-500 text-gray-700 rounded-full font-[500] py-2 px-2 md:px-4 hover:bg-gray-100 transition-all duration-[0.3s]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (passwordForDelete.length < 6) {
                        alert("Please enter your password to confirm deletion.");
                        return;
                      }
                      setDeleteStep(3);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full font-[500] py-2 px-2 md:px-4 hover:scale-[1.02] transition-all duration-[0.3s]"
                  >
                    Permanently Delete Account
                  </button>
                </div>
              </div>
            </>
          )}
    
          {deleteStep === 3 && (
            <>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <h2 className='text-xl font-semibold mb-3 text-green-600'>
                  Deletion Request Received
                </h2>
                
                <p className='text-sm text-gray-600 mb-4'>
                  Your account deletion request has been submitted successfully. We'll process it within 7 business days.
                </p>
                
                <p className='text-xs text-gray-500 mb-6'>
                  You will receive a confirmation email shortly. If you change your mind, you can cancel this request within the next 24 hours by contacting support.
                </p>
                
                <button
                  onClick={closeModal}
                  className="w-fit bg-[#fb7701] hover:bg-[#fb7601ee] text-white rounded-full font-[500] py-2 px-8 hover:scale-[1.02] transition-all duration-[0.3s]"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full xl:w-[80%] px-4 xl:px-0">
        <div className="flex flex-row justify-center md:justify-start gap-2 border-b border-b-gray-200 pb-6">
          <div className="bg-[#0a88000f] w-12 h-12 rounded-full flex justify-center items-center">
            <Image width={100} height={100} src="/securepayment.avif" alt="secure account" />
          </div>
          <div className="w-full">
            <h1 className='text-[#0a8800] font-semibold text-md md:text-lg'>
              Your account is protected
            </h1>
            <p className='text-[12px] md:text-sm text-start text-[#222] font-[500] flex items-center gap-1'>
              Your Dressfair account is protected by advanced security. Keeping this information up-to-date safeguards your account even more.
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between gap-2 py-3 lg:py-5 border-b border-b-gray-200 ">
            <p className='text-[#222] text-md font-semibold'>
              Mobile phone number
            </p>
            <button
              onClick={() => openModal("phone")}
              className='bg-[#fb7701] text-[14px] md:text-[16px] w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
              Add
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 py-3 lg:py-5 border-b border-b-gray-200 ">
            <div className="">
              <p className='text-[#222] text-md font-semibold'>
                Email
              </p>
              <p className='text-[14px] font-[500] pt-1'>
                moheendealsarcade@gmail.com
              </p>
            </div>

            <button
              onClick={() => openModal("email")}
              className='bg-[#fb7701] text-[14px] md:text-[16px] w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 py-3 lg:py-5 border-b border-b-gray-200 ">
            <p className='text-[#222] text-md font-semibold'>
              Password
            </p>
            <button
              onClick={() => openModal("password")}
              className='bg-[#fb7701] text-[14px] md:text-[16px] w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
              Add
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 py-3 lg:py-5 border-b border-b-gray-200 ">
            <div className="w-full">
              <p className='text-[#222] text-md font-semibold'>
                Two-factor authentication: Off
              </p>
              <p className='text-[14px] font-[500] pt-1'>
                Protect your account by adding an extra layer of security.
              </p>
            </div>
            <button
              onClick={() => openModal("2fa")}
              className='bg-[#fb7701] text-[14px] md:text-[16px] w-28 md:w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
              Turn on
            </button>
          </div>
          <div className=" py-3 lg:py-5 border-b border-b-gray-200 pt-8">
            <p className='text-[#222] text-md font-semibold'>
              Third-party accounts
            </p>
            <div className="flex items-center justify-between gap-2 pt-3">
              <div className="flex items-center gap-2">
                <FcGoogle className='text-2xl' />
                <p className='text-[14px] font-[500] pt-1'>
                  Google              </p>
              </div>
              <p className='text-[#fb7701] py-1 px-2 rounded-full font-[500] transition-all duration-[0.3s] ease-in-out'>
                Linked
              </p>
            </div>
          </div>
          <div className=" py-3 lg:py-5 border-b border-b-gray-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SiFacebook className='text-2xl text-blue-500' />
                <p className='text-[14px] font-[500]'>
                  Facebook              </p>
              </div>
              <button className='bg-[#fb7701] text-[14px] md:text-[16px] w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
                Link
              </button>
            </div>
          </div>
          <div className=" py-3 lg:py-5 border-b border-b-gray-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ImAppleinc className='text-2xl text-[#222]' />
                <p className='text-[14px] font-[500]'>
                  Apple              </p>
              </div>
              <button className='bg-[#fb7701] text-[14px] md:text-[16px] w-22 hover:bg-[#fb7601ee] py-1 px-2 rounded-full text-white font-[500] hover:scale-[1.04] transition-all duration-[0.3s] ease-in-out'>
                Link
              </button>
            </div>
          </div>
          <div className=" py-3 lg:py-5 border-b border-b-gray-200 pt-8">
            <p className='text-[#222] text-md font-semibold'>
              Sign in activity
            </p>
            <div className="flex items-center justify-between gap-2 pt-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openModal("Signinactivity")}
                  className='text-[14px] font-[500] hover:underline'>
                  Review sign in activity for this account
                </button>
                <GoChevronRight />
              </div>
            </div>
          </div>
          <div className=" py-3 lg:py-5 pt-8">
            <div className="flex items-center justify-between gap-2 pt-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openModal("deleteaccount")}
                  className='text-[14px] font-[500] hover:underline'>
                  Delete your Dressfair account
                </button>
                <GoChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CombineModel isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </CombineModel>
    </>
  )
}

export default AccountSecurity;
