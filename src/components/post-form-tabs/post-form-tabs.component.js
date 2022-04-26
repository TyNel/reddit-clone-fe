import { useContext } from "react";
import { Context } from "../../contexts/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../post-form-tabs/post-form-tabs.styles.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export function Post() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { subId, subName } = useParams();
  const convertToInt = parseInt(subId);

  const validationSchema = yup.object({
    postTitle: yup.string("Please enter a title").required("Title is required"),
  });

  const initialValues = {
    postAuthor: currentUser.userName,
    postCommunity: subId ? convertToInt : "",
    postTitle: "",
    postBody: "",
  };

  const enableReinitialize = true;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddPost",
        values
      );
      if (response.status === 200) {
        dispatch({
          type: "SET_CURRENT_POST",
          payload: response.data,
        });
        dispatch({
          type: "SET_COMMENTS",
          payload: [],
        });
        state.trendingPosts.push(response.data);
        navigate(
          `/r/${subName}/comments/${response.data.postId}/${response.data.postTitle}`
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize,
  });

  return (
    <form className="tab-container" onSubmit={formik.handleSubmit}>
      <div
        className={
          formik.errors.postTitle ? "tab-header tab-error" : "tab-header"
        }
      >
        <input
          className="tab-title"
          type="text"
          placeholder="Title"
          id="postTitle"
          value={formik.values.postTitle}
          onChange={formik.handleChange}
        ></input>
      </div>
      {formik.touched.postTitle && formik.errors.postTitle ? (
        <div className="form-error">{formik.errors.postTitle}</div>
      ) : null}
      <div className="tab-content">
        <textarea
          className="tab-body"
          type="text"
          placeholder="Text (optional)"
          id="postBody"
          value={formik.values.postBody}
          onChange={formik.handleChange}
        ></textarea>
      </div>
      <div className="tab-footer">
        <button
          type="submit"
          className={
            subName ? "btn btn--full post--btn" : "btn post--btn disabled--btn"
          }
          disabled={subName ? false : true}
        >
          Post
        </button>
      </div>
    </form>
  );
}

export function Images() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { subId, subName } = useParams();
  const convertToInt = parseInt(subId);
  const urlValidation =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  const validationSchema = yup.object({
    postTitle: yup.string("Please enter a title").required("Title is required"),
    postImageUrl: yup
      .string("Please provide image url")
      .matches(urlValidation, "Url is not valid")
      .required("Image is required"),
  });

  const initialValues = {
    postAuthor: currentUser.userName,
    postCommunity: subId ? convertToInt : "",
    postTitle: "",
    postImageUrl: "",
  };

  const enableReinitialize = true;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddPost",
        values
      );
      if (response.status === 200) {
        dispatch({
          type: "SET_CURRENT_POST",
          payload: response.data,
        });
        dispatch({
          type: "SET_COMMENTS",
          payload: [],
        });
        state.trendingPosts.push(response.data);
        navigate(
          `/r/${subName}/comments/${response.data.postId}/${response.data.postTitle}`
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize,
  });

  return (
    <form className="tab-container" onSubmit={formik.handleSubmit}>
      <div
        className={
          formik.errors.postTitle ? "tab-header tab-error" : "tab-header"
        }
      >
        <input
          className="tab-title"
          type="text"
          placeholder="Title"
          id="postTitle"
          value={formik.values.postTitle}
          onChange={formik.handleChange}
        ></input>
      </div>
      {formik.touched.postTitle && formik.errors.postTitle ? (
        <div className="form-error">{formik.errors.postTitle}</div>
      ) : null}
      <div
        className={
          formik.errors.postTitle ? "tab-content tab-error" : "tab-content"
        }
      >
        <textarea
          className="tab-body"
          type="text"
          placeholder="Post image url here"
          id="postImageUrl"
          value={formik.values.postImageUrl}
          onChange={formik.handleChange}
        ></textarea>
      </div>
      {formik.touched.postImageUrl && formik.errors.postImageUrl ? (
        <div className="form-error">{formik.errors.postImageUrl}</div>
      ) : null}
      <div className="tab-footer">
        <button
          type="submit"
          className={
            subName ? "btn btn--full post--btn" : "btn post--btn disabled--btn"
          }
          disabled={subName ? false : true}
        >
          Post
        </button>
      </div>
    </form>
  );
}

export function Link() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { subId, subName } = useParams();
  const convertToInt = parseInt(subId);
  const validationSchema = yup.object({
    postTitle: yup.string("Please enter a title").required("Title is required"),
    postLink: yup
      .string("Please provide image url")
      .url("Url is not valid")
      .required("url required"),
  });

  const initialValues = {
    postAuthor: currentUser.userName,
    postCommunity: subId ? convertToInt : "",
    postTitle: "",
    postLink: "",
  };

  const enableReinitialize = true;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddPost",
        values
      );
      if (response.status === 200) {
        dispatch({
          type: "SET_CURRENT_POST",
          payload: response.data,
        });
        dispatch({
          type: "SET_COMMENTS",
          payload: [],
        });
        state.trendingPosts.push(response.data);
        navigate(
          `/r/${subName}/comments/${response.data.postId}/${response.data.postTitle}`
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize,
  });

  return (
    <form className="tab-container" onSubmit={formik.handleSubmit}>
      <div
        className={
          formik.errors.postLink ? "tab-header tab-error" : "tab-header"
        }
      >
        <input
          className="tab-title"
          type="text"
          placeholder="Title"
          id="postTitle"
          value={formik.values.postTitle}
          onChange={formik.handleChange}
        ></input>
      </div>
      {formik.touched.postTitle && formik.errors.postTitle ? (
        <div className="form-error">{formik.errors.postTitle}</div>
      ) : null}
      <div
        className={
          formik.errors.postLink ? "tab-content tab-error" : "tab-content"
        }
      >
        <textarea
          className="tab-body"
          type="text"
          placeholder="Post url here"
          id="postLink"
          value={formik.values.postLink}
          onChange={formik.handleChange}
        ></textarea>
      </div>
      {formik.touched.postLink && formik.errors.postLink ? (
        <div className="form-error">{formik.errors.postLink}</div>
      ) : null}
      <div className="tab-footer">
        <button
          type="submit"
          className={
            subName ? "btn btn--full post--btn" : "btn post--btn disabled--btn"
          }
          disabled={subName ? false : true}
        >
          Post
        </button>
      </div>
    </form>
  );
}
