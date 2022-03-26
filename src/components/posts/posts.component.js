import { useState, useContext, useEffect } from "react";
import "../posts/posts.styles.css";
import PostItem from "../post-item/post-item.component";
import LocationDropDown from "../location-dropdown/location-dropdown.component";
import TopCommunities from "../../components/top-communities/top-communties.component";
import Premium from "../premium/premium-component";
import CommunitiesAccordion from "../communities-accordion/communities-accordion.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";
import { Context } from "../../contexts/store";
import { Link } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { BsSortUpAlt } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";

export default function Posts() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);

  const data = [
    {
      id: 202,
      voteCount: 50000,
      subRedditId: 1,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 6756,
    },
    {
      id: 203,
      voteCount: 12546,
      subRedditId: 1,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 5000,
    },
    {
      id: 204,
      voteCount: 5001,
      subRedditId: 1,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 10000,
    },
    {
      id: 205,
      voteCount: 577126,
      subRedditId: 1,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 1200,
    },
    {
      id: 206,
      voteCount: 1000,
      subRedditId: 1,
      subreddit: "r/AskReddit",
      user: "u/randomuser123",
      dateAdded: "10:00:11",
      postTitle: "random text that is the title",
      postBody: "random text that is the post body",
      postImg: "https://bit.ly/3v6Pc9l",
      comments: 1000,
    },
  ];

  useEffect(() => {
    dispatch({
      type: "SET_TRENDING_POSTS",
      payload: data,
    });
  }, []);

  return (
    <div className="grid--2-cols">
      <div className="popular-posts">Popular Posts</div>
      <h2 className="posts-header">
        <Link to="/" className="post-link">
          <AiOutlineFire className="post-link-icon" />
          Hot
        </Link>
        <div className="post-link" onClick={() => setOpen(!open)}>
          Everywhere
          <MdOutlineKeyboardArrowDown />
          {open && <LocationDropDown />}
        </div>
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
      <div className="left-side-container">
        <PostItem data={state.trendingPosts} />
      </div>
      <div className="right-side-container">
        <TopCommunities />
        <Premium />
        <span className="accordion">
          <CommunitiesAccordion />
        </span>
        <FooterNav />
        <ReturnButton />
      </div>
    </div>
  );
}
