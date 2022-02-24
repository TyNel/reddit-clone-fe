import React from "react";
import Header from "../../components/header/header.component";
import Trending from "../../components/trending/trending.component";
import Posts from "../../components/posts/posts.component";

export default function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <div className="container homepage-body">
        <Trending />
        <Posts />
      </div>
    </div>
  );
}
