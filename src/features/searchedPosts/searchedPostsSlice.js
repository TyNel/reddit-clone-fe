import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const searchedPostsSlice = createSlice({
  name: "searchedPosts",
  initialState,
  reducers: {
    setSearchedPosts(state, action) {
      return action.payload;
    },
  },
});

export const { setSearchedPosts } = searchedPostsSlice.actions;

export default searchedPostsSlice.reducer;
