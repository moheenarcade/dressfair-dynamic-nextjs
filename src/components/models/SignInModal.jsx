"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import Image from "next/image";
import LoginCar from "../../../public/LOGINCAR.avif";
import FreeReturnimg from "../../../public/loginapidadjustment.avif";
import { signIn } from "next-auth/react";
import { useUser } from "../../context/UserContext";

const SignInModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUser();

  const handleWhatsAppLogin = async () => {
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    setLoading(true);
    
    // Simulate API call - replace with your actual authentication
    try {
      // Here you would typically make an API call to your backend
      // For demo, we'll simulate a successful login
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          phone: `+92${phone}`,
          loginMethod: 'whatsapp',
          name: `User ${phone}`,
          isLoggedIn: true,
          timestamp: new Date().toISOString()
        };
        
        login(userData);
        setLoading(false);
        onClose();
        setPhone("");
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      alert('Login failed. Please try again.');
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          email: email,
          loginMethod: 'email',
          name: email.split('@')[0],
          isLoggedIn: true,
          timestamp: new Date().toISOString()
        };
        
        login(userData);
        setLoading(false);
        onClose();
        setEmail("");
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      alert('Login failed. Please try again.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      // Using NextAuth for social login
      await signIn(provider, { 
        callbackUrl: '/', // Redirect after login
        redirect: true 
      });
    } catch (error) {
      console.error('Social login error:', error);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999999999999999] px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">

              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={onClose}
                disabled={loading}
              >
                <RxCross2 size={22} />
              </button>

              <h2 className="text-xl font-semibold text-center">
                {loading ? "Logging in..." : "Sign in / Register"}
              </h2>
              <p className="text-center text-[#0a8800] text-sm mt-1 flex items-center justify-center gap-1">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M512 30.7c138.6 0 250.9 112.3 250.9 250.9l0 61.4 35.8 0c59.5 0 108.2 46.1 112.4 104.6l0.3 8.1 0 419.8c0 62.2-50.4 112.6-112.7 112.7l-573.4 0c-62.2 0-112.6-50.4-112.7-112.7l0-419.8c0-62.2 50.4-112.6 112.7-112.7l35.8 0 0-61.4c0-134.8 106.3-244.8 239.7-250.6l11.2-0.3z m0 506.9c-22.6 0-41 18.3-41 41l0 174c0 22.6 18.3 41 41 41 22.6 0 41-18.3 41-41l0-174c0-22.6-18.3-41-41-41z m0-414.7c-87.7 0-158.7 71.1-158.7 158.7l0 56.3 317.4 0 0-56.3c0-84.6-66.2-153.8-149.7-158.5l-9-0.2z"></path></svg>
                </span> All data is safeguarded
              </p>

              <div className="flex justify-around py-8">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">
                    <Image className="w-12 h-12" src={LoginCar} alt="free shipping"/>
                  </span>
                  <p className="text-md font-medium">Free shipping</p>
                  <p className="text-xs">On all orders</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">
                    <Image className="w-12 h-12" src={FreeReturnimg} alt="free returns"/>
                  </span>
                  <p className="text-md font-medium">Free returns</p>
                  <p className="text-xs">Up to 90 days</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-center gap-2 pb-4">
                <button
                  onClick={() => setActiveTab("whatsapp")}
                  disabled={loading}
                  className={`text-sm py-2 px-4 rounded-full w-[48%] font-semibold ${
                    activeTab === "whatsapp" ? "bg-orange-500 text-white" : "border border-gray-300"
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  disabled={loading}
                  className={`text-sm py-2 px-4 rounded-full w-[48%] font-semibold ${
                    activeTab === "email" ? "bg-orange-500 text-white" : "border border-gray-300"
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Email
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "whatsapp" ? (
                <div className="flex flex-col gap-4">
                  <label htmlFor="phone" className="font-semibold">Whatsapp number</label>
                  <div className="flex gap-2">
                   <span className="border border-gray-300 rounded-sm w-14 text-center flex items-center justify-center font-semibold">
                    +92
                   </span>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                      className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:border-[#E67E22] disabled:opacity-50"
                    />
                  </div>
                  <button 
                    onClick={handleWhatsAppLogin}
                    disabled={loading}
                    className="bg-orange-500 text-white rounded-full py-2 font-semibold w-full hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Logging in..." : "Continue with WhatsApp"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <label htmlFor="email" className="font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#E67E22] disabled:opacity-50"
                  />
                  <button 
                    onClick={handleEmailLogin}
                    disabled={loading}
                    className="bg-orange-500 text-white rounded-full py-2 font-semibold w-full hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Logging in..." : "Continue with Email"}
                  </button>
                </div>
              )}

              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">Or continue with other ways</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              {/* Social login */}
              <div className="flex justify-center gap-4 mb-4">
                <button 
                  disabled={loading}
                  className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition disabled:opacity-50"
                >
                  <FcGoogle size={24} />
                </button>
                {/* Add other social buttons as needed */}
              </div>

              <p className="text-center text-xs text-gray-500">
                By continuing, you agree to our{" "}
                <span className="text-blue-600 cursor-pointer">Terms of Use</span> and{" "}
                <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;