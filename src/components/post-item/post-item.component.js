import { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import { BsChatLeftText } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import PostVote from "../post-vote/post-vote.component";
import PostItemDropDown from "../post-item-dropdown/post-item-dropdown.component";
import axios from "axios";
import "../post-item/post-item.styles.css";

export default function PostItem(props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  const data = props.data;
  const postId = data.postId;
  const getPostIndex = state.posts.findIndex((post) => post.postId === postId);

  const handleClick = async (e) => {
    const posts = [...state.posts];
    dispatch({
      type: "SET_CURRENT_POST",
      payload: posts[getPostIndex],
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
          <PostVote
            postId={postId}
            getPostIndex={getPostIndex}
            voteCount={data.voteCount}
          />
        </div>
        <div className="post-item-body">
          <Link
            to={`/r/${data.postCommunity}/${data.subName}`}
            className="link post-link-sub"
          >
            <img
              src={data.subIcon}
              className="post--item-icon"
              alt="subreddit icon"
            />
            <span className="post-link-sub-text">{data.subName}</span>
          </Link>
          <div className="posted-by">
            Posted by <span className="post-item-user">{data.postAuthor}</span>{" "}
            on {new Date(data.dateAdded).toLocaleDateString()}
          </div>
          <button to="/" className="btn join-button">
            Join
          </button>
          {data.postImageUrl === null ? (
            <Link
              className="post-item-title"
              onClick={(e) => handleClick(e)}
              to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
            >
              {data.postTitle}
            </Link>
          ) : (
            <div className="post-img-container">
              <Link
                className="post-item-title"
                onClick={(e) => handleClick(e)}
                to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
              >
                {data.postTitle}
              </Link>
              <Link
                className="link"
                onClick={(e) => handleClick(e)}
                to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
              >
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
            <Link
              onClick={(e) => handleClick(e)}
              to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
              className="post-body-container"
            >
              {data.postBodyText}
            </Link>
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
