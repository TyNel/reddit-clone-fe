import "../comment-page/comment-page.styles.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
import axios from "axios";
import PostItem from "../post-item/post-item.component";
import AboutCommunity from "../about-community/about-community.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";
import CommentSection from "../comment-section/comment-section.component";
import CommentForm from "../comment-form/comment-form.component";
import { VscCommentDiscussion } from "react-icons/vsc";

export default function CommentPage() {
  const [state, dispatch] = useContext(Context);
  const { subName } = useParams();
  const currentPost = state.currentPost;
  const rootComments = state.comments.filter(
    (comment) => comment.commentParentId === null
  );

  const getReplies = (commentId) => {
    return state.comments.filter(
      (comment) => comment.commentParentId === commentId
    );
  };

  useEffect(() => {
    if (state.subRedditData.length === 0) {
      GetSubData();
    }
    async function GetSubData() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/reddit/SubReddit",
          {
            params: { subName },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "SET_SUBREDDIT_DATA",
            payload: [response.data],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="container grid--2-cols comment-page-content">
      <div className="comment-page-header"></div>
      <div className="comment-page-body">
        <PostItem data={currentPost} />
        <CommentForm />
        {rootComments.length > 0 ? (
          <div>
            {rootComments.map((rootComment) => (
              <div key={rootComment.commentId}>
                {" "}
                <CommentSection
                  comment={rootComment}
                  replies={getReplies(rootComment.commentId)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-comments-container">
            <VscCommentDiscussion className="no-comment-icon" />
            <div className="no-comment-text">No Comments Yet</div>
            <div className="no-comment-text sub-text">
              Be the first to share what you think!
            </div>
          </div>
        )}
      </div>
      <div className="right-side-container">
        <AboutCommunity />
        <FooterNav />
        <ReturnButton />
      </div>
    </div>
  );
}
