import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

import { Link } from 'react-router-dom';

import mainvisual01 from '../../assets/images/home/mainvisual01.jpg';
import mainvisual02 from '../../assets/images/home/mainvisual02.jpg';
import arrowLeft from '../../assets/images/common/icon-arrow-left.svg';
import arrowRight from '../../assets/images/common/icon-arrow-right.svg';

const slideList = [
    {
        id: 1,
        image: mainvisual01,
        link: '/live-concert/',
        title: 'Slide 1'
    },
    {
        id: 2,
        image: mainvisual02,
        link: '/live-concert/',
        title: 'Slide 2'
    },
    {
        id: 3,
        image: mainvisual01,
        link: '/live-concert/',
        title: 'Slide 1'
    },
    {
        id: 4,
        image: mainvisual02,
        link: '/live-concert/',
        title: 'Slide 2'
    }
];

function Slide1() {
    return (
        <div className="slider-wrapper">
            <span className="js-slider-prev carousel__btn"><img src={arrowLeft} alt="arrow" /></span>
            <Swiper
                modules={[Autoplay, Navigation]}
                className="carousel"
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={800}
                navigation={{
                    nextEl: '.js-slider-next',
                    prevEl: '.js-slider-prev',
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    }
                }}
            >
                {slideList.map(slide => (
                    <SwiperSlide className="slideshow__item" key={slide.id}>
                        <Link to={slide.link} className="slideshow__link">
                            <img src={slide.image} alt={slide.title} />
                        </Link>
                    </SwiperSlide>
                ))}
            
            </Swiper>
            <span className="js-slider-next carousel__btn"><img src={arrowRight} alt="arrow" /></span>
        </div>
    );
}

export default Slide1;
