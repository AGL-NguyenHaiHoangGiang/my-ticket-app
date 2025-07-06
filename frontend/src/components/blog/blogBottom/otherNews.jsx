import { Link } from "react-router-dom";
import BigCardNews from "../bigCardNews";

const OtherNews = (prop) => {
  return (
    <section>
      <div className="heading">
        <h2 className="title">{prop.title}</h2>
        <Link to={"/tin-tuc/" + prop.path} className="readmore">
          Xem thêm
        </Link>
      </div>
      <div className="flex-box">
        <div className="flex-item">
          <a className="post__card" href="/tin-tuc-detail/">
            <div className="post__img">
              <img src={prop.bigCard.image} alt={prop.bigCard.title} />
            </div>
            <div className="post__content">
              <h3 className="title txt-ellip txt-ellip--2">
                {prop.bigCard.title}
              </h3>
              <p className="desc txt-ellip txt-ellip--2">
                {prop.bigCard.description}
              </p>
            </div>
          </a>
        </div>
        <div className="flex-item">
          <ul className="verticle-post">{prop.verticalPost}</ul>
        </div>
      </div>
    </section>
  );
};

export default OtherNews;
