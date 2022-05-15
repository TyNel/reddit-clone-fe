import { useContext, useEffect } from "react";
import { Context } from "../../contexts/store";
import TrendingItem from "../trending-item/trending-item.component";
import axios from "axios";
import "../trending/trending.styles.css";

export default function Trending() {
  const [state, dispatch] = useContext(Context);
  const trendingData = state.trendingPosts;

  useEffect(() => {
    async function GetTrendingPosts() {
      try {
        const trendingData = await axios.get(
          "https://localhost:5001/api/reddit/TrendingPosts"
        );
        if (trendingData.status === 200) {
          dispatch({
            type: "SET_TRENDING_POSTS",
            payload: trendingData.data,
          });
        }
      } catch (error) {
        console.log(error.response.data.errorMessages);
      }
    }
    GetTrendingPosts();
  }, []);

  return (
    <div className="trending-preview">
      <div className="trending-header">Trending today</div>
      <div className="trending-item-container">
        {trendingData.map((data) => (
          <TrendingItem data={data} key={data.postId} />
        ))}
      </div>
    </div>
  );
}
