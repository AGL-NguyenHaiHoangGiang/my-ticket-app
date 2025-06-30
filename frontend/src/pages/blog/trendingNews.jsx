import React from "react";
import "../../assets/style/style.css";
import "../../assets/style/blog.css";
import PostItemTrendingNews from "../../components/blog/postItemTrendingNews";
import DataBlog from "./data/dataBlog";

const TrendingNews = () => {
  const trendingNews = DataBlog.slice(1, 5);
  const trendingNewsItems = trendingNews.map((post) => (
    <PostItemTrendingNews
      key={post.id}
      image={post.image}
      title={post.title}
      author="Bunny"
      date="2025"
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
