import { createContext, useReducer } from "react";
import { Reducer } from "./reducer.context";

const INITIAL_STATE = {
  trendingPosts: [],
  currentPost: [],
  subRedditData: [],
  subNames: [],
  comments: [],
  toggleReplyForm: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);
export default Store;
