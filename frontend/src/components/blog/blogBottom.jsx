import React from "react";
import LatestNews from "./blogBottom/latestNews";
import OtherNews from "./blogBottom/otherNews";
import DataBlog from "./data/dataBlog";
import VerticalPostItem from "./verticalPostItem";
import BlogSide from "./blogBottom/blogSide";
import DataCategory from "./data/dataCategory";

const BlogBottom = () => {
  const sportNews = {
    title: "Thể thao - Du lịch",
    bigCard: DataBlog[0],
    verticalPost: DataBlog.slice(1, 5).map((item) => (
      <VerticalPostItem
        key={item.id}
        img={item.image}
        title={item.title}
        author={item.author}
        date={item.date}
      />
    )),
    path: DataCategory[0].path,
  };
  const movieNews = {
    ...sportNews,
    title: "Phim ảnh - Giải trí",
    path: DataCategory[1].path,
  };

  return (
    <div className="blog--bottom">
      <div className="container flex-box">
        <div className="blog__main">
          <LatestNews />
          <OtherNews
            title={sportNews.title}
            bigCard={sportNews.bigCard}
            verticalPost={sportNews.verticalPost}
            path={sportNews.path}
          />
          <OtherNews
            title={movieNews.title}
            bigCard={movieNews.bigCard}
            verticalPost={movieNews.verticalPost}
            path={movieNews.path}
          />
        </div>
        <BlogSide />
      </div>
    </div>
  );
};

export default BlogBottom;
