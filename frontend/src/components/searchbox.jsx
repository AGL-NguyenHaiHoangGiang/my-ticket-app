import imgHcm from '../assets/images/common/hcm.jpg';
import imgHn from '../assets/images/common/hn.jpg';
import imgDalat from '../assets/images/common/dalat.jpg';
import imgDanang from '../assets/images/common/danang.jpg';
import closeIcon from '../assets/images/common/icon-close.svg';
import { Link } from 'react-router-dom';


const SearchBox = ({ onClose }) => {
    const handleCloseClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="search__box js-search-box">
            <div className="search__close js-search-close" onClick={handleCloseClick}>
                <img src={closeIcon} alt="Close" />
            </div>
            <div className="js-search-result search__result"><span className="no-result">Xin vui lòng nhập từ khóa tìm kiếm.</span></div>
            <div className="search__location">
                <div className="title search__title">Khám phá theo tỉnh thành</div>
                <ul className="search__location-list">
                    <li className="search__location-item">
                        <Link onClick={handleCloseClick} to={"/su-kien/"} state={{ location: "Hồ Chí Minh" }} className="search__location-link">
                            <img src={imgHcm} alt="Tp.HCM" loading="lazy" />
                                <div className="search__location-city">Tp. Hồ Chí Minh</div>
                        </Link>
                    </li>
                    <li className="search__location-item">
                        <Link onClick={handleCloseClick} to={"/su-kien/"} state={{ location: "Hà Nội" }} className="search__location-link">
                            <img src={imgHn} alt="Hà Nội" loading="lazy" />
                                <div className="search__location-city">Hà Nội</div>
                        </Link>
                    </li>
                    <li className="search__location-item">
                        <Link onClick={handleCloseClick} to={"/su-kien/"} state={{ location: "Đà Lạt" }} className="search__location-link">
                            <img src={imgDalat} alt="Đà Lạt" loading="lazy" />
                                <div className="search__location-city">Đà Lạt</div>
                        </Link>
                    </li>
                    <li className="search__location-item">
                        <Link onClick={handleCloseClick} to={"/su-kien/"} state={{ location: "Khác" }} className="search__location-link">
                            <img src={imgDanang} alt="Khác" loading="lazy" />
                                <div className="search__location-city">Địa điểm khác</div>
                        </Link>
                        
                    </li>
                </ul>
                <div className="search__btn">
                    <Link onClick={handleCloseClick} to="/su-kien/" state={{ location: "all" }} className="button button--gradient button--radius">Tất cả sự kiện</Link>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
