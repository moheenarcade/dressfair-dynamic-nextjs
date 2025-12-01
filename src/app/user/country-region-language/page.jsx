"use client"
import React, { useState } from "react";
import Select, { components } from "react-select";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <div className="country-lang-mian px-3 lg:px-0">
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
  );
};

export default CountryRegionLanguage;
