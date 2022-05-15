import { Suspense, lazy } from "react";
import { TailSpin } from "react-loader-spinner";
import "../subreddit/subreddit.styles.css";

const SubredditView = lazy(() =>
  import("../../components/subreddit-view/subreddit-view.component")
);

export default function Subreddit() {
  return (
    <>
      <Suspense fallback={<TailSpin />}>
        <SubredditView />
      </Suspense>
    </>
  );
}
