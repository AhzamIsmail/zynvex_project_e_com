"use client";

import React from "react";
import { ProductCategory, SortOption } from "@/types/product";
import { Search, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import Button from "@/components/ui/button";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (inStock: boolean) => void;
  onReset: () => void;
  totalResults: number;
}

const ProductFilters = React.memo(function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockOnlyChange,
  onReset,
  totalResults,
}: ProductFiltersProps) {
  const isFiltered =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    inStockOnly ||
    sortBy !== "featured";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top row: Search input & Sorting */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name, brand, or feature..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Sorting Dropdown & In-Stock checkbox */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>In Stock Only</span>
          </label>

          {isFiltered && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs text-slate-600 hover:text-slate-900 gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Bottom row: Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Category:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat as ProductCategory)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          );
        })}
        <span className="ml-auto text-xs text-slate-400 whitespace-nowrap pl-2">
          {totalResults} {totalResults === 1 ? "product" : "products"} found
        </span>
      </div>
    </div>
  );
});

export default ProductFilters;
