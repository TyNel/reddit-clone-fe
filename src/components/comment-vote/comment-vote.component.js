import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserCommentVotes } from "../../features/userCommentVotes/userCommentVotesSlice";
import { updateCommentVoteCount } from "../../features/comments/commentsSlice";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";

function CommentVote({ comment }) {
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const currentUser = state.user;

  const userVoteStatus = state.userCommentVotes?.find(
    (currentComment) =>
      currentComment.likeDislikeCommentId === comment.commentId
  );

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
      console.log(
        error.response ? error.response.data.errorMessages : error.message
      );
    }
  };

  const handleVote = (e) => {
    let vote = {
      likeDislikeCommentId: comment.commentId,
      commentLikeDislikeUserId: currentUser ? currentUser.userId : null,
      commentIsLike: null,
    };
    if (currentUser.length === 0) {
      toast.error("Please log in to vote");
      return;
    }
    if (e.target.id === "upvote") {
      vote.commentIsLike = 1;
      setLoading(true);
      userVote(vote);
      return;
    }
    if (e.target.id === "downvote") {
      vote.commentIsLike = 0;
      setLoading(true);
      userVote(vote);
      return;
    }
  };
  return (
    <div className="comment-vote-container">
      <button className="vote-button" onClick={handleVote} aria-label="upvote">
        <BiUpvote
          className={
            userVoteStatus?.commentIsLike === 1
              ? "upvote-logo upvote-filled"
              : "upvote-logo"
          }
          id="upvote"
        />
      </button>
      <div className="comment-vote-container">
        {" "}
        {loading === true ? (
          <TailSpin height={15} width={15} />
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
            userVoteStatus?.commentIsLike === 0
              ? "downvote-logo downvote-filled"
              : "downvote-logo"
          }
          id="downvote"
        />
      </button>
    </div>
  );
}

export default React.memo(CommentVote);
