import React, { useEffect, useState } from "react";

import BlogSection1 from "../components/blog/blogSection1";
import TrendingNews from "../components/blog/trendingNews";
import BlogBottom from "../components/blog/blogBottom";
import SimpleLoading from "../components/SimpleLoading";
import { getAllBlogCategories } from "../services/blog";

const News = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogCategories(1000)
      .then((res) => {
        setBlogs(res.data.metadata || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SimpleLoading />;
  }

  return (
    <React.Fragment>
      {/* section 1 */}
      <BlogSection1 blogs={blogs} />
      {/* trending news */}
      <TrendingNews blogs={blogs} />
      {/* blog bottom */}
      <BlogBottom blogs={blogs} />
    </React.Fragment>
  );
};
export default News;
