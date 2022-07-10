import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import "../signup/signup.styles.css";

export default function SignUp(props) {
  const toggleModal = props.toggleModal;
  const toggleLogin = props.toggleLogin;
  const [continueForm, setContinue] = useState(false);
  const validateOnChange = "true";

  const validationSchema = yup.object({
    email: yup
      .string("Please enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup
      .string("Please enter a username")
      .min(2, "Username must be between 2 and 20 characters long")
      .max(20, "Username must be between 2 and 20 characters long")
      .required("Username is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be between 8 and 20 characters long")
      .max(20, "Password must be between 8 and 20 characters long")
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
        "https://tysocialappapi.azurewebsites.net/api/reddit/AddUser",
        values
      );
      if (response.status === 200) {
        toast.success("Account created, please sign in");
        toggleModal(false);
        toggleLogin(true);
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.errorMessages[0] : error.message
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange,
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
                <h2 className="title">Sign up</h2>
                <p className="user-policy">
                  By continuing, you are setting up a Reddit account and agree
                  to our User Agreement and Privacy Policy.
                </p>
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
              <button
                className="btn btn--full continue--btn"
                disabled={
                  typeof formik.errors.email === typeof "" ? true : false
                }
                onClick={() => setContinue(!continueForm)}
              >
                Continue
              </button>
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
              <header className="modal-header">
                <VscClose
                  className="close-icon"
                  onClick={() => toggleModal(false)}
                />
                <p className="username-title">Choose your username</p>
                <p className="username-secondary-text">
                  Your username is how other community members will see you.
                  This name will be used to credit you for things you share on
                  Reddit. What should we call you?
                </p>
              </header>
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
                <button
                  className="btn btn--full"
                  onClick={() => setContinue(!continueForm)}
                >
                  Back
                </button>
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
