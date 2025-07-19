import { Link } from "react-router-dom";
import BigCardNews from "../bigCardNews";

const OtherNews = (prop) => {
  return (
    <section>
      <div className="heading">
        <h2 className="title">{prop.title}</h2>
        <Link to={prop.path} className="readmore">
          Xem thêm
        </Link>
      </div>
      <div className="flex-box">
        <div className="flex-item">
          <Link to={`/tin-tuc/${prop.bigCard.slug}`} className="post__card">
            <div className="post__img">
              <img src={prop.bigCard.thumpnail} alt={prop.bigCard.title} />
            </div>
            <div className="post__content">
              <h3 className="title txt-ellip txt-ellip--2">
                {prop.bigCard.title}
              </h3>
              <p className="desc txt-ellip txt-ellip--2">
                {prop.bigCard.short_description}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex-item">
          <ul className="verticle-post">{prop.verticalPost}</ul>
        </div>
      </div>
    </section>
  );
};

export default OtherNews;
