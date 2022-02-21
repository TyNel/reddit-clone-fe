import "../trending/trending.styles.css";
import TrendingItem from "../trending-item/trending-item.component";

export default function Trending() {
  return (
    <div className="container trending-preview">
      <div className="trending-header">Trending today</div>
      <TrendingItem />
    </div>
  );
}
