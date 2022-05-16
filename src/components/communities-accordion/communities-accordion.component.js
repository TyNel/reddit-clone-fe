import { useContext, useEffect } from "react";
import { Context } from "../../contexts/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import axios from "axios";
import "./communities-accordion.styles.css";

export default function CommunitiesAccordion() {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [extend, setExtend] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  const subreddits = state.subNames.length > 0 ? state.subNames : [];

  const showmore = () => {
    setItemsToShow(subreddits.length);
  };

  const showLess = () => {
    setItemsToShow(3);
  };

  useEffect(() => {
    async function GetNames() {
      try {
        const subNames = await axios.get(
          "https://localhost:5001/api/reddit/SubNames"
        );
        if (subNames.status === 200) {
          dispatch({
            type: "SET_SUBNAMES",
            payload: subNames.data,
          });
        }
      } catch (error) {
        console.log(error.response.data.errorMessages);
      }
    }
    GetNames();
  }, []);

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
              to={`/r/${subreddit.subId}/${subreddit.subName}`}
              className="accordian-link"
              key={index}
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            >
              {subreddit.subName}
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
