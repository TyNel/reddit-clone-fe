import "../comment-form/comment-form.styles.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/store";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

export default function CommentForm(props) {
  const { subName, postId, postTitle } = useParams();
  const intPostId = parseInt(postId);
  const [state, dispatch] = useContext(Context);
  const user = JSON.parse(localStorage.getItem("user"));
  const userReply = props.userReply;
  const navigate = useNavigate();

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
    const updatedComments = [...state.comments];
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddComment",
        values
      );
      if (response.status === 200) {
        formik.resetForm();
        updatedComments.push(response.data);
        dispatch({
          type: "SET_COMMENTS",
          payload: updatedComments,
        });
        dispatch({
          type: "SET_REPLY_STATE",
          payload: null,
        });
        navigate(`/r/${subName}/comments/${postId}/${postTitle}`);
      }
    } catch (error) {
      console.log(error.response.data.errorMessages);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  console.log(formik.values);

  return (
    <form className="comment-form" onSubmit={formik.handleSubmit}>
      <div className="comment-input-container">
        <div className="username-sub-text">
          Comment as {user ? user.userName : "blank"}
        </div>
        <textarea
          id="commentBody"
          type="text"
          placeholder="What are your thoughts?"
          className="comment-textarea"
          value={formik.values.commentBody}
          onChange={formik.handleChange}
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
