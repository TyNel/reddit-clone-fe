import { useDispatch } from "react-redux";
import { setComments } from "../../features/comments/commentsSlice";
import { setCurrentPost } from "../../features/currentPost/currentPostSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "../trending-item/trending-item.styles.css";

export default function TrendingItem({ data, postId }) {
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    dispatch(setCurrentPost(data));
    try {
      const response = await axios.get(
        "https://tysocialappapi.azurewebsites.net/api/reddit/Comments",
        {
          params: { postId },
        }
      );
      if (response.status === 200) {
        dispatch(setComments(response.data));
      }
    } catch (error) {
      console.log(
        error.response ? error.response.data.errorMessages : error.message
      );
    }
  };

  return (
    <div
      className="trending-container"
      style={{
        backgroundImage:
          data.postImageUrl === null ? "none" : `url(${data.postImageUrl})`,
      }}
    >
      <div className="trending-body">
        <Link
          to={`/r/${data.subName}/comments/${data.postId}/${data.postTitle}`}
          onClick={(e) => handleClick(e)}
          className="trending-link"
        >
          <h2 className="trending-title-text">{data.postTitle}</h2>
          <p className="trending-text">
            {data.postBodyText === null ? "" : data.postBodyText.slice(0, 55)}
            {data.postBodyText?.length >= 55 ? "..." : ""}
          </p>
        </Link>
        <div className="bottom-logo-container">
          {" "}
          <Link
            to={`/r/${data.subId}/${data.subName}`}
            className="trending-link subName"
          >
            <img src={data.subIcon} alt="subreddit logo" className="logo" />
            <span className="trending-logo-link">r/{data.subName}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
