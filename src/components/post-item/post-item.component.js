import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
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

export default function PostItem(props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  const { postId } = useParams();
  const data = props.data;
  const currentDate = new Date().getHours();
  const handleClick = () => {
    dispatch({
      type: "SET_CURRENT_POST",
      payload: data,
    });
  };
  return (
    <div>
      <div className="post-item-container">
        <div className="vote-container">
          <BiUpvote className="vote-logo" />
          {data.voteCount}
          <BiDownvote className="vote-logo" />
        </div>
        <div className="post-item-body">
          <Link to={`/${data.subName}`} className="link post-link-sub">
            <AiOutlineWindows className="logo" />
            <span className="post-link-sub-text">{data.subName}</span>
          </Link>
          <Link to="/" className="link posted-by">
            Posted by <span className="post-item-user">{data.postAuthor}</span>{" "}
            {currentDate - parseInt(data.dateAdded)} hours ago
          </Link>
          <Link to="/" className="link join-button">
            Join
          </Link>
          {data.postImage === null ? (
            <div className="post-item-title">{data.postTitle}</div>
          ) : (
            <div className="post-img-container">
              <Link to="/" className="link">
                <img
                  src={data.postImg}
                  alt="deep space"
                  className="post-item-image"
                />
              </Link>
            </div>
          )}
          {postId ? (
            <div className="post-body-container">{data.postBodyText}</div>
          ) : null}
        </div>
        <footer className="post-item-footer">
          <Link
            onClick={() => handleClick()}
            to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
            className="link footer-link"
          >
            <BsChatLeftText />
            <span className="footer-link-text">
              {data.commentCount} Comments
            </span>
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
    </div>
  );
}
