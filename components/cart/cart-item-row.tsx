"use client";

import React from "react";
import Link from "next/link";
import { CartItem } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link
          href={`/products/${product.id}`}
          className="relative h-20 w-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 group"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
            {product.category}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="block font-bold text-slate-900 text-sm hover:text-brand-600 transition-colors truncate"
          >
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <span>Unit: ${product.price.toFixed(2)}</span>
            <span>•</span>
            <span className={product.inStock ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper, Subtotal & Remove Button */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
        {/* Quantity Stepper */}
        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50 shadow-xs">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-900">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stockCount}
            className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="text-right min-w-[80px]">
          <span className="block font-black text-slate-900 text-base">
            ${(product.price * quantity).toFixed(2)}
          </span>
          {quantity > 1 && (
            <span className="block text-[10px] text-slate-400">
              ${product.price.toFixed(2)} ea
            </span>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(product.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Remove from cart"
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
