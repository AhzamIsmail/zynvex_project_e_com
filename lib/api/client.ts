import { Product, ProductSpec } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/data/products";

const BASE_URL = "https://dummyjson.com";

export interface FetchProductsOptions {
  search?: string;
  category?: string;
  sort?: string;
  inStockOnly?: boolean;
  limit?: number;
}

/**
 * Format category slugs (e.g. "mens-watches" -> "Mens Watches")
 */
export function formatCategoryName(category: string): string {
  if (!category || category === "All") return "All";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Maps raw DummyJSON product to our application Product model
 */
function mapDummyJsonToProduct(item: any): Product {
  const price = Number(item.price) || 0;
  const discount = Number(item.discountPercentage) || 0;
  const originalPrice =
    discount > 0 ? Number((price / (1 - discount / 100)).toFixed(2)) : undefined;

  const stock = typeof item.stock === "number" ? item.stock : 10;
  const inStock = stock > 0 && item.availabilityStatus !== "Out of Stock";

  const specs: ProductSpec[] = [
    item.brand ? { name: "Brand", value: String(item.brand) } : null,
    item.sku ? { name: "SKU", value: String(item.sku) } : null,
    item.category ? { name: "Category", value: formatCategoryName(item.category) } : null,
    item.weight ? { name: "Weight", value: `${item.weight}g` } : null,
    item.dimensions
      ? {
          name: "Dimensions",
          value: `${item.dimensions.width} × ${item.dimensions.height} × ${item.dimensions.depth} cm`,
        }
      : null,
    item.warrantyInformation ? { name: "Warranty", value: String(item.warrantyInformation) } : null,
    item.shippingInformation ? { name: "Shipping", value: String(item.shippingInformation) } : null,
    item.returnPolicy ? { name: "Return Policy", value: String(item.returnPolicy) } : null,
  ].filter(Boolean) as ProductSpec[];

  const features: string[] = [
    item.warrantyInformation,
    item.shippingInformation,
    item.returnPolicy,
    item.minimumOrderQuantity
      ? `Minimum order quantity: ${item.minimumOrderQuantity} units`
      : null,
    ...(Array.isArray(item.tags) ? item.tags.map((t: string) => `Featured Tag: #${t}`) : []),
  ].filter(Boolean) as string[];

  const slug = `${(item.title || "product")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")}-${item.id}`;

  const rating = Number(item.rating) || 4.5;
  const reviewsCount = Array.isArray(item.reviews) && item.reviews.length > 0
    ? item.reviews.length * 15 + Math.floor(rating * 12)
    : 45 + Math.floor(rating * 10);

  return {
    id: String(item.id),
    name: item.title || "Untitled Product",
    slug,
    category: formatCategoryName(item.category || "General"),
    price,
    originalPrice,
    rating,
    reviewsCount,
    inStock,
    stockCount: stock,
    image: item.thumbnail || (Array.isArray(item.images) && item.images[0]) || "",
    description: item.description || "No product description available.",
    shortDescription:
      item.description && item.description.length > 120
        ? `${item.description.slice(0, 117)}...`
        : item.description || "",
    features: features.length > 0 ? features : ["Guaranteed Authentic", "Fast Dispatch"],
    specs: specs.length > 0 ? specs : [{ name: "Condition", value: "New" }],
    brand: item.brand || "Zynvex Selection",
    isFeatured: rating >= 4.5 || item.id % 3 === 0,
  };
}

/**
 * Centralized API service for all external product requests
 */
export const apiClient = {
  /**
   * Fetch all categories from API
   */
  async getCategories(): Promise<string[]> {
    try {
      const res = await fetch(`${BASE_URL}/products/category-list`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
      }

      const rawCategories: string[] = await res.json();
      const formatted = rawCategories.map((c) => formatCategoryName(c));
      return ["All", ...formatted];
    } catch (error) {
      console.warn("API getCategories failed, using fallback categories:", error);
      return ["All", "Beauty", "Fragrances", "Furniture", "Groceries", "Laptops", "Mens Watches", "Smartphones"];
    }
  },

  /**
   * Fetch products with optional search, category, sort, and pagination
   */
  async getProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
    const limit = options.limit ?? 100;
    let url = `${BASE_URL}/products?limit=${limit}`;

    // If a search query is provided, use DummyJSON's search endpoint
    if (options.search && options.search.trim()) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(options.search.trim())}&limit=${limit}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    let products: Product[] = (data.products || []).map(mapDummyJsonToProduct);

    // Filter by category if specified and not "All"
    if (options.category && options.category !== "All") {
      const targetCat = options.category.toLowerCase().replace(/[^a-z0-9]/g, "");
      products = products.filter((p) => {
        const itemCat = p.category.toLowerCase().replace(/[^a-z0-9]/g, "");
        return itemCat === targetCat;
      });
    }

    // Filter by inStock if requested
    if (options.inStockOnly) {
      products = products.filter((p) => p.inStock);
    }

    // Apply sorting
    if (options.sort) {
      switch (options.sort) {
        case "price-asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating-desc":
          products.sort((a, b) => b.rating - a.rating);
          break;
        case "name-asc":
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "featured":
        default:
          products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return products;
  },

  /**
   * Fetch a single product by numeric or string ID (with slug/mock fallback)
   */
  async getProductById(id: string): Promise<Product | null> {
    if (!id) return null;

    // Check if ID is numeric (DummyJSON format)
    const numericId = parseInt(id, 10);

    if (!isNaN(numericId) && numericId > 0) {
      try {
        const res = await fetch(`${BASE_URL}/products/${numericId}`, {
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const item = await res.json();
          return mapDummyJsonToProduct(item);
        }
      } catch (err) {
        console.warn(`Failed fetching product ${id} from API, checking fallback:`, err);
      }
    }

    // Check local fallback / mock data for slug or non-numeric id
    const mock = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
    if (mock) {
      return mock;
    }

    return null;
  },

  /**
   * Fetch featured products for homepage and highlights
   */
  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    try {
      const all = await this.getProducts({ limit: 30 });
      const featured = all.filter((p) => p.isFeatured);
      return featured.slice(0, limit);
    } catch (err) {
      console.warn("Failed fetching featured products from API, using fallback:", err);
      return MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
    }
  },
};
