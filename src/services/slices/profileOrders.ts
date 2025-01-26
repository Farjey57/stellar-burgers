import { getOrdersApi } from '@api';
import { PROFILE_ORDERS_SLICE_NAME } from './sliceNames';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TStateProfileOrders = {
  orders: TOrder[];
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: TStateProfileOrders = {
  orders: [],
  isLoading: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: PROFILE_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getProfileOrderByNumber: (state, number: number) =>
      state.orders.find((item) => item.number === number)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const fetchProfileOrders = createAsyncThunk(
  `${PROFILE_ORDERS_SLICE_NAME}/fetchProfileOrders`,
  async () => getOrdersApi()
);

export const profileOrdersAction = profileOrdersSlice.actions;
export const profileOrdersSelectors = profileOrdersSlice.selectors;

export default profileOrdersSlice;
