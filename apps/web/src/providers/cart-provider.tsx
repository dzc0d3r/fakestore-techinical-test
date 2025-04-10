"use client"
import type { ReactNode } from 'react';
import  { createContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

interface CartProviderProps {
  children: ReactNode;
}

// Create the context with a default value
export const CartContext = createContext({} as CartContextValue);

export function CartProvider ({ children } : CartProviderProps): React.JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = typeof localStorage !== 'undefined' ? localStorage.getItem('cartItems') : null;
    return storedCartItems ? (JSON.parse(storedCartItems) as CartItem[]) : [];
  });

  const addToCart = (item: CartItem): void => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: CartItem): void => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems) as CartItem[]);
    }
  }, []);

  return (
    <CartContext.Provider

      value={
        {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        }
      }
    >
      {children}
    </CartContext.Provider>
  );
};
