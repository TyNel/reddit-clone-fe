import { useState, useContext } from "react";
import axios from "axios";
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
  const data = props.data;
  const postId = data.postId;
  const currentDate = new Date().getHours();
  const handleClick = async (e) => {
    dispatch({
      type: "SET_CURRENT_POST",
      payload: data,
    });
    const response = await axios.get(
      "https://localhost:5001/api/reddit/Comments",
      {
        params: { postId },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: "SET_COMMENTS",
        payload: response.data,
      });
    }
  };
  return (
    <>
      <div className="post-item-container">
        <div className="vote-container">
          <BiUpvote className="vote-logo" />
          {data.voteCount}
          <BiDownvote className="vote-logo" />
        </div>
        <div className="post-item-body">
          <Link to={`/r/${data.subName}`} className="link post-link-sub">
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
          {data.postImageUrl === null ? (
            <div className="post-item-title">{data.postTitle}</div>
          ) : (
            <div className="post-img-container">
              <div className="post-item-title">{data.postTitle}</div>
              <Link to="/" className="link">
                <img
                  src={data.postImageUrl}
                  alt="User submitted post"
                  className="post-item-image"
                />
              </Link>
            </div>
          )}
          {data.postLink !== null ? (
            <a
              href={data.postLink}
              className="post-body-container"
              target="_blank"
              rel="noreferrer"
            >
              {data.postLink}
            </a>
          ) : null}
          {data.postBodyText !== null ? (
            <div className="post-body-container">{data.postBodyText}</div>
          ) : null}
        </div>
        <footer className="post-item-footer">
          <Link
            onClick={(e) => handleClick(e)}
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
    </>
  );
}
