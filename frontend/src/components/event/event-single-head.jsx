import iconCalendar from '../../assets/images/common/icon-calendar.png';
import iconLocation from '../../assets/images/common/icon-location.png';
import iconDollar from '../../assets/images/common/icon-dollar.png';
import iconDoubleArrowDown from '../../assets/images/common/icon-double-arrow-down.png';

const SingleEventHead = ({title, date, address, priceFrom, priceTo, banner}) => {
  return (
    <>
      <section className="event__head">
        <div className="container">
          <div className="e-ticket">
            <div className="e-ticket--left">
              <h1 className="e-ticket__title title">
                {title}
              </h1>
              <ul className="e-ticket__info">
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconCalendar} alt="Date" />
                  </span>
                  <p className="e-ticket__info-text">{date ? date : 'Chưa có thời gian cụ thể'}</p>
                </li>
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconLocation} alt="Location" />
                  </span>
                  <p className="e-ticket__info-text">
                    {address ? address : 'Chưa có địa điểm cụ thể'}
                  </p>
                </li>
                <li className="e-ticket__info-item">
                  <span className="e-ticket__info-icon">
                    <img src={iconDollar} alt="Price" />
                  </span>
                  <p className="e-ticket__info-text">
                    Giá vé: Từ <span className="color--secondary">{priceFrom}</span> đến <span className="color--secondary">{priceTo}</span>
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
              <img className="e-ticket__img" src={banner} alt="Banner" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleEventHead;
