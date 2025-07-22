import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountBreadcrumbs from "../components/account/AccountBreadcrumbs";
import AccountMainContent from "../components/account/AccountMainContent";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Vân Anh",
    birthDate: "01/01/2006",
    phone: "0123456789",
    email: "mailtothietkeweb@abc.xyz",
    address: "Khu phố văn hóa, phường văn minh",
    joinDate: "01/01/2025",
  });
  const [notifications, setNotifications] = useState({
    allNotifications: false,
    featuredEvents: false,
    artistEvents: false,
    upcomingEvents: false,
    newsletter: false,
  });

  const toggleEditable = () => {
    setIsEditing(!isEditing);
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
    window.location.href = "/";
  };

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
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;
