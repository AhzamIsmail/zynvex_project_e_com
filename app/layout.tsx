import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Toast from "@/components/ui/toast";
import { CartProvider } from "@/context/cart-context";
import { RecentlyViewedProvider } from "@/context/recently-viewed-context";

export const metadata: Metadata = {
  title: "Kartify - Modern E-Commerce Dashboard & Store",
  description: "Built with Next.js 14, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <CartProvider>
          <RecentlyViewedProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <Toast />
          </RecentlyViewedProvider>
        </CartProvider>
      </body>
    </html>
  );
}
