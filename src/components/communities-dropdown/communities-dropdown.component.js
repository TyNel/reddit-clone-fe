import "../communities-dropdown/communities-dropdown.styles.css";
import { Link } from "react-router-dom";

export default function CommunitiesDropdown(props) {
  const data = props.data;
  const toggleSearch = props.toggleSearch;
  const fromHeader = props.fromHeader;

  return (
    <div className="dropdown-results-container">
      {data.map((sub) => (
        <div className="sub-link-container" key={sub.subId}>
          <img
            src={sub.subIcon}
            className="sub-icon icon--create-post"
            alt="subreddit icon"
          />
          <Link
            to={
              fromHeader === true
                ? `/r/${sub.subId}/${sub.subName}/`
                : `/r/${sub.subId}/${sub.subName}/submit`
            }
            className="dropdown-result-item"
            onClick={() => toggleSearch(false)}
          >
            <span className="post-sub-name">r/{sub.subName}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
