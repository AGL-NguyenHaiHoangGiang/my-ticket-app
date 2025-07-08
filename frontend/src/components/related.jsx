import Title from '../components/title';
import EventList from '../components/event/event-list';
import { Link } from 'react-router-dom';

const eventData = [
    {
        id: 1,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 2,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 3,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 4,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 5,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 6,
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        link: '/su-kien/live-concert/',
        title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    }
];

const RelatedEvents = () => {
    return (
        <div className="related">
            <div className="container">
                <Title className='title center' text="Có thể bạn quan tâm" />
                <EventList data={eventData} />
                <div className="related__btn">
                    <Link to="/su-kien/" className="button button--gradient button--radius">Xem thêm</Link>
                </div>
            </div>
        </div>
    );
};

export default RelatedEvents;