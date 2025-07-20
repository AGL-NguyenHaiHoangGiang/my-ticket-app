import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './searchbox';
import Login from './login';
import EventService from '../services/events';

import logo from '../assets/images/common/logo.svg';
import iconSearch from '../assets/images/common/icon-search.svg';
import iconUser from '../assets/images/common/icon-user.png';
import iconTicket from '../assets/images/common/icon-ticket.svg';
import iconFlagVi from '../assets/images/common/flag-vi.svg';
import iconFlagEn from '../assets/images/common/flag-en.svg';
import iconArrowDown from '../assets/images/common/icon-arrow-down.svg';
import noAvatar from '../assets/images/account/avatar.jpg';


function Header({setAuth, auth, setLoginOpen, loginOpen}) {
    const [navigationOpen, setNavigationOpen] = useState(false);
    const handleNavigationToggle = () => {
        setNavigationOpen(!navigationOpen);
    };

    const [openSearchBox, setOpenSearchBox] = useState(false);
    const searchRef = useRef(null);
    const searchBoxRef = useRef(null);

    // Xử lý sự kiện click vào search form
    const handleSearchClick = (e) => {
        if (e.target.type === 'submit') {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        setOpenSearchBox(true);
    };

    // Xử lý sự kiện submit search form
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        // Logic tìm kiếm ở đây
        console.log('Search submitted');
    };

    // Đóng search box khi click vào nút close
    const handleCloseSearchBox = () => {
        setOpenSearchBox(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Đóng search box khi click bên ngoài
    const handleClickOutside = (e) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(e.target) &&
            searchBoxRef.current &&
            !searchBoxRef.current.contains(e.target)
        ) {
            setOpenSearchBox(false);
        }
    };

    // State quản lý nội dung tìm kiếm
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmedText = searchText.trim();

            if (trimmedText.length === 0) {
                setSearchResults([]);
                return;
            }

            if (trimmedText.length >= 2) {
                fetchSearch(trimmedText);
            } else {
                setSearchResults([]);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [searchText]);

    const fetchSearch = async (text) => {
        try {
            const response = await EventService.searchByKeyword(text);
            setSearchResults(response.body);
        } catch (e) {
            console.error(e);
        }
    };

    // console.log('Search Results:', searchResults);

    // Toggle login modal
    const handleLoginToggle = () => {
        setLoginOpen(!loginOpen);
    }

    return (
        <>
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
                                <div className={`js-search ${openSearchBox ? 'show' : ''}`}>
                                    <form
                                        className="search"
                                        onClick={handleSearchClick}
                                        onSubmit={handleSubmitSearch}
                                    >
                                        <img src={iconSearch} alt="Search" />
                                        <input ref={searchRef} type="text" placeholder="Bạn tìm gì hôm nay?" onChange={handleSearchChange} />
                                        <button>Tìm kiếm</button>
                                    </form>
                                </div>

                                <div className="search--sp js-search-sp" onClick={handleSearchClick}>
                                    <img src={iconSearch} width="20" height="20" alt="Search" />
                                </div>

                                {openSearchBox && (
                                    <div ref={searchBoxRef}>
                                        <SearchBox onClose={handleCloseSearchBox} searchText={searchText} searchResults={searchResults} />
                                    </div>
                                )}
                            </div>



                            <a href="javascript:void(0)" className="ticket js-modal-open js-header-ticket" data-id="login">
                                <img src={iconTicket} alt="ticket" />
                                Vé đã mua
                            </a>

                            {!auth ? (
                                <>
                                    <ul className="login__nav pc-only">
                                        <li>
                                            <button onClick={handleLoginToggle}>Đăng nhập</button>
                                        </li>
                                        <li>
                                            <button data-id="signin">Đăng ký</button>
                                        </li>
                                    </ul>
                                    <button className="login--sp" onClick={handleLoginToggle}>
                                        <img src={iconUser} width="20" height="20" alt="Login" />
                                    </button>
                                </>
                            ) : (
                                <div className="header__account">
                                    <Link to="/tai-khoan" className="header__account-link">
                                        <img className="header__account-icon" src={noAvatar} loading="lazy" alt="avatar" /><span
                                            id="account-email">Hoàng Giang</span>
                                    </Link>
                                </div>
                            )}

                            <div className="lang">
                                <div className="lang__active">
                                    <img className="lang__flag js-lang-flag" src={iconFlagVi} alt="VN" />
                                    <img className="lang__icon" src={iconArrowDown} alt="icon" width="13" height="8" />
                                </div>
                                <ul className="lang__nav">
                                    <li className="js-lang-item">
                                        <img src={iconFlagVi} alt="VN" />
                                        <span>Tiếng Việt</span>
                                    </li>
                                    <li className="js-lang-item">
                                        <img src={iconFlagEn} alt="EN" />
                                        <span>English</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={`hamburger ${navigationOpen ? 'is-active' : ''}`} onClick={() => { handleNavigationToggle() }}>
                                <div className="hamburger__item"></div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={`header__bottom ${navigationOpen ? 'is-active' : ''}`}>
                    <div className="container">
                        <nav className="nav">
                            <ul className="nav__lang">
                                <li className="js-lang-item">
                                    <img src={iconFlagVi} alt="VN" />
                                </li>
                                <li className="js-lang-item">
                                    <img src={iconFlagEn} alt="EN" />
                                </li>
                            </ul>
                            <ul className="nav__list">
                                <li>
                                    <Link to="/loai-su-kien/live-concert/">Live Concert</Link>
                                </li>
                                <li>
                                    <Link to="/loai-su-kien/san-khau-nghe-thuat/">Sân khấu & Nghệ thuật</Link>
                                </li>
                                <li>
                                    <Link to="/loai-su-kien/the-thao/">Thể thao</Link>
                                </li>
                                <li>
                                    <Link to="/tin-tuc/">Tin tức</Link>
                                </li>
                                <li>
                                    <Link to="/loai-su-kien/khac/">Khác</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header >
            {loginOpen && <Login setAuth={setAuth} setLoginOpen={setLoginOpen} />}
        </>
    )
}

export default Header