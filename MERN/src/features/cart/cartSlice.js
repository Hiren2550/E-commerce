import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItem,
  fetchCartByUserId,
  resetCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  cartLoad: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // console.log(response.data);
    return response.data;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId) => {
    const response = await fetchCartByUserId(userId);
    //console.log(response.data);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updateItem) => {
    const response = await updateCart(updateItem);
    // console.log(response.data);
    return response.data;
  }
);
export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (itemId) => {
    const response = await deleteItem(itemId);
    // console.log(response.data);
    return response.data.id;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    //console.log(response.status);
    return response.status;
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoad = true;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoad = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectCart = (state) => state.cart.items;
export const selectCartLoad = (state) => state.cart.cartLoad;

export default cartSlice.reducer;
