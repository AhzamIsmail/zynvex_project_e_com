"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import CartItemRow from "@/components/cart/cart-item-row";
import OrderSummary from "@/components/cart/order-summary";
import { useCart } from "@/context/cart-context";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const { items, clearCart, totalCount, totalPrice } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutModalOpen(false);
      setOrderPlaced(false);
    }, 2500);
  };

  return (
    <PageContainer className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 mb-1">
            <Link href="/products" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Review your chosen items, adjust quantities, or apply discount vouchers.
          </p>
        </div>

        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClearConfirmOpen(true)}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Cart</span>
          </Button>
        )}
      </div>

      {/* Cart Content Layout */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
              <span>Items ({totalCount})</span>
              <span>Subtotal & Action</span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            <div className="p-4 bg-brand-50/60 border border-brand-100 rounded-xl flex items-center gap-3 text-xs text-brand-800">
              <Sparkles className="h-4 w-4 text-brand-600 flex-shrink-0" />
              <span>
                All orders are packaged in 100% recyclable materials with expedited delivery tracking.
              </span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <OrderSummary onCheckout={() => setIsCheckoutModalOpen(true)} />
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
          <div className="h-20 w-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-xs mx-auto">
            Looks like you haven&apos;t added any items to your shopping cart yet. Discover our catalog of premium electronics and accessories.
          </p>
          <div className="mt-8">
            <Link href="/products">
              <Button variant="primary" size="lg" className="gap-2 shadow-sm">
                <ShoppingBag className="h-4 w-4" />
                <span>Explore Products</span>
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => !orderPlaced && setIsCheckoutModalOpen(false)}
        title={orderPlaced ? "Order Confirmed!" : "Checkout Confirmation"}
      >
        {orderPlaced ? (
          <div className="text-center py-6 space-y-4">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Payment Successful!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your mock order has been placed. You will receive an email confirmation with your dispatch tracking code.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-lg">
              Transaction ID: TXN-{(Math.random() * 100000).toFixed(0)}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3 bg-brand-50 p-3.5 rounded-xl text-brand-800 text-xs">
              <ShieldCheck className="h-5 w-5 text-brand-600 flex-shrink-0" />
              <span>
                This is a client-side simulated checkout session for Module 2. No real payment is processed.
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items in order:</span>
                <span className="font-bold text-slate-900">{totalCount} items</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total amount payable:</span>
                <span className="font-black text-slate-900 text-sm">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setIsCheckoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePlaceOrder}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirm & Place Order (${totalPrice.toFixed(2)})
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        title="Clear Shopping Cart"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to remove all {totalCount} items from your shopping cart? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setIsClearConfirmOpen(false)}
            >
              Keep Items
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                clearCart();
                setIsClearConfirmOpen(false);
              }}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Yes, Clear Cart
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
