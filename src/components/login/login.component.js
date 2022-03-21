import "../signup/signup.styles.css";
import { VscClose } from "react-icons/vsc";

export default function Login(props) {
  const toggleModal = props.toggleModal;
  const toggleSignin = props.toggleSignin;

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
          <form className="user-form login-form">
            <div className="input-container">
              <input
                type="text"
                id="username"
                className="user-form-input login-form"
                required
              />
              <span className="secondary-form-label">username</span>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="password"
                className="user-form-input login-form"
                required
              />
              <span className="secondary-form-label">Password</span>
            </div>
          </form>
          <div className="btn btn--full continue--btn">Log In</div>
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
