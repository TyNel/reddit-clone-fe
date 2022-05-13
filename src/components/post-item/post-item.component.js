import { useState, useContext, useRef } from "react";
import axios from "axios";
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function PostItem(props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const data = props.data;
  const postId = data.postId;
  const currentUser = state.user;
  const getPostIndex = state.posts.findIndex((post) => post.postId === postId);
  const getUserVoteIndex = state.userPostVotes?.findIndex(
    (post) => post.likeDislikePostId === postId
  );
  const checkVoteStatus = state.userPostVotes[getUserVoteIndex]?.postIsLike;

  const [upVote, setUpVote] = useState({
    likeDislikePostId: postId,
    likeDislikeUserId: currentUser ? currentUser.userId : null,
    postIsLike: 1,
  });
  const [downVote, setDownVote] = useState({
    likeDislikePostId: postId,
    likeDislikeUserId: currentUser ? currentUser.userId : null,
    postIsLike: 0,
  });

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

  const userVote = async (vote) => {
    const posts = [...state.posts];
    const userVotes = [...state.userPostVotes];
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/LikePost",
        vote
      );
      if (response.status === 200) {
        setLoading(false);
        posts[getPostIndex].voteCount = response.data.voteCount;
        dispatch({
          type: "SET_POSTS",
          payload: posts,
        });
        dispatch({
          type: "SET_CURRENT_POST",
          payload: posts[getPostIndex],
        });
        if (getUserVoteIndex >= 0) {
          userVotes[getUserVoteIndex].postIsLike = response.data.postIsLike;
          dispatch({
            type: "SET_USER_POST_VOTES",
            payload: userVotes,
          });
        } else {
          userVotes.push(response.data);
          dispatch({
            type: "SET_USER_POST_VOTES",
            payload: userVotes,
          });
        }
      }
    } catch (error) {
      console.log(error.response.data.errorMessages);
    }
  };

  const handleVote = (e) => {
    if (currentUser.length === 0) {
      window.alert("Please log in to vote");
      return;
    }
    if (e.target.id === "upvote") {
      setLoading(true);
      userVote(upVote);
    }
    if (e.target.id === "downvote") {
      setLoading(true);
      userVote(downVote);
    }
  };

  return (
    <>
      <div className="post-item-container">
        <div className="vote-container">
          <button className="vote-button" onClick={handleVote}>
            <BiUpvote
              className={
                checkVoteStatus === 1
                  ? "upvote-logo upvote-filled"
                  : "upvote-logo"
              }
              id="upvote"
            />
          </button>
          <div className="vote-count-container">
            {" "}
            {loading === true ? <AiOutlineLoading3Quarters /> : data.voteCount}
          </div>

          <button className="vote-button" onClick={handleVote}>
            <BiDownvote
              className={
                checkVoteStatus === 0
                  ? "downvote-logo downvote-filled"
                  : "downvote-logo"
              }
              id="downvote"
            />
          </button>
        </div>
        <div className="post-item-body">
          <Link
            to={`/r/${data.postCommunity}/${data.subName}`}
            className="link post-link-sub"
          >
            <AiOutlineWindows className="logo" />
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
