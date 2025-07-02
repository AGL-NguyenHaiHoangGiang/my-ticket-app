import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DataCategory from "./blog/data/dataCategory";
import DataBlog from "./blog/data/dataBlog";
import CategoryNewsTop from "../components/blog/categoryNewsTop";

const NewsCategory = () => {
  const { category } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  const categoryData = DataCategory.find((item) => item.path === category);
  const news = DataBlog.slice(1, 5);
  const newsList = news.map((item) => (
    <CategoryNewsTop title={item.title} image={item.image} />
  ));
  const bottomNews = Array(6)
    .fill(DataBlog[0])
    .map((item) => (
      <CategoryNewsTop
        title={item.title}
        image={item.image}
        author={item.author}
        date={item.date}
      />
    ));

  return (
    <React.Fragment>
      <main className="blog category">
        <div className="container">
          <h1 className="title">{categoryData.name}</h1>
          <div className="cat__feature">
            <div className="flex-box">
              <div className="post-grid__col flex-item">
                <a
                  href="/tin-tuc-detail/"
                  className="card-overlay card-overlay--large"
                >
                  <div className="card-overlay__img">
                    <img src={DataBlog[0].image} alt={DataBlog[0].title} />
                  </div>
                  <div className="card-overlay__content">
                    <h2 className="card-overlay__title txt-ellip txt-ellip--2">
                      {DataBlog[0].title}
                    </h2>
                  </div>
                </a>
              </div>
              <div className="post-grid__col flex-item flex-box">
                {newsList}
              </div>
            </div>
          </div>
          <div className="category--bottom">
            <div className="flex-box">
              <div className="blog-main">
                <div className="blog-new__main flex-box">
                  <ul className="flex-box">{bottomNews}</ul>
                  <div className="blog__btn">
                    <a
                      href="#"
                      className="button button--gradient button--radius"
                    >
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default NewsCategory;
