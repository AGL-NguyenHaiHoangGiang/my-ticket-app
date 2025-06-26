const VerticalPostItem = (prop) => {
  return (
    <div className="verticle-post__item">
      <a href="/tin-tuc-detail/" className="verticle-post__img">
        <img src={prop.img} alt="blog" />
      </a>
      <div className="verticle-post__content">
        <a className="blog__link" href="/tin-tuc-detail/">
          <h3 className="verticle-post__title txt-ellip txt-ellip--2">
            {prop.title}
          </h3>
        </a>
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
