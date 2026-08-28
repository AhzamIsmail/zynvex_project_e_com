"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, Percent, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
        {/* Dashboard Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Overview Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Operational review, transactional metrics, and user interactions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">{stat.title}</span>
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
            <Card title="Recent Transactions" description="Latest store orders and execution statuses.">
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
                        order.status === "Completed" ? "success" :
                        order.status === "Pending" ? "warning" :
                        "default";
                      
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

          {/* Primitive Control Center Card */}
          <div>
            <Card title="UI Component Showcase" description="Test primitive styles and interactive modals.">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Button Primitives</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Input Primitive</h4>
                  <Input 
                    label="Username" 
                    placeholder="Enter username..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {inputValue && (
                    <p className="text-[10px] text-slate-500">Live output: <strong>{inputValue}</strong></p>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Modal Primitive Trigger</h4>
                  <Button variant="primary" className="w-full" onClick={() => setIsModalOpen(true)}>
                    Launch Demo Modal
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Modal component implementation */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Component Library Modal"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg text-sm">
              <Sparkles className="h-5 w-5 flex-shrink-0" />
              <span>Modal overlay mounted, background scrolling is locked!</span>
            </div>
            <p className="text-slate-600 text-sm">
              This modal represents our UI primitive configured with standard HTML headers, body containers, custom transition indicators, and layout controllers.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>Acknowledge</Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
