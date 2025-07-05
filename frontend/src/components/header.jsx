import { Link } from 'react-router-dom';
import logo from '../assets/images/common/logo.svg';
import iconSearch from '../assets/images/common/icon-search.svg';

function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="container--1428 header__inner">
                    <div className="logo">
                        <Link to="/" className="logo__link">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="header__support">
                        <div className="header__search">
                            <form className="search">
                                <img src={iconSearch} alt="Search" />
                                <input type="text" placeholder="Bạn tìm gì hôm nay?" />
                                <button type="submit">Tìm kiếm</button>
                            </form>
                        </div>

                        <div className="search--sp js-search-sp">
                            <img src={iconSearch} width="20" height="20" alt="Search" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="header__bottom js-nav-sp">
                <div className="container">
                    <nav className="nav">
                        {/* <ul className="nav__lang">
                            <li className="js-lang-item">
                                <img src="./assets/images/common/flag-vi.svg" alt="VN" />
                            </li>
                            <li className="js-lang-item">
                                <img src="./assets/images/common/flag-en.svg" alt="EN" />
                            </li>
                        </ul> */}
                        <ul className="nav__list">
                            <li>
                                <Link to="/events/live-concert/">Live Concert</Link>
                            </li>
                            <li>
                                <Link to="/events/san-khau-nghe-thuat/">Sân khấu & Nghệ thuật</Link>
                            </li>
                            <li>
                                <Link to="/events/the-thao/">Thể thao</Link>
                            </li>
                            <li>
                                <Link to="/tin-tuc/">Tin tức</Link>
                            </li>
                            <li>
                                <Link to="#">Khác</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header >
    )
}

export default Header