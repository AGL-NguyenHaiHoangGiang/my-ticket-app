import React from "react";
import { useParams } from "react-router-dom";
import DataBlog from "./blog/data/dataBlog";
import detailImage from "../assets/images/blog/blog12.png";
import avatar from "../assets/images/blog/avatar.jpg";

const NewDetail = () => {
  const { category, id } = useParams();
  const news = DataBlog.find((item) => item.id === parseInt(id));
  const newsCategory = DataBlog.find((item) => item.category === category);
  return (
    <React.Fragment>
      <main className="blog blog-single" id="blog-single">
        <article className="blog-detail">
          <div className="container">
            <div className="flex-box">
              <div className="blog-single__main">
                <div className="blog-single__featured">
                  <img src={news.image} alt="Kitaro và Hà Anh Tuấn" />
                </div>
                <h1 className="blog-single__title">{news.title}</h1>
                <div className="post__date">
                  <span>
                    {news.author}, {news.date}
                  </span>
                </div>
                <div className="content">
                  <h2>Lorem ipsum dolor sit amet</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin cursus arcu sed ultricies imperdiet. Proin at ante
                    vitae nibh viverra interdum eget eget neque. Integer sit
                    amet egestas ante, id fermentum tellus. Donec volutpat
                    sollicitudin aliquam. Aliquam commodo enim eu ante semper
                    auctor. Maecenas sodales hendrerit libero vitae tempus.
                    Donec tincidunt sem a velit auctor accumsan eget at urna.
                    Vestibulum id orci dignissim, auctor elit in, cursus libero.
                    Sed ornare lorem et sapien ultricies tempus. Curabitur nulla
                    massa, consequat a sodales nec, cursus non erat. Aenean
                    facilisis lorem augue, eu posuere risus hendrerit in.
                    Phasellus imperdiet suscipit pellentesque.
                  </p>
                  <img
                    src={detailImage}
                    alt="Kitaro và Hà Anh Tuấn"
                    loading="lazy"
                  />
                  <h3>Lorem ipsum dolor sit amet</h3>
                  <p>
                    <em>Praesent non metus ac nunc blandit efficitur.</em>{" "}
                    Phasellus lobortis purus vitae suscipit ornare. Ut est
                    libero, porta eu est vel, lacinia commodo quam. Sed diam
                    risus, cursus nec elit in, pharetra tempus lacus. Phasellus
                    ultrices mauris ligula, nec vehicula magna iaculis sit amet.
                    Nunc ullamcorper lorem ante, nec condimentum augue hendrerit
                    vitae. Aliquam viverra, sapien et mattis ultrices, diam
                    massa dapibus lorem, eu porta est elit id ipsum. Integer
                    eget rhoncus lacus. Pellentesque lobortis diam justo,
                    vehicula volutpat orci efficitur vel. Aliquam lectus nisi,
                    sodales non libero in, congue interdum diam. Vestibulum ac
                    nunc nec massa faucibus blandit. Suspendisse non arcu diam.
                  </p>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                  </ul>
                  <h3>Lorem ipsum dolor sit amet</h3>
                  <ol>
                    <li>
                      <strong>Lorem ipsum dolor sit amet</strong>, consectetur
                      adipiscing elit.
                    </li>
                    <li>
                      <b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing
                      elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                  </ol>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin cursus arcu sed ultricies imperdiet. Proin at ante
                    vitae nibh viverra interdum eget eget neque. Integer sit
                    amet egestas ante, id fermentum tellus. Donec volutpat
                    sollicitudin aliquam. Aliquam commodo enim eu ante semper
                    auctor. Maecenas sodales hendrerit libero vitae tempus.
                    Donec tincidunt sem a velit auctor accumsan eget at urna.
                    Vestibulum id orci dignissim, auctor elit in, cursus libero.
                    Sed ornare lorem et sapien ultricies tempus. Curabitur nulla
                    massa, consequat a sodales nec, cursus non erat. Aenean
                    facilisis lorem augue, eu posuere risus hendrerit in.
                    Phasellus imperdiet suscipit pellentesque.
                  </p>
                  <p>
                    Praesent non metus ac nunc blandit efficitur. Phasellus
                    lobortis purus vitae suscipit ornare. Ut est libero, porta
                    eu est vel, lacinia commodo quam. Sed diam risus, cursus nec
                    elit in, pharetra tempus lacus. Phasellus ultrices mauris
                    ligula, nec vehicula magna iaculis sit amet. Nunc
                    ullamcorper lorem ante, nec condimentum augue hendrerit
                    vitae. Aliquam viverra, sapien et mattis ultrices, diam
                    massa dapibus lorem, eu porta est elit id ipsum. Integer
                    eget rhoncus lacus. Pellentesque lobortis diam justo,
                    vehicula volutpat orci efficitur vel. Aliquam lectus nisi,
                    sodales non libero in, congue interdum diam. Vestibulum ac
                    nunc nec massa faucibus blandit. Suspendisse non arcu diam.
                  </p>
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
                            <img src={avatar} alt="avatar" />
                          </div>
                          <div className="comment__main">
                            <div className="user__name">
                              <h3>Duck</h3>
                            </div>
                            <p className="comment__content">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, .
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
                            <img
                              src="/assets/images/blog/cat.jpg"
                              alt="avatar"
                            />
                          </div>
                          <div className="comment__main">
                            <div className="user__name">
                              <h3>Cat</h3>
                            </div>
                            <p className="comment__content">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, .
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
                  <li className="side__item">
                    <div className="side__content">
                      <a href="/tin-tuc-detail/">
                        <h3 className="side__title">
                          Ngôi sao điện ảnh Brad Pitt trong bộ phim điện ảnh
                          MEET JOE BLACK 2025
                        </h3>
                      </a>
                    </div>
                  </li>
                  <li className="side__item">
                    <div className="side__content">
                      <a href="/tin-tuc-detail/">
                        <h3 className="side__title">
                          Điện ảnh TÂY BAN NHA tại OSCAR 2024 với bộ phim
                          SOCIETY OF THE SNOW
                        </h3>
                      </a>
                    </div>
                  </li>
                  <li className="side__item">
                    <div className="side__content">
                      <a href="/tin-tuc-detail/">
                        <h3 className="side__title">
                          Tiểu sử chi tiết về cuộc đời và sự nghiệp âm nhạc của
                          ca sĩ Phan Đinh Tùng
                        </h3>
                      </a>
                    </div>
                  </li>
                  <li className="side__item">
                    <div className="side__content">
                      <a href="/tin-tuc-detail/">
                        <h3 className="side__title">
                          Top 10 địa điểm vui chơi cho bé trong ngày Tết thiếu
                          nhi 1/6 tại Hà Nội
                        </h3>
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="side__block pc-only">
                  <a href="#" className="add-banner">
                    <img src="/assets/images/blog/ad-banner.png" alt="ads" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
        {/* related post */}
        <div className="related">
          <div className="container">
            <h2 className="title center _fadeiu">Có thể bạn quan tâm</h2>
            <ul className="post__list _fadeiu">
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
      </main>
    </React.Fragment>
  );
};

export default NewDetail;
