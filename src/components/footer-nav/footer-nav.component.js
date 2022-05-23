import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import "../footer-nav/footer-nav.styles.css";

function FooterNav() {
  const options = [
    "Help",
    "Reddit Coins",
    "Reddit Premium",
    "Communities",
    "Rereddit",
    "Topics",
    "About",
    "Careers",
    "Press",
    "Advertise",
    "Blog",
    "Terms",
    "Content Policy",
    "Privacy Policy",
    "Mod Policy",
  ];
  return (
    <div className="nav-container">
      <div className="link-container">
        {options.map((option, idx) => (
          <Link to="/" className="nav-link" key={idx}>
            {option}
          </Link>
        ))}
        <div className="copyright-container">
          Reddit Inc <AiOutlineCopyrightCircle className="copyright-logo" />{" "}
          2022. All rights reserved
        </div>
      </div>
    </div>
  );
}

export default React.memo(FooterNav);
