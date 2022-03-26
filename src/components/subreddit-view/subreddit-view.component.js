import "../subreddit-view/subreddit-view.styles.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PostItem from "../post-item/post-item.component";
import SubRules from "../sub-rules/rules.component";
import FooterNav from "../footer-nav/footer-nav.component";
import AboutCommunity from "../about-community/about-community.component";
import ReturnButton from "../return-button/return-button.component";
import { AiOutlineQuestion } from "react-icons/ai";
import { AiOutlineFire } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { BsSortUpAlt } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { Context } from "../../contexts/store";

export default function SubredditView() {
  const data = {
    headerImg: "https://bit.ly/3KoEr6P",
    name: "AskReddit",
    title: "Ask Reddit...",
    about:
      "AskReddit is the place to ask and answer thought-provoking questions.",
    dateAdded: "Jan 25, 2008",
    memebers: "30.2m",
    onlineMembers: "10k",
  };

  const rules = [
    {
      subredditId: 1,
      ruleNumber: 1,
      ruleTitle:
        "Rule 1 - Questions must be clear and direct and may not use the body textbox",
      subPointOne:
        "All questions must be clear, written in English, and conclude with a questions mark",
      subPointTwo:
        "All context in the title must be necessary to understanding the question; do not give 'example answers' in the post title",
      subPointThree:
        "No text in the text box - any additional info from you must be added as a comment to your post",
    },
    {
      subredditId: 1,
      ruleNumber: 2,
      ruleTitle: "Rule 2 - No personal or professional advice requests",
      subPointOne:
        "Askreddit is NOT your personal or professional advice platform",
      subPointTwo:
        "Do not makes posts asking for professional advice - medical, legal, financial, or otherwise",
      subPointThree:
        "All posts asking for advice must be generic and not specific to your situation alone",
    },
    {
      subredditId: 1,
      ruleNumber: 3,
      ruleTitle: "Rule 3 - Open ended questions only",
      subPointOne: "Post must be an open-ended discussion question",
      subPointTwo: "Title must not be phrased to allow a simple yes/no answer",
      subPointThree: "No questions that have definite answers",
      subPointFour: "Question must not be a poll or survey",
    },
  ];

  const topics = [
    {
      type: "Reddit",
      id: 1,
    },
    {
      type: "Ask",
      id: 2,
    },
    {
      type: "Social Media",
      id: 3,
    },
    {
      type: "Mobile App",
      id: 4,
    },
    {
      type: "Meta/Reddit",
      id: 5,
    },
    {
      type: "Technology",
      id: 6,
    },
  ];

  const { subName } = useParams();

  console.log(subName);

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch(
      {
        type: "SET_SUBREDDIT_DATA",
        payload: data,
      },
      {
        type: "SET_SUBTOPICS",
        payload: topics,
      },
      {
        type: "SET_SUBRULES",
        payload: rules,
      }
    );
  }, []);

  return (
    <>
      <div className="sub-header-top">
        <div className="sub-header-img-container">
          <img
            src={data.headerImg}
            alt="the word askreddit"
            className="sub-header-img"
          />
        </div>
        <div className="container sub-header-bottom">
          <div className="sub-name-container">
            <AiOutlineQuestion className="subreddit-icon" />
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
          <PostItem data={state.trendingPosts} />
        </div>
        <div className="sub-right-side-container">
          <AboutCommunity topics={topics} data={data} />
          <div className="rules-container">
            <div className="about-header">
              <span className="about-header-text">r/{data.name} Rules</span>
            </div>
            <SubRules rules={rules} />
          </div>
          <FooterNav />
          <ReturnButton />
        </div>
      </div>
    </>
  );
}
