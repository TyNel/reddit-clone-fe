import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const Header = lazy(() => import("./components/header/header.component"));
const Subreddit = lazy(() => import("./pages/subreddit/subreddit.component"));
const Comments = lazy(() => import("./pages/comments/comments.component"));
const SubmitPost = lazy(() =>
  import("./pages/submitPost/submitPost.component")
);
const Search = lazy(() => import("./pages/search/search.component"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="loading-icon">
            <TailSpin color="#0079d3" ariaLabel="loading" />
          </div>
        }
      >
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={true}
        />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/r/:subId/:subName" element={<Subreddit />} />
          <Route
            exact
            path="/r/:subName/comments/:id/:postTitle"
            element={<Comments />}
          />
          <Route exact path="/r/submit" element={<SubmitPost />} />
          <Route
            exact
            path="/r/:subId/:subName/submit"
            element={<SubmitPost />}
          />
          <Route exact path="/r/search/:query" element={<Search />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
