"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutContent({ children }) {
  const { isCartOpen } = useCart();

  return (
    <motion.div
      animate={{
        width: isCartOpen ? "calc(100% - 13%)" : "100%",
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
