import React from "react";
import SideItem from "../../../components/blog/sideItem";
import adsBanner from "../../../assets/images/blog/ad-banner.png";
import BlogAds from "../blog-ads";

const BlogSide = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  // Lấy ngẫu nhiên 5 tin
  const getRandomBlogs = (arr, n) => {
    const result = [];
    const taken = new Set();
    while (result.length < n && result.length < arr.length) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!taken.has(idx)) {
        result.push(arr[idx]);
        taken.add(idx);
      }
    }
    return result;
  };

  const randomBlogs = getRandomBlogs(blogs, 5);

  const blogSideData = randomBlogs.map((item) => (
    <SideItem
      key={item._id}
      title={item.title}
      slug={item.slug}
      category={item.category_id?.name}
    />
  ));

  return (
    <div className="blog__side">
      <div className="heading">
        <h2 className="title">Đọc nhiều</h2>
      </div>
      <ul className="side__block">{blogSideData}</ul>
      <BlogAds />
    </div>
  );
};

export default BlogSide;
