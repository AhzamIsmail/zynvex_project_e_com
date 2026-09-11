"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { apiClient, FetchProductsOptions } from "@/lib/api/client";

interface UseProductsOptions extends FetchProductsOptions {
  initialProducts?: Product[];
  initialCategories?: string[];
  autoFetch?: boolean;
}

interface UseProductsResult {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to manage external product and category fetching, loading, error, and refetch states
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const {
    initialProducts,
    initialCategories,
    autoFetch = true,
    ...fetchOptions
  } = options;

  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [categories, setCategories] = useState<string[]>(initialCategories || ["All"]);
  const [isLoading, setIsLoading] = useState<boolean>(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        apiClient.getProducts(fetchOptions),
        categories.length > 1 && initialCategories
          ? Promise.resolve(categories)
          : apiClient.getCategories(),
      ]);

      setProducts(fetchedProducts);
      if (fetchedCategories && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
      }
    } catch (err: any) {
      console.error("useProducts: failed to fetch products:", err);
      setError(
        err?.message || "Unable to retrieve products. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchOptions.search, fetchOptions.category, fetchOptions.sort, fetchOptions.inStockOnly]);

  useEffect(() => {
    // If no initial products provided or if autoFetch is forced, fetch on mount
    if (!initialProducts || initialProducts.length === 0) {
      if (autoFetch) {
        fetchProductsData();
      }
    }
  }, [fetchProductsData, autoFetch, initialProducts]);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch: fetchProductsData,
  };
}

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to manage fetching a single product by ID
 */
export function useProduct(id: string, initialProduct?: Product | null): UseProductResult {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialProduct);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.getProductById(id);
      setProduct(data);
    } catch (err: any) {
      console.error(`useProduct: failed to fetch product ${id}:`, err);
      setError(err?.message || "Failed to load product details.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!initialProduct) {
      fetchProduct();
    }
  }, [id, fetchProduct, initialProduct]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
}
