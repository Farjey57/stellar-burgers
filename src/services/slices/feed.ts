import { TOrder } from '@utils-types';
import { FEED_SLICE_NAME } from './sliceNames';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: null | string | undefined;
  orderPage: TOrder | null;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  orderPage: null
};

const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getIsLoading: (state) => state.isLoading,
    getOrderPage: (state) => state.orderPage,
    getOrderByNumber: (state, number: number) =>
      state.orders.find((item) => item.number === number)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderPage = action.payload.orders[0];
      });
  }
});

export const fetchOrders = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchOrders`,
  async () => getFeedsApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchOrderById`,
  async (number: number) => getOrderByNumberApi(number)
);

export const feedAction = feedSlice.actions;
export const feedSelectors = feedSlice.selectors;

export default feedSlice;
