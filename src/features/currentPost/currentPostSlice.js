import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {
    setCurrentPost(state, action) {
      return [action.payload];
    },
    updateCurrentPost(state, action) {
      const post = state.find(
        (post) => post.postId === action.payload.likeDislikePostId
      );
      if (post) {
        post.voteCount = action.payload.voteCount;
      }
    },
  },
});

export const { setCurrentPost, updateCurrentPost } = currentPostSlice.actions;

export default currentPostSlice.reducer;
