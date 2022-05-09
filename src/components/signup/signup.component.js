import "../signup/signup.styles.css";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import * as yup from "yup";
import { useFormik, ErrorMessage } from "formik";
import axios from "axios";

export default function SignUp(props) {
  const toggleModal = props.toggleModal;
  const toggleLogin = props.toggleLogin;
  const [continueForm, setContinue] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string("Please enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup
      .string("Please enter a username")
      .min(2, "Username must be between 2 and 20 characters long")
      .required("Username is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddUser",
        values
      );
      if (response.status === 200) {
        toggleModal(false);
      }
    } catch (error) {
      alert(error.response.data.errorMessages);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      {continueForm === false ? (
        <div className="modal-container">
          <div className="modal-content">
            <div
              className="side-image"
              style={{ backgroundImage: `url("https://bit.ly/3iu51iQ")` }}
            ></div>
            <VscClose
              className="close-icon"
              onClick={() => toggleModal(false)}
            />
            <div className="form-container">
              <div className="policy-container">
                <div className="title">Sign up</div>
                <div className="user-policy">
                  By continuing, you are setting up a Reddit account and agree
                  to our User Agreement and Privacy Policy.
                </div>
              </div>
              <form className="signup-form" onSubmit={formik.handleSubmit}>
                <input
                  type="email"
                  id="email"
                  className="user-form-input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <span className="secondary-form-label">email</span>
                {formik.touched.email && formik.errors.email ? (
                  <div className="form-error">{formik.errors.email}</div>
                ) : null}
              </form>
              <div
                className="btn btn--full continue--btn"
                onClick={() => setContinue(!continueForm)}
              >
                Continue
              </div>
              <div className="login-link">
                Already a redditor?{" "}
                <span
                  className="login-signup-redirect"
                  onClick={() => {
                    toggleLogin(true);
                    toggleModal(false);
                  }}
                >
                  Log in
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <div className="username-form-container">
              <div className="modal-header">
                <VscClose
                  className="close-icon"
                  onClick={() => toggleModal(false)}
                />
                <div className="username-title">Choose your username</div>
                <div className="username-secondary-text">
                  Your username is how other community members will see you.
                  This name will be used to credit you for things you share on
                  Reddit. What should we call you?
                </div>
              </div>
              <div className="user-form-container signup-form">
                <form
                  className="user-form"
                  onSubmit={formik.handleSubmit}
                  id="signup-form"
                >
                  <div className="input-container">
                    <input
                      type="text"
                      id="username"
                      className="user-form-input username--form"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <span className="secondary-form-label">
                      Choose a username
                    </span>
                    {formik.touched.username && formik.errors.username ? (
                      <div className="form-error">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      id="password"
                      className="user-form-input username--form"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <span className="secondary-form-label">Password</span>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="form-error">{formik.errors.password}</div>
                  ) : null}
                </form>
              </div>
              <div className="user-form-footer">
                <div
                  className="back-btn"
                  onClick={() => setContinue(!continueForm)}
                >
                  Back
                </div>
                <button
                  form="signup-form"
                  className="btn btn--full user--submit"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
