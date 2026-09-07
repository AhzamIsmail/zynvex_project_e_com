"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: "border-emerald-200 bg-white text-slate-800 shadow-emerald-500/10",
    warning: "border-amber-200 bg-white text-slate-800 shadow-amber-500/10",
    info: "border-blue-200 bg-white text-slate-800 shadow-blue-500/10",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-xl transition-all ${
          bgStyles[toast.type]
        }`}
      >
        {icons[toast.type]}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={dismissToast}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
