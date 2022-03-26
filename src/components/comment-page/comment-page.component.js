import "../comment-page/comment-page.styles.css";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/store";
import PostItem from "../post-item/post-item.component";
import AboutCommunity from "../about-community/about-community.component";
import FooterNav from "../footer-nav/footer-nav.component";
import ReturnButton from "../return-button/return-button.component";

export default function CommentPage(props) {
  const [state, dispatch] = useContext(Context);
  const { postId } = useParams();
  const currentPost = [
    state.trendingPosts.find((post) => post.id.toString() === postId),
  ];

  return (
    <div className="container grid--2-cols comment-page-content">
      <div className="comment-page-header"></div>
      <div className="comment-page-post">
        <PostItem data={currentPost} />
      </div>
      <FooterNav />
      <ReturnButton className="return--btn" />
    </div>
  );
}
