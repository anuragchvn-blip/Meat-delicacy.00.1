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
        id: 1,
        name: "Pork Lard",
        category: "Pork Special Cuts",
        price: 300,
        discountPrice: 239,
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
        id: 2,
        name: "Pork Trotters",
        category: "Pork Special Cuts",
        price: 290,
        discountPrice: 199,
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
        id: 3,
        name: "Pork Tenderloin",
        category: "Pork Special Cuts",
        price: 650,
        discountPrice: 599,
        weight: "500g",
        description: "Premium tender cut, perfect for grilling and roasting",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-tenderloin-1024x1024.webp",
        inStock: true,
        stockQuantity: 20,
        sku: "MDC-PTL-003",
        tags: ["tender", "premium", "grilling"],
        nutritionInfo: {
          protein: "26g",
          fat: "3g",
          calories: "143 per 100g",
        },
      },
      {
        id: 4,
        name: "Pork Ribs",
        category: "Pork Special Cuts",
        price: 450,
        discountPrice: 399,
        weight: "1kg",
        description: "Juicy pork ribs perfect for BBQ and slow cooking",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-ribs-1024x1024.webp",
        inStock: true,
        stockQuantity: 18,
        sku: "MDC-PR-004",
        tags: ["BBQ", "ribs", "slow cooking"],
        nutritionInfo: {
          protein: "20g",
          fat: "20g",
          calories: "250 per 100g",
        },
      },
    ],
  },
  {
    id: "raw-cuts",
    name: "Pork Raw Cuts",
    slug: "pork-raw-cuts",
    description: "Fresh raw cuts for everyday cooking",
    products: [
      {
        id: 5,
        name: "Curry Cut Cubes (with bone)",
        category: "Pork Raw Cuts",
        price: 380,
        discountPrice: 320,
        weight: "1kg",
        description:
          "Perfect cubes with bone for traditional curry preparations",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/curry-cut-bone-1024x1024.webp",
        inStock: true,
        stockQuantity: 30,
        sku: "MDC-CCB-005",
        tags: ["curry", "bone-in", "traditional"],
        nutritionInfo: {
          protein: "22g",
          fat: "15g",
          calories: "212 per 100g",
        },
      },
      {
        id: 6,
        name: "Curry Cut Cubes (boneless)",
        category: "Pork Raw Cuts",
        price: 420,
        discountPrice: 380,
        weight: "1kg",
        description: "Boneless cubes perfect for quick curry preparations",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/curry-cut-boneless-1024x1024.webp",
        inStock: true,
        stockQuantity: 25,
        sku: "MDC-CCL-006",
        tags: ["curry", "boneless", "quick cooking"],
        nutritionInfo: {
          protein: "25g",
          fat: "12g",
          calories: "200 per 100g",
        },
      },
      {
        id: 7,
        name: "Pork Shoulder",
        category: "Pork Raw Cuts",
        price: 350,
        discountPrice: 299,
        weight: "1kg",
        description: "Versatile shoulder cut perfect for roasting and stewing",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-shoulder-1024x1024.webp",
        inStock: true,
        stockQuantity: 20,
        sku: "MDC-PS-007",
        tags: ["shoulder", "roasting", "stewing"],
        nutritionInfo: {
          protein: "20g",
          fat: "18g",
          calories: "242 per 100g",
        },
      },
      {
        id: 8,
        name: "Pork Belly",
        category: "Pork Raw Cuts",
        price: 450,
        discountPrice: 399,
        weight: "1kg",
        description: "Rich and fatty belly cut, perfect for bacon and roasting",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-belly-1024x1024.webp",
        inStock: true,
        stockQuantity: 15,
        sku: "MDC-PB-008",
        tags: ["belly", "bacon", "roasting"],
        nutritionInfo: {
          protein: "14g",
          fat: "53g",
          calories: "518 per 100g",
        },
      },
    ],
  },
  {
    id: "products",
    name: "Pork Products",
    slug: "pork-products",
    description: "Processed pork products and sausages",
    products: [
      {
        id: 9,
        name: "Prime Bacon",
        category: "Pork Products",
        price: 359,
        discountPrice: 329,
        weight: "250g",
        description: "Premium quality bacon strips, perfect for breakfast",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/prime-bacon-1024x1024.webp",
        inStock: true,
        stockQuantity: 40,
        sku: "MDC-PB-009",
        tags: ["bacon", "breakfast", "premium"],
        nutritionInfo: {
          protein: "12g",
          fat: "42g",
          calories: "458 per 100g",
        },
      },
      {
        id: 10,
        name: "Pepper Sausages",
        category: "Pork Products",
        price: 280,
        discountPrice: 250,
        weight: "500g",
        description: "Spicy pepper sausages perfect for grilling",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/pepper-sausages-1024x1024.webp",
        inStock: true,
        stockQuantity: 35,
        sku: "MDC-PS-010",
        tags: ["sausage", "spicy", "grilling"],
        nutritionInfo: {
          protein: "15g",
          fat: "25g",
          calories: "301 per 100g",
        },
      },
      {
        id: 11,
        name: "Mexican Chorizo",
        category: "Pork Products",
        price: 320,
        discountPrice: 289,
        weight: "400g",
        description: "Authentic Mexican-style chorizo with traditional spices",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/mexican-chorizo-1024x1024.webp",
        inStock: true,
        stockQuantity: 22,
        sku: "MDC-MC-011",
        tags: ["chorizo", "mexican", "spiced"],
        nutritionInfo: {
          protein: "14g",
          fat: "38g",
          calories: "455 per 100g",
        },
      },
      {
        id: 12,
        name: "Breakfast Sausages",
        category: "Pork Products",
        price: 240,
        discountPrice: 199,
        weight: "500g",
        description: "Mild breakfast sausages perfect for morning meals",
        image:
          "https://meatdelicacy.com/wp-content/uploads/2024/12/breakfast-sausages-1024x1024.webp",
        inStock: true,
        stockQuantity: 30,
        sku: "MDC-BS-012",
        tags: ["breakfast", "mild", "morning"],
        nutritionInfo: {
          protein: "13g",
          fat: "22g",
          calories: "268 per 100g",
        },
      },
    ],
  },
];
