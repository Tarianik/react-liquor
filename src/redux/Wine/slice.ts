import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WineItem } from '../../pages/Home';
import { fetchWine } from './asyncActions';

export enum Status {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

interface WineSliceState {
  items: WineItem[];
  status: Status;
}

const initialState: WineSliceState = {
  items: [],
  status: Status.PENDING,
};

const wineSlice = createSlice({
  name: 'Wine',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWine.pending, (state) => {
      state.items = [];
      state.status = Status.PENDING;
    });
    builder.addCase(
      fetchWine.fulfilled,
      (state, action: PayloadAction<WineItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCEEDED;
      }
    );
    builder.addCase(fetchWine.rejected, (state) => {
      state.items = [];
      state.status = Status.FAILED;
    });
  },
});

export const { setItems } = wineSlice.actions;
export default wineSlice.reducer;
