import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const defaultId = React.useId();
  const inputId = id || defaultId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 disabled:opacity-50 disabled:bg-slate-50",
          error
            ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
            : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/20",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-medium text-rose-600">
          {error}
        </span>
      )}
    </div>
  );
}
