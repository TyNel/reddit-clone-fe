import React, { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

function CommentVote(props) {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const { comment } = props;
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
    const comments = [...state.comments];
    const userVotes = [...state.userCommentVotes];
    const getCommentIndex = state.comments?.findIndex(
      (currentComment) => currentComment.commentId === comment.commentId
    );

    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/LikeComment",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        if (getCommentIndex >= 0) {
          comments[getCommentIndex].voteCount = response.data.voteCount;
          dispatch({
            type: "SET_COMMENTS",
            payload: comments,
          });
        }
        if (getVoteIndex >= 0) {
          userVotes[getVoteIndex].commentIsLike = response.data.commentIsLike;
          dispatch({
            type: "SET_USER_COMMENT_VOTES",
            payload: userVotes,
          });
        } else {
          userVotes.push(response.data);
          dispatch({
            type: "SET_USER_COMMENT_VOTES",
            payload: userVotes,
          });
        }
      }
    } catch (error) {
      console.log(error.response.data.errorMessages);
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
    <>
      <div className="comment-vote-container">
        <button
          className="vote-button"
          onClick={handleVote}
          aria-label="upvote"
        >
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
              voteStatus === 0
                ? "downvote-logo downvote-filled"
                : "downvote-logo"
            }
            id="downvote"
          />
        </button>
      </div>
    </>
  );
}

export default React.memo(CommentVote);