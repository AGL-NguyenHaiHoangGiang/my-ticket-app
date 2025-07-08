import React from "react";

import BlogSection1 from "../components/blog/blogSection1";
import TrendingNews from "../components/blog/trendingNews";
import BlogBottom from "../components/blog/blogBottom";

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
