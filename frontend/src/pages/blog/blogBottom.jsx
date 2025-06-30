import React from "react";
import LatestNews from "./blogBottom/latestNews";
import OtherNews from "./blogBottom/otherNews";
import DataBlog from "./data/dataBlog";
import BigCardNews from "../../components/blog/bigCardNews";
import VerticalPostItem from "../../components/blog/verticalPostItem";

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
  };
  const movieNews = {
    ...sportNews,
    title: "Phim ảnh - Giải trí",
  };

  return (
    <div className="blog--bottom">
      <div className="container flex-box">
        <div className="blog__main">
          <LatestNews />
          {/* Thể thao - Du lịch */}
          <OtherNews
            title={sportNews.title}
            bigCard={sportNews.bigCard}
            verticalPost={sportNews.verticalPost}
          />
          <OtherNews
            title={movieNews.title}
            bigCard={movieNews.bigCard}
            verticalPost={movieNews.verticalPost}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogBottom;
