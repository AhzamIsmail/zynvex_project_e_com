"use client";

import React, { useState, useMemo } from "react";
import PageContainer from "@/components/layout/page-container";
import ProductCard from "@/components/products/product-card";
import ProductFilters from "@/components/products/product-filters";
import { getProducts, getCategories } from "@/lib/data/products";
import { ProductCategory, SortOption } from "@/types/product";
import { ShoppingBag, SearchX, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";

export default function ProductsPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In-stock only filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [allProducts, selectedCategory, inStockOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
    setInStockOnly(false);
  };

  return (
    <PageContainer className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
            <Sparkles className="h-3 w-3" />
            Curated Catalog
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Products
          </h1>
          <p className="mt-1 text-slate-600 text-sm max-w-xl">
            Browse our premium selection of electronics, audio gear, wearables, and modern accessories.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        onReset={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
            <SearchX className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No matching products found</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            We couldn&apos;t find any products matching your current filters. Try changing your search query or reset filters.
          </p>
          <Button
            variant="primary"
            onClick={handleResetFilters}
            className="mt-6 gap-2"
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
