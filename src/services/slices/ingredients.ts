import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { getIngredientsApi } from '@api';

export type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.data,
    getIsLoading: (state) => state.isLoading,
    getIngredientsById: (state, ingredientId) =>
      state.data.find((item) => item._id === ingredientId)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => getIngredientsApi()
);

export const ingredientsAction = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;

export default ingredientsSlice;
