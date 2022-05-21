import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const subRedditDataSlice = createSlice({
  name: "subRedditData",
  initialState,
  reducers: {
    setSubData: (state, action) => {
      return [action.payload];
    },
  },
});

export const { setSubData } = subRedditDataSlice.actions;

export default subRedditDataSlice.reducer;
