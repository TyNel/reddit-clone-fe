import "../subreddit-view/subreddit-view.styles.css";

export default function SubredditView() {
  const data = {
    headerImg: "https://bit.ly/3KoEr6P",
    name: "AskReddit",
    title: "Ask Reddit...",
    about:
      "/rAskReddit is the place to ask and answer thought-provoking questions",
    dateAdded: "1/25/2008",
  };

  const rules = [
    {
      ruleOne:
        "Questions must be clear and direct and may not use the body textbox",
      subPointOne:
        "All questions must be clear, written in English, and conclude with a questions mark",
      subPointTwo:
        "All context in the title must be necessary to understanding the question; do not give 'example answers' in the post title",
      subPointThree:
        "No text in the text box - any additional info from you must be added as a comment to your post",
    },
    {
      ruleTwo: "No personal or professional advice requests",
      subPointOne:
        "Askreddit is NOT your personal or professional advice platform",
      subPointTwo:
        "Do not makes posts asking for professional advice - medical, legal, financial, or otherwise",
      subPointThree:
        "All posts asking for advice must be generic and not specific to your situation alone",
    },
    {
      ruleThree: "Open ended questions only",
      subPointOne: "Post must be an open-ended discussion question",
      subPointTwo: "Title must not be phrased to allow a simple yes/no answer",
      subPointThree: "No questions that have definite answers",
      subPointFour: "Question must not be a poll or survey",
    },
  ];
  return (
    <>
      <div className="sub-header-top">
        <div className="sub-header-img-container">
          <img
            src={data.headerImg}
            alt="the word askreddit"
            className="sub-header-img"
          />
        </div>
        <div className="sub-header-bottom">
          <div className="sub-name-container">
            <div className="sub-icon">Ask Reddit...</div>
            <div className="btn btn--subreddit-join">Join</div>
            <div className="sub-name">r/AskReddit</div>
          </div>
          <div className="header-nav">
            <div className="nav-link">Posts</div>
            <div className="nav-link">Wiki</div>
            <div className="nav-link">Best of AskReddit</div>
          </div>
        </div>
      </div>
    </>
  );
}
