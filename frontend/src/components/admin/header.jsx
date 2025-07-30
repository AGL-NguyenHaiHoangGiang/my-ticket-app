import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar, Space } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/common/logo.svg";
import Auth from "../../services/adminAuth";
const { Header } = Layout;

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      logout();
    } else if (e.key === "account") {
      // Account functionality
    } else if (e.key === "settings") {
      // Settings functionality
    }
  };

  const logout = () => {
    Auth.logout(localStorage.getItem("sessionToken"));
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("avatar");
    navigate("/admin/login");
  };

  const userMenuItems = [
    {
      key: "account",
      icon: <UserOutlined />,
      label: "Tài khoản",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const userDropdown = {
    items: userMenuItems,
    onClick: handleMenuClick,
  };

  return (
    <Header className="admin-header">
      <div className="admin-logo">
        <Link to="/" className="admin-logo-link">
          <img src={logo} alt="Admin Logo" />
        </Link>
      </div>
      <div className="admin-header-right">
        <Dropdown menu={userDropdown} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} style={{ color: "white" }}>
            <Space>
              <Avatar
                size="medium"
                icon={
                  localStorage.getItem("avatar") ? (
                    <img src={localStorage.getItem("avatar")} alt="avatar" />
                  ) : (
                    <UserOutlined />
                  )
                }
                style={{ backgroundColor: "#1890ff" }}
              />
              {localStorage.getItem("adminUsername") || "No name"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};
export default AdminHeader;
