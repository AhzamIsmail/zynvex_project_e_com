"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LayoutDashboard,
  Home,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useCart();

  const navLinks = [
    { name: "Home", href: "/", icon: Home, exact: true },
    { name: "Products", href: "/products", icon: ShoppingBag, exact: false },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: false },
    { name: "Cart", href: "/cart", icon: ShoppingCart, exact: false, badge: totalCount },
    { name: "Profile", href: "/profile", icon: User, exact: false },
  ];

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <span className="h-9 w-9 rounded-xl bg-brand-600 group-hover:bg-brand-700 flex items-center justify-center text-white font-black text-lg transition-colors shadow-sm shadow-brand-500/20">
                K
              </span>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                Kartify
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  Store
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.href, link.exact);
              const hasBadge = typeof link.badge === "number" && link.badge > 0;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-brand-50 text-brand-700 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="relative flex items-center">
                    <Icon
                      className={`h-4 w-4 ${
                        active ? "text-brand-600 stroke-[2.5]" : "text-slate-500"
                      }`}
                    />
                    {hasBadge && (
                      <span className="absolute -top-2 -right-2.5 bg-brand-600 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200 shadow-sm shadow-brand-500/30">
                        {link.badge! > 99 ? "99+" : link.badge}
                      </span>
                    )}
                  </div>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-600 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg" id="mobile-menu">
          <div className="px-3 pt-3 pb-4 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.href, link.exact);
              const hasBadge = typeof link.badge === "number" && link.badge > 0;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${active ? "text-brand-600" : "text-slate-500"}`} />
                    <span>{link.name}</span>
                  </div>
                  {hasBadge && (
                    <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
