import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { BsSortUpAlt } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import PostItem from "../post-item/post-item.component";
import LocationDropDown from "../location-dropdown/location-dropdown.component";
import TopCommunities from "../../components/top-communities/top-communities.component";
import Premium from "../premium/premium-component";
import CommunitiesAccordion from "../communities-accordion/communities-accordion.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";
import axios from "axios";
import "../posts/posts.styles.css";

export default function Posts() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hot");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const observer = useRef();
  const pageSize = 10;

  //check if user has scrolled to bottom of page
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore === true) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore]
  );

  const getPosts = useCallback(async () => {
    const prevPosts = [...posts];
    try {
      const response = await axios.get(
        "https://tysocialappapi.azurewebsites.net/api/reddit/Posts",
        {
          params: { pageNumber, pageSize },
        }
      );
      if (response.status === 200) {
        if (posts.length === 0) {
          setHasMore(response.data.length > 0);
          dispatch(setPosts(response.data));
        } else {
          //if posts already exist check if response has any elements already in state
          response.data.forEach((newPost) => {
            let exists = prevPosts.some(
              (post) => post.postId === newPost.postId
            );
            if (exists === false) {
              prevPosts.push(newPost);
            }
          });
          setHasMore(response.data.length > 0);
          dispatch(setPosts(prevPosts));
        }
      }
    } catch (error) {
      if (error.data) {
        alert(error.response.data.errorMessages);
      } else {
        console.log(error.message);
      }
    }
  }, [pageNumber]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="grid--2-cols">
      <div className="popular-posts">Popular Posts</div>
      <h2 className="posts-header">
        <Link
          to="/"
          className={activeTab === "hot" ? "post-link active-tab" : "post-link"}
          onClick={() => setActiveTab("hot")}
        >
          <AiOutlineFire className="post-link-icon" />
          Hot
        </Link>
        <div className="post-link" onClick={() => setOpen(!open)}>
          Everywhere
          <MdOutlineKeyboardArrowDown />
          {open && <LocationDropDown />}
        </div>
        <Link
          to="/"
          className={activeTab === "new" ? "post-link active-tab" : "post-link"}
          onClick={() => setActiveTab("new")}
        >
          <GiSevenPointedStar className="post-link-icon" />
          New
        </Link>
        <Link
          to="/"
          className={activeTab === "top" ? "post-link active-tab" : "post-link"}
          onClick={() => setActiveTab("top")}
        >
          <BsSortUpAlt className="post-link-icon" />
          Top
        </Link>
        <Link
          to="/"
          className={
            activeTab === "rising" ? "post-link active-tab" : "post-link"
          }
          onClick={() => setActiveTab("rising")}
        >
          <FiTrendingUp className="post-link-icon" />
          Rising
        </Link>
      </h2>
      <div className="left-side-container posts">
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div key={post.postId} ref={lastItemRef}>
                <PostItem data={post} />
              </div>
            );
          }
          return (
            <div key={post.postId}>
              <PostItem data={post} />
            </div>
          );
        })}
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
