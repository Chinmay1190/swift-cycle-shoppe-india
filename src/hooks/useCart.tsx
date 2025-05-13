
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

type CartAction = 
  | { type: "ADD_ITEM"; product: Product; quantity: number; color: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => 
      total + 
      ((item.product.onSale && item.product.salePrice 
        ? item.product.salePrice 
        : item.product.price) * item.quantity),
    0
  );
  
  return { totalItems, subtotal };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, color } = action;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.color === color
      );
      
      let newItems;
      
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, quantity, color }];
      }
      
      const { totalItems, subtotal } = calculateTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
      };
    }
    
    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action;
      const newItems = state.items.map((item) =>
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      );
      
      const { totalItems, subtotal } = calculateTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
      };
    }
    
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.productId
      );
      
      const { totalItems, subtotal } = calculateTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
      };
    }
    
    case "CLEAR_CART": {
      return initialState;
    }
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, color: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
  
  const addToCart = (product: Product, quantity: number, color: string) => {
    dispatch({ type: "ADD_ITEM", product, quantity, color });
    toast.success(`${product.name} added to cart!`);
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
    toast.info("Item removed from cart");
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.info("Cart cleared");
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};
