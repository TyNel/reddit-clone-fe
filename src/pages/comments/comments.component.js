import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
import { VscCommentDiscussion } from "react-icons/vsc";
import PostItem from "../../components/post-item/post-item.component";
import AboutCommunity from "../../components/about-community/about-community.component";
import FooterNav from "../../components/footer-nav/footer-nav.component";
import ReturnButton from "../../components/return-button/return-button.component";
import Comment from "../../components/comment-item/comment-item.component";
import CommentForm from "../../components/comment-form/comment-form.component";
import SignUp from "../../components/signup/signup.component";
import Login from "../../components/login/login.component";
import axios from "axios";
import "../comments/comments.styles.css";

export default function CommentPage() {
  const [state, dispatch] = useContext(Context);
  const [signinModal, setSigninOpen] = useState(false);
  const [loginModal, setLoginOpen] = useState(false);
  const { postId, subName } = useParams();
  const userVotes = state.userPostVotes;
  const userId = state.user === "" ? null : state.user.userId;
  const currentPost = state.currentPost;
  const rootComments = state.comments.filter(
    (comment) => comment.commentParentId === null
  );

  const getReplies = (commentId) => {
    return state.comments.filter(
      (comment) => comment.commentParentId === commentId
    );
  };

  const toggleSigninModal = (data) => {
    setSigninOpen(data);
  };

  const toggleLogin = (data) => {
    setLoginOpen(data);
  };

  useEffect(() => {
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
        console.log(error.response.data.errorMessages);
      }
    }
    GetSubData();
  }, []);

  useEffect(() => {
    if (state.user !== null) {
      getUserCommentVotes();
    }
    async function getUserCommentVotes() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/reddit/UserLikedComments",
          {
            params: { postId, userId },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "SET_USER_COMMENT_VOTES",
            payload: response.data,
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
        <PostItem data={currentPost} votes={userVotes} />
        {userId === null ? (
          <div className="login-signup-container-comments">
            <div className="content-container">
              <div className="login-signup-text">
                Log in or sign up to leave a comment
              </div>
              <div className="btn-container">
                <div
                  className="btn btn--outline"
                  onClick={() => setLoginOpen(!loginModal)}
                >
                  Log In
                </div>
                {loginModal && (
                  <Login
                    toggleModal={toggleLogin}
                    toggleSignin={toggleSigninModal}
                  />
                )}
                <div
                  className="btn btn--full"
                  onClick={() => setSigninOpen(!signinModal)}
                >
                  Sign Up
                </div>
                {signinModal && (
                  <SignUp
                    toggleModal={toggleSigninModal}
                    toggleLogin={toggleLogin}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <CommentForm />
        )}

        {rootComments.length > 0 ? (
          <div>
            {rootComments.map((rootComment) => (
              <div key={rootComment.commentId}>
                {" "}
                <Comment
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
