import React from "react";
import Button from "@/components/ui/button";
import { AlertTriangle, RotateCcw, WifiOff } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Failed to load data",
  message = "An error occurred while communicating with the remote server. Please check your connection and try again.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-rose-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-xs ${className}`}
      role="alert"
    >
      <div className="h-16 w-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 ring-8 ring-rose-50/50">
        <WifiOff className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>

      <p className="text-slate-600 text-sm mt-2 max-w-sm leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          className="mt-6 gap-2 text-xs font-semibold shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Retry Loading</span>
        </Button>
      )}
    </div>
  );
}
