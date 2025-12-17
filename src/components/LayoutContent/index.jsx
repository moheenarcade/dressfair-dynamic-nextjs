"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { getConfig } from "@/lib/api";

export default function LayoutContent({ children }) {
  const { isCartOpen } = useCart();
  const [isReady, setIsReady] = useState(false);

  // Async function to load config once
  const loadConfig = async () => {
   try {
     const res = await getConfig();
     if (res.success) {
       console.log("Config loaded:", res.data);
     }
   } catch (error) {
     console.error("Error loading config:", error);
   } finally {
     setIsReady(true);
   }
 };

 // Run once on mount
 useEffect(() => {
   loadConfig();
 }, []);
 
  return (
    <motion.div
      animate={{
        width: isCartOpen ? "calc(100% - 10%)" : "100%",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
      className="relative min-h-screen bg-white origin-right"
      style={{
        transformOrigin: "right center",
      }}
    >
      <Header />
      {children}
      <Footer />
    </motion.div>
  );
}
