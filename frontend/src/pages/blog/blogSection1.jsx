import React from "react";
import VerticalPostItem from "./verticalPostItem";

import "../../assets/style/style.css";
import "../../assets/style/blog.css";
import blog1 from "../../assets/images/blog/blog1.png";
import blog2 from "../../assets/images/blog/blog2.png";
import blog3 from "../../assets/images/blog/blog3.png";
import blog4 from "../../assets/images/blog/blog4.png";
import blog5 from "../../assets/images/blog/blog5.png";

const BlogSection1 = () => {
  const blogArray = [
    {
      id: 0,
      title: "HỘI SÁCH THÁI HÀ KHUÂN SÁCH VỀ NHÀ",
      description:
        'Chào năm cũ - đón năm mới, "BỮA TIỆC SÁCH" dành cho tất cả các bạn độc giả của chúng mình để gặp gỡ và chia sẻ những cuốn sách Hot nhất năm 2024 với những ưu đãi và nhiều quà tặng siêu hấp dẫn',
      image: blog1,
      link: "/tin-tuc-detail/",
      author: "Bunny",
      date: "27/12/2024",
    },
    {
      id: 1,
      title: "Workshop tranh in khắc cao su",
      description:
        "Tham gia workshop để trải nghiệm nghệ thuật in khắc cao su, tạo ra những tác phẩm độc đáo và sáng tạo.",
      image: blog2,
      link: "/tin-tuc-detail/",
      author: "Bunny",
      date: "27/12/2024",
    },
    {
      id: 2,
      title: "Giải chạy Dalat Ultra Trail 2025",
      description:
        "Tham gia giải chạy Dalat Ultra Trail 2025 để trải nghiệm thiên nhiên tuyệt đẹp và thử thách bản thân.",
      image: blog3,
      link: "/tin-tuc-detail/",
      author: "Bunny",
      date: "27/12/2024",
    },
    {
      id: 3,
      title: "Cà phê thứ 7 Nhà kính kiểu Joost",
      description:
        "Thưởng thức cà phê tại Nhà kính kiểu Joost vào thứ 7, nơi mang đến không gian thư giãn và trải nghiệm độc đáo.",
      image: blog4,
      link: "/tin-tuc-detail/",
      author: "Bunny",
      date: "27/12/2024",
    },
    {
      id: 4,
      title: "CHÙM NHO CINEMA 5: IRAN IN A FRAME Chiếu phim: 'Close-up' (1990)",
      description:
        "Tham gia CHÙM NHO CINEMA 5 để thưởng thức bộ phim 'Close-up' (1990) của Iran, khám phá nghệ thuật điện ảnh độc đáo.",
      image: blog5,
      link: "/tin-tuc-detail/",
      author: "Bunny",
      date: "27/12/2024",
    },
  ];
  const blogArrayDom = blogArray.map((item) => {
    if (item.id == 0) return null;
    return (
      <VerticalPostItem
        key={item.id}
        img={item.image}
        title={item.title}
        author={item.author}
        date={item.date}
      />
    );
  });

  return (
    <section className="blog1">
      <div className="container">
        <div className="flex-box">
          <div className="blog1__left">
            <div className="post__card--large">
              <a href="/tin-tuc-detail/" className="blog__link">
                <div className="post__img blog1__main-image">
                  <img src={blogArray[0].image} alt="blog" />
                </div>
                <div className="post__content">
                  <h2 className="title txt-ellip txt-ellip--2">
                    {blogArray[0].title}
                  </h2>
                  <p className="desc txt-ellip txt-ellip--2">
                    {blogArray[0].description}
                  </p>
                </div>
              </a>
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
