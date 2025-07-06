import imgHcm from '../assets/images/common/hcm.jpg';
import imgHn from '../assets/images/common/hn.jpg';
import imgDalat from '../assets/images/common/dalat.jpg';
import imgDanang from '../assets/images/common/danang.jpg';
import closeIcon from '../assets/images/common/icon-close.svg';

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
                        <a href="#" className="search__location-link">
                            <img src={imgHcm} alt="Tp.HCM" loading="lazy" />
                                <div className="search__location-city">Tp. Hồ Chí Minh</div>
                        </a>
                    </li>
                    <li className="search__location-item">
                        <a href="#" className="search__location-link">
                            <img src={imgHn} alt="Hà Nội" loading="lazy" />
                                <div className="search__location-city">Hà Nội</div>
                        </a>
                    </li>
                    <li className="search__location-item">
                        <a href="#" className="search__location-link">
                            <img src={imgDalat} alt="Đà Lạt" loading="lazy" />
                                <div className="search__location-city">Đà Lạt</div>
                        </a>
                    </li>
                    <li className="search__location-item">
                        <a href="#" className="search__location-link">
                            <img src={imgDanang} alt="Đà Nẵng" loading="lazy" />
                                <div className="search__location-city">Địa điểm khác</div>
                        </a>
                    </li>
                </ul>
                <div className="search__btn">
                    <a href="/live-concert/" className="button button--gradient button--radius">Xem thêm sự kiện</a>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
