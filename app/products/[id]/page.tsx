"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import { getProductById, getProducts } from "@/lib/data/products";
import { useCart } from "@/context/cart-context";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import ProductCard from "@/components/products/product-card";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ArrowLeft,
  PackageOpen,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items } = useCart();

  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = productId ? getProductById(productId) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // If product not found, render friendly 404
  if (!product) {
    return (
      <PageContainer className="py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="h-16 w-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
          <p className="mt-2 text-slate-600 text-sm">
            We couldn&apos;t find the product you&apos;re looking for. It may have been removed or the link is incorrect.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/products">
              <Button variant="primary" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Catalog
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const inCartItem = items.find((item) => item.product.id === product.id);
  const currentInCartQty = inCartItem?.quantity || 0;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addItem(product, quantity);
    router.push("/cart");
  };

  const relatedProducts = getProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // If fewer than 3 in same category, pad with others
  const displayRelated =
    relatedProducts.length >= 3
      ? relatedProducts
      : [
          ...relatedProducts,
          ...getProducts()
            .filter((p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id))
            .slice(0, 3 - relatedProducts.length),
        ];

  return (
    <PageContainer className="space-y-12">
      {/* Breadcrumbs navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link href="/products" className="hover:text-slate-900 transition-colors">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="default" className="bg-white/95 font-semibold shadow-xs">
                {product.category}
              </Badge>
              {discountPercent && (
                <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  Save {discountPercent}%
                </span>
              )}
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-white text-slate-900 font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Value props badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center flex flex-col items-center">
              <Truck className="h-4 w-4 text-brand-600 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">Free Express</span>
              <span className="text-[10px] text-slate-500">Orders over $100</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center flex flex-col items-center">
              <ShieldCheck className="h-4 w-4 text-brand-600 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">2-Year Warranty</span>
              <span className="text-[10px] text-slate-500">Manufacturer direct</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center flex flex-col items-center">
              <RotateCcw className="h-4 w-4 text-brand-600 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">30-Day Returns</span>
              <span className="text-[10px] text-slate-500">No questions asked</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchase Options */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                {product.brand}
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="ml-1 text-xs text-slate-500">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <Badge variant={product.inStock ? "success" : "default"}>
                {product.inStock ? `In Stock (${product.stockCount} units)` : "Sold Out"}
              </Badge>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
            {product.description}
          </p>

          {/* Key Features Bullet List */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Key Highlights & Architecture
            </h4>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="h-4 w-4 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quantity:
              </label>
              <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                  disabled={quantity >= (product.stockCount || 99) || !product.inStock}
                  className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {currentInCartQty > 0 && (
                <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                  {currentInCartQty} currently in cart
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 gap-2 text-sm shadow-md"
              >
                {addedAnimation ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="sm:w-36 text-sm font-semibold border border-slate-200"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Technical Specifications
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between px-4 py-2.5 ${
                    idx % 2 === 0 ? "bg-slate-50/70" : "bg-white"
                  } ${idx !== product.specs.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <span className="font-semibold text-slate-500">{spec.name}</span>
                  <span className="font-bold text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="border-t border-slate-200 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Related Products</h2>
            <p className="text-slate-500 text-xs">Customers also considered these premium items</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-brand-600 hover:text-brand-700">
            View All Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRelated.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
