import React, { useEffect, useState } from "react";
import PostItemTrendingNews from "./postItemTrendingNews";
import { getAllBlogCategories } from "../../services/blog";

const TrendingNews = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogCategories()
      .then((res) => {
        setBlogs(res.data.metadata || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Lấy ngẫu nhiên 4 tin
  const getRandomBlogs = (arr, n) => {
    const result = [];
    const taken = new Set();
    while (result.length < n && arr.length > 0) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!taken.has(idx)) {
        result.push(arr[idx]);
        taken.add(idx);
      }
    }
    return result;
  };

  const trendingNews = getRandomBlogs(blogs, 4);
  const trendingNewsItems = trendingNews.map((post) => (
    <PostItemTrendingNews
      key={post._id}
      image={post.thumpnail}
      title={post.title}
      author={post.author}
      date={post.article_friendly_time}
      category={post.category_id?.name}
      id={post.slug}
    />
  ));

  return (
    <section className="blog-feature" id="tin-noi-bat">
      <div className="container">
        <div className="heading">
          <h2 className="title">Tin nổi bật</h2>
        </div>
        <ul className="post__list">{trendingNewsItems}</ul>
      </div>
    </section>
  );
};

export default TrendingNews;
