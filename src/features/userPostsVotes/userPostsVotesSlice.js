import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userPostsVotesSlice = createSlice({
  name: "userPostsVotes",
  initialState,
  reducers: {
    setPostsVotes: (state, action) => {
      return action.payload;
    },
    updateUserVotes(state, action) {
      const post = state.find(
        (post) => post.likeDislikePostId === action.payload.likeDislikePostId
      );
      if (post) {
        post.postIsLike = action.payload.postIsLike;
      } else {
        state.push(action.payload);
      }
    },
    resetUserPostVotes() {
      return initialState;
    },
  },
});

export const { setPostsVotes, updateUserVotes, resetUserPostVotes } =
  userPostsVotesSlice.actions;

export default userPostsVotesSlice.reducer;
