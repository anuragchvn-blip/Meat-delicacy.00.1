import { useState, useEffect, useCallback } from "react";
import { Product } from "../data/products";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

const CART_STORAGE_KEY = "meatDelicacyCart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log("Loading cart from localStorage:", parsedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", cartItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1, selectedWeight?: string) => {
      console.log("Adding to cart:", { product, quantity, selectedWeight });

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) =>
            item.product.id === product.id &&
            item.selectedWeight === selectedWeight,
        );

        let newItems;
        if (existingItem) {
          newItems = prevItems.map((item) =>
            item.product.id === product.id &&
            item.selectedWeight === selectedWeight
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        } else {
          const newItem: CartItem = {
            id: Date.now() + Math.random(), // Ensure unique ID
            product,
            quantity,
            selectedWeight,
          };
          newItems = [...prevItems, newItem];
        }

        console.log("New cart state:", newItems);
        return newItems;
      });
    },
    [],
  );

  const removeFromCart = useCallback((itemId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      console.log("Removing from cart, new state:", newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback(
    (itemId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCartItems((prevItems) => {
        const newItems = prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        );
        console.log("Updating quantity, new state:", newItems);
        return newItems;
      });
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    console.log("Clearing cart");
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log("Total items:", total, "Cart items:", cartItems);
    return total;
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      let price = item.product.price;

      // Use discount price if available
      if (item.product.discountPrice) {
        price = item.product.discountPrice;
      }

      // Check for weight-specific pricing if available
      if (item.selectedWeight && item.product.prices?.[item.selectedWeight]) {
        price = item.product.prices[item.selectedWeight];
      }

      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const getDiscountedPrice = useCallback((item: CartItem) => {
    if (item.product.discountPrice) {
      return item.product.discountPrice;
    }

    if (item.selectedWeight && item.product.prices?.[item.selectedWeight]) {
      return item.product.prices[item.selectedWeight];
    }

    return item.product.price;
  }, []);

  const getTotalDiscount = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const originalPrice =
        item.selectedWeight && item.product.prices?.[item.selectedWeight]
          ? item.product.prices[item.selectedWeight]
          : item.product.price;
      const discountedPrice = getDiscountedPrice(item);
      return total + (originalPrice - discountedPrice) * item.quantity;
    }, 0);
  }, [cartItems, getDiscountedPrice]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalDiscount,
    getDiscountedPrice,
    isOpen,
    setIsOpen,
  };
};
