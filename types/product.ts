export type ProductCategory =
  | "All"
  | "Audio"
  | "Wearables"
  | "Accessories"
  | "Computers"
  | "Photography";

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Audio" | "Wearables" | "Accessories" | "Computers" | "Photography";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  description: string;
  shortDescription: string;
  features: string[];
  specs: ProductSpec[];
  brand: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

export interface FilterState {
  searchQuery: string;
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}
