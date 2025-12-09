"use client"
import { useEffect, useState } from "react";

function FaviconLoader() {
  const [favicon, setFavicon] = useState(null);
  const [baseUrls, setBaseUrls] = useState(null);


  useEffect(() => {

    // Retrieve storeSettings from localStorage
    const storeSettings = localStorage.getItem("storeSettings");

    if (storeSettings) {
      try {
        const parsed = JSON.parse(storeSettings);
        if (parsed?.store_favicon) {
          setFavicon(parsed.store_favicon);
        }
      } catch (error) {
        console.error("Error parsing storeSettings.", error);
      }
    }
  }, []);

  useEffect(() => {
    if (favicon && baseUrls) {
      // Change or create <link rel='icon'>
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");

        link.rel = "icon";

        document.head.appendChild(link);
      }
      link.href = `${baseUrls.LOGO_BASE_URL}${favicon}`;
    }
  }, [favicon, baseUrls]);

  return null;
}

export default FaviconLoader;
