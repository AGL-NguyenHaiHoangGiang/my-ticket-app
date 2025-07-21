import { data, Link } from 'react-router-dom';
import Slide1 from '../components/slides/slide1';
import Slide2 from '../components/slides/slide2';
import Title from '../components/title';
import EventList from '../components/event/event-list';
import BlogList from '../components/blog/blog-list';
import {getAllBlogCategories} from '../services/blog';

import React, { useEffect, useState } from 'react';
import EventService from '../services/events';

const Home = () => {
    const categories = ['music', 'theatersandart', 'sport', 'others'];

    const categoryDisplayMap = {
        music: "Live Concert",
        theatersandart: "Sân khấu & Nghệ thuật",
        sport: "Thể thao",
        others: "Thể loại khác"
    };

    const categorySlugMap = {
        music: "live-concert",
        theatersandart: "san-khau-nghe-thuat",
        sport: "the-thao",
        others: "khac"
    };

    const [eventData, setEventData] = useState([]);

    const fetchData = async () => {
        try {
            const results = await Promise.all(
                categories.map(async (cat) => {
                    const response = await EventService.getAll(8, 1, cat, null, null, 'all', false);
                    return { category: cat, events: response.body };
                })
            );
            setEventData(results);
        } catch (error) {
            console.error('Lỗi khi fetch sự kiện:', error);
            return [];
        }
    };

    const [featureEvents, setFeatureEvents] = useState([]);
    const fetchFeatureEvents = async () => {
        try {
            const response = await EventService.getFeatureEvents();
            const data = response.body.slice(0, 9);
            setFeatureEvents(data);
        } catch (error) {
            console.error('Lỗi khi fetch sự kiện nổi bật:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchFeatureEvents();
        scrollTo(0, 0);
    }, []);

    // Blog
    const [newsData, setNewsData] = useState([]);
    const fetchBlogCategories = async () => {
        try {
            const response = await getAllBlogCategories(8);
            setNewsData(response.data.metadata);
        } catch (error) {
            console.error('Lỗi khi fetch danh mục blog:', error);
        }
    };

    useEffect(() => {
        fetchBlogCategories();
    }, []);

    return (
        <>
            <div className="mainvisual">
                <div className="container">
                    <div className="slideshow">
                        <Slide1 slideList={eventData.find(item => item.category === 'music')?.events.slice(0, 5)} />
                    </div>
                </div>
            </div>
            <section className="home-section" id="su-kien-noi-bat">
                <div className="container">
                    <Title className="title" text="Sự kiện nổi bật" />
                    <div className="feature">
                        <Slide2 slideList={featureEvents} />
                    </div>
                </div>
            </section>

            {eventData.map((data, index) => (
                <section className="home-section" key={index}>
                    <div className="container">
                        <div className="heading">
                            <Title className='title' text={`${categoryDisplayMap[data.category]}`} />
                            <Link to={`/loai-su-kien/${categorySlugMap[data.category]}/`} className="readmore">Xem thêm</Link>
                        </div>
                        <EventList className="" data={data.events} />
                    </div>
                </section>
            ))}

            <section className="home-section" id="tin-tuc-su-kien">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Tin Tức Sự Kiện' />
                        <Link to="/tin-tuc/" className="readmore">Xem thêm</Link>
                    </div>
                    <BlogList className="" data={newsData} />
                </div>
            </section>
        </>
    );
}
export default Home;