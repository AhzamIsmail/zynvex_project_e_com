"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Box, ShoppingCart, Users, Settings, HelpCircle } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: BarChart3 },
    { name: "Products", href: "#", icon: Box },
    { name: "Orders", href: "#", icon: ShoppingCart },
    { name: "Customers", href: "#", icon: Users },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Management Panel
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          Documentation
        </a>
      </div>
    </aside>
  );
}
