import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountBreadcrumbs from "../components/account/AccountBreadcrumbs";
import AccountMainContent from "../components/account/AccountMainContent";
import NotFound from "./404";
import SimpleLoading from "../components/SimpleLoading";

const Account = ({ auth }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Hàm để lấy thông tin từ localStorage hoặc dùng dữ liệu mặc định
  const getInitialUserInfo = () => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      return JSON.parse(savedUserInfo);
    }
    return {
      name: "Nguyễn Vân Anh",
      birthDate: "01/01/2006",
      phone: "0123456789",
      email: "mailtothietkeweb@abc.xyz",
      address: "Khu phố văn hóa, phường văn minh",
      joinDate: "01/01/2025",
    };
  };

  const [userInfo, setUserInfo] = useState(getInitialUserInfo);
  const [originalUserInfo, setOriginalUserInfo] = useState(getInitialUserInfo);
  const [notifications, setNotifications] = useState({
    allNotifications: false,
    featuredEvents: false,
    artistEvents: false,
    upcomingEvents: false,
    newsletter: false,
  });

  const toggleEditable = () => {
    console.log("toggleEditable called, current isEditing:", isEditing); // Debug log
    if (!isEditing) {
      // Khi bắt đầu edit, lưu lại thông tin gốc
      setOriginalUserInfo({ ...userInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Lưu thông tin vào localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log("Đã lưu thông tin vào localStorage:", userInfo);

    // Cập nhật originalUserInfo với dữ liệu mới
    setOriginalUserInfo({ ...userInfo });

    // Thoát khỏi chế độ chỉnh sửa
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Khôi phục lại thông tin gốc
    setUserInfo({ ...originalUserInfo });

    // Thoát khỏi chế độ chỉnh sửa
    setIsEditing(false);
  };

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const logout = () => {
    // Xóa thông tin user khỏi localStorage khi logout
    localStorage.removeItem("userInfo");
    console.log("Đã xóa thông tin user khỏi localStorage");

    window.location.href = "/";
  };

  // Kiểm tra auth, nếu không đăng nhập thì hiển thị 404
  if (auth === false) {
    return <NotFound />;
  }

  // Nếu auth vẫn đang loading (null), có thể hiển thị loading hoặc chờ
  if (auth === null) {
    return <SimpleLoading />;
  }

  return (
    <main>
      <section>
        <div className="container">
          <AccountBreadcrumbs />
          <div className="account__wrapper">
            <AccountSidebar userName={userInfo.name} onLogout={logout} />
            <AccountMainContent
              userInfo={userInfo}
              isEditing={isEditing}
              onToggleEdit={toggleEditable}
              onToggleSwitch={toggleSwitch}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;
