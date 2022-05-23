import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserCommentVotes } from "../../features/userCommentVotes/userCommentVotesSlice";
import { updateCommentVoteCount } from "../../features/comments/commentsSlice";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

function CommentVote({ comment }) {
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const currentUser = state.user;
  const userId = currentUser ? currentUser.userId : null;
  const getVoteIndex = state.userCommentVotes?.findIndex(
    (currentComment) =>
      currentComment.likeDislikeCommentId === comment.commentId
  );
  const voteStatus = state.userCommentVotes[getVoteIndex]?.commentIsLike;

  const upVote = {
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: userId,
    commentIsLike: 1,
  };
  const downVote = {
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: userId,
    commentIsLike: 0,
  };

  const userVote = async (vote) => {
    try {
      const response = await axios.post(
        "https://tysocialappapi.azurewebsites.net/api/reddit/LikeComment",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        dispatch(updateUserCommentVotes(response.data));
        dispatch(updateCommentVoteCount(response.data));
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
    if (currentUser.length === 0) {
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
    <div className="comment-vote-container">
      <button className="vote-button" onClick={handleVote} aria-label="upvote">
        <BiUpvote
          className={
            voteStatus === 1 ? "upvote-logo upvote-filled" : "upvote-logo"
          }
          id="upvote"
        />
      </button>
      <div className="comment-vote-container">
        {" "}
        {loading === true ? (
          <AiOutlineLoading3Quarters />
        ) : comment.voteCount === null ? (
          0
        ) : (
          comment.voteCount
        )}
      </div>

      <button
        className="vote-button"
        onClick={handleVote}
        aria-label="downvote"
      >
        <BiDownvote
          className={
            voteStatus === 0 ? "downvote-logo downvote-filled" : "downvote-logo"
          }
          id="downvote"
        />
      </button>
    </div>
  );
}

export default React.memo(CommentVote);
