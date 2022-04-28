import "../subreddit-view/subreddit-view.styles.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PostItem from "../post-item/post-item.component";
import SubRules from "../sub-rules/rules.component";
import FooterNav from "../footer-nav/footer-nav.component";
import AboutCommunity from "../about-community/about-community.component";
import ReturnButton from "../return-button/return-button.component";
import { AiOutlineFire } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { BsSortUpAlt } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { Context } from "../../contexts/store";
import axios from "axios";

export default function SubredditView() {
  const { subName } = useParams();
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    async function GetSubData() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/reddit/SubReddit",
          {
            params: { subName },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "SET_SUBREDDIT_DATA",
            payload: [response.data],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    GetSubData();
  }, [dispatch, subName]);

  return (
    <>
      <div className="sub-header-top">
        <div className="sub-header-img-container">
          <img
            src={
              state.subRedditData.length > 0
                ? state.subRedditData[0].subImage
                : ""
            }
            alt="the word askreddit"
            className="sub-header-img"
          />
        </div>
        <div className="container sub-header-bottom">
          <div className="sub-name-container">
            <img
              src="https://bit.ly/3K03ygp"
              alt="gray question mark"
              className="subreddit-icon"
            />
            <div className="sub-title">{subName}</div>
            <div className="btn btn--subreddit-join">Join</div>
            <div className="subreddit-name">{`r/${subName}`}</div>
          </div>
          <div className="header-nav">
            <div className="nav-link">Posts</div>
            <div className="nav-link">Wiki</div>
            <div className="nav-link">Best of AskReddit</div>
          </div>
        </div>
      </div>
      <div className="container grid--2-cols">
        <h2 className="posts-header">
          <Link to="/" className="post-link">
            <AiOutlineFire className="post-link-icon" />
            Hot
          </Link>
          <Link to="/" className="post-link">
            <GiSevenPointedStar className="post-link-icon" />
            New
          </Link>
          <Link to="/" className="post-link">
            <BsSortUpAlt className="post-link-icon" />
            Top
          </Link>
          <Link to="/" className="post-link">
            <FiTrendingUp className="post-link-icon" />
            Rising
          </Link>
        </h2>
        <div className="sub-post-container">
          <PostItem data={state.posts} />
        </div>
        <div className="sub-right-side-container">
          <AboutCommunity />
          <SubRules />
          <FooterNav />
          <ReturnButton />
        </div>
      </div>
    </>
  );
}
