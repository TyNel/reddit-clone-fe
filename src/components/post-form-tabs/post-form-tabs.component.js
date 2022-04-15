import { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import { Navigate, useNavigate } from "react-router-dom";
import "../post-form-tabs/post-form-tabs.styles.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export function Post() {
  const state = useContext(Context);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const communityData = state[0].subRedditData;

  const validationSchema = yup.object({
    postTitle: yup.string("Please enter a title").required("Title is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    postAuthor: currentUser.userName,
    postCommunity: communityData.length > 0 ? communityData[0].subId : "",
    postTitle: "",
    postBody: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddPost",
        values
      );
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="tab-container">
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
        <button className="btn btn--full post--btn">Post</button>
      </div>
    </div>
  );
}

export function Images() {
  return <div>Select images</div>;
}

export function Link() {
  return <div>Select links</div>;
}
