import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  fetchLoggedInUserOrders,
  fetchUserInfo,
  updateUser,
} from "./userAPI";

const initialState = {
  users: [],
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
export const deleteAsync = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await deleteUser(id);
  return response.data.id;
});

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
      })
      .addCase(deleteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.users.findIndex(
          (user) => user.id === action.payload
        );
        state.users.splice(index, 1);
      });
  },
});

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUsers = (state) => state.user.users;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
