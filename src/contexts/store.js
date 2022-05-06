import { createContext, useReducer } from "react";
import { Reducer } from "./reducer.context";

const user = JSON.parse(localStorage.getItem("user"));
const userPVotes = user ? JSON.parse(user.postVotes) : [];

const INITIAL_STATE = {
  posts: [],
  trendingPosts: [],
  currentPost: [],
  subRedditData: [],
  subNames: [],
  comments: [],
  toggleReplyForm: null,
  user: user === null ? "" : user,
  userPostVotes: userPVotes,
  userCommentVotes: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);
export default Store;
