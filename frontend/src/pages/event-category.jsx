import Title from '../components/title';
import EventList from '../components/event/event-list';
import Pagination from '../components/pagination';
import DateRangePicker from '../components/date-range-picker';

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
  },
  {
    id: 7,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 8,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 9,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 10,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 11,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 12,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 13,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 14,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 15,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  },
  {
    id: 16,
    image: 'https://images.tkbcdn.com/2/608/332/ts/ds/06/c8/2b/eecfd23915973246255c93a58f97200d.png',
    link: '/su-kien/live-concert/',
    title: 'LULULOLA SHOW VŨ CÁT TƯỜNG - CHỈ CẦN CÓ NHAU',
    price: '480.000đ',
    location: 'TP. Đà Lạt',
    date: '28 tháng 12, 2024',
  }
];

const EventCategory = () => {
  return (
    <>
      <section className="event-section">
        <div className="container">
          <div className="heading">
            <Title className='title' text='Live Concert' />
            <div className="filter">
              <DateRangePicker />
            </div>
          </div>
          <EventList className="" data={eventData} />

          <Pagination />
        </div>
      </section>
    </>
  );
};

export default EventCategory;
