import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export type SortItem = {
  feature: string;
  name: string;
};

export interface FilterState {
  colorCategory: string[];
  countryCategory: string[];
  sweetnessCategory: string[];
  varietyCategory: string[];
  brandCategory: string[];
  volumeCategory: string[];
  searchValue: string;
  sorting: SortItem;
  priceRange: number[];
  currentPage: string;
}

const initialState: FilterState = {
  colorCategory: [],
  countryCategory: [],
  sweetnessCategory: [],
  varietyCategory: [],
  brandCategory: [],
  volumeCategory: [],
  searchValue: '',
  sorting: { feature: '-rating', name: '▼ рейтингу' },
  priceRange: [300, 1990],
  currentPage: '1',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setColorCategory(state, action) {
      //@ts-ignore
      //if (state.colorCategory.find(action.payload)) {
      //   state.colorCategory = state.colorCategory.filter(
      //     (el) => el !== action.payload
      //   );
      // } else state.colorCategory.push(action.payload);
      // console.log(state.colorCategory.find(action.payload));
      if (Array.isArray(action.payload)) {
        state.colorCategory = action.payload;
      } else if (!state.colorCategory.includes(action.payload)) {
        state.colorCategory.push(action.payload);
      } else {
        state.colorCategory = state.colorCategory.filter(
          (el) => el !== action.payload
        );
      }
    },
    setCountryCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.countryCategory = action.payload;
      } else if (!state.countryCategory.includes(action.payload)) {
        state.countryCategory.push(action.payload);
      } else {
        state.countryCategory = state.countryCategory.filter(
          (el) => el !== action.payload
        );
      }
    },
    setSweetnessCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.sweetnessCategory = action.payload;
      } else if (!state.sweetnessCategory.includes(action.payload)) {
        state.sweetnessCategory.push(action.payload);
      } else {
        state.sweetnessCategory = state.sweetnessCategory.filter(
          (el) => el !== action.payload
        );
      }
    },
    setVarietyCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.varietyCategory = action.payload;
      } else if (!state.varietyCategory.includes(action.payload)) {
        state.varietyCategory.push(action.payload);
      } else {
        state.varietyCategory = state.varietyCategory.filter(
          (el) => el !== action.payload
        );
      }
    },
    setBrandCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.brandCategory = action.payload;
      } else if (!state.brandCategory.includes(action.payload)) {
        state.brandCategory.push(action.payload);
      } else {
        state.brandCategory = state.brandCategory.filter(
          (el) => el !== action.payload
        );
      }
    },

    setVolumeCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.volumeCategory = action.payload;
      } else if (!state.volumeCategory.includes(action.payload)) {
        state.volumeCategory.push(action.payload);
      } else {
        state.volumeCategory = state.volumeCategory.filter(
          (el) => el !== action.payload
        );
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    setFilters: (state, action: PayloadAction<object>) => {
      Object.assign(state, action.payload);
    },
    setCurrentPage: (
      state,
      action: PayloadAction<string | ((prevPage: string) => string)>
    ) => {
      if (typeof action.payload === 'string') {
        //@ts-ignore
        state.currentPage = action.payload;
      }
    },
  },
});

export const {
  setColorCategory,
  setCountryCategory,
  setSweetnessCategory,
  setVarietyCategory,
  setBrandCategory,
  setVolumeCategory,
  setSearchValue,
  setSorting,
  setPriceRange,
  setFilters,
  setCurrentPage,
} = filterSlice.actions;
export default filterSlice.reducer;
