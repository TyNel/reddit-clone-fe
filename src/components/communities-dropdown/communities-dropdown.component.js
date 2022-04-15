import "../communities-dropdown/communities-dropdown.styles.css";
import { Link } from "react-router-dom";

export default function CommunitiesDropdown(props) {
  const data = props.data;
  const toggleSearch = props.toggleSearch;

  return (
    <div className="dropdown-results-container">
      {data.map((sub) => (
        <div className="sub-link-container" key={sub.subId}>
          <Link
            to={`/r/${sub.subName}/submit`}
            className="dropwdown-result-item"
            onClick={() => toggleSearch(false)}
          >
            {sub.subName}
          </Link>
        </div>
      ))}
    </div>
  );
}
