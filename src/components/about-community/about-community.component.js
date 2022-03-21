import "../about-community/about-community.styles.css";
import { MdOutlineEditCalendar } from "react-icons/md";
import { BsTagFill } from "react-icons/bs";

export default function AboutCommunity(props) {
  const data = props.data;
  const topics = props.topics;

  return (
    <div className="about-community-container">
      <div className="about-header">
        <span className="about-header-text">About Community</span>
      </div>
      <div className="about-body">{`r/${data.about}`}</div>
      <div className="community-stats-container">
        <div className="community-stats">
          {data.memebers}
          <span className="secondary-text">Members</span>
        </div>
        <div className="community-stats">
          {data.onlineMembers}
          <span className="secondary-text">Online</span>
        </div>
      </div>
      <div className="date-created">
        <MdOutlineEditCalendar className="date-icon" /> Created {data.dateAdded}
      </div>
      <div className="topics">
        <BsTagFill className="date-icon" />
        {`r/${data.name} topics`}
      </div>
      <div className="topic-links">
        {topics.map((topic) => {
          return (
            <div className="btn btn--subreddit-join btn--topic" key={topic.id}>
              {topic.type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
