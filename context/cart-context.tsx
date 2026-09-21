"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, CartItem } from "@/types/product";

interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  totalPrice: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  toast: ToastNotification | null;
  dismissToast: () => void;
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "kartify_cart_items_v2";

const PROMO_CODES: Record<string, { discountPercent?: number; fixedDiscount?: number; freeShipping?: boolean; description: string }> = {
  SAVE10: { discountPercent: 10, description: "10% off your entire order" },
  ZYNVEX20: { discountPercent: 20, description: "20% off your entire order" },
  WELCOME15: { discountPercent: 15, description: "15% off welcome discount" },
  FREESHIP: { freeShipping: true, description: "Free standard shipping" },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedPromo = localStorage.getItem("kartify_applied_promo_v2");
      if (savedPromo) {
        setAppliedPromo(savedPromo);
      }
    } catch {
      // Ignore localStorage read errors in non-browser or restricted environments
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to LocalStorage when cart changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
        if (appliedPromo) {
          localStorage.setItem("kartify_applied_promo_v2", appliedPromo);
        } else {
          localStorage.removeItem("kartify_applied_promo_v2");
        }
      } catch {
        // Ignore localStorage quota or write errors
      }
    }
  }, [items, appliedPromo, isHydrated]);

  const showToast = useCallback((message: string, type: "success" | "info" | "warning" = "success") => {
    const newToast = { id: Date.now().toString(), message, type };
    setToast(newToast);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 3500);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    showToast(`Added "${product.name}" to your cart!`, "success");
  }, [showToast]);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.product.id === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.product.name}" from cart.`, "info");
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  }, [showToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
    showToast("Cart cleared.", "info");
  }, [showToast]);

  const applyPromoCode = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: "Please enter a promo code." };
    }

    const promo = PROMO_CODES[cleanCode];
    if (promo) {
      setAppliedPromo(cleanCode);
      showToast(`Promo code "${cleanCode}" applied: ${promo.description}`, "success");
      return { success: true, message: `Promo "${cleanCode}" applied: ${promo.description}` };
    }

    return { success: false, message: "Invalid promo code. Try SAVE10 or ZYNVEX20" };
  }, [showToast]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    showToast("Promo code removed.", "info");
  }, [showToast]);

  // Calculations memoized for performance
  const { totalCount, subtotal, discount, tax, shipping, totalPrice } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const sub = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const activePromoConfig = appliedPromo ? PROMO_CODES[appliedPromo] : null;

    let disc = 0;
    if (activePromoConfig?.discountPercent) {
      disc = (sub * activePromoConfig.discountPercent) / 100;
    } else if (activePromoConfig?.fixedDiscount) {
      disc = Math.min(sub, activePromoConfig.fixedDiscount);
    }

    const calculatedTax = sub - disc > 0 ? (sub - disc) * 0.08 : 0;
    const freeShipping = sub === 0 || sub >= 100 || activePromoConfig?.freeShipping;
    const ship = sub === 0 ? 0 : freeShipping ? 0 : 9.99;
    const total = Math.max(0, sub - disc + calculatedTax + ship);

    return {
      totalCount: count,
      subtotal: sub,
      discount: disc,
      tax: calculatedTax,
      shipping: ship,
      totalPrice: total,
    };
  }, [items, appliedPromo]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        tax,
        shipping,
        discount,
        totalPrice,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toast,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
