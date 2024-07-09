import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WineItem } from '../../pages/Home';

export const fetchWine = createAsyncThunk<WineItem[], Record<string, string>>(
  'fetchWine',
  async (params) => {
    const {
      sorting,
      order,
      color,
      country,
      sweetness,
      variety,
      brand,
      search,
      volume,
      price,
      page,
      size,
    } = params;
    const { data } = await axios<WineItem[]>(
      `http://localhost:3003/items?_sort=${sorting}_order=${order}${color}${country}${sweetness}${variety}${brand}${volume}${price}${search}${page}&_limit=9`
    );
    return data;
  }
);
