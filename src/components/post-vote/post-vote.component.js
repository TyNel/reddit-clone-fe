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

  const userVoteStatus = state.userPostsVotes?.find(
    (post) => post.likeDislikePostId === postId
  );

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
        //if on comment page update post in currentPost as well
        if (id) {
          dispatch(updateCurrentPost(response.data));
        }
      }
    } catch (error) {
      console.log(
        error.response ? error.response.data.errorMessages : error.message
      );
    }
  };

  const handleVote = (e) => {
    let vote = {
      likeDislikePostId: postId === undefined ? id : postId,
      likeDislikeUserId: state.user ? state.user.userId : null,
      postIsLike: null,
    };

    if (state.user.length === 0) {
      window.alert("Please log in to vote");
      return;
    }
    if (e.target.id === "upvote") {
      vote.postIsLike = 1;
      setLoading(true);
      userVote(vote);
      return;
    }
    if (e.target.id === "downvote") {
      vote.postIsLike = 0;
      setLoading(true);
      userVote(vote);
      return;
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
              userVoteStatus?.postIsLike === 1
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
              userVoteStatus?.postIsLike === 0
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
