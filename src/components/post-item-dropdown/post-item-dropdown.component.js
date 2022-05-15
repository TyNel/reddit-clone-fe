import { Link } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { VscReport } from "react-icons/vsc";
import "../post-item-dropdown/post-item-dropdown.style.css";

export default function PostItemDropDown() {
  return (
    <div className="post-item-dropdown-container">
      <Link to="/" className="post-item-dropdown-link">
        <BiHide className="post-item-dropdown-icon" />
        <span className="post-item-dropdown-text">Hide</span>
      </Link>
      <Link to="/US" className="post-item-dropdown-link">
        <VscReport className="post-item-dropdown-icon" />
        <span className="post-item-dropdown-text">Report</span>
      </Link>
    </div>
  );
}
