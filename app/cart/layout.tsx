import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review selected items, apply promo discount codes, and complete encrypted checkout.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
