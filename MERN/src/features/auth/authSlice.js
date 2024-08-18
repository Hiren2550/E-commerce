import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authAPI";

const initialState = {
  users: [],
  status: "idle",
  count: 0,
};

export const createUserAsync = createAsyncThunk(
  "product/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment(state) {
      state.count = state.count + 69;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users.push(action.payload);
      });
  },
});

export const { increment } = authSlice.actions;
// export const selectAllProducts = (state) => state.auth.products;
export default authSlice.reducer;
