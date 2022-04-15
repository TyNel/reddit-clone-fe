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
    case "SET_SUBRULES":
      return {
        ...state,
        subRules: action.payload,
      };
    case "SET_SUBTOPICS":
      return {
        ...state,
        subTopics: action.payload,
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

    default:
      return state;
  }
};
