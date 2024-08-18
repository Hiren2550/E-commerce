import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  count: 0,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    //console.log(response.data);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment(state) {
      state.count = state.count + 69;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectCart = (state) => state.cart.items;

export default cartSlice.reducer;
