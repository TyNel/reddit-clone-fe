import "../trending-item/trending-item.styles.css";
import { Link } from "react-router-dom";

export default function TrendingItem() {
  const trendingData = [
    {
      backgroundImage: "https://bit.ly/3v6Pc9l",
      title: "test title",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      logoImg: "https://bit.ly/3vL8kds",
      subredditName: "r/tester",
    },
  ];

  return (
    <div className="trending">
      {trendingData.map((data) => (
        <div
          className="trending-container"
          style={{
            backgroundImage: `url${data.backgroundImage}`,
          }}
        >
          <Link to="/" className="trending-link">
            <h2 className="trending-title-text">{data.title}</h2>
            <div className="trending-text">{data.info}</div>
            <div className="bottom-logo-container">
              <img src={data.logoImg} alt="subreddit logo" className="logo" />
              <span className="trending-logo-link">
                {data.subredditName} and more
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
