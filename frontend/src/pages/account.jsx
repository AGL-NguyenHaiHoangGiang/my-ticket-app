import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountBreadcrumbs from "../components/account/AccountBreadcrumbs";
import AccountMainContent from "../components/account/AccountMainContent";
import NotFound from "./404";
import SimpleLoading from "../components/SimpleLoading";
import UserService from "../services/user";

const Account = ({ auth }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hàm để lấy thông tin từ localStorage hoặc dùng dữ liệu mặc định
  const getInitialUserInfo = () => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      return JSON.parse(savedUserInfo);
    }
    return {
      name: "Hoàng Giang",
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

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth) {
        try {
          setLoading(true);
          const response = await UserService.getCurrentUser();
          console.log("API Response:", response.data); // Debug log

          if (response.data) {
            const userData = response.data.metadata || response.data;
            console.log("User Data:", userData); // Debug log

            const formattedUserInfo = {
              name:
                userData.name ||
                userData.fullName ||
                userData.username ||
                "N/A",
              birthDate: userData.birthDate
                ? typeof userData.birthDate === "string"
                  ? userData.birthDate
                  : new Date(userData.birthDate).toLocaleDateString("vi-VN")
                : "N/A",
              phone: userData.phone || userData.phoneNumber || "N/A",
              email: userData.email || "N/A",
              address: userData.address || userData.location || "N/A",
              joinDate: userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString("vi-VN")
                : userData.joinDate || "N/A",
            };

            console.log("Formatted User Info:", formattedUserInfo); // Debug log
            setUserInfo(formattedUserInfo);
            setOriginalUserInfo(formattedUserInfo);
            // Save to localStorage for offline access
            localStorage.setItem("userInfo", JSON.stringify(formattedUserInfo));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          console.log("Error details:", error.response?.data); // Debug log
          // Fallback to localStorage data if API fails
          setUserInfo(getInitialUserInfo());
          setOriginalUserInfo(getInitialUserInfo());
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const toggleEditable = () => {
    console.log("toggleEditable called, current isEditing:", isEditing); // Debug log
    if (!isEditing) {
      // Khi bắt đầu edit, lưu lại thông tin gốc
      setOriginalUserInfo({ ...userInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Gọi API để cập nhật thông tin user
      const updateData = {
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        // Convert birthDate back to proper format if needed
        birthDate: userInfo.birthDate !== "N/A" ? userInfo.birthDate : null,
      };

      console.log("Sending update data:", updateData); // Debug log
      const response = await UserService.updateUserProfile(updateData);
      console.log("Update response:", response.data); // Debug log

      // Lưu thông tin vào localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log("Đã cập nhật thông tin thành công:", userInfo);

      // Cập nhật originalUserInfo với dữ liệu mới
      setOriginalUserInfo({ ...userInfo });

      // Thoát khỏi chế độ chỉnh sửa
      setIsEditing(false);

      // Show success message
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      console.log("Error details:", error.response?.data); // Debug log
      alert("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
    }
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
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerRefreshToken");
    localStorage.removeItem("customerSessionToken");
    console.log("Đã xóa thông tin user và token khỏi localStorage");

    window.location.href = "/";
  };

  // Kiểm tra auth, nếu không đăng nhập thì hiển thị 404
  if (auth === false) {
    return <NotFound />;
  }

  // Nếu auth vẫn đang loading (null), có thể hiển thị loading hoặc chờ
  if (auth === null || loading) {
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
