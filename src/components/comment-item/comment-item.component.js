import { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CommentForm from "../comment-form/comment-form.component";
import axios from "axios";
import "./comment-item.styles.css";

export default function Comment(props) {
  const [state, dispatch] = useContext(Context);
  const [userToReply, setUser] = useState({
    isRoot: false,
    comment: {},
  });
  const currentUser = state.user;
  const userId = currentUser ? currentUser.userId : null;
  const comment = props.comment;
  const replies = props.replies;
  const toggleForm = props.toggleForm;
  const getCommentIndex = state.comments?.findIndex(
    (currentComment) => currentComment.commentId === comment.commentId
  );
  const getVoteIndex = state.userCommentVotes?.findIndex(
    (currentComment) =>
      currentComment.likeDislikeCommentId === comment.commentId
  );
  const voteStatus = state.userCommentVotes[getVoteIndex]?.commentIsLike;

  const [upVote, setUpVote] = useState({
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: userId,
    commentIsLike: 1,
  });
  const [downVote, setDownVote] = useState({
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: userId,
    commentIsLike: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (comment.commentParentId !== null) {
      setUser({ isRoot: false, comment: comment });
    } else {
      setUser({ isRoot: true, comment: comment });
    }
    if (state.toggleReplyForm === comment.commentId) {
      dispatch({
        type: "SET_REPLY_STATE",
        payload: null,
      });
    } else {
      dispatch({
        type: "SET_REPLY_STATE",
        payload: comment.commentId,
      });
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

  const userVote = async (vote) => {
    const comments = [...state.comments];
    const userVotes = [...state.userCommentVotes];

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

  return (
    <div className="comment-section-container">
      <div className="username-container">
        <div className="user-icon-container">
          <img
            src="https://bit.ly/3rMiBn2"
            alt="reddit avatar"
            className="user-icon-img"
          ></img>
        </div>
        <div className="user-name">{comment.userName}</div>
        <div className="posted-by">
          <span className="dot">&#8226;</span> 6 hrs ago
        </div>
      </div>
      <div className="comment-body">{comment.commentBody}</div>
      <div className="comment-footer">
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

        <div
          className="link footer-link"
          onClick={() => handleClick(comment.commentId)}
        >
          {" "}
          <BsChatLeftText />
          <span className="footer-link-text">Reply</span>
        </div>
        <div className="footer-link-text footer-link">Share</div>
        <div className="footer-link-text footer-link">Report</div>
        <div className="footer-link-text footer-link">Save</div>
        <div className="footer-link-text footer-link">Follow</div>
      </div>
      {state.toggleReplyForm === comment.commentId ? (
        <CommentForm
          userReply={userToReply}
          toggleForm={() => toggleForm(comment.commentId)}
        />
      ) : null}

      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <div key={reply.commentId}>
              <Comment replies={[]} comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
