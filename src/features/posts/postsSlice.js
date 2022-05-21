import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
    resetPosts() {
      return initialState;
    },
    updatePostVotes(state, action) {
      const post = state.find(
        (post) => post.postId === action.payload.likeDislikePostId
      );
      if (post) {
        post.voteCount = action.payload.voteCount;
      }
    },
  },
});

export const { setPosts, resetPosts, updatePostVotes } = postsSlice.actions;

export default postsSlice.reducer;
