import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
}

export default function Card({
  title,
  description,
  footerContent,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden", className)}
      {...props}
    >
      {(title || description) && (
        <div className="p-6 border-b border-slate-200">
          {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
          {description && <p className="text-slate-500 text-xs mt-1">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footerContent && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          {footerContent}
        </div>
      )}
    </div>
  );
}
