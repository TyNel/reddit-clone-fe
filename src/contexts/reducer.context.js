export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_TRENDING_POSTS":
      return {
        ...state,
        trendingPosts: action.payload,
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

    default:
      return state;
  }
};
