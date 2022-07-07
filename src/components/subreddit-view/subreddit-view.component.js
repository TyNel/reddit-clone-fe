import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubData } from "../../features/subRedditData/subRedditDataSlice";
import { setPosts } from "../../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { BsSortUpAlt } from "react-icons/bs";
import PostItem from "../post-item/post-item.component";
import SubRules from "../sub-rules/rules.component";
import FooterNav from "../footer-nav/footer-nav.component";
import AboutCommunity from "../about-community/about-community.component";
import ReturnButton from "../return-button/return-button.component";
import axios from "axios";
import "../subreddit-view/subreddit-view.styles.css";

export default function SubredditView() {
  const { subId, subName } = useParams();
  const [activeTab, setActiveTab] = useState("hot");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const subPosts = state.posts.length > 0 ? state.posts : [];

  useEffect(() => {
    async function GetSubData() {
      try {
        const response = await axios.get(
          "https://tysocialappapi.azurewebsites.net/api/reddit/SubReddit",
          {
            params: { subName },
          }
        );
        if (response.status === 200) {
          dispatch(setSubData(response.data));
        }
      } catch (error) {
        console.log(
          error.response ? error.response.data.errorMessages : error.message
        );
      }
    }
    GetSubData();
  }, [dispatch, subName]);

  useEffect(() => {
    async function GetSubPosts() {
      try {
        const response = await axios.get(
          "https://tysocialappapi.azurewebsites.net/api/reddit/SubPosts",
          {
            params: { subId },
          }
        );
        if (response.status === 200) {
          dispatch(setPosts(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    GetSubPosts();
  }, [dispatch, subId]);

  return (
    <>
      <div className="sub-header-top">
        {state.subRedditData[0]?.subImage !== null ? (
          <div className="sub-header-img-container">
            <img
              src={state.subRedditData[0]?.subImage}
              alt="subreddit-title-img"
              className="sub-header-img"
            />
          </div>
        ) : (
          <div className="sub-header-img-container">
            <div className="default-sub-header"></div>
          </div>
        )}

        <div className="container sub-header-bottom">
          <div className="sub-name-container">
            <img
              src={state.subRedditData[0]?.subIcon}
              alt="sub icon"
              className="subreddit-icon"
            />
            <div className="sub-title">{subName}</div>
            <div className="btn btn--subreddit-join">Join</div>
            <div className="subreddit-name">{`r/${subName}`}</div>
          </div>
        </div>
      </div>
      <div className="container grid--2-cols">
        <div className="left-side-container">
          <h2 className="posts-header">
            <div
              to="/"
              className={
                activeTab === "hot" ? "post-link active-tab" : "post-link"
              }
              onClick={() => setActiveTab("hot")}
            >
              <AiOutlineFire className="post-link-icon" />
              Hot
            </div>
            <div
              to="/"
              className={
                activeTab === "new" ? "post-link active-tab" : "post-link"
              }
              onClick={() => setActiveTab("new")}
            >
              <GiSevenPointedStar className="post-link-icon" />
              New
            </div>
            <div
              to="/"
              className={
                activeTab === "top" ? "post-link active-tab" : "post-link"
              }
              onClick={() => setActiveTab("top")}
            >
              <BsSortUpAlt className="post-link-icon" />
              Top
            </div>
          </h2>
          <div className="sub-post-container">
            {subPosts.map((post) => (
              <div key={post.postId}>
                <PostItem data={post} />
              </div>
            ))}
          </div>
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
