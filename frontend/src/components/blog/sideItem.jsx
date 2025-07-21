import { Link } from "react-router-dom";
const SideItem = (prop) => {
  return (
    <li className="side__item">
      <div className="side__content">
        <Link to={`/tin-tuc/${prop.category}/${prop.slug}`}>
          <h3 className="side__title">{prop.title}</h3>
        </Link>
      </div>
    </li>
  );
};

export default SideItem;
