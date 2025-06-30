const BigCardNews = (prop) => {
  return (
    <li className="flex-item">
      <a className="post__card" href="/tin-tuc-detail/">
        <div className="image post__img">
          <img src={prop.image} alt={prop.title} />
        </div>
        <div className="post__content">
          <h3 className="title txt-ellip txt-ellip--2">{prop.title}</h3>
          <p className="desc txt-ellip txt-ellip--2">{prop.description}</p>
        </div>
      </a>
    </li>
  );
};

export default BigCardNews;
