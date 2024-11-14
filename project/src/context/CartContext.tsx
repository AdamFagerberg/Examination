import { createContext, ReactNode, useContext, useState } from "react";

const CartContext = createContext<CartContext | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode | ReactNode[];
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cartOrder, setCartOrder] = useState<CartOrder>({ items: [] });
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem): void => {
    setCartOrder((prev) => ({
      items: [...prev.items, item.id],
    }));

    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (id: number): void => {
    setCartOrder((prev) => {
      const copy = [...prev.items];
      copy.splice(copy.indexOf(id), 1);

      if (!copy.includes(id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      }

      return { items: copy };
    });
  };

  const clearCart = (): void => {
    setCartOrder({ items: [] });
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartOrder, cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContext {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
