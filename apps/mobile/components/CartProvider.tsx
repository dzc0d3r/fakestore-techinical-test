// components/CartProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  deleteFromCart: (itemId: number) => void;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    loadCart();
  }, []);

  const saveCart = async (items: CartItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    let newItems;

    if (existingItem) {
      newItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    } else {
      newItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(newItems);
    saveCart(newItems);
  };

  const removeFromCart = (item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    let newItems;

    if (existingItem?.quantity === 1) {
      newItems = cartItems.filter((i) => i.id !== item.id);
    } else {
      newItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    }

    setCartItems(newItems);
    saveCart(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  const deleteFromCart = (itemId: number) => {
    const newItems = cartItems.filter((i) => i.id !== itemId);
    setCartItems(newItems);
    saveCart(newItems);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
