import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Subreddit from "./pages/subreddit/subreddit.component";
import Comments from "./pages/comments/comments.component";
import SubmitPost from "./pages/submitPost/submitPost.component";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/r/:subId/:subName" element={<Subreddit />} />
        <Route
          path="/r/:subName/comments/:postId/:postTitle"
          element={<Comments />}
        />
        <Route exact path="/r/submit" element={<SubmitPost />} />
        <Route
          exact
          path="/r/:subId/:subName/submit"
          element={<SubmitPost />}
        />
      </Routes>
    </div>
  );
}

export default App;
