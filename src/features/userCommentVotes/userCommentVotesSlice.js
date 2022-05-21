import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userCommentVotesSlice = createSlice({
  name: "userCommentVotes",
  initialState,
  reducers: {
    setCommentVotes: (state, action) => {
      return action.payload;
    },
    updateUserCommentVotes(state, action) {
      const comment = state.find(
        (comment) =>
          comment.likeDislikeCommentId === action.payload.likeDislikeCommentId
      );
      if (comment) {
        comment.commentIsLike = action.payload.commentIsLike;
      } else {
        state.push(action.payload);
      }
    },
    resetUserCommentVotes() {
      return initialState;
    },
  },
});

export const {
  setCommentVotes,
  updateUserCommentVotes,
  resetUserCommentVotes,
} = userCommentVotesSlice.actions;

export default userCommentVotesSlice.reducer;
