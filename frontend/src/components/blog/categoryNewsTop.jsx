const CategoryNewsTop = (props) => {
  return (
    <a href="/tin-tuc-detail/" class="card-overlay flex-item">
      <div class="card-overlay__img">
        <img src={props.image} alt={props.title} />
      </div>
      <div class="card-overlay__content">
        <h3 class="card-overlay__title txt-ellip txt-ellip--2">
          {props.title}
        </h3>
      </div>
    </a>
  );
};

export default CategoryNewsTop;
