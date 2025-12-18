import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/models/CartSidebar";
import LayoutContent from "@/components/LayoutContent";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";
import FaviconLoader from "@/components/FaviconLoader";
import { CountryProvider } from "@/context/CountryContext";
import { ConfigProvider } from "@/context/ConfigContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: [
    "miui",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    ".SFNSText-Regular",
    "Helvetica",
    "Arial",
    "sans-serif",
    "serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Online Shopping Pakistan |Handbags | Shoes | Dresses | Jewellery | Watches",
  description:
    "We are online Fashion Shopping site in Pakistan, we offer clothings, Shoes, Bags & accessories very affordable and competitive price with best quality you will love it!",
};

export default function RootLayout({ children }) {
  if (typeof window !== "undefined") {
    window.addEventListener("error", (e) => {
      if (/ChunkLoadError|Loading chunk/.test(e.message)) {
        window.location.reload();
      }
    });
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CountryProvider>
          <LanguageProvider>
            <FaviconLoader />
            <ConfigProvider>
              <UserProvider>
                <CartProvider>
                  <Toaster
                    position="top-center"
                    containerStyle={{
                      zIndex: 999999999999999,
                    }}
                  />
                  <LayoutContent>{children}</LayoutContent>
                  <CartSidebar />
                </CartProvider>
              </UserProvider>
            </ConfigProvider>
          </LanguageProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
