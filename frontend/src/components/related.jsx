import Title from '../components/title';
import EventList from '../components/event/event-list';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import EventService from '../services/events';

const RelatedEvents = ({ currentCategory = 'music', currentEventId = null }) => {
    const [events, setEvents] = useState([]);

    const fetchData = async () => {
        try {
            const response = await EventService.getAll(16, 1, currentCategory, null, null, 'all', false);
            const eventList = response.body
                .filter(event => event.id !== currentEventId)
                .sort(() => 0.5 - Math.random())
                .slice(0, 8);
            setEvents(eventList);
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentCategory, currentEventId]);

    // console.log('Current EventId:', currentEventId);
    // console.log('Related Events:', events);

    return (
        <div className="related">
            <div className="container">
                <Title className='title center' text="Có thể bạn quan tâm" />
                <EventList className="" data={events} />
                <div className="related__btn">
                    <Link to="/su-kien/" className="button button--gradient button--radius">Xem thêm</Link>
                </div>
            </div>
        </div>
    );
};

export default RelatedEvents;