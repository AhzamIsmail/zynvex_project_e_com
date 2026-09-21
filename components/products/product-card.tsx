"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Star, ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();

  const cartItem = items.find((item) => item.product.id === product.id);
  const inCartCount = cartItem?.quantity || 0;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (product.inStock) {
        addItem(product, 1);
      }
    },
    [addItem, product]
  );

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-300 transition-all duration-200 flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        {/* Product Image Container */}
        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
          {/* Next.js Optimized Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
            <Badge variant="default" className="bg-white/90 backdrop-blur-xs font-semibold text-slate-800 shadow-xs">
              {product.category}
            </Badge>

            {discountPercent && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white text-slate-900 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
              <span>{product.brand}</span>
              <span>•</span>
              <div className="flex items-center text-amber-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="ml-1 font-semibold text-slate-700">{product.rating}</span>
                <span className="ml-1 text-slate-400">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>

            <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Price and Cart Action */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-emerald-600">
                {product.inStock ? "In Stock" : "Unavailable"}
              </span>
            </div>

            <Button
              variant={inCartCount > 0 ? "secondary" : "primary"}
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-1.5 whitespace-nowrap shadow-xs"
              title={product.inStock ? "Add to cart" : "Out of stock"}
            >
              {inCartCount > 0 ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>In Cart ({inCartCount})</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>Add</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ProductCard;
