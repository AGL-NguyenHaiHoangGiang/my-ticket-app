import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../services/events';

import SingleEventHead from "../components/event/event-single-head";
import iconCalendar from '../assets/images/common/icon-calendar.png';
import eventStageImage from '../assets/images/event-detail/so-do-san-khau.jpg';
import btcAvatar from '../assets/images/event-detail/btc-avatar.jpg';
import adsImage from '../assets/images/event-detail/ads.jpg';
import adsImageSp from '../assets/images/event-detail/ads-sp.png';

import RelatedEvents from '../components/related';

const EventDetail = () => {
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
  }, [slug]);

  console.log('Event Detail:', detail);

  return (
    <>
      <SingleEventHead />
      
      {/* article detail */}
      <article className="event-detail">
        <div className="container">
          <div className="event__wrapper">
            {/* event main content */}
            <div className="event__main">
              <div className="event__block e-ticket-info " id="ticket-detail">
                <h2 className="e-ticket-info__title title--medium">Các hạng vé</h2>
                <div className="e-ticket-info__booking">
                  <time dateTime="2025-01-04 19:00" className="e-ticket-info__time">
                    <img
                      className="e-ticket-info__time-icon"
                      src={iconCalendar}
                      alt="calendar"
                    />
                    19:00 - 22:00, 04/01/2025
                  </time>
                  <a href="#" className="js-booking-btn js-modal-open button button--primary" data-id="login">
                    Đăng nhập
                  </a>
                </div>

                <table className="e-ticket-info__table">
                  <tbody>
                    <tr>
                      <th>Tri kỷ</th>
                      <td>3.900.000 VND</td>
                    </tr>
                    <tr>
                      <th>ĐẠI DƯƠNG</th>
                      <td>3.300.000 VND</td>
                    </tr>
                    <tr>
                      <th>Xuân thì</th>
                      <td>2.700.000 VND</td>
                    </tr>
                    <tr>
                      <th>Từ đó</th>
                      <td>1.800.000 VND</td>
                    </tr>
                    <tr>
                      <th>Hà Lan</th>
                      <td>1.400.000 VND</td>
                    </tr>
                    <tr>
                      <th>Hoa mặt trời</th>
                      <td>1.000.000 VND</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="event__block event__content ">
                <h2 className="event-title title--medium">Giới thiệu sự kiện</h2>
                <div className="content">
                  <h2>Lorem ipsum dolor sit amet</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus arcu sed ultricies imperdiet.
                    Proin at ante vitae nibh viverra interdum eget eget neque. Integer sit amet egestas ante, id fermentum
                    tellus. Donec volutpat sollicitudin aliquam. Aliquam commodo enim eu ante semper auctor. Maecenas
                    sodales hendrerit libero vitae tempus. Donec tincidunt sem a velit auctor accumsan eget at urna.
                    Vestibulum id orci dignissim, auctor elit in, cursus libero. Sed ornare lorem et sapien ultricies
                    tempus. Curabitur nulla massa, consequat a sodales nec, cursus non erat. Aenean facilisis lorem augue,
                    eu posuere risus hendrerit in. Phasellus imperdiet suscipit pellentesque.
                  </p>

                  <h3>Giới thiệu sự kiện</h3>
                  <p>
                    Đêm nhạc "Ánh sáng tương lai" là sự kiện âm nhạc đặc biệt quy tụ những nghệ sĩ hàng đầu Việt Nam.
                    Chương trình sẽ mang đến cho khán giả những trải nghiệm âm nhạc đầy cảm xúc với các ca khúc hit được
                    thể hiện bởi dàn nghệ sĩ tài năng.
                  </p>
                  <p>
                    Sự kiện không chỉ là một đêm nhạc thông thường mà còn là một hành trình khám phá âm nhạc đương đại
                    với công nghệ sân khấu hiện đại, âm thanh chất lượng cao và những hiệu ứng ánh sáng ấn tượng.
                  </p>

                  <h3>Điểm nổi bật của sự kiện</h3>
                  <ul>
                    <li><strong>Dàn nghệ sĩ khách mời đình đám:</strong> Gồm các ca sĩ nổi tiếng và ban nhạc chuyên nghiệp</li>
                    <li><strong>Công nghệ sân khấu hiện đại:</strong> Hệ thống âm thanh, ánh sáng và LED screen công nghệ cao</li>
                    <li><strong>Không gian sang trọng:</strong> Địa điểm tổ chức đẳng cấp với sức chứa lên đến 2,000 khán giả</li>
                    <li><strong>Chương trình đa dạng:</strong> Kết hợp nhiều thể loại âm nhạc từ pop, rock đến ballad</li>
                    <li><strong>Tương tác trực tiếp:</strong> Cơ hội gặp gỡ và chụp ảnh cùng các nghệ sĩ</li>
                  </ul>

                  <h3>Chương trình biểu diễn chi tiết</h3>
                  <div className="event-schedule">
                    <div className="schedule-item">
                      <span className="time">19:00 - 19:30</span>
                      <span className="activity">Đón khách và checkin, welcome drink</span>
                    </div>
                    <div className="schedule-item">
                      <span className="time">19:30 - 20:00</span>
                      <span className="activity">Phần mở màn với ban nhạc acoustic</span>
                    </div>
                    <div className="schedule-item">
                      <span className="time">20:00 - 21:00</span>
                      <span className="activity">Phần trình diễn chính - Các nghệ sĩ khách mời</span>
                    </div>
                    <div className="schedule-item">
                      <span className="time">21:00 - 21:15</span>
                      <span className="activity">Giải lao - Tương tác với khán giả</span>
                    </div>
                    <div className="schedule-item">
                      <span className="time">21:15 - 22:30</span>
                      <span className="activity">Phần 2 - Những ca khúc đặc biệt và bất ngờ</span>
                    </div>
                    <div className="schedule-item">
                      <span className="time">22:30 - 23:00</span>
                      <span className="activity">Kết thúc chương trình và chụp ảnh lưu niệm</span>
                    </div>
                  </div>

                  <h3>Thông tin địa điểm</h3>
                  <div className="venue-info">
                    <p><strong>Tên địa điểm:</strong> Trung tâm Hội nghị Quốc gia</p>
                    <p><strong>Địa chỉ:</strong> Số 1 Thăng Long Boulevard, Nam Từ Liêm, Hà Nội</p>
                    <p><strong>Sức chứa:</strong> 2,000 khán giả</p>
                    <p><strong>Tiện ích:</strong></p>
                    <ul>
                      <li>Bãi đỗ xe miễn phí (500 chỗ)</li>
                      <li>Hệ thống điều hòa không khí hiện đại</li>
                      <li>Wi-Fi miễn phí tốc độ cao</li>
                      <li>Quầy bán đồ ăn, thức uống</li>
                      <li>Khu vực nghỉ ngơi và photo booth</li>
                    </ul>
                  </div>

                  <h3>Sơ đồ sân khấu và chỗ ngồi</h3>

                  <img
                    src={eventStageImage}
                    alt="Sơ đồ sân khấu và chỗ ngồi"
                    loading="lazy"
                    className="stage-diagram"
                  />
                  <p className="stage-note">
                    <strong>Lưu ý:</strong> Sơ đồ mang tính chất tham khảo. Vị trí ghế ngồi có thể thay đổi tùy theo
                    yêu cầu của chương trình và đảm bảo an toàn cho khán giả.
                  </p>

                  <h3>Quy định và lưu ý quan trọng</h3>
                  <div className="event-rules">
                    <div className="rule-section">
                      <h4>🎫 Về vé và checkin:</h4>
                      <ul>
                        <li>Vui lòng mang theo vé hoặc mã QR khi tham dự sự kiện</li>
                        <li>Thời gian checkin: từ 18:30 đến 19:30</li>
                        <li>Không được chuyển nhượng vé dưới bất kỳ hình thức nào</li>
                        <li>Vé đã bao gồm VAT, không hoàn trả dưới mọi hình thức</li>
                      </ul>
                    </div>

                    <div className="rule-section">
                      <h4>📱 Thiết bị và ghi hình:</h4>
                      <ul>
                        <li>Cho phép chụp ảnh cá nhân bằng điện thoại</li>
                        <li>Nghiêm cấm quay video trong suốt chương trình</li>
                        <li>Vui lòng tắt tiếng điện thoại hoặc để chế độ im lặng</li>
                        <li>Không sử dụng flash khi chụp ảnh</li>
                      </ul>
                    </div>

                    <div className="rule-section">
                      <h4>🚫 Vật phẩm không được phép mang vào:</h4>
                      <ul>
                        <li>Đồ uống có cồn từ bên ngoài</li>
                        <li>Thực phẩm và đồ ăn từ bên ngoài</li>
                        <li>Vật dụng nguy hiểm (dao, kéo, vật nhọn...)</li>
                        <li>Máy quay chuyên nghiệp</li>
                      </ul>
                    </div>

                    <div className="rule-section">
                      <h4>👔 Dress code:</h4>
                      <ul>
                        <li>Trang phục lịch sự, gọn gàng</li>
                        <li>Không mặc đồ ngủ, quần short, dép tông</li>
                        <li>Khuyến khích trang phục tối màu để phù hợp với không gian sự kiện</li>
                      </ul>
                    </div>
                  </div>

                  <h3>Câu hỏi thường gặp</h3>
                  <div className="faq-section">
                    <div className="faq-item">
                      <h4>❓ Tôi có thể hủy vé được không?</h4>
                      <p>
                        Theo quy định của ban tổ chức, vé không thể hủy hoặc hoàn tiền dưới mọi hình thức.
                        Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h4>❓ Có chỗ đỗ xe không?</h4>
                      <p>
                        Có, địa điểm tổ chức có bãi đỗ xe miễn phí với 500 chỗ. Tuy nhiên, do số lượng có hạn,
                        khuyến khích khách tham dự sử dụng phương tiện công cộng.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h4>❓ Sự kiện có phù hợp cho trẻ em không?</h4>
                      <p>
                        Sự kiện phù hợp cho mọi lứa tuổi. Trẻ em dưới 5 tuổi được vào miễn phí nhưng phải ngồi cùng
                        người lớn và không được cấp ghế riêng.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h4>❓ Có thể mua đồ ăn uống tại sự kiện không?</h4>
                      <p>
                        Có, sự kiện có quầy bán đồ ăn uống đa dạng với giá cả hợp lý. Các loại thức uống không cồn,
                        snack và fast food sẽ có sẵn.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h4>❓ Nếu tôi đến muộn thì sao?</h4>
                      <p>
                        Khách đến muộn vẫn có thể vào nhưng phải chờ đến thời điểm phù hợp để không làm ảnh hưởng
                        đến chương trình và khán giả khác.
                      </p>
                    </div>
                  </div>

                  <h3>Liên hệ và hỗ trợ</h3>
                  <div className="contact-support">
                    <p><strong>Hotline hỗ trợ 24/7:</strong> 1900-1234</p>
                    <p><strong>Email:</strong> support@ticketapp.com</p>
                    <p><strong>Website:</strong> www.ticketapp.com</p>
                    <p><strong>Địa chỉ văn phòng:</strong> Tầng 12, Tòa nhà ABC, 123 Đường XYZ, Hà Nội</p>
                  </div>

                  <p>
                    ---------------------------------------------------<br />
                    VUI LÒNG ĐỌC KỸ THÔNG TIN<br />
                    🚫 Ban tổ chức (BTC) không hỗ trợ hoàn vé dưới mọi hình thức, vì vậy rất mong Quý khách kiểm tra kĩ
                    các thông tin về vé trước khi tiến hành xác nhận đặt vé và thanh toán trực tuyến.<br />
                    (Vé đã bao gồm VAT)
                  </p>
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
                      <div className="btc__avatar">
                        <img src={btcAvatar} alt="Ban tổ chức" />
                      </div>
                      <div className="btc__info">
                        <h4 className="btc__name title--medium">Lacus Entertainment X Zeit Media</h4>
                        <p className="btc__mail">
                          <strong>Email:</strong> <a href="mailto:pmq.xxxx@gmail.com">pmq.xxxx@gmail.com</a>
                        </p>
                        <p className="btc__phone">
                          <strong>Hotline:</strong> <a href="tel:0909.xxx.xxx">0909.xxx.xxx</a>
                        </p>
                      </div>
                      <div className="btc__desc">
                        Lacus Entertainment, công ty đại diện nghệ sỹ Phan Mạnh Quỳnh, chính thức tổ chức Live Concert đầu
                        tiên Chuyến Tàu: Mùa Đông, phối hợp cùng Zeit Media, đơn vị tổ chức sự kiện chuyên nghiệp. Sự kết
                        hợp này hứa hẹn sẽ mang đến những trải nghiệm tuyệt vời nhất cho Chuyến Tàu: Mùa Đông, vào lúc 19h
                        ngày 04.01.2025 tại Nhà Thi Đấu Nguyễn Du, TPHCM.
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

      <RelatedEvents />
    </>
  );
};

export default EventDetail;
