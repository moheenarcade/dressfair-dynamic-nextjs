"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getConfig } from "@/lib/api";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [configData, setConfigData] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await getConfig();
        if (res.success) {
          setConfigData(res.data);
          localStorage.setItem("configData", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Error fetching config:", err);
      } finally {
        setIsReady(true);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ configData, isReady }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
