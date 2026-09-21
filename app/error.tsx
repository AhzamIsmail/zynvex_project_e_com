"use client";

import React, { useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import Button from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log error to monitoring service
  }, [error]);

  return (
    <PageContainer className="py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-inner">
          <AlertTriangle className="h-8 w-8 stroke-[1.75]" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Application Error
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          We encountered an issue while loading this page. You can retry the operation or return to the storefront.
        </p>

        {error.message && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs font-mono text-slate-600 overflow-x-auto max-h-24">
            {error.message}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={reset}
            className="gap-2 text-xs shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </Button>
          <Link href="/">
            <Button variant="secondary" className="gap-2 text-xs w-full sm:w-auto">
              <Home className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
