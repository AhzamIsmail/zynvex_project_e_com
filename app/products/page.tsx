import React, { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { apiClient } from "@/lib/api/client";
import ProductsClient from "@/components/products/products-client";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

export default async function ProductsPage() {
  // Fetch initial catalog data on the server for fast initial paint and SEO
  const [initialProducts, initialCategories] = await Promise.all([
    apiClient.getProducts(),
    apiClient.getCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <PageContainer className="space-y-8">
          <div className="h-20 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </PageContainer>
      }
    >
      <ProductsClient
        initialProducts={initialProducts}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
