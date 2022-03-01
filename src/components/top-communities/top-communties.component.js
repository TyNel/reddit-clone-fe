import "../top-communities/top-communities.styles.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaFootballBall } from "react-icons/fa";

export default function TopCommunities() {
  return (
    <div className="top-communities-container">
      <div className="top-communities-header">
        <span className="header-text">Top Sports Communities</span>
      </div>
      <div className="item-container">
        <Link to="/" className="top-communities-item">
          1 <MdKeyboardArrowUp className="arrow-icon first" />{" "}
          <FaFootballBall className="sub-icon" />{" "}
          <span className="sub-name">r/formula1</span>{" "}
          <div className="btn btn--join-community">Join</div>
        </Link>
        <Link to="/" className="top-communities-item">
          2 <MdKeyboardArrowUp className="arrow-icon" />{" "}
          <FaFootballBall className="sub-icon" />
          <span className="sub-name">r/tennis</span>{" "}
          <div className="btn btn--join-community">Join</div>
        </Link>
        <Link to="/" className="top-communities-item">
          3 <MdKeyboardArrowUp className="arrow-icon" />{" "}
          <FaFootballBall className="sub-icon" />
          <span className="sub-name">r/CollegeBasketBall</span>{" "}
          <div className="btn btn--join-community">Join</div>
        </Link>
        <Link to="/" className="top-communities-item">
          4 <MdKeyboardArrowUp className="arrow-icon" />{" "}
          <FaFootballBall className="sub-icon" />{" "}
          <span className="sub-name">r/SquaredCircle</span>{" "}
          <div className="btn btn--join-community">Join</div>
        </Link>
        <Link to="/" className="top-communities-item">
          5 <MdKeyboardArrowUp className="arrow-icon" />{" "}
          <FaFootballBall className="sub-icon" />
          <span className="sub-name">r/CFB</span>
          <div className="btn btn--join-community">Join</div>
        </Link>
      </div>
      <div className="btn view-all">View All</div>
      <div className="leaderboard-container">
        <div className="btn leaderboard">Top</div>
        <div className="btn leaderboard">News</div>
        <div className="btn leaderboard">Sports</div>
        <div className="btn leaderboard">Gaming</div>
      </div>
    </div>
  );
}
