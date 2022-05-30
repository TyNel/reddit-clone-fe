import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../features/comments/commentsSlice";
import { toggleReplyForm } from "../../features/toggleReplyForm/toggleReplyFormSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import "../comment-form/comment-form.styles.css";

export default function CommentForm({ userReply }) {
  const { subName, id, postTitle } = useParams();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const intPostId = parseInt(id);
  const navigate = useNavigate();
  const user = state.user.length === 0 ? null : state.user;

  const initialValues = {
    commentUserId: user ? user.userId : "",
    commentParentId:
      userReply && userReply.isRoot === true
        ? userReply.comment.commentId
        : userReply && userReply.isRoot === false
        ? userReply.comment.commentParentId
        : null,
    commentBody:
      userReply && userReply.isRoot === false
        ? `@${userReply.comment.userName}`
        : "",
    commentParentPostId: intPostId,
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://tysocialappapi.azurewebsites.net/api/reddit/AddComment",
        values
      );
      if (response.status === 200) {
        formik.resetForm();
        dispatch(addComment(response.data));
        dispatch(toggleReplyForm(null));
        navigate(`/r/${subName}/comments/${id}/${postTitle}`);
      }
    } catch (error) {
      console.log(
        error.response ? error.response.data.errorMessages : error.message
      );
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form className="comment-form" onSubmit={formik.handleSubmit}>
      <div className="comment-input-container">
        <div className="username-sub-text">
          Comment as {user ? user.userName : "blank"}
        </div>
        <textarea
          type="text"
          id="commentBody"
          className="comment-textarea"
          value={formik.values.commentBody}
          onChange={formik.handleChange}
          placeholder="What are your thoughts?"
        ></textarea>
        <button
          type="submit"
          className="btn btn--full comment-btn"
          disabled={initialValues.commentBody.count === 0 ? true : false}
        >
          Comment
        </button>
      </div>
    </form>
  );
}
