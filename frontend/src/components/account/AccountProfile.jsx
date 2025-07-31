import React from "react";
import avatar from "../../assets/images/account/avatar.jpg";
import "../../assets/style/account.css";

const AccountProfile = ({
  userInfo,
  isEditing,
  onToggleEdit,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <>
      <h3>Thông tin tài khoản</h3>
      <div className="horizontal__bar"></div>

      <div className="account-detail__container">
        <div className="account-avatar__section">
          <div className="avatar__container avatar__main">
            <img src={userInfo.avatar} alt="Avatar Image" />
          </div>
          {!isEditing && (
            <button className="update-info-btn" onClick={onToggleEdit}>
              Cập nhật thông tin
            </button>
          )}
        </div>
        <div className="personal_detail_container">
          <div className="personal_detail_item">
            <span className="personal_detail_title">
              <strong>Họ và Tên</strong>
            </span>
            {!isEditing ? (
              <div
                className="personal_detail_value blur__container"
                id="editableDiv"
              >
                {userInfo.name}
              </div>
            ) : (
              <input
                className="profile-form-input"
                type="text"
                value={userInfo.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            )}
          </div>
          <div className="personal_detail_item">
            <div className="personal_detail_title">
              <strong>Ngày sinh</strong>
            </div>
            {!isEditing ? (
              <div className="personal_detail_value blur__container">
                {userInfo.birthDate}
              </div>
            ) : (
              <input
                className="profile-form-input"
                type="text"
                value={userInfo.birthDate}
                onChange={(e) => onInputChange("birthDate", e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            )}
          </div>
          <div className="personal_detail_item">
            <div className="personal_detail_title">
              <strong>Số điện thoại</strong>
            </div>
            {!isEditing ? (
              <div className="personal_detail_value blur__container">
                {userInfo.phone}
              </div>
            ) : (
              <input
                className="profile-form-input"
                type="text"
                value={userInfo.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            )}
          </div>
          <div className="personal_detail_item">
            <div className="personal_detail_title">
              <strong>Email</strong>
            </div>
            {!isEditing ? (
              <div className="personal_detail_value blur__container">
                {userInfo.email}
              </div>
            ) : (
              <input
                className="profile-form-input"
                type="email"
                value={userInfo.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                placeholder="emailaddress@domain"
              />
            )}
          </div>
          <div className="personal_detail_item">
            <div className="personal_detail_title">
              <strong>Địa chỉ</strong>
            </div>
            {!isEditing ? (
              <div className="personal_detail_value blur__container">
                {userInfo.address}
              </div>
            ) : (
              <input
                className="profile-form-input"
                type="text"
                value={userInfo.address}
                onChange={(e) => onInputChange("address", e.target.value)}
                placeholder="Địa chỉ"
              />
            )}
          </div>
          <div className="personal_detail_item">
            <div className="personal_detail_title">
              <strong>Ngày tham gia</strong>
            </div>
            <div className="personal_detail_value">{userInfo.joinDate}</div>
          </div>

          {isEditing && (
            <div className="edit-buttons-container">
              <button className="save-btn" onClick={onSave}>
                Lưu
              </button>
              <button className="cancel-btn" onClick={onCancel}>
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
