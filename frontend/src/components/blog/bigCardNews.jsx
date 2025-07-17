import { Link } from "react-router-dom";

const BigCardNews = (prop) => {
  return (
    <li className="flex-item">
      <Link to={`/tin-tuc/${prop.category}/${prop.id}`} className="post__card">
        <div className="image post__img">
          <img src={prop.image} alt={prop.title} />
        </div>
        <div className="post__content">
          <h3 className="title txt-ellip txt-ellip--2">{prop.title}</h3>
          <p className="desc txt-ellip txt-ellip--2">{prop.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default BigCardNews;
