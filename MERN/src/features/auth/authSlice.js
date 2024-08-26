import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { authUser, checkUser, createUser } from "./authAPI";
import { deleteUser, signOut } from "../user/userAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  userCheck: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const authUserAsync = createAsyncThunk("auth/authUser", async () => {
  const response = await authUser();
  const data = response.data;
  if (data.success === false) {
    return null;
  }
  return response.data;
});
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const deleteUserAsync = createAsyncThunk(
  "auth/deleteUser",
  async (userId) => {
    const response = await deleteUser(userId);
    //console.log(response.data);
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk("auth/signOut", async () => {
  const response = await signOut();
  return response.message;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(authUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
        state.userCheck = true;
      })
      .addCase(authUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.userCheck = true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectCheck = (state) => state.auth.userCheck;

export default authSlice.reducer;
