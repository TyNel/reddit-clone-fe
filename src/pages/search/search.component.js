import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../../components/post-item/post-item.component";
import FooterNav from "../../components/footer-nav/footer-nav.component";
import ReturnButton from "../../components/return-button/return-button.component";
import TopCommunities from "../../components/top-communities/top-communities.component";
import "../search/search.styles.css";

export default function Search() {
  const state = useSelector((state) => state);
  const [subData, setSubData] = useState([]);
  const searchedData = state.searchedPosts;
  const { query } = useParams();

  const communities = useCallback(() => {
    let result = [];

    //check for unique subreddits in searched posts response
    searchedData.forEach((post) => {
      if (!result.find((el) => el.subName === post.subName)) {
        result.push(post);
      }
    });
    setSubData(result);
  }, [searchedData]);

  useEffect(() => {
    communities();
  }, [communities]);

  return (
    <div className="container grid--2-cols search-results">
      <div className="left-side-container">
        {searchedData.length > 0 ? (
          searchedData.map((post) => {
            return (
              <div key={post.postId}>
                <PostItem data={post} />{" "}
              </div>
            );
          })
        ) : (
          <div className="no-search-results">
            Looks like there aren't any results for "{query}". Try
            double-checking your spelling or searching for a related topic.
          </div>
        )}
      </div>
      <div className="right-side">
        <TopCommunities subData={subData} />
        <FooterNav />
        <ReturnButton />
      </div>
    </div>
  );
}
