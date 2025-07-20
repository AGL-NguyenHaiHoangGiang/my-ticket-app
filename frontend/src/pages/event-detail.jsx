import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventService from '../services/events';

import SingleEventHead from "../components/event/event-single-head";
import iconCalendar from '../assets/images/common/icon-calendar.png';
import btcAvatar from '../assets/images/event-detail/btc-avatar.jpg';
import adsImage from '../assets/images/event-detail/ads.jpg';
import adsImageSp from '../assets/images/event-detail/ads-sp.png';

import RelatedEvents from '../components/related';

const EventDetail = ({ auth, setLoginOpen }) => {
  const [detail, setDetail] = useState({});
  const { slug } = useParams();

  const fetchEventDetail = async () => {
    try {
      const response = await EventService.getBySlug(slug);
      setDetail(response.body);
    } catch (error) {
      console.error("Error fetching event detail:", error);
    }
  };

  useEffect(() => {
    fetchEventDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  // console.log('Event Detail:', detail);
  const startTime = detail.startTime ? new Date(detail.startTime) : null;
  const endTime = detail.endTime ? new Date(detail.endTime) : null;
  const today = new Date();
  const isExpired = endTime && endTime < today;

  // pad numbers to 2 digits
  const pad2 = (num) => num.toString().padStart(2, '0');
  const formattedDate = startTime
    ? `${pad2(startTime.getHours())}:${pad2(startTime.getMinutes())} - ${pad2(endTime.getHours())}:${pad2(endTime.getMinutes())}, ${pad2(startTime.getDate())}/${pad2(startTime.getMonth() + 1)}/${startTime.getFullYear()}`
    : '';

  const venue = detail.venue || null;
  const address = venue ? `${venue}, ${detail.address}` : detail.address;
  const ticketList = detail.showings && detail.showings[0]?.ticketTypes || [];
  const ticketPrices = ticketList.map(ticket => ticket.price);
  const priceFrom = Math.min(...ticketPrices);
  const priceFromFormat = formatPrice(priceFrom);
  const priceTo = Math.max(...ticketPrices);
  const priceToFormat = formatPrice(priceTo);

  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price).replace(/\s?₫/, '₫');
  }

  return (
    <>
      <SingleEventHead
        title={detail.title}
        date={formattedDate}
        address={address}
        priceFrom={priceFromFormat}
        priceTo={priceToFormat}
        banner={detail.bannerURL}
        expired={isExpired}
      />

      {/* article detail */}
      <article className="event-detail">
        <div className="container">
          <div className="event__wrapper">
            {/* event main content */}
            <div className="event__main">
              {!isExpired && (
                <div className="event__block e-ticket-info " id="ticket-detail">
                  <h2 className="e-ticket-info__title title--medium">Các hạng vé</h2>
                  <div className="e-ticket-info__booking">
                    <time dateTime="2025-01-04 19:00" className="e-ticket-info__time">
                      <img
                        className="e-ticket-info__time-icon"
                        src={iconCalendar}
                        alt="calendar"
                      />
                      {formattedDate}
                    </time>
                    {auth ? (
                      <Link to={`/su-kien/${slug}/dat-ve`} className="button button--primary">
                        Đặt vé
                      </Link>
                    ) : (
                      <button className="button button--primary" data-id="login" onClick={() => setLoginOpen(true)}>
                        Đăng nhập
                      </button>
                    )}
                  </div>
                  {ticketList.length > 0 && (
                    <table className="e-ticket-info__table">
                      <tbody>
                        {ticketList.map((ticket, index) => (
                          <tr key={index}>
                            <th>{ticket.name}</th>
                            <td>{formatPrice(ticket.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              <div className="event__block event__content ">
                <h2 className="event-title title--medium">Giới thiệu sự kiện</h2>
                <div className="content">
                  {detail.description ? (
                    <div dangerouslySetInnerHTML={{ __html: detail.description }} />
                  ) : (
                    <p>Chưa có mô tả cho sự kiện này.</p>
                  )}
                </div>
              </div>
            </div>
            {/* end event main content */}

            {/* event sidebar */}
            <div className="event__side">
              {/* common sidebar */}
              <aside className="sidebar">
                <div className="sidebar__item ">
                  <div className="btc">
                    <h3 className="btc__title title--medium">Ban tổ chức</h3>
                    <div className="btc__content">
                      {detail.orgLogoURL && (
                        <div className="btc__avatar">
                          <img src={detail.orgLogoURL ? detail.orgLogoURL : btcAvatar} alt="Ban tổ chức" />
                        </div>
                      )}
                      <div className="btc__info">
                        {detail.orgName && (
                          <h4 className="btc__name title--medium">{detail.orgName}</h4>
                        )}
                        {/* <p className="btc__mail">
                          <strong>Email:</strong> <a href="mailto:pmq.xxxx@gmail.com">pmq.xxxx@gmail.com</a>
                        </p>
                        <p className="btc__phone">
                          <strong>Hotline:</strong> <a href="tel:0909.xxx.xxx">0909.xxx.xxx</a>
                        </p> */}
                      </div>
                      <div className="btc__desc">
                        {detail.orgDescription ? detail.orgDescription : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar__item ">
                  <div className="advertisement">
                    <picture>
                      <source srcSet={adsImageSp} media="(max-width: 768px)" />
                      <img src={adsImage} alt="Advertisement" />
                    </picture>
                  </div>
                </div>
              </aside>
              {/* end common sidebar */}
            </div>
            {/* end event sidebar */}
          </div>
        </div>
      </article>
      {/* end article detail */}

      <RelatedEvents currentCategory={Array.isArray(detail.categoriesV2) && detail.categoriesV2[0] ? detail.categoriesV2[0] : ''} currentEventId={detail.id} />
    </>
  );
};

export default EventDetail;
