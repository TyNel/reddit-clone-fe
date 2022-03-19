import "../trending/trending.styles.css";
import TrendingItem from "../trending-item/trending-item.component";

export default function Trending() {
  return (
    <div className="trending-preview">
      <div className="trending-header">Trending today</div>
      <div className="trending-item-container">
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
      </div>
    </div>
  );
}
