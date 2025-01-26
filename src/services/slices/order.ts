import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from './sliceNames';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export type TOrderState = {
  newOrderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  newOrderData: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getIsNewOrderData: (state) => state.newOrderData
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrderData = action.payload.order;
      });
  }
});

export const postOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/postOrder`,
  async (data: string[]) => orderBurgerApi(data)
);

export const orderAction = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice;
