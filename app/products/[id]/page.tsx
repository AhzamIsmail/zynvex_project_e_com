import React, { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { apiClient } from "@/lib/api/client";
import ProductDetailClient from "@/components/products/product-detail-client";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";

export const revalidate = 60;

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = params?.id;

  // Server-side fetch for initial product information
  const product = productId ? await apiClient.getProductById(productId) : null;

  let relatedProducts: Product[] = [];
  if (product) {
    try {
      const allRelated = await apiClient.getProducts({
        category: product.category,
        limit: 6,
      });
      relatedProducts = allRelated.filter((p) => p.id !== product.id).slice(0, 3);
    } catch {
      relatedProducts = [];
    }
  }

  return (
    <Suspense
      fallback={
        <PageContainer className="py-8">
          <ProductDetailSkeleton />
        </PageContainer>
      }
    >
      <ProductDetailClient
        productId={productId}
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
      />
    </Suspense>
  );
}
