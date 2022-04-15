import { useState } from "react";
import logo from "../../assests/Reddit_Lockup_OnWhite.svg";
import "../header/header.styles.css";
import { BsSearch } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/dropdown.component";
import SignUp from "../signup/signup.component";
import Login from "../login/login.component";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [signinModal, setSigninOpen] = useState(false);
  const [loginModal, setLoginOpen] = useState(false);

  const toggleSigninModal = (data) => {
    setSigninOpen(data);
  };

  const toggleLogin = (data) => {
    setLoginOpen(data);
  };

  return (
    <div className="header">
      <div className="homepage-icon-box">
        <Link to="/">
          <img src={logo} alt="reddit logo" className="homepage-icon-img" />
        </Link>
      </div>
      <div className="navbar-search-container">
        <div className="searchbar-icon">
          <BsSearch color="#a4a4a4" />
        </div>
        <input placeholder="Search Reddit" className="search-bar" type="text" />
      </div>
      {localStorage.getItem("user") === null ? (
        <div className="login-signup-container">
          <div
            className="btn btn--outline"
            onClick={() => setLoginOpen(!loginModal)}
          >
            Log In
          </div>
          {loginModal && (
            <Login toggleModal={toggleLogin} toggleSignin={toggleSigninModal} />
          )}
          <div
            className="btn btn--full"
            onClick={() => setSigninOpen(!signinModal)}
          >
            Sign Up
          </div>
          {signinModal && (
            <SignUp toggleModal={toggleSigninModal} toggleLogin={toggleLogin} />
          )}
        </div>
      ) : (
        <Link to="/r/submit" className="create-post-icon">
          <MdAdd color="#a4a4a4" />
        </Link>
      )}
      <div onClick={() => setOpen(!open)} className="dropdown-menu-icon">
        <BsPerson color="#a4a4a4" />
        <MdKeyboardArrowDown color="#a4a4a4" />
        {open && <Dropdown toggleLogin={toggleLogin} />}
      </div>
    </div>
  );
}
