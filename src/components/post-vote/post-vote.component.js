import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePostVotes } from "../../features/posts/postsSlice";
import { updateUserVotes } from "../../features/userPostsVotes/userPostsVotesSlice";
import { updateCurrentPost } from "../../features/currentPost/currentPostSlice";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import axios from "axios";
import "../post-vote/post-vote.styles.css";

const PostVote = ({ postId, voteCount }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const getUserVoteIndex = state.userPostsVotes?.findIndex(
    (post) => post.likeDislikePostId === postId
  );
  const checkVoteStatus = state.userPostsVotes[getUserVoteIndex]?.postIsLike;

  const upVote = {
    likeDislikePostId: postId === undefined ? id : postId,
    likeDislikeUserId: state.user ? state.user.userId : null,
    postIsLike: 1,
  };
  const downVote = {
    likeDislikePostId: postId === undefined ? id : postId,
    likeDislikeUserId: state.user ? state.user.userId : null,
    postIsLike: 0,
  };

  const userVote = async (vote) => {
    try {
      const response = await axios.post(
        "https://tysocialappapi.azurewebsites.net/api/reddit/LikePost",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        dispatch(updatePostVotes(response.data));
        dispatch(updateUserVotes(response.data));
        if (id) {
          dispatch(updateCurrentPost(response.data));
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errorMessages);
      } else {
        console.log(error.message);
      }
    }
  };

  const handleVote = (e) => {
    if (state.user.length === 0) {
      window.alert("Please log in to vote");
      return;
    }
    if (e.target.id === "upvote") {
      setLoading(true);
      userVote(upVote);
    }
    if (e.target.id === "downvote") {
      setLoading(true);
      userVote(downVote);
    }
  };
  return (
    <>
      <div className="vote-container">
        <button
          className="vote-button"
          onClick={handleVote}
          aria-label="upvote"
        >
          <BiUpvote
            className={
              checkVoteStatus === 1
                ? "upvote-logo upvote-filled"
                : "upvote-logo"
            }
            id="upvote"
          />
        </button>
        <div className="vote-count-container">
          {" "}
          {loading === true ? (
            <TailSpin color="#0079d3" height={25} width={25} />
          ) : (
            voteCount
          )}
        </div>

        <button
          className="vote-button"
          onClick={handleVote}
          aria-label="downvote"
        >
          <BiDownvote
            className={
              checkVoteStatus === 0
                ? "downvote-logo downvote-filled"
                : "downvote-logo"
            }
            id="downvote"
          />
        </button>
      </div>
    </>
  );
};

export default React.memo(PostVote);
