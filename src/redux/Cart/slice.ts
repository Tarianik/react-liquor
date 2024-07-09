import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WineItem } from '../../pages/Home';
import { getCartLS } from '../../utils/getCartLS';

export type CartItem = {
  id: string;
  title: string;
  country: string;
  color: string;
  sweetness: string;
  volume: string;
  imageUrl: string;
  price: number;
  count: number;
};

type CartSliceState = {
  items: CartItem[];
  totalPrice: number;
};

const { items, totalPrice } = getCartLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    plusItem: (state, action: PayloadAction<CartItem>) => {
      const foundItem = state.items.find((el) => el.id === action.payload.id);

      if (!foundItem) {
        action.payload.count = 1;
        state.items = [...state.items, action.payload];
      } else {
        foundItem.count++;
      }

      state.totalPrice += action.payload.price;
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find((el) => el.id === action.payload);

      if (foundItem) {
        foundItem.count--;

        if (foundItem.count === 0) {
          state.items = state.items.filter((el) => el.id !== action.payload);
        }
        state.totalPrice -= foundItem.price;
      }
    },
    removeItems: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find((el) => el.id === action.payload);

      if (foundItem) {
        state.totalPrice -= foundItem.price * foundItem.count;
        state.items = state.items.filter((el) => el.id !== foundItem.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { plusItem, minusItem, removeItems, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
