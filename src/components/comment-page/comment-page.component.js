import "../comment-page/comment-page.styles.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
import PostItem from "../post-item/post-item.component";
import AboutCommunity from "../about-community/about-community.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";
import CommentSection from "../comment-section/comment-section.component";

export default function CommentPage() {
  const [state, dispatch] = useContext(Context);
  const { postId } = useParams();
  const currentPost = [
    state.trendingPosts.find((post) => post.id.toString() === postId),
  ];

  const topics = [
    {
      type: "Reddit",
      id: 1,
    },
    {
      type: "Ask",
      id: 2,
    },
    {
      type: "Social Media",
      id: 3,
    },
    {
      type: "Mobile App",
      id: 4,
    },
    {
      type: "Meta/Reddit",
      id: 5,
    },
    {
      type: "Technology",
      id: 6,
    },
  ];

  const subData = [
    {
      subredditId: 1,
      headerImg: "https://bit.ly/3KoEr6P",
      name: "AskReddit",
      title: "Ask Reddit...",
      about:
        "AskReddit is the place to ask and answer thought-provoking questions.",
      dateAdded: "Jan 25, 2008",
      memebers: "30.2m",
      onlineMembers: "10k",
    },
  ];

  const comments = [
    {
      id: 1,
      body: "Mon Mothma was a terrible leader for the rebellion, literally every time a character advances the goals of the Alliance she's always against it beforehand and then, only after it works, does she go along with it.",
      username: "Getgiggles",
      icon: "https://bit.ly/36RvJPT",
      parentId: null,
      createAt: "2022-03-27T23:00:33.010+2:00",
    },
    {
      id: 2,
      body: "Mon Mothma was a terrible leader for the rebellion, literally every time a character advances the goals of the Alliance she's always against it beforehand and then, only after it works, does she go along with it.",
      username: "Hannah",
      icon: "https://bit.ly/36RvJPT",
      parentId: 1,
      createAt: "2022-03-27T23:00:33.010+2:00",
    },
    {
      id: 3,
      body: "Mon Mothma was a terrible leader for the rebellion, literally every time a character advances the goals of the Alliance she's always against it beforehand and then, only after it works, does she go along with it.",
      username: "DeysB",
      icon: "https://bit.ly/36RvJPT",
      parentId: null,
      createAt: "2022-03-27T23:00:33.010+2:00",
    },
    {
      id: 4,
      body: "Mon Mothma was a terrible leader for the rebellion, literally every time a character advances the goals of the Alliance she's always against it beforehand and then, only after it works, does she go along with it.",
      username: "reply to 3",
      icon: "https://bit.ly/36RvJPT",
      parentId: 3,
      createAt: "2022-03-27T23:00:33.010+2:00",
    },
  ];

  const rootComments = state.comments.filter(
    (comment) => comment.parentId === null
  );

  const getReplies = (commentId) => {
    return state.comments.filter((comment) => comment.parentId === commentId);
  };

  useEffect(() => {
    if (state.subRedditData.length === 0) {
      dispatch({
        type: "SET_SUBREDDIT_DATA",
        payload: subData,
      });
      dispatch({
        type: "SET_SUBTOPICS",
        payload: topics,
      });
    }
    dispatch({
      type: "SET_COMMENTS",
      payload: comments,
    });
  }, []);

  return (
    <div className="container grid--2-cols comment-page-content">
      <div className="comment-page-header"></div>
      <div className="comment-page-post">
        <PostItem data={currentPost} />

        {rootComments.map((rootComment) => (
          <div key={rootComment.id}>
            {" "}
            <CommentSection
              comment={rootComment}
              replies={getReplies(rootComment.id)}
            />
          </div>
        ))}
      </div>
      <div className="right-side-container">
        <AboutCommunity />
        <FooterNav />
        <ReturnButton />
      </div>
    </div>
  );
}
