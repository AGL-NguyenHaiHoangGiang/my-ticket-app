import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataCategory from "../components/blog/data/dataCategory";
import DataBlog from "../components/blog/data/dataBlog";
import CategoryNewsTop from "../components/blog/categoryNewsTop";
import CategoryNewsBottom from "../components/blog/categoryNewsBottom";

const NewsCategory = () => {
  const { category } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  const categoryData = DataCategory.find((item) => item.path === category);
  const news = DataBlog.slice(1, 5);
  const newsList = news.map((item) => (
    <CategoryNewsTop
      title={item.title}
      image={item.image}
      category={item.category}
      author={item.author}
      date={item.date}
      id={item.id}
    />
  ));
  const bottomNews = Array(6)
    .fill(DataBlog[0])
    .map((item) => (
      <CategoryNewsBottom
        title={item.title}
        image={item.image}
        author={item.author}
        date={item.date}
        category={item.category}
        id={item.id}
      />
    ));

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="title">{categoryData.name}</h1>
        <div className="cat__feature">
          <div className="flex-box">
            <div className="post-grid__col flex-item">
              <Link
                to={"/tin-tuc/" + DataBlog[0].category + "/" + DataBlog[0].id}
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
              </Link>
            </div>
            <div className="post-grid__col flex-item flex-box">{newsList}</div>
          </div>
        </div>
        <div className="category--bottom">
          <div className="flex-box">
            <div className="blog__main">
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
            <div className="blog__side">
              <div className="heading">
                <h2 className="title">Tin mới cập nhật</h2>
              </div>
              <ul className="side__block">
                <li className="side__item">
                  <div className="side__content">
                    <Link
                      to={
                        "/tin-tuc/" +
                        DataBlog[0].category +
                        "/" +
                        DataBlog[0].id
                      }
                    >
                      <h3 className="side__title">
                        Giải chạy đêm Hà Nội - VnExpress Hanoi Midnight 2024
                      </h3>
                    </Link>
                  </div>
                </li>
                <li className="side__item">
                  <div className="side__content">
                    <Link
                      to={
                        "/tin-tuc/" +
                        DataBlog[0].category +
                        "/" +
                        DataBlog[0].id
                      }
                    >
                      <h3 className="side__title">
                        Giải chạy đêm Hà Nội - VnExpress Hanoi Midnight 2024
                      </h3>
                    </Link>
                  </div>
                </li>
                <li className="side__item">
                  <div className="side__content">
                    <Link
                      to={
                        "/tin-tuc/" +
                        DataBlog[0].category +
                        "/" +
                        DataBlog[0].id
                      }
                    >
                      <h3 className="side__title">
                        Giải chạy đêm Hà Nội - VnExpress Hanoi Midnight 2024
                      </h3>
                    </Link>
                  </div>
                </li>
                <li className="side__item">
                  <div className="side__content">
                    <Link
                      to={
                        "/tin-tuc/" +
                        DataBlog[0].category +
                        "/" +
                        DataBlog[0].id
                      }
                    >
                      <h3 className="side__title">
                        Giải chạy đêm Hà Nội - VnExpress Hanoi Midnight 2024
                      </h3>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewsCategory;
