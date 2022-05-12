import { useEffect, useState } from "react";
import "../about-community/about-community.styles.css";
import { MdOutlineEditCalendar } from "react-icons/md";
import { BsTagFill } from "react-icons/bs";
import { Context } from "../../contexts/store";
import { useContext } from "react";

export default function AboutCommunity() {
  const [state, dispatch] = useContext(Context);
  const [currentTopics, setCurrentTopics] = useState([]);

  useEffect(() => {
    if (state.subRedditData.length === 0) {
      return;
    }
    if (state.subRedditData[0].topics === null) {
      return;
    } else {
      setCurrentTopics(JSON.parse(state.subRedditData[0].topics));
    }
  }, [state.subRedditData]);

  return (
    <>
      {state.subRedditData.map((data) => (
        <div className="about-community-container" key={data.subId}>
          <div className="about-header">
            <span className="about-header-text">About Community</span>
          </div>
          <div className="about-body">{`${data.subDescription}`}</div>
          <div className="community-stats-container">
            <div className="community-stats">
              {data.members}
              <span className="secondary-text">Members</span>
            </div>
            <div className="community-stats">
              {data.onlineMembers}
              <span className="secondary-text">Online</span>
            </div>
          </div>
          <div className="date-created">
            <MdOutlineEditCalendar className="date-icon" /> Created{" "}
            {data.dateAdded}
          </div>
          <div className="topics">
            <BsTagFill className="date-icon" />
            {`r/${data.subName} topics`}
          </div>
          <div className="topic-links">
            {currentTopics.map((data) => {
              return (
                <div
                  className="btn btn--subreddit-join btn--topic"
                  key={data.topicId}
                >
                  {data.topicName}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
