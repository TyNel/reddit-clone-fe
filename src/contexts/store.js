import { createContext, useReducer } from "react";
import { Reducer } from "./reducer.context";

const user = JSON.parse(localStorage.getItem("user"));
const userPVotes = user.postVotes ? JSON.parse(user.postVotes) : [];

const INITIAL_STATE = {
  posts: [],
  currentPost: [],
  subRedditData: [],
  subNames: [],
  comments: [],
  toggleReplyForm: null,
  user: user ? user : [],
  userPostVotes: userPVotes,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);
export default Store;
