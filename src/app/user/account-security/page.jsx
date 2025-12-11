
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal("");
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
      case "facebook":
        return <p>Connect your Facebook account...</p>;
      case "apple":
        return <p>Connect your Apple ID...</p>;
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
              Your Temu account is protected by advanced security. Keeping this information up-to-date safeguards your account even more.
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
                <button className='text-[14px] font-[500] hover:underline'>
                  Review sign in activity for this account
                </button>
                <GoChevronRight />
              </div>
            </div>
          </div>
          <div className=" py-3 lg:py-5 pt-8">
            <div className="flex items-center justify-between gap-2 pt-3">
              <div className="flex items-center gap-1">
                <button className='text-[14px] font-[500] hover:underline'>
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
