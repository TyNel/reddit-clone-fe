import { useContext } from "react";
import { Context } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import "../signup/signup.styles.css";
import { VscClose } from "react-icons/vsc";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Login(props) {
  const toggleModal = props.toggleModal;
  const toggleSignin = props.toggleSignin;
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const validationSchema = yup.object({
    username: yup
      .string("Please enter a username")
      .min(2, "Username must be 2 characters or more")
      .max(20, "Username must be 20 characters or less")
      .required("Username is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/UserLogin",
        values
      );
      if (response.status === 200) {
        let postVotes = JSON.parse(response.data.postVotes);
        let commentVotes = JSON.parse(response.data.commentVotes);

        dispatch({
          type: "SET_USER_POST_VOTES",
          payload: postVotes ? postVotes : [],
        });
        dispatch({
          type: "SET_USER_COMMENT_VOTES",
          payload: commentVotes ? commentVotes : [],
        });
        dispatch({
          type: "SET_USER",
          payload: response.data,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("logged in");
        toggleModal(false);
        navigate("/");
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
    <div className="modal-container">
      <div className="modal-content">
        <div
          className="side-image"
          style={{ backgroundImage: `url("https://bit.ly/3iu51iQ")` }}
        ></div>
        <VscClose className="close-icon" onClick={() => toggleModal(false)} />
        <div className="form-container">
          <div className="policy-container">
            <div className="title">Login</div>
            <div className="user-policy">
              By continuing, you are setting up a Reddit account and agree to
              our User Agreement and Privacy Policy.
            </div>
          </div>
          <form
            className="user-form login-form"
            onSubmit={formik.handleSubmit}
            id="user-login-form"
          >
            <div className="input-container">
              <input
                type="text"
                id="username"
                className="user-form-input login-form"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
              <span className="secondary-form-label">username</span>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                className="user-form-input login-form"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <span className="secondary-form-label">Password</span>
            </div>
          </form>
          <button
            form="user-login-form"
            type="submit"
            className="btn btn--full continue--btn"
          >
            Log In
          </button>
          <div className="login-link">
            New to Reddit?{" "}
            <span
              className="login-signup-redirect"
              onClick={() => {
                toggleSignin(true);
                toggleModal(false);
              }}
            >
              Sign Up
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
