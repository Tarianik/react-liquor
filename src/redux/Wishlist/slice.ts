import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WineItem } from '../../pages/Home';
import { getWishlistLS } from '../../utils/getWishlistLS';

type WishlistSliceState = {
  items: WineItem[];
};

const initialState: WishlistSliceState = {
  items: getWishlistLS(),
};

const wishlistSlice = createSlice({
  name: 'Wishlist',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<WineItem>) => {
      const foundItem = state.items.find((el) => el.id === action.payload.id);

      if (!foundItem) {
        state.items = [...state.items, action.payload];
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find((el) => el.id === action.payload);

      if (foundItem) {
        state.items = state.items.filter((el) => el.id !== foundItem.id);
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
