// src/context/CartContext.jsx
import React, { createContext, useReducer, useContext } from 'react';

// Export the context so it can be imported by useCart
export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Export the useCart hook directly from here
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};