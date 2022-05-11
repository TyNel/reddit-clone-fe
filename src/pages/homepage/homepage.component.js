import Trending from "../../components/trending/trending.component";
import Posts from "../../components/posts/posts.component";

export default function HomePage() {
  return (
    <div className="container homepage">
      <Trending />
      <Posts />
    </div>
  );
}
