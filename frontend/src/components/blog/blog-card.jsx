import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
    const date = new Date(blog.article_datetime);
    const dateFormatter = date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    });

    return (
        <li className="post__item">
            <Link to={`/tin-tuc/${blog.slug}`} className="post__card">
                <div className="post__img">
                    <img src={blog.thumpnail} alt={blog.title} loading="lazy" />
                </div>
                <div className="post__content">
                    <h3 className="post__title">{blog.title}</h3>
                    <div className="post__date">{dateFormatter}</div>
                </div>
            </Link>
        </li>
    );
}

export default BlogCard;