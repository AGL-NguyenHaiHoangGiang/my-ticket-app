import { Link } from "react-router-dom";

const VerticalPostItem = (prop) => {
  return (
    <div className="verticle-post__item">
      <Link
        to={"/tin-tuc/" + prop.category + "/" + prop.id}
        className="verticle-post__img"
      >
        <img src={prop.img} alt="blog" />
      </Link>
      <div className="verticle-post__content">
        <Link
          to={"/tin-tuc/" + prop.category + "/" + prop.id}
          className="blog__link"
        >
          <h3 className="verticle-post__title txt-ellip txt-ellip--2">
            {prop.title}
          </h3>
        </Link>
        <div className="post__date">
          <span>
            <strong>{prop.author}</strong> {prop.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerticalPostItem;
