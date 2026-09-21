# Kartify - Modern E-Commerce Dashboard & Storefront

A production-grade, full-stack e-commerce storefront and store operations management dashboard built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## Features Matrix

### 🛍️ Storefront & Catalog
- **Dynamic Catalog Fetching**: Integrates with live DummyJSON endpoints with fallback to local mock data for zero downtime.
- **Search & Multi-Facet Filtering**: Real-time keyword search (name, brand, features) combined with category chips and in-stock toggle.
- **Dynamic Sorting**: Instant client-side sorting by featured status, price (low-to-high, high-to-low), customer rating, and alphabetical name.
- **Product Detail Views (`/products/[id]`)**: Deep specifications table, key highlights, warranty badges, and category-based related products.
- **Recently Viewed Products**: Tracks up to 5 recently viewed items stored in `localStorage` with clear history controls.

### 🛒 Cart & Checkout Experience (`/cart`)
- **Real-Time State Synchronization**: Instant quantity adjustments, subtotal calculations, and item deletion.
- **Promotional Discounts**: Coupon voucher code engine (`SAVE10`, `ZYNVEX20`, `WELCOME15`, `FREESHIP`) with instant feedback.
- **Free Shipping Calculator**: Visual progress meter showing distance to unlocking free express shipping.
- **Encrypted Checkout Flow**: Code-split, simulated checkout dialog with order confirmation and transaction ID generation.

### 📊 Management Dashboard (`/dashboard`)
- **Key Performance Indicators**: Real-time stat cards tracking gross revenue, active orders, customer count, and conversion rate.
- **Transaction Logs**: Recent customer orders table with order IDs, timestamps, amounts, and badges.
- **Operations & Reporting**: Quick category inventory breakdown and on-demand sales report export modal.

### 👤 User Account & Preferences (`/profile`)
- **Real-Time Form Validation**: Instant character limits, email format validation, and field blur states.
- **Persistence**: Local storage hydration and persistence for profile name, role, email, phone, bio, and alerts.
- **Settings Tabs**: Segregated sections for Personal Details, Security, and Notifications.

### ⚡ Performance & Polish
- **Next.js Image Optimization**: AVIF/WebP image delivery using Next.js `<Image>` with responsive sizing (`sizes`), proper aspect ratios, and priority loading for LCP elements.
- **Code Splitting & Lazy Loading**: Modals and heavy checkout dialogs loaded on demand with `next/dynamic` (`ssr: false`).
- **Render Optimization**: High-frequency components (`ProductCard`, `CartItemRow`, `ProductFilters`) wrapped in `React.memo` with memoized handlers (`useCallback`) and calculations (`useMemo`).
- **Resilience & Error Boundaries**: Global React `ErrorBoundary` wrapping the layout, plus App Router `app/error.tsx` and custom-branded `app/not-found.tsx` (404) page.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter card metadata, viewport settings, and dynamic `generateMetadata` on product pages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with PostCSS & Autoprefixer |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API (`CartContext`, `RecentlyViewedContext`) with LocalStorage sync |
| **Linting & Quality** | ESLint with `eslint-config-next` (Core Web Vitals) |

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd zynvex-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm run dev` — Starts Next.js development server with hot module replacement at port 3000.
- `npm run build` — Compiles and optimizes production build with static generation and type checking.
- `npm run start` — Runs the compiled production server locally.
- `npm run lint` — Runs ESLint checks adhering to Next.js Core Web Vitals guidelines.

---

## Responsive Breakpoints & Cross-Browser Support

Kartify is verified across modern browsers (Chrome, Firefox, Safari, Edge) and designed across three primary device viewports:

- **Mobile (< 640px)**: Collapsible slide-down navigation drawer, single-column product grids, horizontally scrollable data tables, and touch-optimized quantity steppers.
- **Tablet (640px – 1024px)**: Two-column product grids, wrapped filter chips, and responsive summary sidebars.
- **Desktop (> 1024px)**: Four-column catalog grids, fixed management sidebar navigation, and sticky order summary checkout panel.

---

## Production Deployment

This application is ready for zero-configuration deployment on [Vercel](https://vercel.com/):

1. Push your code to a Git repository (GitHub / GitLab / Bitbucket).
2. Import the project into Vercel.
3. Vercel automatically detects Next.js, executes `npm run build`, and deploys edge-cached static pages with automatic SSL and global CDN distribution.

---

## License

MIT License. Designed and engineered for high-performance e-commerce experiences.
