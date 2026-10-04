import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique ID combination like productId-color-hook
  productId: string;
  name: string;
  price: number;
  color: string;
  hook: string;
  qty: number;
  img: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(i => i.id === item.id);
          if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const newItems = [...state.items];
            newItems[existingItemIndex].qty += item.qty;
            return { items: newItems };
          }
          // New item
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)
      })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      getSubtotal: () => get().items.reduce((total, item) => total + (item.price * item.qty), 0)
    }),
    {
      name: 'knots-cart-storage', // name of item in localStorage
    }
  )
);
