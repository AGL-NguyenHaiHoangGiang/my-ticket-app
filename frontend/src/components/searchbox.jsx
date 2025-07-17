import imgHcm from '../assets/images/common/hcm.jpg';
import imgHn from '../assets/images/common/hn.jpg';
import imgDalat from '../assets/images/common/dalat.jpg';
import imgDanang from '../assets/images/common/danang.jpg';
import closeIcon from '../assets/images/common/icon-close.svg';
import { Link } from 'react-router-dom';


const SearchBox = ({ onClose, searchText = '', searchResults = [], isSearching = false }) => {

    const handleCloseClick = () => {
        if (onClose) {
            onClose();
        }
    };

    let resultsContent;
    
    // Hiển thị loading khi đang search
    if (isSearching) {
        resultsContent = (
            <div className="search__loading">
                <div className="loading-spinner"></div>
                <span className="loading-text">Đang tìm kiếm...</span>
            </div>
        );
    } else if (searchResults.length === 0) {
        if (searchText.trim() === '') {
            resultsContent = <span className="no-result">Xin vui lòng nhập từ khóa tìm kiếm.</span>;
        } else {
            resultsContent = <span className="no-result">Không tìm thấy kết quả.</span>;
        }
    } else {
        resultsContent = searchResults.slice(0, 10).map((result, index) => (
            <div key={index} className="search__result-item">
                <Link to={`/su-kien/${result.url}`} className="search__result-link" onClick={handleCloseClick}>
                    {result.name}
                </Link>
            </div>
        ));
    }

    return (
        <div className="search__box js-search-box">
            <div className="search__close js-search-close" onClick={handleCloseClick}>
                <img src={closeIcon} alt="Close" />
            </div>
            <div className="js-search-result search__result">{resultsContent}</div>
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
