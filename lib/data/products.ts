import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Aura Noise-Canceling Wireless Headphones",
    slug: "aura-noise-canceling-wireless-headphones",
    category: "Audio",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Flagship active noise-canceling headphones with 40-hour battery life and spatial audio.",
    description: "Engineered for pure acoustic immersion, the Aura Wireless Headphones deliver studio-grade sound reproduction powered by custom 40mm titanium drivers. Featuring adaptive active noise cancellation, intuitive touch controls, and ultra-plush memory foam earcups for all-day comfort.",
    features: [
      "Adaptive Hybrid Active Noise Cancellation",
      "Up to 40 hours of continuous playback with fast USB-C charge",
      "High-fidelity 40mm dynamic drivers with LDAC codec support",
      "Multi-point Bluetooth 5.3 connectivity for seamless device switching",
      "Quad-beamforming microphones for crystal-clear voice calls"
    ],
    specs: [
      { name: "Driver Size", value: "40mm Titanium" },
      { name: "Frequency Response", value: "20Hz - 40,000Hz" },
      { name: "Battery Life", value: "40 Hours (ANC On)" },
      { name: "Weight", value: "250g" },
      { name: "Connectivity", value: "Bluetooth 5.3 / 3.5mm Aux" }
    ],
    brand: "AuraSound",
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Pulse Smartwatch Ultra Pro",
    slug: "pulse-smartwatch-ultra-pro",
    category: "Wearables",
    price: 399.00,
    originalPrice: 449.00,
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Rugged aerospace-grade titanium smartwatch with precision dual-band GPS and ECG tracking.",
    description: "The Pulse Smartwatch Ultra Pro is designed for athletes, adventurers, and professionals. Features an ultra-bright 2000-nit sapphire crystal OLED display, continuous health metrics monitoring, offline topo maps, and up to 7 days of power on a single charge.",
    features: [
      "Aerospace titanium case with sapphire crystal glass",
      "Continuous ECG, SpO2, and advanced sleep architecture monitoring",
      "Dual-frequency precision GPS with offline route navigation",
      "100m water resistance rating (10 ATM)",
      "Over 120 dedicated workout profiles and recovery analytics"
    ],
    specs: [
      { name: "Case Material", value: "Grade 5 Titanium" },
      { name: "Display", value: "1.92-inch AMOLED, 2000 nits" },
      { name: "Battery Life", value: "7 Days (Smart Mode)" },
      { name: "Water Resistance", value: "10 ATM / 100m" },
      { name: "Compatibility", value: "iOS & Android" }
    ],
    brand: "PulseTech",
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Apex Mechanical Gaming Keyboard RGB",
    slug: "apex-mechanical-gaming-keyboard-rgb",
    category: "Computers",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewsCount: 235,
    inStock: true,
    stockCount: 25,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Hot-swappable linear mechanical keyboard with per-key RGB and CNC aluminum body.",
    description: "Crafted for speed, responsiveness, and aesthetic excellence. The Apex Mechanical Keyboard features pre-lubed linear switches, sound-dampening silicone gaskets, double-shot PBT keycaps, and customizable OLED status display.",
    features: [
      "Hot-swappable 5-pin PCB supporting all standard MX switches",
      "Gasket-mounted acoustic dampening architecture",
      "Per-key south-facing RGB illumination with onboard profiles",
      "Aircraft-grade CNC machined aluminum chassis",
      "Tri-mode connectivity: 2.4GHz Wireless, Bluetooth 5.2, USB-C"
    ],
    specs: [
      { name: "Switch Type", value: "Custom Linear (Pre-lubed)" },
      { name: "Layout", value: "75% Compact (82 Keys)" },
      { name: "Polling Rate", value: "1000Hz (1ms)" },
      { name: "Keycaps", value: "Double-Shot PBT Cherry Profile" },
      { name: "Weight", value: "980g" }
    ],
    brand: "ApexForge",
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Lumina 4K Mirrorless Cinema Camera",
    slug: "lumina-4k-mirrorless-cinema-camera",
    category: "Photography",
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockCount: 7,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Full-frame 4K/120fps cinema camera with 5-axis in-body image stabilization.",
    description: "Capture cinematic masterpieces with the Lumina 4K Mirrorless Camera. Featuring a back-illuminated 33MP full-frame sensor, 15+ stops of dynamic range, AI-powered real-time subject autofocus, and dual UHS-II / CFexpress slots.",
    features: [
      "33MP Full-Frame Exmor R CMOS Sensor",
      "4K 120p 10-bit 4:2:2 video recording internally",
      "759-point AI subject tracking real-time phase-detection autofocus",
      "5-axis active in-body sensor shift stabilization",
      "Variable angle touchscreen LCD with full weather sealing"
    ],
    specs: [
      { name: "Sensor", value: "33MP Full-Frame CMOS" },
      { name: "ISO Range", value: "100 - 51,200 (Exp. 50-204,800)" },
      { name: "Video Max", value: "4K UHD at 120fps" },
      { name: "Storage", value: "Dual CFexpress Type A / SD UHS-II" },
      { name: "Weight", value: "658g (Body only)" }
    ],
    brand: "LuminaOptics",
    isFeatured: true
  },
  {
    id: "prod-5",
    name: "Terra Minimalist Leather Laptop Sleeve",
    slug: "terra-minimalist-leather-laptop-sleeve",
    category: "Accessories",
    price: 79.50,
    originalPrice: 95.00,
    rating: 4.6,
    reviewsCount: 89,
    inStock: true,
    stockCount: 30,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Handcrafted full-grain Italian leather sleeve with microfiber interior padding.",
    description: "Sleek, durable, and refined. The Terra Leather Laptop Sleeve is crafted from vegetable-tanned full-grain leather that patinas beautifully over time. Features magnetic flap closure and a hidden stylus/pen holder.",
    features: [
      "100% full-grain vegetable-tanned certified leather",
      "Ultra-soft microfiber scratch-resistant inner lining",
      "Secure magnetic invisible closure",
      "Rear external compartment for cables and slim notebooks",
      "Fits laptops up to 15.6-inch form factor"
    ],
    specs: [
      { name: "Material", value: "Full-Grain Italian Leather" },
      { name: "Compatibility", value: "13\" - 16\" Laptops" },
      { name: "Dimensions", value: "36cm x 26cm x 1.8cm" },
      { name: "Closure", value: "Magnetic Seamless Lock" },
      { name: "Color", value: "Cognac Tan" }
    ],
    brand: "TerraCraft",
    isFeatured: false
  },
  {
    id: "prod-6",
    name: "SonicStream Studio Condenser Microphone",
    slug: "sonicstream-studio-condenser-microphone",
    category: "Audio",
    price: 189.00,
    originalPrice: 219.00,
    rating: 4.7,
    reviewsCount: 112,
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Broadcast-grade 24-bit/192kHz USB/XLR cardioid condenser microphone with shock mount.",
    description: "Designed for streamers, podcasters, and studio vocalists. The SonicStream delivers pristine vocal reproduction with switchable polar patterns, built-in analog limiter, and zero-latency headphone monitoring output.",
    features: [
      "Dual USB-C and XLR professional audio outputs",
      "High-resolution 24-bit / 192kHz digital audio conversion",
      "Four selectable polar patterns: Cardioid, Omnidirectional, Figure-8, Stereo",
      "Integrated pop filter and heavy-duty internal shock-absorbing mount",
      "Tap-to-mute sensor with LED status ring indicator"
    ],
    specs: [
      { name: "Capsule", value: "3x 14mm Custom Condenser" },
      { name: "Sample Rate", value: "192kHz / 24-bit" },
      { name: "Frequency Range", value: "20Hz - 20kHz" },
      { name: "Max SPL", value: "120dB" },
      { name: "Connection", value: "USB-C & XLR 3-pin" }
    ],
    brand: "AuraSound",
    isFeatured: false
  },
  {
    id: "prod-7",
    name: "ErgoFlow Precision Ergonomic Wireless Mouse",
    slug: "ergoflow-precision-ergonomic-wireless-mouse",
    category: "Computers",
    price: 99.00,
    originalPrice: 119.00,
    rating: 4.8,
    reviewsCount: 178,
    inStock: true,
    stockCount: 22,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Sculpted ergonomic vertical mouse designed to reduce wrist fatigue and maximize productivity.",
    description: "Engineered with biometric ergonomics to place your hand in a natural 57° handshake posture. Equipped with MagSpeed electromagnetic scrolling, customizable thumb gestures, and an 8000 DPI sensor that tracks on any surface including glass.",
    features: [
      "57-degree natural handshake ergonomic angle",
      "MagSpeed electromagnetic scroll wheel with hyper-fast mode",
      "Darkfield 8000 DPI high-precision sensor works on glass",
      "Multi-device Easy-Switch pairing up to 3 workstations",
      "70-day battery life with 1-minute quick charge for 3 hours use"
    ],
    specs: [
      { name: "DPI Range", value: "200 - 8000 DPI" },
      { name: "Buttons", value: "7 Programmable Keys" },
      { name: "Wireless Range", value: "10 meters" },
      { name: "Battery", value: "500mAh Rechargeable Li-Po" },
      { name: "Weight", value: "141g" }
    ],
    brand: "ApexForge",
    isFeatured: false
  },
  {
    id: "prod-8",
    name: "Horizon Pro Anodized Aluminum MagSafe Stand",
    slug: "horizon-pro-anodized-aluminum-magsafe-stand",
    category: "Accessories",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewsCount: 76,
    inStock: false,
    stockCount: 0,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80",
    shortDescription: "Weighted CNC aluminum 3-in-1 wireless fast charging stand for phone, watch, and earbuds.",
    description: "Declutter your workspace with the Horizon Pro Stand. Delivers 15W fast wireless charging with strong magnetic alignment, dual-angle pivot arm, and a solid weighted base with anti-slip silicone feet.",
    features: [
      "Official 15W MagSafe high-speed wireless charging",
      "Simultaneously charges Phone, Smartwatch, and Wireless Earbuds",
      "Solid weighted base keeps stand secure when lifting device",
      "360-degree rotation for portrait and landscape viewing",
      "Integrated LED power indicator with gentle ambient mode"
    ],
    specs: [
      { name: "Output Power", value: "15W + 5W + 5W (25W Max)" },
      { name: "Material", value: "Space Gray Anodized Aluminum" },
      { name: "Input", value: "USB-C PD 30W+" },
      { name: "Weight", value: "420g" },
      { name: "Certification", value: "Qi Certified, RoHS, CE" }
    ],
    brand: "TerraCraft",
    isFeatured: false
  }
];

export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export function getCategories(): string[] {
  return ["All", "Audio", "Wearables", "Accessories", "Computers", "Photography"];
}
