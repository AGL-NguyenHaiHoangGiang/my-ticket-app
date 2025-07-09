import { Link } from 'react-router-dom';

function EventCard({ event }) {
    const price = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(event.price).replace(/\s?₫/, '₫');

    const date = new Date(event.day);
    const dateFormatter = date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    });

    return (
        <li className="post__item">
            <Link to={`/su-kien/${event.url}`} className="post__card">
                <div className="post__img">
                    <img src={event.imageUrl} alt={event.name} loading="lazy" />
                </div>
                <div className="post__content">
                    <h3 className="post__title">{event.name}</h3>
                    {(event.price != null || event.location) && (
                        <div className="post__meta">
                            {event.price != null && event.price !== 0 ? (
                                <div className="post__price"><span>Từ {price}</span></div>
                            ) : (
                                <div className="post__price"><span>Free</span></div>
                            )}
                            {event.location && <div className="post__location"><span>{event.location}</span></div>}
                        </div>
                    )}
                    <div className="post__date">{dateFormatter}</div>
                </div>
            </Link>
        </li>
    );
}

export default EventCard;