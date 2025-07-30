import React from "react";
import LatestNews from "./blogBottom/latestNews";
import OtherNews from "./blogBottom/otherNews";
import VerticalPostItem from "./verticalPostItem";
import BlogSide from "./blogBottom/blogSide";

const BlogBottom = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  // Lọc tin thể thao
  const sportsNews = blogs
    .filter(
      (item) =>
        item.category_id?.name === "Thể Thao" ||
        item.category_id?.name === "Du lịch"
    )
    .slice(0, 4);

  // Lọc tin giải trí
  const entertainmentNews = blogs
    .filter(
      (item) =>
        item.category_id?.name === "Giải Trí" ||
        item.category_id?.name === "Phim ảnh"
    )
    .slice(0, 4);

  const sportNews = {
    title: "Thể thao - Du lịch",
    bigCard: sportsNews.length > 0 ? sportsNews[0] : null,
    verticalPost:
      sportsNews.length > 1
        ? sportsNews
            .slice(1, 4)
            .map((item) => (
              <VerticalPostItem
                key={item._id}
                img={item.thumpnail}
                title={item.title}
                author={item.author}
                date={item.article_friendly_time}
                category={item.category_id?.name}
                id={item.slug}
              />
            ))
        : [],
    path: "/loai-tin-tuc/the-thao",
  };

  const movieNews = {
    title: "Phim ảnh - Giải trí",
    bigCard: entertainmentNews.length > 0 ? entertainmentNews[0] : null,
    verticalPost:
      entertainmentNews.length > 1
        ? entertainmentNews
            .slice(1, 4)
            .map((item) => (
              <VerticalPostItem
                key={item._id}
                img={item.thumpnail}
                title={item.title}
                author={item.author}
                date={item.article_friendly_time}
                category={item.category_id?.name}
                id={item.slug}
              />
            ))
        : [],
    path: "/loai-tin-tuc/giai-tri",
  };

  return (
    <div className="blog--bottom">
      <div className="container flex-box">
        <div className="blog__main">
          <LatestNews blogs={blogs} />
          {sportsNews.length > 0 && sportNews.bigCard && (
            <OtherNews
              title={sportNews.title}
              bigCard={sportNews.bigCard}
              verticalPost={sportNews.verticalPost}
              path={sportNews.path}
            />
          )}
          {entertainmentNews.length > 0 && movieNews.bigCard && (
            <OtherNews
              title={movieNews.title}
              bigCard={movieNews.bigCard}
              verticalPost={movieNews.verticalPost}
              path={movieNews.path}
            />
          )}
        </div>
        <BlogSide blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogBottom;
