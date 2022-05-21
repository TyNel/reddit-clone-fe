import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const toggleReplyFormSlice = createSlice({
  name: "toggleReplyForm",
  initialState,
  reducers: {
    toggleReplyForm(state, action) {
      return action.payload;
    },
  },
});

export const { toggleReplyForm } = toggleReplyFormSlice.actions;

export default toggleReplyFormSlice.reducer;
