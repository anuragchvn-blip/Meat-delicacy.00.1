export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  originalPrice?: number;
  prices?: { [key: string]: number };
  discountPrices?: { [key: string]: number };
  weight: string;
  description: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  tags: string[];
  nutritionInfo?: {
    protein: string;
    fat: string;
    calories: string;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "special-cuts",
    name: "Pork Special Cuts",
    slug: "pork-special-cuts",
    description: "Premium specialty cuts perfect for special occasions",
    products: [
      {
        id: "pork-lard",
        name: "Pork Lard",
        category: "Pork Special Cuts",
        price: 239,
        originalPrice: 300,
        weight: "1kg",
        description: "High-quality pork lard perfect for cooking and baking",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-lard-1024x1024.webp",
        inStock: true,
        stockQuantity: 25,
        sku: "MDC-PL-001",
        tags: ["cooking fat", "baking", "traditional"],
        nutritionInfo: {
          protein: "0g",
          fat: "99g",
          calories: "900 per 100g",
        },
      },
      {
        id: "pork-trotters",
        name: "Pork Trotters",
        category: "Pork Special Cuts",
        price: 199,
        originalPrice: 290,
        weight: "1kg",
        description: "Traditional pork trotters, perfect for stocks and stews",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-trotters-1024x678.webp",
        inStock: true,
        stockQuantity: 15,
        sku: "MDC-PT-002",
        tags: ["collagen rich", "stock making", "traditional"],
        nutritionInfo: {
          protein: "19g",
          fat: "18g",
          calories: "240 per 100g",
        },
      },
      {
        id: "pork-head-meat",
        name: "Pork Head Meat",
        category: "Pork Special Cuts",
        price: 349,
        originalPrice: 390,
        weight: "1kg",
        description: "Premium head meat for traditional preparations",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mdc-commin-soon-1024x683.jpg",
        inStock: false,
        stockQuantity: 0,
        sku: "MDC-PHM-003",
        tags: ["specialty", "traditional", "premium"],
        nutritionInfo: {
          protein: "20g",
          fat: "15g",
          calories: "210 per 100g",
        },
      },
      {
        id: "pork-leg-without-bone",
        name: "Pork Leg (without bone)",
        category: "Pork Special Cuts",
        price: 579,
        originalPrice: 640,
        weight: "1kg",
        description: "Boneless pork leg, perfect for roasting and slow cooking",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-leg-768x1024.webp",
        inStock: true,
        stockQuantity: 12,
        sku: "MDC-PLB-004",
        tags: ["boneless", "roasting", "lean"],
        nutritionInfo: {
          protein: "26g",
          fat: "5g",
          calories: "143 per 100g",
        },
      },
      {
        id: "pork-leg-with-bone",
        name: "Pork Leg (with bone)",
        category: "Pork Special Cuts",
        price: 529,
        originalPrice: 550,
        weight: "1kg",
        description: "Bone-in pork leg for maximum flavor",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-leg-768x1024.webp",
        inStock: true,
        stockQuantity: 18,
        sku: "MDC-PLW-005",
        tags: ["bone-in", "flavorful", "traditional"],
        nutritionInfo: {
          protein: "24g",
          fat: "6g",
          calories: "150 per 100g",
        },
      },
      {
        id: "baby-back-ribs",
        name: "Baby Back Ribs",
        category: "Pork Special Cuts",
        price: 660,
        weight: "1kg",
        description: "Tender baby back ribs perfect for grilling and smoking",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/st.louis-style-spare-ribs-1024x1024.webp",
        inStock: true,
        stockQuantity: 20,
        sku: "MDC-BBR-006",
        tags: ["ribs", "grilling", "tender"],
        nutritionInfo: {
          protein: "25g",
          fat: "12g",
          calories: "210 per 100g",
        },
      },
    ],
  },
  {
    id: "raw-cuts",
    name: "Pork Raw Cuts",
    slug: "pork-raw-cuts",
    description: "Fresh, high-quality raw pork cuts for everyday cooking",
    products: [
      {
        id: "pork-premium-mince",
        name: "Pork Premium Mince",
        category: "Pork Raw Cuts",
        price: 659,
        originalPrice: 720,
        weight: "1kg",
        description: "Premium quality minced pork for versatile cooking",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-mince-1024x1024.webp",
        inStock: true,
        stockQuantity: 30,
        sku: "MDC-PPM-007",
        tags: ["minced", "versatile", "premium"],
        nutritionInfo: {
          protein: "21g",
          fat: "20g",
          calories: "263 per 100g",
        },
      },
      {
        id: "curry-cut-boneless",
        name: "Curry Cut Cubes (boneless)",
        category: "Pork Raw Cuts",
        price: 559,
        originalPrice: 620,
        weight: "1kg",
        description: "Boneless pork cubes perfect for curries and stews",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/curry-cut-1024x678.webp",
        inStock: true,
        stockQuantity: 25,
        sku: "MDC-CCB-008",
        tags: ["curry", "boneless", "cubes"],
        nutritionInfo: {
          protein: "26g",
          fat: "6g",
          calories: "154 per 100g",
        },
      },
      {
        id: "curry-cut-with-bone",
        name: "Curry Cut Cubes (with bone)",
        category: "Pork Raw Cuts",
        price: 469,
        originalPrice: 530,
        weight: "1kg",
        description: "Bone-in pork cubes for flavorful curries",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/curry-cut-1024x678.webp",
        inStock: true,
        stockQuantity: 35,
        sku: "MDC-CCW-009",
        tags: ["curry", "bone-in", "flavorful"],
        nutritionInfo: {
          protein: "24g",
          fat: "8g",
          calories: "168 per 100g",
        },
      },
    ],
  },
  {
    id: "pork-products",
    name: "Pork Products",
    slug: "pork-products",
    description: "Processed pork products including sausages, bacon, and more",
    products: [
      {
        id: "streaky-bacon",
        name: "Streaky Bacon",
        category: "Pork Products",
        price: 699,
        originalPrice: 750,
        weight: "500g",
        description: "Premium streaky bacon with perfect fat distribution",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mdc-commin-soon-1024x683.jpg",
        inStock: true,
        stockQuantity: 40,
        sku: "MDC-SB-010",
        tags: ["bacon", "breakfast", "premium"],
        nutritionInfo: {
          protein: "37g",
          fat: "42g",
          calories: "541 per 100g",
        },
      },
      {
        id: "prime-bacon",
        name: "Prime Bacon",
        category: "Pork Products",
        price: 329,
        originalPrice: 359,
        weight: "250g",
        description: "Premium cut bacon for the perfect breakfast",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mdc-commin-soon-1024x683.jpg",
        inStock: true,
        stockQuantity: 50,
        sku: "MDC-PB-011",
        tags: ["bacon", "prime", "breakfast"],
        nutritionInfo: {
          protein: "25g",
          fat: "30g",
          calories: "380 per 100g",
        },
      },
      {
        id: "mexican-chorizo",
        name: "Mexican Chorizo",
        category: "Pork Products",
        price: 385,
        weight: "250g",
        description: "Authentic Mexican-style chorizo sausage",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mdc-commin-soon-1024x683.jpg",
        inStock: true,
        stockQuantity: 30,
        sku: "MDC-MC-012",
        tags: ["chorizo", "mexican", "spicy"],
        nutritionInfo: {
          protein: "24g",
          fat: "38g",
          calories: "455 per 100g",
        },
      },
      {
        id: "pepper-sausages",
        name: "Pepper Sausages",
        category: "Pork Products",
        price: 219,
        originalPrice: 250,
        weight: "250g",
        description: "Spiced sausages with black pepper and herbs",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mdc-commin-soon-1024x683.jpg",
        inStock: true,
        stockQuantity: 45,
        sku: "MDC-PS-013",
        tags: ["sausage", "pepper", "spiced"],
        nutritionInfo: {
          protein: "20g",
          fat: "25g",
          calories: "315 per 100g",
        },
      },
    ],
  },
];

// Flatten all products for easy searching
export const allProducts: Product[] = productCategories.flatMap(
  (category) => category.products,
);

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = productCategories.find((cat) => cat.id === categoryId);
  return category ? category.products : [];
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
};

export const getInStockProducts = (): Product[] => {
  return allProducts.filter(
    (product) => product.inStock && product.stockQuantity > 0,
  );
};

export const getLowStockProducts = (threshold: number = 10): Product[] => {
  return allProducts.filter(
    (product) =>
      product.stockQuantity <= threshold && product.stockQuantity > 0,
  );
};

export const getOutOfStockProducts = (): Product[] => {
  return allProducts.filter(
    (product) => !product.inStock || product.stockQuantity === 0,
  );
};
