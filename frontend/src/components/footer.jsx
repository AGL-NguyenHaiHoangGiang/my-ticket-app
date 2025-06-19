import { Link } from 'react-router-dom';
import BackToTopButton from './backtop';
import FooterNav from './footer-nav';
import Social from './social-list';

import logo from '../assets/images/common/logo.svg';
import iconMail from '../assets/images/common/icon-mail.png';
import iconLocation from '../assets/images/common/icon-location.png';
import iconPhone from '../assets/images/common/icon-phone.svg';
import iconFacebook from '../assets/images/common/icon-facebook.png';
import iconSubmit from '../assets/images/common/icon-submit.svg';
import iconAppStore from '../assets/images/common/app-store.png';
import iconGooglePlay from '../assets/images/common/google-play.png';
import iconFb from '../assets/images/common/icon-fb.svg';
import iconIns from '../assets/images/common/icon-ins.svg';
import iconTiktok from '../assets/images/common/icon-tt.svg';
import iconThread from '../assets/images/common/icon-thread.svg';
import iconFlagVi from '../assets/images/common/flag-vi.svg';
import iconFlagEn from '../assets/images/common/flag-en.svg';

const menuPolicy = [
    {
        title: "Điều khoản sử dụng cho khách hàng",
        link: "#"
    },
    {
        title: "Điều khoản sử dụng cho ban tổ chức",
        link: "#"
    }
];

const menuAbout = [
    {
        title: "Quy chế hoạt động",
        link: "#"
    },
    {
        title: "Chính sách bảo mật thông tin",
        link: "#"
    },
    {
        title: "Cơ chế giải quyết tranh chấp / khiếu nại",
        link: "#"
    },
    {
        title: "Chính sách bảo mật thanh toán",
        link: "#"
    },
    {
        title: "Chính sách đổi trả và kiểm hàng",
        link: "#"
    },
    {
        title: "Điều kiện vận chuyển và giao nhận",
        link: "#"
    },
    {
        title: "Phương thức thanh toán",
        link: "#"
    }
];

const socialLinks = [
    {
        icon: iconFb,
        link: "#"
    },
    {
        icon: iconIns,
        link: "#"
    },
    {
        icon: iconTiktok,
        link: "#"
    },
    {
        icon: iconThread,
        link: "#"
    }
];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="container">
                    <div className="footer__logo">
                        <Link to="/" className="footer__logo-link">
                            <img src={logo} alt="Logo" loading="lazy" />
                        </Link>
                    </div>
                    <div className="footer__row">
                        <div className="footer__col">
                            <ul className="footer__info">
                                <li className="footer__info-item">
                                    <span className="footer__info-icon">
                                        <img src={iconLocation} alt="Location" loading="lazy" />
                                    </span>
                                    <p className="footer__info-text">Tầng 20 – Tòa nhà Lanmark 81, 208 đường Nguyễn Hữu Cảnh, phường 22, quận
                                        Bình Thạnh, Thành phố Hồ Chí Minh.</p>
                                </li>
                                <li className="footer__info-item align-center">
                                    <span className="footer__info-icon">
                                        <img src={iconPhone} alt="Phone" loading="lazy" />
                                    </span>
                                    <a href="tel:19000000" className="footer__info-text">1900.0000</a>
                                </li>
                                <li className="footer__info-item align-center">
                                    <span className="footer__info-icon">
                                        <img src={iconMail} alt="Mail" loading="lazy" />
                                    </span>
                                    <a href="mailto:support-team3@demo.vn" className="footer__info-text">support-team3@demo.vn</a>
                                </li>
                                <li className="footer__info-item align-center">
                                    <span className="footer__info-icon">
                                        <img src={iconFacebook} alt="facebook" loading="lazy" />
                                    </span>
                                    <a href="https://www.facebook.com/" target="_blank" className="footer__info-text" rel="noopener noreferrer">MyTicket</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__col">
                            <h3 className="footer__title">Điều khoản sử dụng website</h3>
                            <FooterNav nav={menuPolicy} />
                            
                            <h3 className="footer__title">Nhận email sự kiện hot</h3>
                            <div className="footer__form">
                                <img className="footer__form-icon" src={iconMail} alt="Email" loading="lazy" />
                                <input className="footer__form-input" type="email" placeholder="Nhập email của bạn" />
                                <button className="footer__form-btn" type="submit"><img src={iconSubmit} alt="Submit" loading="lazy" /></button>
                            </div>
                        </div>
                        <div className="footer__col">
                            <h3 className="footer__title">Về chúng tôi</h3>
                            <FooterNav nav={menuAbout} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <div className="footer__row">
                        <div className="footer__col">
                            <h3 className="footer__title">Tải ứng dụng</h3>
                            <ul className="footer__app">
                                <li>
                                    <a href="#">
                                        <img src={iconAppStore} alt="Appstore" loading="lazy" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src={iconGooglePlay} alt="Googleplay" loading="lazy" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__col">
                            <h3 className="footer__title">Follow us</h3>
                            <Social data={socialLinks} />
                        </div>
                        <div className="footer__col">
                            <h3 className="footer__title">Ngôn ngữ</h3>
                            <ul className="nav__lang">
                                <li className="js-lang-item">
                                    <img src={iconFlagVi} alt="VN" loading="lazy" />
                                </li>
                                <li className="js-lang-item">
                                    <img src={iconFlagEn} alt="EN" loading="lazy" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Copyright ©2024 - Công ty CP MyTicket
            </div>
            <BackToTopButton />
        </footer>
    )
}

export default Footer