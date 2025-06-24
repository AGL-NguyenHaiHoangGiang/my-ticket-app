import React from "react";
import "../../assets/style/style.css";
import "../../assets/style/blog.css";
import blog1 from "../../assets/images/blog/blog1.png";
import blog2 from "../../assets/images/blog/blog2.png";
import blog3 from "../../assets/images/blog/blog3.png";
import blog4 from "../../assets/images/blog/blog4.png";
import blog5 from "../../assets/images/blog/blog5.png";

const BlogSection1 = () => {
  return (
    <section className="blog1">
      <div className="container">
        <div className="flex-box">
          <div className="blog1__left">
            <div className="post__card--large">
              <a href="/tin-tuc-detail/" className="blog__link">
                <div className="post__img blog1__main-image">
                  <img src={blog1} alt="blog" />
                </div>
                <div className="post__content">
                  <h2 className="title txt-ellip txt-ellip--2">
                    HỘI SÁCH THÁI HÀ KHUÂN SÁCH VỀ NHÀ
                  </h2>
                  <p className="desc txt-ellip txt-ellip--2">
                    Chào năm cũ - đón năm mới, "BỮA TIỆC SÁCH" dành cho tất cả
                    các bạn độc giả của chúng mình để gặp gỡ và chia sẻ những
                    cuốn sách Hot nhất năm 2024 với những ưu đãi và nhiều quà
                    tặng siêu hấp dẫn
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="blog1__right">
            <div className="verticle-post">
              <div className="verticle-post__item">
                <a href="/tin-tuc-detail/" className="verticle-post__img">
                  <img src={blog2} alt="blog" />
                </a>
                <div className="verticle-post__content">
                  <a className="blog__link" href="/tin-tuc-detail/">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      Workshop tranh in khắc cao su
                    </h3>
                  </a>
                  <div className="post__date">
                    <span>
                      <strong>Bunny,</strong> 27/12/2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="verticle-post__item">
                <a href="/tin-tuc-detail/" className="verticle-post__img">
                  <img src={blog3} alt="blog" />
                </a>
                <div className="verticle-post__content">
                  <a className="blog__link" href="/tin-tuc-detail/">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      Giải chạy Dalat Ultra Trail 2025
                    </h3>
                  </a>
                  <div className="post__date">
                    <span>
                      <strong>Bunny,</strong> 27/12/2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="verticle-post__item">
                <a href="/tin-tuc-detail/" className="verticle-post__img">
                  <img src={blog4} alt="blog" />
                </a>
                <div className="verticle-post__content">
                  <a className="blog__link" href="/tin-tuc-detail/">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      Cà phê thứ 7 Nhà kính kiểu Joost
                    </h3>
                  </a>
                  <div className="post__date">
                    <span>
                      <strong>Bunny,</strong> 27/12/2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="verticle-post__item">
                <a href="/tin-tuc-detail/" className="verticle-post__img">
                  <img src={blog5} alt="blog" />
                </a>
                <div className="verticle-post__content">
                  <a className="blog__link" href="/tin-tuc-detail/">
                    <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                      CHÙM NHO CINEMA 5: IRAN IN A FRAME Chiếu phim: "Close-up"
                      (1990)
                    </h3>
                  </a>
                  <div className="post__date">
                    <span>
                      <strong>Bunny,</strong> 27/12/2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection1;
