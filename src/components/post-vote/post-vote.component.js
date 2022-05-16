import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
import { TailSpin } from "react-loader-spinner";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import axios from "axios";
import "../post-vote/post-vote.styles.css";

function PostVote(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const { postId, getPostIndex, voteCount } = props;
  const { paramPostId } = useParams();
  const currentUser = state.user;

  const getUserVoteIndex = state.userPostVotes?.findIndex(
    (post) => post.likeDislikePostId === postId
  );
  const checkVoteStatus = state.userPostVotes[getUserVoteIndex]?.postIsLike;

  const upVote = {
    likeDislikePostId: postId === undefined ? paramPostId : postId,
    likeDislikeUserId: currentUser ? currentUser.userId : null,
    postIsLike: 1,
  };
  const downVote = {
    likeDislikePostId: postId === undefined ? paramPostId : postId,
    likeDislikeUserId: currentUser ? currentUser.userId : null,
    postIsLike: 0,
  };

  const userVote = async (vote) => {
    const posts = [...state.posts];
    const userVotes = [...state.userPostVotes];
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/LikePost",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        posts[getPostIndex].voteCount = response.data.voteCount;
        dispatch({
          type: "SET_POSTS",
          payload: posts,
        });
        dispatch({
          type: "SET_CURRENT_POST",
          payload: posts[getPostIndex],
        });
        if (getUserVoteIndex >= 0) {
          userVotes[getUserVoteIndex].postIsLike = response.data.postIsLike;
          dispatch({
            type: "SET_USER_POST_VOTES",
            payload: userVotes,
          });
        } else {
          userVotes.push(response.data);
          dispatch({
            type: "SET_USER_POST_VOTES",
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
}

export default React.memo(PostVote);
