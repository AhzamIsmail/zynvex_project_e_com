"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ShoppingBag, ShoppingCart, User, HelpCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Sidebar() {
  const pathname = usePathname();
  const { totalCount } = useCart();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: BarChart3, exact: true },
    { name: "Products Catalog", href: "/products", icon: ShoppingBag, exact: false },
    { name: "Shopping Cart", href: "/cart", icon: ShoppingCart, exact: false, badge: totalCount },
    { name: "Account Profile", href: "/profile", icon: User, exact: false },
  ];

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6 pb-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Management Panel
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isLinkActive(item.href, item.exact);
          const hasBadge = typeof item.badge === "number" && item.badge > 0;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-50 text-brand-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? "text-brand-600" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {hasBadge && (
                <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <Link
          href="/products"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <HelpCircle className="h-4 w-4 text-slate-400" />
          Store Quick Guide
        </Link>
      </div>
    </aside>
  );
}
