import "../trending-item/trending-item.styles.css";
import { Link } from "react-router-dom";
import { AiOutlineWindows } from "react-icons/ai";

export default function TrendingItem() {
  return (
    <div
      className="trending-container"
      style={{
        backgroundImage: `url("https://bit.ly/3v6Pc9l")`,
      }}
    >
      <Link to="/" className="trending-link">
        <h2 className="trending-title-text">Test Title</h2>
        <div className="trending-text">
          lorem oi[[oifjwe[oijffffw[eoijf sdfdsfs
        </div>
        <div className="bottom-logo-container">
          <AiOutlineWindows className="logo" />
          <span className="trending-logo-link">Test link</span>
        </div>
      </Link>
    </div>
  );
}
