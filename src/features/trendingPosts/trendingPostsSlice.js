import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const trendingPostsSlice = createSlice({
  name: "trendingPosts",
  initialState,
  reducers: {
    setTrendingPosts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTrendingPosts } = trendingPostsSlice.actions;

export default trendingPostsSlice.reducer;
