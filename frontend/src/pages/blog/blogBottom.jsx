import React from "react";
import LatestNews from "./news/latestNews";
import SportNews from "./news/sportNews";
import MovieNews from "./news/movieNews";

const BlogBottom = () => {
  return (
    <div className="blog--bottom">
      <div className="container flex-box">
        <div className="blog__main">
          <LatestNews />
          <SportNews />
          <MovieNews />
        </div>
      </div>
    </div>
  );
};

export default BlogBottom;
