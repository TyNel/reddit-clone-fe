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

  const postItemData = [
    {
      id: 202,
      voteCount: 50000,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 10,
    },
  ];

  const currentDate = new Date().getHours();

  return (
    <div>
      {postItemData.map((post) => (
        <div className="post-item-container" key={post.id}>
          <div className="vote-container">
            <BiUpvote className="vote-logo" />
            {post.voteCount}
            <BiDownvote className="vote-logo" />
          </div>
          <div className="post-item-body">
            <Link to="/AskReddit" className="link post-link-sub">
              <AiOutlineWindows className="logo" />
              <span className="post-link-sub-text">{post.subreddit}</span>
            </Link>
            <Link to="/" className="link posted-by">
              Posted by <span className="post-item-user">{post.user}</span>{" "}
              {currentDate - parseInt(post.dateAdded)} hours ago
            </Link>
            <Link to="/" className="link join-button">
              Join
            </Link>
            <Link to="/" className="link post-item-title"></Link>
            <div className="post-img-container">
              <Link to="/" className="link">
                <img
                  src={post.postImg}
                  alt="deep space"
                  className="post-item-image"
                />
              </Link>
            </div>
          </div>
          <footer className="post-item-footer">
            <Link to="/" className="link footer-link">
              <BsChatLeftText />
              <span className="footer-link-text">{post.comments} Comments</span>
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
      ))}
    </div>
  );
}
