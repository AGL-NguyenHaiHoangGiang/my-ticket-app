import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

import { Link } from 'react-router-dom';

import arrowLeft from '../../assets/images/common/icon-arrow-left.svg';
import arrowRight from '../../assets/images/common/icon-arrow-right.svg';


function Slide1({slideList = []}) {
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
                        <Link to={`/su-kien/${slide.url}`} className="slideshow__link">
                            <img src={slide.imageUrl} alt={slide.name} />
                        </Link>
                    </SwiperSlide>
                ))}
            
            </Swiper>
            <span className="js-slider-next carousel__btn"><img src={arrowRight} alt="arrow" /></span>
        </div>
    );
}

export default Slide1;
