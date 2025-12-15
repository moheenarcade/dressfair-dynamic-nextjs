"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CountryContext = createContext(null);

export const COUNTRY_MAP = {
  ae: { value: "ae", label: "United Arab Emirates", flag: "🇦🇪" },
  sa: { value: "sa", label: "Saudi Arabia", flag: "🇸🇦" },
  om: { value: "om", label: "Oman", flag: "🇴🇲" },
  pk: { value: "pk", label: "Pakistan", flag: "🇵🇰" },
};

export const CountryProvider = ({ children }) => {
  const pathname = usePathname();
  const [country, setCountry] = useState("ae");

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    const urlCountry = segments[0];

    // Check localStorage for saved country first
    const savedCountry = localStorage.getItem("selectedCountry");
    
    // If URL has a valid country code, use it and save to localStorage
    if (COUNTRY_MAP[urlCountry]) {
      setCountry(urlCountry);
      localStorage.setItem("selectedCountry", urlCountry);
    }
    // If no country in URL but we have a saved country, redirect to it
    else if (savedCountry && COUNTRY_MAP[savedCountry] && pathname === "/") {
      // We'll let the middleware handle the redirect
      // Just update context
      setCountry(savedCountry);
    }
    // Otherwise use default and save to localStorage
    else {
      const defaultCountry = savedCountry && COUNTRY_MAP[savedCountry] 
        ? savedCountry 
        : "ae";
      setCountry(defaultCountry);
      localStorage.setItem("selectedCountry", defaultCountry);
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
      localStorage.setItem("selectedCountry", newCountry);
    }
  };

  return (
    <CountryContext.Provider value={{ 
      country, 
      setCountry: changeCountryAndSave, 
      withCountry,
      changeCountryAndSave 
    }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);