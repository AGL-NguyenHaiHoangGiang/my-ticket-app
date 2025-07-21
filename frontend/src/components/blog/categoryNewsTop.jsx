import { Link } from "react-router-dom";

const CategoryNewsTop = (props) => {
  return (
    <Link to={`/tin-tuc/${props.id}`} class="card-overlay flex-item">
      <div class="card-overlay__img">
        <img src={props.image} alt={props.title} />
      </div>
      <div class="card-overlay__content">
        <h3 class="card-overlay__title txt-ellip txt-ellip--2">
          {props.title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryNewsTop;
