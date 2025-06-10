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
  openCart: () => void;
  closeCart: () => void;
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

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("meatDelicacyCart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        console.log("Cart loaded from localStorage:", parsed);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("meatDelicacyCart", JSON.stringify(cartItems));
      console.log("Cart saved to localStorage:", cartItems);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedWeight?: string,
  ) => {
    console.log("Adding to cart:", { product, quantity, selectedWeight });

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
        console.log("Updated existing item:", updatedItems);
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: Date.now() + Math.random(),
          product,
          quantity,
          selectedWeight: selectedWeight || "1kg",
        };
        const updatedItems = [...prevItems, newItem];
        console.log("Added new item:", updatedItems);
        return updatedItems;
      }
    });

    // Auto-open cart when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      console.log("Removed item:", updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );
      console.log("Updated quantity:", updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    console.log("Cart cleared");
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const openCart = () => {
    console.log("Opening cart");
    setIsCartOpen(true);
  };

  const closeCart = () => {
    console.log("Closing cart");
    setIsCartOpen(false);
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
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
