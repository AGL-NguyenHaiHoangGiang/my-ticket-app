import React from "react";
import BlogSection1 from "./blog/blogSection1";
import TrendingNews from "./blog/trendingNews";
import BlogBottom from "./blog/blogBottom";
import BlogSide from "./blog/blogBottom/blogSide";

const News = () => {
  return (
    <React.Fragment>
      {/* section 1 */}
      <BlogSection1 />
      {/* trending news */}
      <TrendingNews />
      {/* blog bottom */}
      <BlogBottom />
    </React.Fragment>
  );
};
export default News;
