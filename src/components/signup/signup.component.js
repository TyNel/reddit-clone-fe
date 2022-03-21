import "../signup/signup.styles.css";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";

export default function SignUp(props) {
  const toggleModal = props.toggleModal;
  const toggleLogin = props.toggleLogin;
  const [continueForm, setContinue] = useState(false);
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
              <form className="signup-form">
                <input
                  type="email"
                  id="email"
                  className="user-form-input"
                  required
                />
                <span className="secondary-form-label">email</span>
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
                <form className="user-form">
                  <div className="input-container">
                    <input
                      type="text"
                      id="username"
                      className="user-form-input username--form"
                      required
                    />
                    <span className="secondary-form-label">
                      Choose a username
                    </span>
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      id="password"
                      className="user-form-input username--form"
                      required
                    />
                    <span className="secondary-form-label">Password</span>
                  </div>
                </form>
              </div>
              <div className="user-form-footer">
                <div
                  className="back-btn"
                  onClick={() => setContinue(!continueForm)}
                >
                  Back
                </div>
                <div className="btn btn--full user--submit">Sign Up</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
