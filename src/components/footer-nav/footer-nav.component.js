import "../footer-nav/footer-nav.styles.css";
import { Link } from "react-router-dom";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export default function FooterNav() {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-link">
        Help
      </Link>
      <Link to="/" className="nav-link">
        Reddit Coins
      </Link>
      <Link to="/" className="nav-link">
        Reddit Premium
      </Link>
      <Link to="/" className="nav-link">
        Communities
      </Link>
      <Link to="/" className="nav-link">
        Rereddit
      </Link>
      <Link to="/" className="nav-link">
        Topics
      </Link>
      <Link to="/" className="nav-link">
        About
      </Link>
      <Link to="/" className="nav-link">
        Careers
      </Link>
      <Link to="/" className="nav-link">
        Press
      </Link>
      <Link to="/" className="nav-link">
        Advertise
      </Link>
      <Link to="/" className="nav-link">
        Blog
      </Link>
      <Link to="/" className="nav-link">
        Terms
      </Link>
      <Link to="/" className="nav-link">
        Content Policy
      </Link>
      <Link to="/" className="nav-link">
        Privacy Policy
      </Link>
      <Link to="/" className="nav-link">
        Mod Policy
      </Link>
      <div className="copyright-container">
        Reddit Inc <AiOutlineCopyrightCircle /> 2022. All rights reserved
      </div>
    </div>
  );
}
