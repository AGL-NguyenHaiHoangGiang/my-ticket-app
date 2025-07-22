import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryNewsTop from "../components/blog/categoryNewsTop";
import CategoryNewsBottom from "../components/blog/categoryNewsBottom";
import SimpleLoading from "../components/SimpleLoading";
import { getAllBlogCategories } from "../services/blog";

const NewsCategory = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(11); // 5 feature + 6 bottom

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    getAllBlogCategories(1000)
      .then((res) => {
        const allBlogs = res.data.metadata || [];
        let filteredBlogs = allBlogs;

        // Lọc theo category nếu có
        if (category === "the-thao") {
          filteredBlogs = allBlogs.filter(
            (item) =>
              item.category_id?.name === "Thể Thao" ||
              item.category_id?.name === "Du lịch"
          );
        } else if (category === "giai-tri") {
          filteredBlogs = allBlogs.filter(
            (item) =>
              item.category_id?.name === "Giải Trí" ||
              item.category_id?.name === "Phim ảnh"
          );
        }

        // Sắp xếp theo ngày mới nhất
        const sortedBlogs = filteredBlogs.sort(
          (a, b) =>
            new Date(b.article_datetime || b.updatedAt) -
            new Date(a.article_datetime || a.updatedAt)
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, [category]);

  // Xác định title dựa trên category
  const getCategoryTitle = () => {
    if (category === "the-thao") return "Thể thao - Du lịch";
    if (category === "giai-tri") return "Phim ảnh - Giải trí";
    if (category === "tin-moi-nhat") return "Tin mới nhất";
    return "Tin tức";
  };

  // 5 tin mới nhất cho feature
  const featuredNews = blogs.slice(0, 5);
  const mainFeaturedNews = featuredNews[0];
  const sideFeaturedNews = featuredNews.slice(1, 5);

  // 6 tin tiếp theo cho bottom, có thể mở rộng
  const bottomNews = blogs.slice(5, displayedCount);

  // 5 tin mới nhất cho sidebar
  const sidebarNews = blogs.slice(0, 5);

  // Lọc tin thể thao
  const sportsNews = blogs.filter(
    (item) =>
      item.category_id?.name === "Thể Thao" ||
      item.category_id?.name === "Du lịch"
  );

  // Lọc tin giải trí
  const entertainmentNews = blogs.filter(
    (item) =>
      item.category_id?.name === "Giải Trí" ||
      item.category_id?.name === "Phim ảnh"
  );

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 10);
  };

  const newsList = sideFeaturedNews.map((item) => (
    <CategoryNewsTop
      key={item._id}
      title={item.title}
      image={item.thumpnail}
      category={item.category_id?.name}
      author={item.author}
      date={item.article_friendly_time}
      id={item.slug}
    />
  ));

  const bottomNewsList = bottomNews.map((item) => (
    <CategoryNewsBottom
      key={item._id}
      title={item.title}
      image={item.thumpnail}
      author={item.author}
      date={item.article_friendly_time}
      category={item.category_id?.name}
      id={item.slug}
    />
  ));

  const sidebarNewsList = sidebarNews.map((item) => (
    <li key={item._id} className="side__item">
      <div className="side__content">
        <Link to={`/tin-tuc/${item.slug}`}>
          <h3 className="side__title">{item.title}</h3>
        </Link>
      </div>
    </li>
  ));

  // Render các tin thể thao
  const renderSportsSection = () => {
    if (sportsNews.length === 0) return null;

    const sportsBigCard = sportsNews.slice(0, 2);
    const sportsSmallCard = sportsNews.slice(2, 6);

    return (
      <section>
        <div className="heading">
          <h2 className="title">Thể thao - Du lịch</h2>
          <Link to="/tin-tuc/the-thao" className="readmore">
            Xem thêm
          </Link>
        </div>
        <div className="blog-new flex-box">
          <ul className="flex-box">
            {sportsBigCard.map((item) => (
              <li key={item._id} className="flex-item">
                <Link to={`/tin-tuc/${item.slug}`} className="post__card">
                  <div className="post__img">
                    <img src={item.thumpnail} alt={item.title} />
                  </div>
                  <div className="post__content">
                    <h3 className="title txt-ellip txt-ellip--2">
                      {item.title}
                    </h3>
                    <p className="desc txt-ellip txt-ellip--2">
                      {item.short_description}
                    </p>
                    <div className="post__date">
                      <span>
                        <strong>{item.author},</strong>{" "}
                        {item.article_friendly_time}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex-box">
            {sportsSmallCard.map((item) => (
              <li key={item._id} className="flex-item">
                <Link
                  to={`/tin-tuc/${item.slug}`}
                  className="verticle-post__item"
                >
                  <div className="verticle-post__img">
                    <img src={item.thumpnail} alt={item.title} />
                  </div>
                  <div className="verticle-post__content">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      {item.title}
                    </h3>
                    <div className="post__date">
                      <span>
                        <strong>{item.author},</strong>{" "}
                        {item.article_friendly_time}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  // Render các tin giải trí
  const renderEntertainmentSection = () => {
    if (entertainmentNews.length === 0) return null;

    const entertainmentBigCard = entertainmentNews.slice(0, 2);
    const entertainmentSmallCard = entertainmentNews.slice(2, 6);

    return (
      <section>
        <div className="heading">
          <h2 className="title">Phim ảnh - Giải trí</h2>
          <Link to="/tin-tuc/giai-tri" className="readmore">
            Xem thêm
          </Link>
        </div>
        <div className="blog-new flex-box">
          <ul className="flex-box">
            {entertainmentBigCard.map((item) => (
              <li key={item._id} className="flex-item">
                <Link to={`/tin-tuc/${item.slug}`} className="post__card">
                  <div className="post__img">
                    <img src={item.thumpnail} alt={item.title} />
                  </div>
                  <div className="post__content">
                    <h3 className="title txt-ellip txt-ellip--2">
                      {item.title}
                    </h3>
                    <p className="desc txt-ellip txt-ellip--2">
                      {item.short_description}
                    </p>
                    <div className="post__date">
                      <span>
                        <strong>{item.author},</strong>{" "}
                        {item.article_friendly_time}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex-box">
            {entertainmentSmallCard.map((item) => (
              <li key={item._id} className="flex-item">
                <Link
                  to={`/tin-tuc/${item.slug}`}
                  className="verticle-post__item"
                >
                  <div className="verticle-post__img">
                    <img src={item.thumpnail} alt={item.title} />
                  </div>
                  <div className="verticle-post__content">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      {item.title}
                    </h3>
                    <div className="post__date">
                      <span>
                        <strong>{item.author},</strong>{" "}
                        {item.article_friendly_time}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  if (loading) {
    return <SimpleLoading />;
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="title">{getCategoryTitle()}</h1>
        {/* category feature */}
        <div className="cat__feature">
          <div className="flex-box">
            <div className="post-grid__col flex-item">
              {mainFeaturedNews && (
                <Link
                  to={`/tin-tuc/${mainFeaturedNews.slug}`}
                  className="card-overlay card-overlay--large"
                >
                  <div className="card-overlay__img">
                    <img
                      src={mainFeaturedNews.thumpnail}
                      alt={mainFeaturedNews.title}
                    />
                  </div>
                  <div className="card-overlay__content">
                    <h2 className="card-overlay__title txt-ellip txt-ellip--2">
                      {mainFeaturedNews.title}
                    </h2>
                  </div>
                </Link>
              )}
            </div>
            <div className="post-grid__col flex-item flex-box">{newsList}</div>
          </div>
        </div>
        {/* category bottom */}
        <div className="category--bottom">
          <div className="flex-box">
            <div className="blog__main">
              <div className="blog-new__main flex-box">
                <ul className="flex-box">{bottomNewsList}</ul>
                {displayedCount < blogs.length && (
                  <div className="blog__btn">
                    <button
                      onClick={handleLoadMore}
                      className="button button--gradient button--radius"
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* category side */}
            <div className="blog__side">
              <div className="heading">
                <h2 className="title">Tin mới cập nhật</h2>
              </div>
              <ul className="side__block">{sidebarNewsList}</ul>
            </div>
          </div>
        </div>

        {/* Chỉ hiển thị Sports và Entertainment sections nếu không phải là category cụ thể */}
        {category !== "the-thao" &&
          category !== "giai-tri" &&
          category !== "tin-moi-nhat" && (
            <>
              {/* Sports Section */}
              {renderSportsSection()}

              {/* Entertainment Section */}
              {renderEntertainmentSection()}
            </>
          )}
      </div>
    </React.Fragment>
  );
};

export default NewsCategory;
