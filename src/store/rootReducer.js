import { combineReducers } from "redux";
import userReducer from "../features/user/userSlice";
import userPostsVotes from "../features/userPostsVotes/userPostsVotesSlice";
import userCommentVotes from "../features/userCommentVotes/userCommentVotesSlice";
import posts from "../features/posts/postsSlice";
import trendingPosts from "../features/trendingPosts/trendingPostsSlice";
import currentPost from "../features/currentPost/currentPostSlice";
import subRedditData from "../features/subRedditData/subRedditDataSlice";
import subNames from "../features/subNames/subNamesSlice";
import comments from "../features/comments/commentsSlice";
import toggleReplyForm from "../features/toggleReplyForm/toggleReplyFormSlice";
import searchedPosts from "../features/searchedPosts/searchedPostsSlice";

export const reducer = combineReducers({
  user: userReducer,
  userPostsVotes: userPostsVotes,
  userCommentVotes: userCommentVotes,
  posts: posts,
  trendingPosts: trendingPosts,
  currentPost: currentPost,
  subRedditData: subRedditData,
  subNames: subNames,
  comments: comments,
  toggleReplyForm: toggleReplyForm,
  searchedPosts: searchedPosts,
});
