import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { apiClient } from "@/lib/api/client";
import ProductDetailClient from "@/components/products/product-detail-client";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";

export const revalidate = 60;

interface ProductDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = params?.id ? await apiClient.getProductById(params.id) : null;
  if (!product) {
    return {
      title: "Product Details",
      description: "Explore product specifications, warranty, and customer reviews.",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Kartify Store`,
      description: product.shortDescription,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
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
