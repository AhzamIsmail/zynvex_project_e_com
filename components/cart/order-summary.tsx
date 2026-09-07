"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import Button from "@/components/ui/button";
import { Tag, Check, Shield, Truck, ArrowRight, X } from "lucide-react";

interface OrderSummaryProps {
  onCheckout: () => void;
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const {
    subtotal,
    discount,
    tax,
    shipping,
    totalPrice,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    totalCount,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput("");
    }
  };

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      {/* Free Shipping Progress bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <Truck className="h-4 w-4 text-brand-600" />
            <span>
              {subtotal >= freeShippingThreshold
                ? "You've unlocked Free Express Shipping!"
                : `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`}
            </span>
          </div>
          <span className="font-bold text-brand-600">{Math.round(progressToFreeShipping)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({totalCount} {totalCount === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span className="flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              Promo Discount ({appliedPromo})
            </span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span className="font-semibold text-slate-900">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
          <span className="text-base font-bold text-slate-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-900">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="block text-[10px] text-slate-400">USD, taxes included</span>
          </div>
        </div>
      </div>

      {/* Promo Code Input Form */}
      <div className="border-t border-slate-100 pt-4">
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-800">
            <div className="flex items-center gap-1.5 font-medium">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Coupon <strong>{appliedPromo}</strong> applied</span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-emerald-600 hover:text-emerald-900 font-bold p-1"
              title="Remove promo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError("");
                }}
                placeholder="Promo Code (e.g. SAVE10)"
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 uppercase font-semibold"
              />
              <Button variant="secondary" size="sm" type="submit" className="text-xs">
                Apply
              </Button>
            </div>
            {promoError && (
              <p className="text-[11px] font-medium text-rose-600">{promoError}</p>
            )}
          </form>
        )}
      </div>

      {/* Checkout Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={onCheckout}
        disabled={totalCount === 0}
        className="w-full gap-2 shadow-md"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="h-4 w-4" />
      </Button>

      {/* Trust & Guarantee */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 border-t border-slate-100 pt-4">
        <Shield className="h-3.5 w-3.5 text-emerald-600" />
        <span>256-bit SSL Encrypted • 30-Day Money Back Guarantee</span>
      </div>
    </div>
  );
}
