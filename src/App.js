import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Subreddit from "./pages/subreddit/subreddit.component";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/AskReddit" element={<Subreddit />} />
      </Routes>
    </div>
  );
}

export default App;
