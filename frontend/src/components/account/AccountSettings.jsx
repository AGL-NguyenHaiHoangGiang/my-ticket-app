import React from "react";

const AccountSettings = ({ notifications, onToggleSwitch }) => {
  return (
    <>
      <h3>Thiết lập tài khoản</h3>
      <div className="horizontal__bar"></div>
      <div className="setting__container">
        <h4>Tùy chọn thông báo</h4>
        <div className="setting__item">
          <div className="setting__title">Thiết lập toàn bộ thông báo</div>
          <div
            className={`toggle-switch ${
              notifications.allNotifications ? "active" : ""
            }`}
            onClick={() => onToggleSwitch("allNotifications")}
          >
            <div className="toggle-button"></div>
          </div>
        </div>
        <div className="setting__item">
          <div className="setting__title">
            Thông báo sự kiện nổi bật được chọn lọc
          </div>
          <div
            className={`toggle-switch ${
              notifications.featuredEvents ? "active" : ""
            }`}
            onClick={() => onToggleSwitch("featuredEvents")}
          >
            <div className="toggle-button"></div>
          </div>
        </div>
        <div className="setting__item">
          <div className="setting__title">
            Thông báo sự kiện từ nghệ sĩ tôi quan tâm
          </div>
          <div
            className={`toggle-switch ${
              notifications.artistEvents ? "active" : ""
            }`}
            onClick={() => onToggleSwitch("artistEvents")}
          >
            <div className="toggle-button"></div>
          </div>
        </div>
        <div className="setting__item">
          <div className="setting__title">Thông báo sự kiện sắp diễn ra</div>
          <div
            className={`toggle-switch ${
              notifications.upcomingEvents ? "active" : ""
            }`}
            onClick={() => onToggleSwitch("upcomingEvents")}
          >
            <div className="toggle-button"></div>
          </div>
        </div>
        <div className="setting__item">
          <div className="setting__title">Newsletter từ Myticket</div>
          <div
            className={`toggle-switch ${
              notifications.newsletter ? "active" : ""
            }`}
            onClick={() => onToggleSwitch("newsletter")}
          >
            <div className="toggle-button"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
