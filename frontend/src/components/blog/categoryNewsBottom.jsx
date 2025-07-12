import { Link } from "react-router-dom";
const categoryNewsBottom = (prop) => {
  return (
    <li className="flex-item">
      <Link
        to={"/tin-tuc/" + prop.category + "/" + prop.id}
        className="post__card"
      >
        <div className="image post__img">
          <img src={prop.image} alt={prop.title} />
        </div>
        <div className="post__content">
          <h3 className="post__title txt-ellip txt-ellip--2">{prop.title}</h3>
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

export default categoryNewsBottom;
