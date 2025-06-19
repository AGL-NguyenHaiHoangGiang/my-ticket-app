import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

import { Link } from 'react-router-dom';

import imgEvent from '../../assets/images/event/event.jpg';
import arrowLeft from '../../assets/images/common/icon-arrow-left.svg';
import arrowRight from '../../assets/images/common/icon-arrow-right.svg';

const slideList = [
    {
        id: 1,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 1'
    },
    {
        id: 2,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 2'
    },
    {
        id: 3,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 1'
    },
    {
        id: 4,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 2'
    },
    {
        id: 5,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 3'
    },
    {
        id: 6,
        image: imgEvent,
        link: '/live-concert/',
        title: 'Slide 4'
    }
];

function Slide2() {
    return (
        <div className="slider-wrapper">
            <span className="js-slider2-prev carousel__btn"><img src={arrowLeft} alt="arrow" /></span>
            <Swiper
                modules={[Autoplay, Navigation]}
                className="feature__list"
                slidesPerView="auto"
                spaceBetween={0}
                loop={false}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={800}
                navigation={{
                    nextEl: '.js-slider2-next',
                    prevEl: '.js-slider2-prev',
                }}
            >
                {slideList.map(slide => (
                    <SwiperSlide className="feature__item card" key={slide.id}>
                        <Link to={slide.link} className="feature__link">
                            <img src={slide.image} alt={slide.title} loading='lazy' />
                        </Link>
                    </SwiperSlide>
                ))}
            
            </Swiper>
            <span className="js-slider2-next carousel__btn"><img src={arrowRight} alt="arrow" /></span>
        </div>
    );
}

export default Slide2;
