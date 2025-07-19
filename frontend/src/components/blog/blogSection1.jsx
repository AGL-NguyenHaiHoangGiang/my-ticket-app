import React, { useEffect, useState } from "react";
import VerticalPostItem from "./verticalPostItem";
import { Link } from "react-router-dom";
import { getAllBlogCategories } from "../../services/blog";

const BlogSection1 = () => {
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

  if (!blogs.length) return null;

  // Sắp xếp theo ngày mới nhất
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.article_datetime || b.updatedAt) -
      new Date(a.article_datetime || a.updatedAt)
  );

  const mainBlog = sortedBlogs[0];
  const section1News = sortedBlogs.slice(1, 6);

  const blogArrayDom = section1News.map((item) => (
    <VerticalPostItem
      key={item._id}
      img={item.thumpnail}
      title={item.title}
      author={item.author}
      date={item.article_friendly_time}
      category={item.category_id?.name}
      id={item.slug}
    />
  ));

  return (
    <section className="blog1">
      <div className="container">
        <div className="flex-box">
          <div className="blog1__left">
            <div className="post__card--large">
              <Link to={`/tin-tuc/${mainBlog.slug}`} className="post__card">
                <div className="post__img blog1__main-image">
                  <img src={mainBlog.thumpnail} alt="blog" />
                </div>
                <div className="post__content">
                  <h2 className="title txt-ellip txt-ellip--2">
                    {mainBlog.title}
                  </h2>
                  <p className="desc txt-ellip txt-ellip--2">
                    {mainBlog.short_description}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="blog1__right">
            <div className="verticle-post">{blogArrayDom}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection1;
