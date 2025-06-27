import DataBlog from "../data/dataBlog";
import BigCardNews from "./bigCardNews";

const LatestNews = () => {
  const bigCardNewsArr = DataBlog.filter((item) => item.bigCard);
  const bigCardNewsList = bigCardNewsArr.map((item) => (
    <BigCardNews
      image={item.image}
      title={item.title}
      description={item.description}
    />
  ));
  return (
    <section>
      <div className="heading">
        <h2 className="title">Tin mới nhất</h2>
      </div>
      <div className="blog-new flex-box">
        <ul className="flex-box">{bigCardNewsList}</ul>
        <ul className="flex-box">
          <li className="flex-item">
            <a href="/tin-tuc-detail/" className="verticle-post__item">
              <div className="verticle-post__img">
                <img
                  src="/assets/images/blog/blog11.jpg"
                  alt="Salon Âm nhạc thính phòng"
                />
              </div>
              <div className="verticle-post__content">
                <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                  Salon Âm nhạc thính phòng với chủ đề - HẠ TRẮNG (Ký ức nhạc
                  Việt & Âm nhạc cổ điển)
                </h3>
                <div className="post__date">
                  <span>
                    <strong>Bunny,</strong> 27/12/2024
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li className="flex-item">
            <a href="/tin-tuc-detail/" className="verticle-post__item">
              <div className="verticle-post__img">
                <img
                  src="/assets/images/blog/blog11.jpg"
                  alt="Salon Âm nhạc thính phòng"
                />
              </div>
              <div className="verticle-post__content">
                <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                  Salon Âm nhạc thính phòng với chủ đề - HẠ TRẮNG (Ký ức nhạc
                  Việt & Âm nhạc cổ điển)
                </h3>
                <div className="post__date">
                  <span>
                    <strong>Bunny,</strong> 27/12/2024
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li className="flex-item">
            <a href="/tin-tuc-detail/" className="verticle-post__item">
              <div className="verticle-post__img">
                <img
                  src="/assets/images/blog/blog11.jpg"
                  alt="Salon Âm nhạc thính phòng"
                />
              </div>
              <div className="verticle-post__content">
                <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                  Salon Âm nhạc thính phòng với chủ đề - HẠ TRẮNG (Ký ức nhạc
                  Việt & Âm nhạc cổ điển)
                </h3>
                <div className="post__date">
                  <span>
                    <strong>Bunny,</strong> 27/12/2024
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li className="flex-item">
            <a href="/tin-tuc-detail/" className="verticle-post__item">
              <div className="verticle-post__img">
                <img
                  src="/assets/images/blog/blog11.jpg"
                  alt="Salon Âm nhạc thính phòng"
                />
              </div>
              <div className="verticle-post__content">
                <h3 className="verticle-post__title txt-ellip txt-ellip--2">
                  Salon Âm nhạc thính phòng với chủ đề - HẠ TRẮNG (Ký ức nhạc
                  Việt & Âm nhạc cổ điển)
                </h3>
                <div className="post__date">
                  <span>
                    <strong>Bunny,</strong> 27/12/2024
                  </span>
                </div>
              </div>
            </a>
          </li>
          {/* End Bố cục nhỏ */}
        </ul>
      </div>
    </section>
  );
};

export default LatestNews;
