import "../comment-section/comment-section.styles.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";

export default function CommentSection(props) {
  const comment = props.comment;
  const replies = props.replies;

  return (
    <div className="comment-section-container">
      <div key={comment.id}>
        <div className="username-container">
          <div className="user-icon-container">
            <img
              src={comment.icon}
              alt="reddit avatar"
              className="user-icon-img"
            ></img>
          </div>
          <div className="user-name">{comment.username}</div>
          <div className="posted-by">
            <span className="dot">&#8226;</span> 6 hrs ago
          </div>
        </div>
        <div className="comment-body">{comment.body}</div>
        <div className="comment-footer">
          <div className="comment-vote-container">
            <BiUpvote className="vote-icon-comments upvote" />
            <span className="footer-link-text comment-vote-text">Vote</span>
            <BiDownvote className="vote-icon-comments downvote" />
          </div>
          <div className="link footer-link">
            {" "}
            <BsChatLeftText />
            <span className="footer-link-text">Reply</span>
          </div>
          <div className="comment-footer-text footer-link">Share</div>
          <div className="comment-footer-text footer-link">Report</div>
          <div className="comment-footer-text footer-link">Save</div>
          <div className="comment-footer-text footer-link">Follow</div>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <div key={reply.id}>
              <CommentSection replies={[]} comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
