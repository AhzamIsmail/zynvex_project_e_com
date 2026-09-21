import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Toast from "@/components/ui/toast";
import ErrorBoundary from "@/components/error-boundary";
import { CartProvider } from "@/context/cart-context";
import { RecentlyViewedProvider } from "@/context/recently-viewed-context";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Kartify - Modern E-Commerce Dashboard & Store",
    template: "%s | Kartify",
  },
  description: "High-performance full-stack e-commerce store and management dashboard built with Next.js 14, TypeScript, and Tailwind CSS.",
  keywords: ["e-commerce", "dashboard", "Next.js 14", "TypeScript", "Tailwind CSS", "audio", "wearables", "tech store"],
  authors: [{ name: "Kartify Team" }],
  openGraph: {
    title: "Kartify - Modern E-Commerce Dashboard & Store",
    description: "High-performance digital flagship store with live catalog, persistent cart, and real-time operations dashboard.",
    type: "website",
    locale: "en_US",
    siteName: "Kartify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartify - Modern E-Commerce Store",
    description: "Modern e-commerce platform and analytics dashboard.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <ErrorBoundary>
          <CartProvider>
            <RecentlyViewedProvider>
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <Toast />
            </RecentlyViewedProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
