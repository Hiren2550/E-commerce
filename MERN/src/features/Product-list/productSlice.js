import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { value: 10, count: 0 };

const fetchUserById = createAsyncThunk("users/fetchById", async (userId) => {
  const response = await fetch(`https://reqres.in/api/users/${userId}`);
  // Inferred return type: Promise<MyData>
  return await response.json();
});
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload;
    });
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;
