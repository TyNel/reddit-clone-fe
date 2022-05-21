import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    },
    addComment(state, action) {
      state.push(action.payload);
    },
    updateCommentVoteCount(state, action) {
      const comment = state.find(
        (comment) => comment.commentId === action.payload.likeDislikeCommentId
      );
      if (comment) {
        comment.voteCount = action.payload.voteCount;
      }
    },
  },
});

export const { setComments, addComment, updateCommentVoteCount } =
  commentsSlice.actions;

export default commentsSlice.reducer;
