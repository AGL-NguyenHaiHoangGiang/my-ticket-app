import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, getAllBlogCategories } from "../services/blog";
// import avatar from "../assets/images/blog/avatar.jpg";
// import catAvatar from "../assets/images/blog/cat.jpg";
// import duckAvatar from "../assets/images/blog/duck.jpg";
// import adBanner from "../assets/images/blog/ad-banner.png";
import BlogAds from "../components/blog/blog-ads";
import RelatedEvents from "../components/related";
import SimpleLoading from "../components/SimpleLoading";

const NewDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy chi tiết bài viết theo slug
    getBlogBySlug(slug)
      .then((res) => {
        if (res.data.metadata) {
          setNews(res.data.metadata);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog detail:", err);
        setLoading(false);
      });

    // Lấy tin liên quan
    getAllBlogCategories(5)
      .then((res) => {
        setRelatedNews(res.data.metadata || []);
      })
      .catch((err) => {
        console.error("Error fetching related news:", err);
      });
  }, [slug]);

  if (loading) {
    return <SimpleLoading />;
  }

  if (!news) {
    return <div>Không tìm thấy bài viết</div>;
  }
  return (
    <React.Fragment>
      <article className="blog-detail">
        <div className="container">
          <div className="flex-box">
            <div className="blog-single__main">
              {/* <div className="blog-single__featured">
                <img src={news.thumpnail} alt={news.title} />
              </div> */}
              <h1 className="blog-single__title">{news.title}</h1>
              <div className="post__date">
                <span>
                  {news.author}, {news.article_friendly_time}
                </span>
              </div>
              <div className="content">
                <p className="summary">{news.summary}</p>
                {news.content &&
                  news.content.map((paragraph, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
              </div>
              {/* <div className="comment-section">
                <form className="user-input">
                  <div className="user-profile">
                    <div className="user-avatar ">
                      <img src={avatar} alt="avatar" />
                    </div>
                    <textarea
                      rows="3"
                      className="comment__input"
                      placeholder="Nhập nội dung..."
                    />
                  </div>
                  <div className="submit-comment">
                    <p className="submit__warning">*Đăng nhập để bình luận</p>
                    <button
                      className="button button--radius button--gradient"
                      type="submit"
                    >
                      Gửi
                    </button>
                  </div>
                </form>
                <div className="comment__list-section">
                  <ul className="comment-list__filter">
                    <li className="active">Được quan tâm nhất</li>
                    <li>Mới nhất</li>
                  </ul>
                  <ul className="comment__list">
                    <li className="comment__item">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img src={duckAvatar} alt="avatar" />
                        </div>
                        <div className="comment__main">
                          <div className="user__name">
                            <h3>Duck</h3>
                          </div>
                          <p className="comment__content">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, .
                          </p>
                          <div className="comment__actions">
                            <div className="sumit__action">
                              <div className="answer__button action__button">
                                <span>Trả lời</span>
                              </div>
                              <div className="share__button action__button">
                                <span>Chia sẻ</span>
                              </div>
                            </div>
                            <div className="comment__date">
                              <p>2 giờ trước</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="comment__item">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img src={catAvatar} alt="avatar" />
                        </div>
                        <div className="comment__main">
                          <div className="user__name">
                            <h3>Cat</h3>
                          </div>
                          <p className="comment__content">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, .
                          </p>
                          <div className="comment__actions">
                            <div className="sumit__action">
                              <div className="answer__button action__button">
                                <span>Trả lời</span>
                              </div>
                              <div className="share__button action__button">
                                <span>Chia sẻ</span>
                              </div>
                            </div>
                            <div className="comment__date">
                              <p>2 giờ trước</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="comment-list__action">
                    <button className="button button--gradient button--radius">
                      Xem thêm bình luận
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="blog-single__side">
              <div className="heading">
                <h2 className="title">Đọc nhiều</h2>
              </div>
              <ul className="side__block">
                {relatedNews.slice(0, 4).map((item) => (
                  <li key={item._id} className="side__item">
                    <div className="side__content">
                      <Link to={`/tin-tuc/${item.slug}`}>
                        <h3 className="side__title">{item.title}</h3>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <BlogAds />
            </div>
          </div>
        </div>
      </article>
      {/* related post */}
      <RelatedEvents />
      {/* end related post */}
    </React.Fragment>
  );
};

export default NewDetail;
