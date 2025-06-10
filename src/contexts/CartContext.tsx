import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../data/products";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedWeight?: string,
  ) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("meatDelicacyCart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log("Loading cart from localStorage:", parsed);
        setCartItems(parsed);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    console.log("Saving cart to localStorage:", cartItems);
    localStorage.setItem("meatDelicacyCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedWeight?: string,
  ) => {
    console.log("CartContext - Adding to cart:", {
      product,
      quantity,
      selectedWeight,
    });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedWeight === selectedWeight,
      );

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.product.id === product.id &&
          item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        console.log("Updated existing item, new cart:", updatedItems);
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: Date.now() + Math.random(),
          product,
          quantity,
          selectedWeight,
        };
        const updatedItems = [...prevItems, newItem];
        console.log("Added new item, new cart:", updatedItems);
        return updatedItems;
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      console.log("Removed item, new cart:", newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );
      console.log("Updated quantity, new cart:", newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCartItems([]);
  };

  const getTotalItems = () => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log("Total items:", total, "from cart:", cartItems);
    return total;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
