import React, { useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';
import logo from '../assets/images/common/logo.svg';
import iconSearch from '../assets/images/common/icon-search.svg';

import SearchBox from './searchbox';

function Header() {
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
        console.log(e.target.type);
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