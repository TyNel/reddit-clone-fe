import React from "react";
import { BsShieldCheck } from "react-icons/bs";
import "../premium/premium.styles.css";

function Premium() {
  return (
    <div className="premium-container">
      {" "}
      <div className="icon-container">
        <BsShieldCheck className="premium-icon" />
      </div>
      <div className="premium-content-container">
        <span className="premium-title">Reddit Premium</span>
        <span className="premium-text">
          The best Reddit experience, with monthly Coins
        </span>
      </div>
      <div className="btn btn--try-now">Try Now</div>
    </div>
  );
}

export default React.memo(Premium);
