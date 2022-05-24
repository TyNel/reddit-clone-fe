import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { setPostsVotes } from "../../features/userPostsVotes/userPostsVotesSlice";
import { setCommentVotes } from "../../features/userCommentVotes/userCommentVotesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "../signup/signup.styles.css";

export default function Login(props) {
  const toggleModal = props.toggleModal;
  const toggleSignin = props.toggleSignin;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    username: yup
      .string("Please enter a username")
      .min(2, "Username must be 2 characters or more")
      .max(20, "Username must be 20 characters or less")
      .required("Username is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 20 characters or less")
      .required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://tysocialappapi.azurewebsites.net/api/reddit/UserLogin",
        values
      );
      console.log(response);
      if (response.status === 200) {
        let postVotes = JSON.parse(response.data.postVotes);
        let commentVotes = JSON.parse(response.data.commentVotes);

        dispatch(setPostsVotes(postVotes ? postVotes : []));
        dispatch(setCommentVotes(commentVotes ? commentVotes : []));
        dispatch(setUser(response.data));

        if (pathname === "/") {
          toggleModal(false);
        }
        navigate(pathname);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errorMessages);
      } else {
        console.log(error);
      }
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
                <div className="form-error">{formik.errors.username}</div>
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
              {formik.touched.password && formik.errors.password ? (
                <div className="form-error">{formik.errors.password}</div>
              ) : null}
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
