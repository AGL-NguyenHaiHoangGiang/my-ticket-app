const PostItemTrendingNews = (post) => {
  return (
    <li className="post__item">
      <a href="/tin-tuc-detail/" className="post__card">
        <div className="post__img">
          <img src={post.image} alt="post" />
        </div>
        <div className="post__content">
          <h3 className="post__title txt-ellip txt-ellip--2">{post.title}</h3>
          <div className="post__date">
            <span>
              <strong>{post.author},</strong> {post.date}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default PostItemTrendingNews;
// This component is used to display a single post item in the trending news section.
