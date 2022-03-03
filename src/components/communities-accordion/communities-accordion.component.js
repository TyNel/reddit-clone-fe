import "./communities-accordion.styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function CommunitiesAccordion(props) {
  const [open, setOpen] = useState(false);
  const [extend, setExtend] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  const showmore = () => {
    setItemsToShow(subreddits.length);
  };

  const showLess = () => {
    setItemsToShow(3);
  };

  const subreddits = [
    { name: "Askreddit" },
    { name: "NoStupidQuestions" },
    { name: "DestinyTheGame" },
    { name: "nfl" },
    { name: "nba" },
    { name: "mma" },
    { name: "Amd" },
    { name: "sysadmin" },
    { name: "anime" },
    { name: "fitness" },
    { name: "wow" },
    { name: "pics" },
    { name: "ffxiv" },
  ];

  return (
    <div className="accordion-container">
      <div className="accordian-header" onClick={() => setOpen(!open)}>
        <div className="accordian-title">Popular Communities</div>
        <HiOutlineChevronDown className="accordian-icon" />
      </div>
      {open === true ? (
        <div className="accordion-content">
          {subreddits.slice(0, itemsToShow).map((subreddit, index) => (
            <Link
              to={`/${subreddit.name}`}
              className="accordian-link"
              key={index}
            >
              {subreddit.name}
            </Link>
          ))}
          <div className="btn-container" onClick={() => setExtend(!extend)}>
            {itemsToShow === 3 ? (
              <div className="see-more-btn" onClick={showmore}>
                See More
              </div>
            ) : (
              <div className="see-more-btn" onClick={showLess}>
                Show Less
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
