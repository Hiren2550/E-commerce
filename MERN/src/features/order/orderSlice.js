import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createOrder, fetchOrderById } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  error: null,
  count: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // console.log(response.data);
    return response.data;
  }
);
export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId) => {
    const response = await fetchOrderById(orderId);
    // console.log(response.data);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment(state) {
      state.count = state.count + 69;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
      });
  },
});

export const { increment } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
