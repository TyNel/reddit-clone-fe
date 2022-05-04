import "../search/search.styles.css";
import { useContext, useEffect, useCallback, useState } from "react";
import { Context } from "../../contexts/store";
import PostItem from "../../components/post-item/post-item.component";
import FooterNav from "../../components/footer-nav/footer-nav.component";
import ReturnButton from "../../components/return-button/return-button.component";
import TopCommunities from "../../components/top-communities/top-communties.component";

export default function Search() {
  const [state, dispatch] = useContext(Context);
  const [subData, setSubData] = useState([]);
  const searchedData = state.posts;

  const communities = useCallback(() => {
    let result = [];
    for (let i = 0; i < searchedData.length; i++) {
      if (
        result.find(
          (element) => element.subName === searchedData[i].subName
        ) === undefined
      ) {
        result.push(searchedData[i]);
      }
    }
    setSubData(result);
  }, [searchedData]);

  useEffect(() => {
    communities();
  }, [communities]);

  return (
    <div className="container grid--2-cols search-results">
      <div>
        {searchedData.map((post) => {
          return (
            <div key={post.postId}>
              <PostItem data={post} />
            </div>
          );
        })}
      </div>
      <div className="right-side">
        <TopCommunities data={subData} />
        <FooterNav />
        <ReturnButton />
      </div>
    </div>
  );
}
