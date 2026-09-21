"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import ProductCard from "@/components/products/product-card";
import ProductFilters from "@/components/products/product-filters";
import { Product, ProductCategory, SortOption } from "@/types/product";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/ui/error-state";
import { useRecentlyViewed } from "@/context/recently-viewed-context";
import { useProducts } from "@/lib/hooks/use-products";
import { SearchX, Sparkles, Clock, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategories: string[];
}

export default function ProductsClient({
  initialProducts,
  initialCategories,
}: ProductsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Read initial query params from URL
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialSort = (searchParams.get("sort") as SortOption) || "featured";
  const initialInStock = searchParams.get("inStock") === "true";

  // Use custom hook for state and fetching management
  const {
    products,
    categories,
    isLoading,
    error,
    refetch,
  } = useProducts({
    initialProducts,
    initialCategories,
  });

  // Filter and search state initialized from URL params
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [inStockOnly, setInStockOnly] = useState(initialInStock);

  // Synchronize local filter state when URL searchParams change (e.g. Back/Forward navigation)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "All";
    const sort = (searchParams.get("sort") as SortOption) || "featured";
    const inStock = searchParams.get("inStock") === "true";

    setSearchQuery(q);
    setSelectedCategory(cat);
    setSortBy(sort);
    setInStockOnly(inStock);
  }, [searchParams]);

  // Synchronize state changes to URL search params
  const updateUrlParams = useCallback(
    (query: string, category: string, sort: SortOption, inStock: boolean) => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category && category !== "All") params.set("category", category);
      if (sort && sort !== "featured") params.set("sort", sort);
      if (inStock) params.set("inStock", "true");

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Handle filter changes
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateUrlParams(query, selectedCategory, sortBy, inStockOnly);
    },
    [updateUrlParams, selectedCategory, sortBy, inStockOnly]
  );

  const handleCategoryChange = useCallback(
    (cat: ProductCategory) => {
      setSelectedCategory(cat);
      updateUrlParams(searchQuery, cat, sortBy, inStockOnly);
    },
    [updateUrlParams, searchQuery, sortBy, inStockOnly]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      updateUrlParams(searchQuery, selectedCategory, sort, inStockOnly);
    },
    [updateUrlParams, searchQuery, selectedCategory, inStockOnly]
  );

  const handleInStockChange = useCallback(
    (inStock: boolean) => {
      setInStockOnly(inStock);
      updateUrlParams(searchQuery, selectedCategory, sortBy, inStock);
    },
    [updateUrlParams, searchQuery, selectedCategory, sortBy]
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
    setInStockOnly(false);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Combine search, category, in-stock, and sort filters on live data
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      const target = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
      result = result.filter(
        (p) => p.category.toLowerCase().replace(/[^a-z0-9]/g, "") === target
      );
    }

    // In-stock only filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Search query filter (matches name, brand, description, features)
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
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  return (
    <PageContainer className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
            <Sparkles className="h-3 w-3" />
            Live Catalog
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Products
          </h1>
          <p className="mt-1 text-slate-600 text-sm max-w-xl">
            Browse our dynamically fetched selection of electronics, beauty, accessories, and tech essentials.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={handleInStockChange}
        onReset={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Error state with Retry action */}
      {error && products.length === 0 ? (
        <ErrorState
          title="Could Not Load Products"
          message={error}
          onRetry={refetch}
        />
      ) : isLoading && products.length === 0 ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
            <SearchX className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No matching products found</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            We couldn&apos;t find any products matching your current filters. Try adjusting your search query or reset filters.
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

      {/* Recently Viewed Products Section */}
      {recentlyViewed.length > 0 && (
        <section className="border-t border-slate-200 pt-10 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" />
              <h2 className="text-xl font-bold text-slate-900">Recently Viewed</h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {recentlyViewed.length} / 5 items
              </span>
            </div>

            <button
              onClick={clearRecentlyViewed}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              title="Clear recently viewed history"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {recentlyViewed.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}
