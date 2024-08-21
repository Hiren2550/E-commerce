import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders, fetchUserInfo, updateUser } from "./userAPI";

const initialState = {
  userOrders: [],
  userInfo: null,
  status: "idle",
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // console.log(response.data);
    return response.data;
  }
);
export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId) => {
    const response = await fetchUserInfo(userId);
    // console.log(response.data);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateData) => {
    const response = await updateUser(updateData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
