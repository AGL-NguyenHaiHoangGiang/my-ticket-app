import React from "react";
import VerticalPostItem from "./verticalPostItem";
import DataBlog from "./data/dataBlog";
import { Link } from "react-router-dom";

const BlogSection1 = () => {
  const section1News = DataBlog.slice(0, 5);

  const blogArrayDom = section1News.map((item) => {
    if (item.id == 0) return null;
    return (
      <VerticalPostItem
        key={item.id}
        img={item.image}
        title={item.title}
        author={item.author}
        date={item.date}
        category={item.category}
        id={item.id}
      />
    );
  });

  return (
    <section className="blog1">
      <div className="container">
        <div className="flex-box">
          <div className="blog1__left">
            <div className="post__card--large">
              <Link
                to={"/tin-tuc/" + DataBlog[0].category + "/" + DataBlog[0].id}
                className="post__card"
              >
                <div className="post__img blog1__main-image">
                  <img src={DataBlog[0].image} alt="blog" />
                </div>
                <div className="post__content">
                  <h2 className="title txt-ellip txt-ellip--2">
                    {DataBlog[0].title}
                  </h2>
                  <p className="desc txt-ellip txt-ellip--2">
                    {DataBlog[0].description}
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
