"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Error caught by ErrorBoundary
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-md">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-inner">
              <AlertTriangle className="h-8 w-8 stroke-[1.75]" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Something went wrong
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              An unexpected application error occurred. We have contained the failure so you can safely refresh or retry.
            </p>
            {this.state.error?.message && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs font-mono text-slate-700 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={this.handleReset}
                className="gap-2 text-xs shadow-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
                className="text-xs"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
