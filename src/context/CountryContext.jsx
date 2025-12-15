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

    // ✅ Sync context with URL country
    if (COUNTRY_MAP[urlCountry]) {
      setCountry(urlCountry);
    }
  }, [pathname]);

  const withCountry = (path = "") => {
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    return `/${country}${formattedPath}`;
  };

  return (
    <CountryContext.Provider value={{ country, setCountry, withCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);