import { Link } from 'react-router-dom';

function EventCard({ event }) {
    return (
        <li className="post__item">
            <Link to={event.link} className="post__card">
                <div className="post__img">
                    <img src={event.image} alt={event.title} loading="lazy" />
                </div>
                <div className="post__content">
                    <h3 className="post__title">{event.title}</h3>
                    {(event.price || event.location) && (
                    <div className="post__meta">
                        {event.price && <div className="post__price"><span>Từ {event.price}</span></div>}
                        {event.location && <div className="post__location"><span>{event.location}</span></div>}
                    </div>
                    )}
                    <div className="post__date">{event.date}</div>
                </div>
            </Link>
        </li>
    );
}

export default EventCard;