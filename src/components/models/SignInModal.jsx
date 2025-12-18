"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import LoginCar from "../../../public/LOGINCAR.avif";
import FreeReturnimg from "../../../public/loginapidadjustment.avif";
import { signIn } from "next-auth/react";
import { useUser } from "../../context/UserContext";
import axios from "axios";


const API = process.env.NEXT_PUBLIC_API_BASE_URL;


const SignInModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const [configData, setConfigData] = useState(null);
  const [phoneCode, setPhoneCode] = useState("");
  const [mobileLength, setMobileLength] = useState(0);
  const [currency, setCurrency] = useState("");

  const [step, setStep] = useState("phone"); // phone | otp
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("configData");
    if (data) {
      const parsed = JSON.parse(data);
      setConfigData(parsed);
      if (parsed.phone_code) setPhoneCode(parsed.phone_code);
      if (parsed.mobile_lenght) setMobileLength(parsed.mobile_lenght);
      if (parsed.currency_code) setCurrency(parsed.currency_code);
    }
  }, []);

  // Validate phone number
  const validatePhone = () => {
    if (!phone) return "Phone number is required";
    if (!/^\d+$/.test(phone)) return "Only numbers are allowed";
    if (phone.length !== Number(mobileLength))
      return `Phone number must be ${mobileLength} digits`;
    return null;
  };

  // Validate OTP
  const validateOtp = () => {
    if (!otp) return "OTP is required";
    if (!/^\d{4,6}$/.test(otp)) return "Invalid OTP";
    return null;
  };

  const sendWhatsAppOtp = async () => {
    const validationError = validatePhone();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const storeId = localStorage.getItem("store_id");

      const { data } = await axios.post(
        `${API}/checkout/send/otp`,
        { mobile_number: `${phoneCode}${phone}` },
        {
          headers: {
            "Content-Type": "application/json",
            "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
            "spa-language-id": configData?.language_id || "1",
            "spa-store-id": storeId,
          },
          withCredentials: true,
        }
      );
      if (!data.success) throw new Error(data.message || "Failed to send OTP");

      setStep("otp"); // Move to OTP input
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and login
  const verifyOtpAndLogin = async () => {
    const validationError = validateOtp();
    if (validationError) {
      setError(validationError);
      return;
    }

    setOtpLoading(true);
    setError("");

    try {
      const storeId = localStorage.getItem("store_id");

      const { data } = await axios.post(
        `${API}/checkout/login/otp`,
        {
          mobile_number: `${phoneCode}${phone}`,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
            "spa-language-id": configData?.language_id || "1",
            "spa-store-id": storeId,
          },

        }
      );

      if (!data.success) throw new Error(data.message || "Invalid OTP");
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      // Login success
      login({
        id: data.user_id,
        phone: `${phoneCode}${phone}`,
        loginMethod: "whatsapp",
        isLoggedIn: true,
      });

      onClose();
      setPhone("");
      setOtp("");
      setStep("phone");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-[99999999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[98999999999] px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={onClose}
                disabled={loading || otpLoading}
              >
                <RxCross2 size={22} />
              </button>

              <h2 className="text-xl font-semibold text-center">
                {loading || otpLoading ? "Processing..." : "Sign in / Register"}
              </h2>

              <div className="flex justify-around py-8">
                <div className="flex flex-col items-center">
                  <Image className="w-12 h-12" src={LoginCar} alt="free shipping" />
                  <p className="text-md font-medium">Free shipping</p>
                  <p className="text-xs">On all orders</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image className="w-12 h-12" src={FreeReturnimg} alt="free returns" />
                  <p className="text-md font-medium">Free returns</p>
                  <p className="text-xs">Up to 90 days</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-center gap-2 pb-4">
                <button
                  onClick={() => setActiveTab("whatsapp")}
                  disabled={loading || otpLoading}
                  className={`text-sm py-2 px-4 rounded-full w-[48%] font-semibold ${activeTab === "whatsapp" ? "bg-orange-500 text-white" : "border border-gray-300"}`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  disabled={loading || otpLoading}
                  className={`text-sm py-2 px-4 rounded-full w-[48%] font-semibold ${activeTab === "email" ? "bg-orange-500 text-white" : "border border-gray-300"}`}
                >
                  Email
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "whatsapp" ? (
                <div className="flex flex-col gap-4">
                  {step === "phone" && (
                    <>
                      <label className="font-semibold">Whatsapp number</label>
                      <div className="flex gap-2 relative pb-3">
                        <span className="border border-gray-300 rounded w-14 flex items-center justify-center font-semibold">
                          +{phoneCode}
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            if (e.target.value.length <= mobileLength) {
                              setPhone(e.target.value.replace(/\D/g, ""));
                            }
                          }}
                          placeholder={`Enter ${mobileLength} digits`}
                          className="border border-gray-300 focus:border-[#E67E22] focus:outline-none rounded px-3 py-2 flex-1"
                        />
                        {error && <p className="text-red-500 text-sm absolute -bottom-2">{error}</p>}

                      </div>

                      <button
                        onClick={sendWhatsAppOtp}
                        disabled={loading}
                        className="bg-orange-500 text-white rounded-full py-2 font-semibold"
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </>
                  )}

                  {step === "otp" && (
                    <>
                      <label className="font-semibold">Enter OTP</label>
                     
                      <div className="flex justify-center gap-2">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength={1}
                              value={otp[index] || ""}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, ""); // only numbers
                                if (!val) return;

                                const otpArr = otp.split("");
                                otpArr[index] = val;
                                setOtp(otpArr.join(""));

                                // focus next input
                                const nextInput = document.getElementById(`otp-${index + 1}`);
                                if (nextInput) nextInput.focus();
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Backspace") {
                                  const otpArr = otp.split("");
                                  otpArr[index] = "";
                                  setOtp(otpArr.join(""));
                                  // focus previous input
                                  const prevInput = document.getElementById(`otp-${index - 1}`);
                                  if (prevInput) prevInput.focus();
                                }
                              }}
                              id={`otp-${index}`}
                              className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:border-orange-500 focus:outline-none sm:w-14 sm:h-14"
                            />
                          ))}
                      </div>

                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <button
                        onClick={verifyOtpAndLogin}
                        disabled={otpLoading}
                        className="bg-orange-500 text-white rounded-full py-2 font-semibold"
                      >
                        {otpLoading ? "Verifying..." : "Verify & Login"}
                      </button>

                      <button
                        onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                        className="text-sm text-gray-500 underline"
                      >
                        Change number
                      </button>
                    </>
                  )}
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
                    onClick={() => { /* handle email login */ }}
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
