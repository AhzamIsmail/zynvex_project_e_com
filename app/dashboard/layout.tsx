import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Overview Dashboard",
  description: "Real-time sales performance metrics, customer transaction records, and inventory operations.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
