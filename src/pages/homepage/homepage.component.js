import React from "react";
import Header from "../../components/header/header.component";
import Trending from "../../components/trending/trending.component";

export default function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <div className="container homepage-body">
        <Trending />
      </div>
    </div>
  );
}
