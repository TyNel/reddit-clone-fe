import "../top-communities/top-communities.styles.css";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

export default function TopCommunities(props) {
  const [randomSubData, setRandom] = useState([]);
  const subData = props.data;

  useEffect(() => {
    const GetRandomSubs = async () => {
      const response = await axios.get(
        "https://localhost:5001/api/reddit/SubNames"
      );

      if (response.status === 200) {
        setRandom(response.data);
      }
    };
    if (subData === undefined) {
      GetRandomSubs();
    }
  }, []);

  return (
    <div className="top-communities-container">
      <div className="top-communities-header">
        <span className="header-text">Communities</span>
      </div>
      <div className="item-container">
        {subData?.length > 0 || subData === undefined ? (
          subData === undefined ? (
            randomSubData.map((post) => {
              return (
                <div key={post.subId}>
                  <Link
                    to={`/r/${post.subId}/${post.subName}`}
                    className="top-communities-item"
                  >
                    <img
                      src={post.subIcon}
                      className="sub-icon icon--create-post"
                      alt="subreddit icon"
                    />
                    <span className="sub-name">{post.subName}</span>{" "}
                    <div className="btn btn--join-community">Join</div>
                  </Link>
                </div>
              );
            })
          ) : (
            subData.map((post) => {
              return (
                <div key={post.postId}>
                  <Link
                    to={`/r/${post.subId}/${post.subName}`}
                    className="top-communities-item"
                  >
                    <img
                      src={post.subIcon}
                      className="sub-icon icon--create-post"
                      alt="subreddit icon"
                    />
                    <span className="sub-name">{post.subName}</span>{" "}
                    <div className="btn btn--join-community">Join</div>
                  </Link>
                </div>
              );
            })
          )
        ) : (
          <div className="no-results-container">No results</div>
        )}
      </div>
    </div>
  );
}
