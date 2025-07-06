import React, { useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';
import logo from '../assets/images/common/logo.svg';
import iconSearch from '../assets/images/common/icon-search.svg';
import iconUser from '../assets/images/common/icon-user.png';
import iconTicket from '../assets/images/common/icon-ticket.svg';
import avatar from '../assets/images/account/avatar.jpg';
import iconFlagVi from '../assets/images/common/flag-vi.svg';
import iconFlagEn from '../assets/images/common/flag-en.svg';
import iconArrowDown from '../assets/images/common/icon-arrow-down.svg';

import SearchBox from './searchbox';

function Header() {
    const [navigationOpen, setNavigationOpen] = useState(false);
    const handleNavigationToggle = () => {
        setNavigationOpen(!navigationOpen);
    };

    const [openSearchBox, setOpenSearchBox] = useState(false);
    const searchRef = useRef(null);
    const searchBoxRef = useRef(null);

    const handleClickOutside = (e) => {
        // Kiểm tra nếu click không phải trong search form hoặc search box
        if (
            searchRef.current &&
            !searchRef.current.contains(e.target) &&
            searchBoxRef.current &&
            !searchBoxRef.current.contains(e.target)
        ) {
            setOpenSearchBox(false);
        }
    };

    const handleSearchClick = (e) => {
        if (e.target.type === 'submit') {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        setOpenSearchBox(true);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        // Logic tìm kiếm ở đây
        console.log('Search submitted');
    };

    const handleCloseSearchBox = () => {
        setOpenSearchBox(false);
    };

    useEffect(() => {
        // Thêm event listener cho click outside
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                            <div className={`js-search ${openSearchBox ? 'show' : ''}`}>
                                <form
                                    className="search"
                                    onClick={handleSearchClick}
                                    onSubmit={handleSubmitSearch}
                                >
                                    <img src={iconSearch} alt="Search" />
                                    <input ref={searchRef} type="text" placeholder="Bạn tìm gì hôm nay?" />
                                    <button type="submit">Tìm kiếm</button>
                                </form>
                            </div>

                            <div className="search--sp js-search-sp" onClick={handleSearchClick}>
                                <img src={iconSearch} width="20" height="20" alt="Search" />
                            </div>

                            {openSearchBox && (
                                <div ref={searchBoxRef}>
                                    <SearchBox onClose={handleCloseSearchBox} />
                                </div>
                            )}
                        </div>

                        <a href="javascript:void(0)" className="login--sp js-modal-open" data-id="login">
                            <img src={iconUser} width="20" height="20" alt="Login" />
                        </a>

                        <a href="javascript:void(0)" className="ticket js-modal-open js-header-ticket" data-id="login">
                            <img src={iconTicket} alt="ticket" />
                            Vé đã mua
                        </a>

                        <ul className="login__nav pc-only">
                            <li>
                                <a href="javascript:void(0)" className="js-modal-open" data-id="login">Đăng nhập</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="js-modal-open" data-id="signin">Đăng ký</a>
                            </li>
                        </ul>

                        <div className="header__account">
                            <a href="javascript:void(0)" className="header__account-link">
                                <img
                                    className="header__account-icon"
                                    src={avatar}
                                    loading="lazy"
                                    alt="avatar" />
                                <span id="account-email">&nbsp;</span>
                            </a>
                        </div>

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

                        <div className={`hamburger ${navigationOpen ? 'is-active' : ''}`} onClick={() => { handleNavigationToggle()}}>
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