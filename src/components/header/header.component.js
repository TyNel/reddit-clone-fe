import { useState } from "react";
import logo from "../../assests/Reddit_Lockup_OnWhite.svg";
import "../header/header.styles.css";
import { BsSearch } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/dropdown.component";

export default function Header() {
  const [open, setOpen] = useState(false);
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
      <div className="login-signup-container">
        <Link to="/" className="btn btn--outline">
          Log In
        </Link>
        <Link to="/" className="btn btn--full">
          Sign Up
        </Link>
        <div onClick={() => setOpen(!open)} className="dropdown-menu-icon">
          <BsPerson color="#a4a4a4" />
          <MdKeyboardArrowDown color="#a4a4a4" />
          {open && <Dropdown />}
        </div>
      </div>
    </div>
  );
}
