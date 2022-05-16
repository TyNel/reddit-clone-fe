import React from "react";

function ReturnButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="btn btn--full return--btn" onClick={scrollToTop}>
      Back to Top
    </div>
  );
}

export default React.memo(ReturnButton);
