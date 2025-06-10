import { useState, useEffect } from "react";
import { Product } from "../data/products";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("meatDelicacyCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("meatDelicacyCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
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
        console.log("Updated cart items:", updatedItems);
        return updatedItems;
      } else {
        const newItem = {
          id: Date.now(),
          product,
          quantity,
          selectedWeight,
        };
        const updatedItems = [...prevItems, newItem];
        console.log("New cart items:", updatedItems);
        return updatedItems;
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.selectedWeight
        ? item.product.prices[item.selectedWeight] || item.product.price
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getDiscountedPrice = (item: CartItem) => {
    const price = item.selectedWeight
      ? item.product.prices[item.selectedWeight] || item.product.price
      : item.product.price;

    if (item.product.discountPrice) {
      const discountPrice = item.selectedWeight
        ? item.product.discountPrices?.[item.selectedWeight] ||
          item.product.discountPrice
        : item.product.discountPrice;
      return discountPrice;
    }
    return price;
  };

  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.selectedWeight
        ? item.product.prices[item.selectedWeight] || item.product.price
        : item.product.price;
      const discountedPrice = getDiscountedPrice(item);
      return total + (originalPrice - discountedPrice) * item.quantity;
    }, 0);
  };

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
