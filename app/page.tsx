import React from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import { ArrowRight, Sparkles, Shield, BarChart3, Zap } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Real-Time Tracking",
      description: "Monitor user operations and e-commerce statistics instantly from a central panel.",
      icon: BarChart3,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "High Performance",
      description: "Optimized response rendering ensures instant page paint times and fluid transitions.",
      icon: Zap,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Secure Operations",
      description: "Restricted API endpoints, environment validation, and secure handling frameworks.",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="h-3 w-3" />
          Introducing Zynvex Dashboard v1.0
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl leading-tight">
          Manage E-Commerce Operations with <span className="text-brand-600">Absolute Precision</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          An intuitive, responsive frontend dashboard framework designed to aggregate logs, manage user transactions, and optimize store conversions.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors shadow-sm gap-2"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-12 md:py-16 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Built for Enterprise Scale</h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base">
            Engineered with strict responsive design rules, type-safe layouts, and modular component primitives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className={`p-3 rounded-lg mb-5 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}
