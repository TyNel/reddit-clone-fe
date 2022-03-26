import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Subreddit from "./pages/subreddit/subreddit.component";
import Comments from "./pages/comments/comments.component";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/r/:subName" element={<Subreddit />} />
        <Route
          path="/r/:subName/comments/:postId/:postTitle"
          element={<Comments />}
        />
      </Routes>
    </div>
  );
}

export default App;
