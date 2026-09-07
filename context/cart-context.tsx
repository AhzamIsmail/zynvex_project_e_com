"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to LocalStorage when cart changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isHydrated]);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const newToast = { id: Date.now().toString(), message, type };
    setToast(newToast);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const addItem = (product: Product, quantity = 1) => {
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
  };

  const removeItem = (productId: string) => {
    const itemToRemove = items.find((item) => item.product.id === productId);
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from cart.`, "info");
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    showToast("Cart cleared.", "info");
  };

  const applyPromoCode = (code: string) => {
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
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast("Promo code removed.", "info");
  };

  // Calculations
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const activePromoConfig = appliedPromo ? PROMO_CODES[appliedPromo] : null;

  let discount = 0;
  if (activePromoConfig?.discountPercent) {
    discount = (subtotal * activePromoConfig.discountPercent) / 100;
  } else if (activePromoConfig?.fixedDiscount) {
    discount = Math.min(subtotal, activePromoConfig.fixedDiscount);
  }

  const tax = (subtotal - discount) > 0 ? (subtotal - discount) * 0.08 : 0;
  
  const isFreeShipping = subtotal === 0 || subtotal >= 100 || activePromoConfig?.freeShipping;
  const shipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : 9.99;

  const totalPrice = Math.max(0, subtotal - discount + tax + shipping);

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
