import { Link } from "react-router-dom";

const PostItemTrendingNews = (post) => {
  return (
    <li className="post__item">
      <Link to={`/tin-tuc/${post.category}/${post.id}`}>
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
      </Link>
    </li>
  );
};

export default PostItemTrendingNews;
