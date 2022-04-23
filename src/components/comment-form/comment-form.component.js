import "../comment-form/comment-form.styles.css";

export default function CommentForm() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <form className="comment-form">
      <div className="input-container">
        <div className="username-sub-text">Comment as {user.userName}</div>
        <textarea type="text" className="comment-textarea"></textarea>
        <button type="submit" className="btn btn--full comment-btn">
          Comment
        </button>
      </div>
    </form>
  );
}
