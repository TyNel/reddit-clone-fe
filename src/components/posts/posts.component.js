import { useState, useContext, useEffect, useCallback, useRef } from "react";
import "../posts/posts.styles.css";
import PostItem from "../post-item/post-item.component";
import LocationDropDown from "../location-dropdown/location-dropdown.component";
import TopCommunities from "../../components/top-communities/top-communties.component";
import Premium from "../premium/premium-component";
import CommunitiesAccordion from "../communities-accordion/communities-accordion.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";
import axios from "axios";
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
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const lastItemRef = useRef(null);
  const posts = state.posts;

  // const handleObserver = useCallback((entries) => {
  //   const [target] = entries;
  //   if (target.isIntersecting) {
  //     setpageNumber((prev) => prev + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.9,
  //   };
  //   const observer = new IntersectionObserver(handleObserver, option);

  //   if (lastItemRef.current) observer.observe(lastItemRef.current);
  //   return () => {
  //     observer.unobserve(lastItemRef);
  //   };
  // }, [handleObserver, posts]);

  const getPosts = useCallback(async () => {
    try {
      const trendingPosts = await axios.get(
        "https://localhost:5001/api/reddit/Posts",
        {
          params: { pageNumber, pageSize },
        }
      );
      if (trendingPosts.status === 200) {
        dispatch({
          type: "SET_POSTS",
          payload: trendingPosts.data,
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessages);
    }
  }, []);

  // const getMorePosts = useCallback(async () => {
  //   const posts = [...state.posts];
  //   try {
  //     const trendingPosts = await axios.get(
  //       "https://localhost:5001/api/reddit/Posts",
  //       {
  //         params: { pageNumber, pageSize },
  //       }
  //     );
  //     if (trendingPosts.status === 200) {
  //       for (let i = 0; i < trendingPosts.length; i++) {
  //         console.log(i);
  //       }
  //       dispatch({
  //         type: "SET_POSTS",
  //         payload: posts,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.errorMessages);
  //   }
  // }, [pageNumber]);

  // useEffect(() => {
  //   getMorePosts();
  // }, [getMorePosts]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
