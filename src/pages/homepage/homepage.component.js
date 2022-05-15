import { Suspense, lazy } from "react";
import { TailSpin } from "react-loader-spinner";

const Trending = lazy(() =>
  import("../../components/trending/trending.component")
);
const Posts = lazy(() => import("../../components/posts/posts.component"));

export default function HomePage() {
  return (
    <div className="container homepage">
      <Suspense fallback={<TailSpin />}>
        <Trending />
        <Posts />
      </Suspense>
    </div>
  );
}
