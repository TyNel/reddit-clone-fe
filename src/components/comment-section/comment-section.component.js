import { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import "../comment-section/comment-section.styles.css";
import CommentForm from "../comment-form/comment-form.component";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import axios from "axios";

export default function CommentSection(props) {
  const [state, dispatch] = useContext(Context);
  const [userToReply, setUser] = useState({
    isRoot: false,
    comment: {},
  });
  const currentUser = state.user;
  const comment = props.comment;
  const replies = props.replies;
  const toggleForm = props.toggleForm;
  const getCommentIndex = state.comments?.findIndex(
    (currentComment) =>
      currentComment.LikeDislikeCommentId === comment.CommentId
  );
  const [upVote, setUpVote] = useState({
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: currentUser ? currentUser.userId : null,
    commentIsLike: 1,
  });
  const [downVote, setDownVote] = useState({
    likeDislikeCommentId: comment.commentId,
    commentLikeDislikeUserId: currentUser ? currentUser.userId : null,
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
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/LikeComment",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        const comments = [...state.comments];
        console.log(comments[getCommentIndex]);
        if (comments[getCommentIndex] >= 0) {
          comments[getCommentIndex].voteCount = response.data.voteCount;
          dispatch({
            type: "SET_COMMENTS",
            payload: comments,
          });
          return;
        } else {
          comments.push(response.data);
          dispatch({
            type: "SET_COMMENTS",
            payload: comments,
          });
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-section-container">
      <div>
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
            <BiUpvote
              className="vote-icon-comments upvote"
              id="upvote"
              onClick={handleVote}
            />
            <span className="footer-link-text comment-vote-text">
              {comment.voteCount > 0 ? comment.voteCount : 0}
            </span>
            <BiDownvote
              className="vote-icon-comments downvote"
              id="downvote"
              onClick={handleVote}
            />
          </div>
          <div
            className="link footer-link"
            onClick={() => handleClick(comment.commentId)}
          >
            {" "}
            <BsChatLeftText />
            <span className="footer-link-text">Reply</span>
          </div>
          <div className="comment-footer-text footer-link">Share</div>
          <div className="comment-footer-text footer-link">Report</div>
          <div className="comment-footer-text footer-link">Save</div>
          <div className="comment-footer-text footer-link">Follow</div>
        </div>
        {state.toggleReplyForm === comment.commentId ? (
          <CommentForm
            userReply={userToReply}
            toggleForm={() => toggleForm(comment.commentId)}
          />
        ) : null}
      </div>
      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <div key={reply.commentId}>
              <CommentSection replies={[]} comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
