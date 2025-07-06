import iconCalendar from '../../assets/images/common/icon-calendar.png';
import iconLocation from '../../assets/images/common/icon-location.png';
import iconDollar from '../../assets/images/common/icon-dollar.png';
import iconDoubleArrowDown from '../../assets/images/common/icon-double-arrow-down.png';
import bannerImage from '../../assets/images/event-detail/banner.jpg';

const SingleEventHead = () => {
  return (
    <>
      <section className="event__head">
        <div className="container">
          <div className="e-ticket">
            <div className="e-ticket--left">
              <h1 className="e-ticket__title title">
                Chuyến Tàu Mùa Đông - Phan Mạnh Quỳnh The First Live Concert
              </h1>
              <ul className="e-ticket__info">
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconCalendar} alt="Date" />
                  </span>
                  <p className="e-ticket__info-text">19:00 - 22:00, 04 tháng 1, 2025</p>
                </li>
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconLocation} alt="Location" />
                  </span>
                  <p className="e-ticket__info-text">
                    Nhà Thi Đấu Nguyễn Du - 116 Nguyễn Du, Phường Bến Thành, Quận 1, Hồ Chí Minh
                  </p>
                </li>
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconDollar} alt="Price" />
                  </span>
                  <p className="e-ticket__info-text">
                    Giá vé: Từ <span className="color--secondary">1.000.000đ</span> đến{' '}
                    <span className="color--secondary">3.900.000đ</span>
                  </p>
                </li>
              </ul>
              <div className="e-ticket__btn">
                <a href="#ticket-detail" className="button button--gradient">
                  Chi tiết các hạng vé
                </a>
                <img 
                  className="e-ticket__arrow" 
                  src={iconDoubleArrowDown} 
                  alt="arrow down" 
                />
              </div>
            </div>
            <div className="e-ticket--right">
              <img className="e-ticket__img" src={bannerImage} alt="Banner" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleEventHead;
