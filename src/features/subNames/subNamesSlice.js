import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const subNamesSlice = createSlice({
  name: "subNames",
  initialState,
  reducers: {
    setSubNames(state, action) {
      return action.payload;
    },
  },
});

export const { setSubNames } = subNamesSlice.actions;

export default subNamesSlice.reducer;
