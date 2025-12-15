"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const COUNTRY_MAP = {
  ae: { value: "ae", label: "United Arab Emirates", flag: "🇦🇪" },
  sa: { value: "sa", label: "Saudi Arabia", flag: "🇸🇦" },
  om: { value: "om", label: "Oman", flag: "🇴🇲" },
};

const CountryContext = createContext(null);

export const CountryProvider = ({ children }) => {
  const pathname = usePathname();
  const [country, setCountry] = useState("ae");
  const [countryInfo, setCountryInfo] = useState(COUNTRY_MAP.ae);

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    const urlCountry = segments[0];

    // Check localStorage for saved country first
    const savedCountry = localStorage.getItem("selectedCountry");
    
    let currentCountry = "ae";
    
    // Priority 1: Use URL country if valid
    if (COUNTRY_MAP[urlCountry]) {
      currentCountry = urlCountry;
    }
    // Priority 2: Use saved country if URL doesn't have one
    else if (savedCountry && COUNTRY_MAP[savedCountry]) {
      currentCountry = savedCountry;
    }
    // Priority 3: Default to "ae"
    
    setCountry(currentCountry);
    setCountryInfo(COUNTRY_MAP[currentCountry]);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", currentCountry);
    }
  }, [pathname]);

  const withCountry = (path = "") => {
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    return `/${country}${formattedPath}`;
  };

  // Function to change country and save to localStorage
  const changeCountryAndSave = (newCountry) => {
    if (COUNTRY_MAP[newCountry]) {
      setCountry(newCountry);
      setCountryInfo(COUNTRY_MAP[newCountry]);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCountry", newCountry);
      }
    }
  };

  return (
    <CountryContext.Provider value={{ 
      country, 
      countryInfo,
      setCountry: changeCountryAndSave, 
      withCountry,
      changeCountryAndSave,
      COUNTRY_MAP
    }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);