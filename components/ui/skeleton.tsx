import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      {/* Image container skeleton */}
      <div className="relative aspect-square w-full bg-slate-100 animate-pulse">
        <div className="absolute top-3 left-3 w-16 h-5 bg-slate-200 rounded-full" />
      </div>

      {/* Content details skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Brand & rating */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-slate-200 rounded animate-pulse" />
            <div className="w-2 h-2 bg-slate-200 rounded-full" />
            <div className="w-12 h-3 bg-slate-200 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-slate-200 rounded animate-pulse" />

          {/* Description */}
          <div className="w-full h-3 bg-slate-100 rounded animate-pulse mt-2" />
          <div className="w-2/3 h-3 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Footer price & button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-16 h-5 bg-slate-200 rounded animate-pulse" />
            <div className="w-12 h-2.5 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="w-20 h-8 bg-slate-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-3 bg-slate-200 rounded" />
        <div className="w-3 h-3 bg-slate-200 rounded" />
        <div className="w-16 h-3 bg-slate-200 rounded" />
        <div className="w-3 h-3 bg-slate-200 rounded" />
        <div className="w-32 h-3 bg-slate-200 rounded" />
      </div>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square w-full bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 bg-slate-100 rounded-xl" />
            <div className="h-16 bg-slate-100 rounded-xl" />
            <div className="h-16 bg-slate-100 rounded-xl" />
          </div>
        </div>

        {/* Right Column: Details Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-4/5 h-8 bg-slate-200 rounded" />
            <div className="w-32 h-7 bg-slate-200 rounded mt-2" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="w-full h-3.5 bg-slate-100 rounded" />
            <div className="w-full h-3.5 bg-slate-100 rounded" />
            <div className="w-2/3 h-3.5 bg-slate-100 rounded" />
          </div>

          {/* Highlights box */}
          <div className="h-32 bg-slate-100 rounded-xl border border-slate-200" />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <div className="flex-1 h-11 bg-slate-200 rounded-xl" />
            <div className="w-36 h-11 bg-slate-200 rounded-xl" />
          </div>

          {/* Specs table skeleton */}
          <div className="pt-4 space-y-2">
            <div className="w-36 h-4 bg-slate-200 rounded" />
            <div className="h-28 bg-slate-100 rounded-xl border border-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryPillsSkeleton() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1">
      <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="w-20 h-7 bg-slate-100 rounded-lg animate-pulse flex-shrink-0"
        />
      ))}
    </div>
  );
}
