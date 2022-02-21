import "../trending/trending.styles.css";
import { Link } from "react-router-dom";

export default function Trending() {
  return (
    <div className="container trending-container">
      <div className="trending-header">Trending Today</div>
      <div className="trending-posts-container">
        <Link to="/" className="trending-item"></Link>
      </div>
    </div>
  );
}
