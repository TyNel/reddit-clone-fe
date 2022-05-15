import { useContext } from "react";
import { Context } from "../../contexts/store";
import { Link } from "react-router-dom";
import axios from "axios";
import "../trending-item/trending-item.styles.css";

export default function TrendingItem(props) {
  const [state, dispatch] = useContext(Context);
  const data = props.data;
  const postId = data.postId;

  const handleClick = async (e) => {
    dispatch({
      type: "SET_CURRENT_POST",
      payload: data,
    });
    try {
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
    } catch (error) {
      console.log(error.response.data.errorMessages);
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
          <div className="trending-text">
            {data.postBodyText === null ? "" : data.postBodyText.slice(0, 55)}
            {data.postBodyText?.length >= 55 ? "..." : ""}
          </div>
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
