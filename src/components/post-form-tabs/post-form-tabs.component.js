import { useState, useContext, useEffect } from "react";
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
      <div className="tab-header">
        <input
          className="tab-title"
          type="text"
          placeholder="Title"
          id="postTitle"
          value={formik.values.postTitle}
          onChange={formik.handleChange}
        ></input>
      </div>
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
  return <div>Select images</div>;
}

export function Link() {
  return <div>Select links</div>;
}
