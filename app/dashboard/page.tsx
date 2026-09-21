"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Sidebar from "@/components/layout/sidebar";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";

const Modal = dynamic(() => import("@/components/ui/modal"), {
  ssr: false,
});

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Percent,
  Sparkles,
  ArrowRight,
  ShoppingCart,
  Download,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function DashboardPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const { totalCount, showToast } = useCart();

  const handleOpenExport = useCallback(() => {
    setExported(false);
    setIsExportModalOpen(true);
  }, []);

  const handleCloseExport = useCallback(() => {
    setIsExportModalOpen(false);
  }, []);

  const handleTriggerExport = useCallback(() => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      showToast("Sales report generated and ready for download.", "success");
    }, 1200);
  }, [showToast]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "+1,205",
      change: "+12.2%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      title: "Active Customers",
      value: "2,420",
      change: "-3.5%",
      trend: "down",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "4.83%",
      change: "+4.1%",
      trend: "up",
      icon: Percent,
    },
  ];

  const recentOrders = [
    { id: "ORD-9982", customer: "Olivia Martin", amount: "$350.00", status: "Completed" as const, date: "2026-08-28" },
    { id: "ORD-9981", customer: "Jackson Lee", amount: "$120.50", status: "Pending" as const, date: "2026-08-28" },
    { id: "ORD-9980", customer: "Isabella Nguyen", amount: "$850.00", status: "Completed" as const, date: "2026-08-27" },
    { id: "ORD-9979", customer: "William Chen", amount: "$99.00", status: "Cancelled" as const, date: "2026-08-27" },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Dashboard Heading with Quick Action Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Overview Dashboard
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Operational review, transactional metrics, and user interactions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs shadow-xs">
                <ShoppingBag className="h-3.5 w-3.5 text-brand-600" />
                <span>Browse Products</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="primary" size="sm" className="gap-1.5 text-xs shadow-xs">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>View Cart {totalCount > 0 && `(${totalCount})`}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                  <div className="mt-1 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <span className="text-emerald-600 text-xs font-medium flex items-center">
                        <ArrowUpRight className="h-3 w-3 inline" />
                        {stat.change}
                      </span>
                    ) : (
                      <span className="text-rose-600 text-xs font-medium flex items-center">
                        <ArrowDownRight className="h-3 w-3 inline" />
                        {stat.change}
                      </span>
                    )}
                    <span className="text-slate-400 text-[10px]">vs last month</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive UI Primitives Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders List Card */}
          <div className="lg:col-span-2">
            <Card
              title="Recent Transactions"
              description="Latest store orders and execution statuses."
              footerContent={
                <Link
                  href="/products"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Explore Catalog for New Orders <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="overflow-x-auto -mx-6 -my-6">
                <table className="w-full text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recentOrders.map((order) => {
                      const statusVariant =
                        order.status === "Completed"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "default";

                      return (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{order.amount}</td>
                          <td className="px-6 py-4">
                            <Badge variant={statusVariant}>{order.status}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Store Operations & Quick Actions Card */}
          <div>
            <Card
              title="Store Operations"
              description="Administrative actions and inventory reporting."
            >
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Quick Export
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Generate an audit summary of active inventory, customer volumes, and net store revenue.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full gap-2 shadow-xs"
                    onClick={handleOpenExport}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Sales Report</span>
                  </Button>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Category Inventory
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span className="font-medium text-slate-700">Audio Equipment</span>
                      <Badge variant="success">18 in stock</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span className="font-medium text-slate-700">Wearables & Watches</span>
                      <Badge variant="success">12 in stock</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-slate-700">Smart Accessories</span>
                      <Badge variant="success">24 in stock</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Export Sales Report Modal */}
        <Modal
          isOpen={isExportModalOpen}
          onClose={handleCloseExport}
          title="Export Sales & Inventory Summary"
        >
          <div className="space-y-4">
            {exported ? (
              <div className="text-center py-4 space-y-3">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Export File Ready</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  kartify_sales_report_2026.csv has been prepared with 4 recent orders and full SKU stock records.
                </p>
                <div className="flex justify-center pt-2">
                  <Button variant="primary" size="sm" onClick={handleCloseExport}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700">
                  <FileSpreadsheet className="h-5 w-5 text-brand-600 flex-shrink-0" />
                  <span>
                    This report includes total gross revenue ($45,231.89), customer metrics, and line-item order details.
                  </span>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" onClick={handleCloseExport}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleTriggerExport}
                    disabled={isExporting}
                    className="gap-2"
                  >
                    {isExporting ? (
                      <span>Generating Report...</span>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download CSV</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </main>
    </div>
  );
}
