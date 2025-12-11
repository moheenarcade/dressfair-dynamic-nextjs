"use client"
import React, { useState } from "react";
import Select, { components } from "react-select";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import ShareAppBottomModal from "@/components/models/ShareAppBottomModal";
import { HiOutlineHome } from "react-icons/hi2";

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "45px",
    minHeight: "45px",
    borderRadius: "4px",
    borderColor: state.isFocused ? "#fb7701" : "#99a1af",
    boxShadow: "none",       // remove blue outline
    outline: "0",            // remove outline
    fontSize: "15px",
    fontWeight: "500",
    "&:hover": {
      borderColor: "#fb7701",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "16px",
    padding: "10px",
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? "#eeeeee"
      : state.isFocused
        ? "#eeeeee"
        : "white",
    color: state.isSelected ? "black" : "#222",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
    fontSize: "14px",
  }),
};


const CountryRegionLanguage = () => {
  const { language, setLanguage } = useLanguage();
  const [openTab, setOpenTab] = useState(null);
  const [openShare, setOpenShare] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "ae",
    label: "United Arab Emirates (UAE)",
    flag: "🇦🇪",
  });
  const initialLang = language
    ? language
    : localStorage.getItem("language") || "en";

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return initialLang === "ar"
      ? { value: "ar", label: "Arabic" }
      : { value: "en", label: "English" };
  });

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

  const countryOptions = [
    { value: "ae", label: "United Arab Emirates (UAE)", flag: "🇦🇪" },
    { value: "sa", label: "Saudi Arabia (KSA)", flag: "🇸🇦" },
    { value: "om", label: "Oman", flag: "🇴🇲" },
    { value: "pk", label: "Pakistan", flag: "🇵🇰" },

  ];

  const Option = (props) => (
    <components.Option {...props}>
      <span className="mr-2">{props.data.flag}</span>
      {props.data.label}
    </components.Option>
  );

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <span className="mr-2">{props.data.flag}</span>
      {props.data.label}
    </components.SingleValue>
  );

  const toggleTab = (tab) => {
    setOpenTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <>
      <div className="country-lang-mian px-3 lg:px-0 hidden lg:block">
        <div className="country-sec w-full lg:w-[70%] 2xl:w-[43%]">
          <div className="mb-4 md:mb-6">
            <label className="font-semibold">Country/Region</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select your country"
              className="mt-1"
              components={{ Option, SingleValue }}
              styles={customSelectStyles}
            />
            <p className="text-[#555] text-[13px] mt-2 font-[500]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
                className="inline align-text-top mr-1"
              >
                <path d="M512 39.4c261 0 472.6 211.6 472.6 472.6 0 261-211.6 472.6-472.6 472.6-261 0-472.6-211.6-472.6-472.6 0-261 211.6-472.6 472.6-472.6z m0 72.7c-220.9 0-399.9 179-399.9 399.9 0 220.9 179 399.9 399.9 399.9 220.9 0 399.9-179 399.9-399.9 0-220.9-179-399.9-399.9-399.9z m3.6 545.3c30.1 0 54.5 24.4 54.6 54.6 0 30.1-24.4 54.5-54.6 54.5-30.1 0-54.5-24.4-54.5-54.5 0-30.1 24.4-54.5 54.5-54.6z m-3.6-427.8c21.7 0 39.7 15.8 43.1 36.5l0.5 7.1 0 283.7c0 24.1-19.5 43.6-43.6 43.6-21.7 0-39.7-15.8-43.1-36.5l-0.5-7.1 0-283.7c0-24.1 19.5-43.6 43.6-43.6z"></path>
              </svg>
              If you change the country/region you shop from, item availability,
              prices, shipping fees, and taxes may change (including items in your cart).
            </p>
          </div>

          <div className="lang mb-4 md:mb-6">
            <label className="font-semibold mt-4 block">Language</label>
            <Select
              options={languageOptions}
              value={selectedLanguage}
              onChange={(option) => {
                setSelectedLanguage(option);
                setLanguage(option.value);
                localStorage.setItem("language", option.value);
              }}
              placeholder="Select language"
              className="mt-1"
              styles={customSelectStyles}
            />
          </div>

          <div className="curency mb-4 md:mb-6">
            <label className="font-semibold mt-4 block">Currency</label>
            <p className="border border-gray-300 rounded-sm h-[45px] px-3 py-2 mt-1">
              PKR : Rs.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="block lg:hidden ">
          <div className="fixed w-full top-0 bg-white right-0 left-0 z-[99999] border-b border-b-gray-200">
            <div className="flex items-center justify-between py-4 px-3">
              <Link href="/user/orders/all-orders">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.28 5.22a.75.75 0 0 1 0 1.06L9.56 12l5.72 5.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z"></path></svg>
              </Link>
              <p className="font-semibold text-[19px]">Settings</p>
              <p className="invisible">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.28 5.22a.75.75 0 0 1 0 1.06L9.56 12l5.72 5.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z"></path></svg></p>
            </div>
          </div>

          <div className="account-protect bg-white px-3 pb-4">
            <p className="text-[#0a8800] text-[18px] font-semibold">
              Your account is protected
            </p>
            <p className="text-[#555] text-[13px] font-[500]">
              Dressfair protects your personal information and keeps it private, safe and secure.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="border border-gray-100 py-3 text-[#0a8800] font-semibold px-2 justify-between rounded-sm flex items-center">
                <div className="flex items-center gap-1">
                  <Image className="w-4 md:w-6" width={100} height={100} src="/account-securityicon.avif" alt="account security" />
                  <p className="text-[12px] md:text-[16px]">
                    Account security
                  </p>
                </div>

                <GoChevronRight className="text-lg" />
              </div>
              <div className="border border-gray-100 py-3 text-[#0a8800] font-semibold px-2 justify-between rounded-sm flex items-center">
                <div className="flex items-center gap-1">
                  <Image className="w-4 md:w-6" width={100} height={100} src="/account-securityicon.avif" alt="account security" />
                  <p className="text-[12px] md:text-[16px]">
                    Privacy
                  </p>
                </div>

                <GoChevronRight className="text-lg" />
              </div>
              <div className="border border-gray-100 py-3 text-[#0a8800] font-semibold px-2 justify-between rounded-sm flex items-center">
                <div className="flex items-center gap-1">
                  <Image className="w-4 md:w-6" width={100} height={100} src="/account-securityicon.avif" alt="account security" />
                  <p className="text-[12px] md:text-[16px]">
                    Permissions
                  </p>
                </div>
                <GoChevronRight className="text-lg" />
              </div>
              <div className="border border-gray-100 py-3 text-[#0a8800] font-semibold px-2 justify-between rounded-sm flex items-center">
                <div className="flex items-center gap-1">
                  <Image className="w-4 md:w-6" width={100} height={100} src="/account-securityicon.avif" alt="account security" />
                  <p className="text-[12px] md:text-[16px]">
                    Safety center
                  </p>
                </div>

                <GoChevronRight className="text-lg" />
              </div>
            </div>
          </div>

          <div className="">
            <div className="tabs-main px-3 border-t-6 border-t-[#f5f5f5]">
            <Link href="/user/payment-methods">
              <div className="flex items-center justify-between gap-2 py-3 border-b border-b-gray-200">
                <p className="text-[#000] font-semibold text-[15px]">Your payment methods</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
              </Link>
              <div className="py-3 border-b border-b-gray-200">
                <div
                  onClick={() => toggleTab("country")}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <p className="text-[#000] font-semibold text-[15px]">Country & region</p>
                  <div className="flex items-center gap-1">
                    {/* Show selected country label + flag */}
                    <span className="text-[#777] uppercase text-[16px] font-[500] flex items-center gap-1">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.value}</span>
                    </span>
                    <FaChevronRight
                      className={`text-[#777] text-[14px] transition-transform duration-300 ${openTab === "country" ? "rotate-90" : ""
                        }`}
                    />
                  </div>
                </div>

                {/* Dropdown list for mobile */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openTab === "country" ? "max-h-[300px] mt-2" : "max-h-0"
                    }`}
                >
                  {countryOptions.map((c) => (
                    <div
                      key={c.value}
                      onClick={() => {
                        setSelectedCountry(c); // update selected country
                        setOpenTab(null);
                      }}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedCountry.value === c.value ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="text-[14px]">{c.label}</span>
                      </div>
                      {selectedCountry.value === c.value && (
                        <span className="text-green-600 text-sm">✔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-3 border-b border-b-gray-200">
                <div
                  onClick={() => toggleTab("language")}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <p className="text-[#000] font-semibold text-[15px]">Language</p>
                  <div className="flex items-center gap-1">
                    {/* Show current selected language here */}
                    <span className="text-[#777] text-[16px] font-[500]">
                      {selectedLanguage.label}
                    </span>
                    <FaChevronRight
                      className={`text-[#777] text-[14px] transition-transform duration-300 ${openTab === "language" ? "rotate-90" : ""
                        }`}
                    />
                  </div>
                </div>

                {/* Dropdown list for mobile */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openTab === "language" ? "max-h-[200px] mt-2" : "max-h-0"
                    }`}
                >
                  {languageOptions.map((l) => (
                    <div
                      key={l.value}
                      onClick={() => {
                        setSelectedLanguage(l);
                        setLanguage(l.value);
                        localStorage.setItem("language", l.value);
                        setOpenTab(null);
                      }}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedLanguage.value === l.value ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-[14px]">{l.label}</span>
                      {selectedLanguage.value === l.value && (
                        <span className="text-green-600 text-sm">✔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>


              <div className="flex items-center justify-between gap-2 py-3 border-b border-b-gray-200">
                <p className="text-[#000] font-semibold text-[15px]">Currency</p>
                <div className="flex items-center gap-1 ">
                  <p className="text-[#777] text-[16px] font-[500]">PKR</p>
                  <FaChevronRight className="text-[#777] text-[14px]" />
                </div>
              </div>
              <Link href="/user/notifications">
              <div className="flex items-center justify-between gap-2 py-3">
                <p className="text-[#000] font-semibold text-[15px]">Notifications</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
              </Link>
            </div>

            <div className="tabs-main px-3 border-t-6 border-t-[#f5f5f5]">
              <div className="flex items-center justify-between gap-2 py-3 border-b border-b-gray-200">
                <p className="text-[#000] font-semibold text-[15px]">About this app</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
              <div className="flex items-center justify-between gap-2 py-3 border-b border-b-gray-200">
                <p className="text-[#000] font-semibold text-[15px]">Legal terms & policies</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
              <div onClick={() => setOpenShare(true)} className="flex items-center justify-between gap-2 py-3">
                <p className="text-[#000] font-semibold text-[15px]">Share this app</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
            </div>
            <div className="tabs-main px-3 border-t-6 border-t-[#f5f5f5]">
              <div className="flex items-center justify-between gap-2 py-3">
                <p className="text-[#000] font-semibold text-[15px]">Switch accounts</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
            </div>
            <div className="tabs-main px-3 border-t-6 border-t-[#f5f5f5]">
              <div className="flex items-center justify-between gap-2 pt-3">
                <p className="text-[#000] font-semibold text-[15px]">Sign out</p>
                <FaChevronRight className="text-[#777] text-[14px]" />
              </div>
            </div>
          </div>

          <Link href="/">
            <div className="w-12 h-12 right-4 fixed bottom-10 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center">
              <HiOutlineHome className="text-2xl"/>
            </div>
          </Link>
        </div>
      </div>
      <ShareAppBottomModal
        isOpen={openShare}
        onClose={() => setOpenShare(false)}
      />
    </>
  );
};

export default CountryRegionLanguage;
