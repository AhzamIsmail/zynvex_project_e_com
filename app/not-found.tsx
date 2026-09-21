import React from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import Button from "@/components/ui/button";
import { SearchX, Home, ShoppingBag, BarChart3, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <PageContainer className="py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-6 border border-brand-200">
          Error 404
        </div>

        {/* Icon */}
        <div className="h-20 w-20 bg-slate-100 text-slate-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <SearchX className="h-10 w-10 stroke-[1.5]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          The page or product you requested could not be found. It might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto shadow-xs text-xs">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="md" className="gap-2 w-full sm:w-auto text-xs">
              <ShoppingBag className="h-4 w-4" />
              <span>Browse Catalog</span>
            </Button>
          </Link>
        </div>

        {/* Helpful Quick Links */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Helpful Destinations
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <Link
              href="/products"
              className="p-2.5 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-3.5 w-3.5 text-brand-600" />
                <span className="font-semibold text-slate-700">All Products</span>
              </div>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </Link>
            <Link
              href="/dashboard"
              className="p-2.5 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-brand-600" />
                <span className="font-semibold text-slate-700">Store Dashboard</span>
              </div>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
