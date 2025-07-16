import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, getAllBlogCategories } from "../services/blog";
import avatar from "../assets/images/blog/avatar.jpg";
import catAvatar from "../assets/images/blog/cat.jpg";
import duckAvatar from "../assets/images/blog/duck.jpg";
import adBanner from "../assets/images/blog/ad-banner.png";

const NewDetail = () => {
  const { category, slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy chi tiết bài viết theo slug
    getBlogBySlug(slug)
      .then((res) => {
        console.log("Blog response:", res.data);
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
    return <div>Đang tải...</div>;
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
              <div className="blog-single__featured">
                <img src={news.thumpnail} alt={news.title} />
              </div>
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
              <div className="comment-section">
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
              </div>
            </div>
            <div className="blog-single__side">
              <div className="heading">
                <h2 className="title">Đọc nhiều</h2>
              </div>
              <ul className="side__block">
                {relatedNews.slice(0, 4).map((item) => (
                  <li key={item._id} className="side__item">
                    <div className="side__content">
                      <Link
                        to={`/tin-tuc/${item.category_id?.name}/${item.slug}`}
                      >
                        <h3 className="side__title">{item.title}</h3>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="side__block pc-only">
                <a href="#" className="add-banner">
                  <img src={adBanner} alt="ads" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* related post */}
      <div className="related">
        <div className="container">
          <h2 className="title center">Có thể bạn quan tâm</h2>
          <ul className="post__list">
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event2.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 480.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>TP.Đà Lạt</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event4.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    MADAME SHOW - NHỮNG ĐƯỜNG CHIM BAY
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 480.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>TP.Đà Lạt</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event1.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    [BẾN THÀNH] Đêm nhạc Uyên Linh's Birthday
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 500.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>Quận 1, TP.HCM</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event3.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    MÂY CONCERT #2 IN HANOI - THE DUETS
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 1.000.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>TP.Hà Nội</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event2.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 480.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>TP.Đà Lạt</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
            <li className="post__item">
              <a href="/event-detail/" className="post__card">
                <div className="post__img">
                  <img
                    src="../assets/images/event/event4.jpg"
                    alt="Live Concert"
                    loading="lazy"
                  />
                </div>
                <div className="post__content">
                  <h3 className="post__title">
                    MADAME SHOW - NHỮNG ĐƯỜNG CHIM BAY
                  </h3>
                  <div className="post__meta">
                    <div className="post__price">
                      <span>Từ 480.000đ</span>
                    </div>
                    <div className="post__location">
                      <span>TP.Đà Lạt</span>
                    </div>
                  </div>
                  <div className="post__date">28 tháng 12, 2024</div>
                </div>
              </a>
            </li>
          </ul>
          <div className="related__btn">
            <a
              href="/live-concert/"
              className="button button--gradient button--radius"
            >
              Xem thêm
            </a>
          </div>
        </div>
      </div>
      {/* end related post */}
    </React.Fragment>
  );
};

export default NewDetail;
