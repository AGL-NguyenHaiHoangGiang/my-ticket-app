import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../services/auth";

// Import images
import avatar from "../../assets/images/account/avatar.jpg";
import iconPerson from "../../assets/images/account/person.svg";
import iconTicket from "../../assets/images/account/ticket.svg";
import iconWallet from "../../assets/images/account/wallet.svg";
import iconLogout from "../../assets/images/account/icon-logout.svg";

const AccountSidebar = ({
  userName,
  onLogout,
  activeTab = "account",
  userImage,
}) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await Auth.logout();

      localStorage.removeItem("customerToken");

      if (onLogout) {
        onLogout();
      }

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("customerToken");
      if (onLogout) {
        onLogout();
      }
      navigate("/");
    }
  };
  return (
    <div className="account__side">
      <div className="welcome__container">
        <div className="avatar__container avatar__sidebar">
          <img src={userImage} alt="Avatar Image" />
        </div>
        <div className="name__container">
          <div className="welcome__text">
            <h4>Chào mừng bạn quay trở lại</h4>
          </div>
          <div className="welcome__text">
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      <div className="horizontal__bar"></div>

      <ul className="nav__tag">
        <li
          className={`nav__item ${activeTab === "account" ? "text__blue" : ""}`}
        >
          <Link to="/tai-khoan">
            <img src={iconPerson} alt="icon" />
            <strong>Tài khoản</strong>
          </Link>
        </li>
        <li
          className={`nav__item ${activeTab === "ticket" ? "text__blue" : ""}`}
        >
          <Link to="/tai-khoan-ticket">
            <img src={iconTicket} alt="icon" />
            <strong>Vé đã mua</strong>
          </Link>
        </li>
        <li className="nav__item">
          <a href="#" onClick={handleLogout}>
            <img src={iconLogout} alt="icon" />
            <strong>Đăng xuất</strong>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
