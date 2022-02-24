import { useState } from "react";
import "../post-item/post-item.styles.css";
import PostItemDropDown from "../post-item-dropdown/post-item-dropdown.component";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiOutlineWindows } from "react-icons/ai";

export default function PostItem() {
  const [open, setOpen] = useState(false);
  return (
    <div className="post-item-container">
      <div className="vote-container">
        <BiUpvote className="vote-logo" />
        50.5k
        <BiDownvote className="vote-logo" />
      </div>
      <div className="post-item-body">
        <Link to="/" className="link post-link-sub">
          <AiOutlineWindows className="logo" />
          <span className="post-link-sub-text">r/AskReddit</span>
        </Link>
        <Link to="/" className="link posted-by">
          Posted by <span className="post-item-user">u/randomuser123</span> 8
          hours ago
        </Link>
        <Link to="/" className="link join-button">
          Join
        </Link>
        <Link to="/" className="link post-item-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Link>
        <Link to="/" className="link">
          <img
            src="https://bit.ly/3v6Pc9l"
            alt="deep space"
            className="post-item-image"
          />
        </Link>
      </div>
      <footer className="post-item-footer">
        <Link to="/" className="link footer-link">
          <BsChatLeftText />
          <span className="footer-link-text">1.0k Comments</span>
        </Link>
        <Link to="/" className="link footer-link">
          <RiShareForwardLine />
          <span className="footer-link-text">Share</span>
        </Link>
        <Link to="/" className="link footer-link">
          <BsSave />
          <span className="footer-link-text">Save</span>
        </Link>
        <div onClick={() => setOpen(!open)} className="link footer-link">
          <BsThreeDots />
          {open && <PostItemDropDown />}
        </div>
      </footer>
    </div>
  );
}
