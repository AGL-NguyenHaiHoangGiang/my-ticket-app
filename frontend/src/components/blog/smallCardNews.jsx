import { Link } from "react-router-dom";

const SmallCardNews = (prop) => {
  return (
    <li className="flex-item">
      <Link
        to={`/tin-tuc/${prop.category}/${prop.id}`}
        className="verticle-post__item"
      >
        <div className="verticle-post__img">
          <img src={prop.image} alt={prop.title} />
        </div>
        <div className="verticle-post__content">
          <h3 className="verticle-post__title txt-ellip txt-ellip--2">
            {prop.title}
          </h3>
          <div className="post__date">
            <span>
              <strong>{prop.author},</strong> {prop.date}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SmallCardNews;
