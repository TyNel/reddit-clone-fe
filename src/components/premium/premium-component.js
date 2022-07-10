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
        <h2 className="premium-title">Reddit Premium</h2>
        <p className="premium-text">
          The best Reddit experience, with monthly Coins
        </p>
      </div>
      <button className="btn btn--try-now">Try Now</button>
    </div>
  );
}

export default React.memo(Premium);
