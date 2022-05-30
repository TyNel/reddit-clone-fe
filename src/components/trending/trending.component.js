import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrendingPosts } from "../../features/trendingPosts/trendingPostsSlice";
import TrendingItem from "../trending-item/trending-item.component";
import axios from "axios";
import "../trending/trending.styles.css";

export default function Trending() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const trendingData = state.trendingPosts;

  useEffect(() => {
    async function GetTrendingPosts() {
      try {
        const trendingData = await axios.get(
          "https://tysocialappapi.azurewebsites.net/api/reddit/TrendingPosts"
        );
        if (trendingData.status === 200) {
          dispatch(setTrendingPosts(trendingData.data));
        }
      } catch (error) {
        console.log(
          error.response ? error.response.data.errorMessages : error.message
        );
      }
    }
    GetTrendingPosts();
  }, [dispatch]);

  return (
    <div className="trending-preview">
      <div className="trending-header">Trending today</div>
      <div className="trending-item-container">
        {trendingData.map((data) => (
          <TrendingItem data={data} key={data.postId} postId={data.postId} />
        ))}
      </div>
    </div>
  );
}
