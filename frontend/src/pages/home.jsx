import { Link } from 'react-router-dom';
import Slide1 from '../components/slides/slide1';
import Slide2 from '../components/slides/slide2';
import Title from '../components/title';
import EventList from '../components/event/event-list';

const eventData = [
    {
        id: 1,
        imageUrl: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        url: '/su-kien/live-concert/',
        name: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 2,
        imageUrl: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        url: '/su-kien/live-concert/',
        name: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 3,
        imageUrl: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        url: '/su-kien/live-concert/',
        name: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    },
    {
        id: 4,
        imageUrl: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
        url: '/su-kien/live-concert/',
        name: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
        price: '480.000đ',
        location: 'TP. Đà Lạt',
        date: '28 tháng 12, 2024',
    }
];

const newsData = [
    {
        id: 1,
        imageUrl: 'https://ticketgo.vn/uploads/images/blog/1716192664.jpg',
        url: '/tin-tuc/live-concert/',
        name: 'Tiểu sử và sự nghiệp của ca sĩ Jimmii Nguyễn | Jimmii Nguyễn hội ngộ khán giả thủ đô',
        date: '28 tháng 12, 2024',
    },
    {
        id: 2,
        imageUrl: 'https://ticketgo.vn/uploads/images/blog/1716192664.jpg',
        url: '/tin-tuc/live-concert/',
        name: 'Tiểu sử và sự nghiệp của ca sĩ Jimmii Nguyễn | Jimmii Nguyễn hội ngộ khán giả thủ đô',
        date: '28 tháng 12, 2024',
    },
    {
        id: 3,
        imageUrl: 'https://ticketgo.vn/uploads/images/blog/1716192664.jpg',
        url: '/tin-tuc/live-concert/',
        name: 'Tiểu sử và sự nghiệp của ca sĩ Jimmii Nguyễn | Jimmii Nguyễn hội ngộ khán giả thủ đô',
        date: '28 tháng 12, 2024',
    },
    {
        id: 4,
        imageUrl: 'https://ticketgo.vn/uploads/images/blog/1716192664.jpg',
        url: '/tin-tuc/live-concert/',
        name: 'Tiểu sử và sự nghiệp của ca sĩ Jimmii Nguyễn | Jimmii Nguyễn hội ngộ khán giả thủ đô',
        date: '28 tháng 12, 2024',
    }
];

const Home = () => {
    return (
        <>
            <div className="mainvisual">
                <div className="container">
                    <div className="slideshow">
                        <Slide1 />
                    </div>
                </div>
            </div>
            <section className="home-section" id="su-kien-noi-bat">
                <div className="container">
                    <Title className="title" text="Sự kiện nổi bật" />
                    <div className="feature">
                        <Slide2 />
                    </div>
                </div>
            </section>
            <section className="home-section" id="live-concert">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Live Concert' />
                        <Link to="/loai-su-kien/live-concert/" className="readmore">Xem thêm</Link>
                    </div>
                    <EventList className="" data={eventData} />
                </div>
            </section>

            <section className="home-section" id="san-khau-nghe-thuat">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Sân Khấu Nghệ Thuật' />
                        <Link to="/loai-su-kien/san-khau-nghe-thuat/" className="readmore">Xem thêm</Link>
                    </div>
                    <EventList className="" data={eventData} />
                </div>
            </section>

            <section className="home-section" id="the-thao">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Thể Thao' />
                        <Link to="/loai-su-kien/the-thao/" className="readmore">Xem thêm</Link>
                    </div>
                    <EventList className="" data={eventData} />
                </div>
            </section>

            <section className="home-section" id="the-loai-khac">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Thể Loại Khác' />
                        <Link to="/loai-su-kien/the-loai-khac/" className="readmore">Xem thêm</Link>
                    </div>
                    <EventList className="" data={eventData} />
                </div>
            </section>

            <section className="home-section" id="tin-tuc-su-kien">
                <div className="container">
                    <div className="heading">
                        <Title className='title' text='Tin Tức Sự Kiện' />
                        <Link to="/tin-tuc/" className="readmore">Xem thêm</Link>
                    </div>
                    <EventList className="" data={newsData} />
                </div>
            </section>
        </>
    );
}
export default Home;