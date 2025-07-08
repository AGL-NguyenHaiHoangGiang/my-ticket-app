const SideItem = (prop) => {
  return (
    <li className="side__item">
      <div className="side__content">
        <a href="/tin-tuc-detail/">
          <h3 className="side__title">{prop.title}</h3>
        </a>
      </div>
    </li>
  );
};

export default SideItem;
