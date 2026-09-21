import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import ProductCard from "@/components/products/product-card";
import { apiClient } from "@/lib/api/client";
import {
  ArrowRight,
  Sparkles,
  Shield,
  BarChart3,
  Zap,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kartify - Modern E-Commerce Flagship Store & Dashboard",
  description: "Explore premium audio gear, smart wearables, and cutting-edge tech essentials with instant cart sync and live operations analytics.",
};

export default async function HomePage() {
  const featuredProducts = await apiClient.getFeaturedProducts(4);

  const features = [
    {
      title: "Fast & Reliable Delivery",
      description: "Swift order dispatch with real-time tracking and free express shipping on qualifying orders.",
      icon: Zap,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Seamless Shopping Experience",
      description: "Persistent cart state, instant coupon code discounts, and frictionless checkout across all devices.",
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "100% Secure & Verified",
      description: "256-bit encrypted checkout, comprehensive buyer protection, and 30-day hassle-free returns.",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <PageContainer className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-18 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-6 border border-brand-200 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          Premium Digital Flagship Store
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 max-w-3xl leading-tight">
          Modern E-Commerce with <span className="text-brand-600">Fluid Experience</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Discover handpicked electronics, premium audio gear, and cutting-edge wearables designed for speed, comfort, and uncompromising performance.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/20 gap-2 text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop All Products
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm shadow-xs gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="border-t border-slate-200 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              Featured Gear
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Popular in Store
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Explore top-rated electronics with verified customer reviews and manufacturer warranties.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="border-t border-slate-200 pt-12 pb-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why Shop with Kartify
          </h2>
          <p className="mt-2 text-slate-600 text-xs md:text-sm">
            Discover a modern shopping experience designed for premium quality, dependable delivery, and customer satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className={`p-3 rounded-xl mb-4 ${feature.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}
