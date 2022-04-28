export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "SET_SUBREDDIT_DATA":
      return {
        ...state,
        subRedditData: action.payload,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "SET_SUBNAMES":
      return {
        ...state,
        subNames: action.payload,
      };
    case "SET_CURRENT_POST":
      return {
        ...state,
        currentPost: action.payload,
      };
    case "SET_REPLY_STATE":
      return {
        ...state,
        toggleReplyForm: action.payload,
      };
    case "SET_USER_POST_VOTES":
      return {
        ...state,
        userPostVotes: action.payload,
      };
    case "SET_USER_COMMENT_VOTES":
      return {
        ...state,
        userCommentVotes: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
