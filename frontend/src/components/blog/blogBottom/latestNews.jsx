import React from "react";
import BigCardNews from "../../../components/blog/bigCardNews";
import SmallCardNews from "../../../components/blog/smallCardNews";
import { Link } from "react-router-dom";

const LatestNews = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  // Sắp xếp theo ngày mới nhất
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.article_datetime || b.updatedAt) -
      new Date(a.article_datetime || a.updatedAt)
  );

  const bigCardNewsArr = sortedBlogs.slice(0, 2);
  const smallCardNewsArr = sortedBlogs.slice(2, 6);

  const bigCardNewsList = bigCardNewsArr.map((item) => (
    <BigCardNews
      key={item._id}
      image={item.thumpnail}
      title={item.title}
      description={item.short_description}
      author={item.author}
      date={item.article_friendly_time}
      category={item.category_id?.name}
      id={item.slug}
    />
  ));

  const smallCardNewsList = smallCardNewsArr.map((item) => (
    <SmallCardNews
      key={item._id}
      title={item.title}
      image={item.thumpnail}
      author={item.author}
      date={item.article_friendly_time}
      category={item.category_id?.name}
      id={item.slug}
    />
  ));

  return (
    <section>
      <div className="heading">
        <h2 className="title">Tin mới nhất</h2>
        <Link to="/loai-tin-tuc/tin-moi-nhat" className="readmore">
          Xem thêm
        </Link>
      </div>
      <div className="blog-new flex-box">
        <ul className="flex-box">{bigCardNewsList}</ul>
        <ul className="flex-box">{smallCardNewsList}</ul>
      </div>
    </section>
  );
};

export default LatestNews;
