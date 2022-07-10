import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleReplyForm } from "../../features/toggleReplyForm/toggleReplyFormSlice";
import { BsChatLeftText } from "react-icons/bs";
import CommentVote from "../comment-vote/comment-vote.component";
import CommentForm from "../comment-form/comment-form.component";
import "./comment-item.styles.css";

export default function Comment({ comment, replies, toggleForm }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userToReply, setUser] = useState({
    isRoot: false,
    comment: {},
  });

  const handleClick = () => {
    if (state.user.length === 0) {
      window.alert("Please log in to reply");
      return;
    }
    if (comment.commentParentId !== null) {
      setUser({ isRoot: false, comment: comment });
    } else {
      setUser({ isRoot: true, comment: comment });
    }
    if (state.toggleReplyForm === comment.commentId) {
      dispatch(toggleReplyForm(null));
    } else {
      dispatch(toggleReplyForm(comment.commentId));
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
          on {new Date(comment.dateAdded).toLocaleDateString()}
        </div>
      </div>
      <div className="comment-body">{comment.commentBody}</div>
      <footer className="comment-footer">
        <div className="comment-vote-container">
          <CommentVote comment={comment} />
        </div>
        <div
          className="link footer-link reply-btn"
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
      </footer>
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
