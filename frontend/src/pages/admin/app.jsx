import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  EditOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import AdminFooter from "../../components/admin/footer";
import AdminHeader from "../../components/admin/header";
import ProtectedRoute from "./ProtectedRoute";

//style
import "../../assets/style/admin.css";

// Import các component
import Dashboard from "./dashboard";
import TicketList from "./ticket-list";
import TicketCategories from "./ticket-categories";
import AddTicket from "./ticket-detail";
import BlogList from "./blog-list";
import BlogCategories from "./blog-categories";
import OrderList from "./order-list";
import AddOrder from "./add-order";
import UserList from "./user-list";

const { Content, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: "tickets",
    icon: <EditOutlined />,
    label: "Ticket Management",
    children: [
      {
        key: "ticket-list",
        label: <Link to="/admin/ticket-list">Danh sách sự kiện</Link>,
      },
      {
        key: "add-ticket",
        label: <Link to="/admin/add-ticket">Thêm sự kiện</Link>,
      },
      // {
      //   key: 'ticket-categories',
      //   label: <Link to="/admin/ticket-categories">Danh mục sự kiện</Link>,
      // }
    ],
  },
  {
    key: "blogs",
    icon: <EditOutlined />,
    label: "Blog Management",
    children: [
      {
        key: "blog-list",
        label: <Link to="/admin/blog-list">Danh sách blog</Link>,
      },
      // {
      //   key: 'add-blog',
      //   label: <Link to="/admin/add-blog">Thêm blog</Link>,
      // },
      {
        key: "blog-categories",
        label: <Link to="/admin/blog-categories">Danh mục blog</Link>,
      },
    ],
  },
  {
    key: "orders",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
    children: [
      {
        key: "order-list",
        label: <Link to="/admin/order-list">Danh sách đơn hàng</Link>,
      },
      {
        key: "add-order",
        label: <Link to="/admin/add-order">Thêm đơn hàng</Link>,
      },
      // {
      //   key: 'order-status',
      //   label: 'Order Status',
      // },
      // {
      //   key: 'order-history',
      //   label: 'Order History',
      // },
    ],
  },
  {
    key: "users",
    icon: <UserOutlined />,
    label: "User Management",
    children: [
      {
        key: "user-list",
        label: <Link to="/admin/user-list">Danh sách người dùng</Link>,
      },
      {
        key: "add-user",
        label: <Link to="/admin/add-user">Thêm User</Link>,
      },
      // {
      //   key: 'user-roles',
      //   label: 'User Roles',
      // }
    ],
  },
];

const App = () => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    if (path.includes("ticket-list"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý vé" },
        { title: "Danh sách sự kiện" },
      ];
    if (path.includes("add-ticket"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý vé" },
        { title: "Thêm sự kiện" },
      ];
    if (path.includes("ticket-categories"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý vé" },
        { title: "Danh mục" },
      ];
    if (path.includes("blog-list"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý blog" },
        { title: "Danh sách blog" },
      ];
    if (path.includes("add-blog"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý blog" },
        // { title: "Thêm blog" },
      ];
    if (path.includes("blog-categories"))
      return [
        { title: "Trang chủ" },
        { title: "Quản lý blog" },
        { title: "Danh mục blog" },
      ];
    if (path.includes("order-list"))
      return [
        { title: "Trang chủ" },
        { title: "Đơn hàng" },
        { title: "Danh sách đơn hàng" },
      ];
    if (path.includes("add-order"))
      return [
        { title: "Trang chủ" },
        { title: "Đơn hàng" },
        { title: "Thêm đơn hàng" },
      ];
    if (path.includes("user-list"))
      return [
        { title: "Trang chủ" },
        { title: "Người dùng" },
        { title: "Danh sách" },
      ];
    return [{ title: "Dashboard" }];
  };

  return (
    <ProtectedRoute>
      <Layout className="admin-main">
        <AdminHeader />
        <Layout>
          <Sider className="admin-sider" width={230}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              defaultOpenKeys={["dashboard"]}
              style={{ height: "100%" }}
              items={items}
            />
          </Sider>
          <Layout style={{ padding: "0 24px" }}>
            <Breadcrumb
              items={getBreadcrumbItems()}
              style={{ margin: "16px 0" }}
            />
            <Content className="admin-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ticket-list" element={<TicketList />} />
                <Route path="/add-ticket" element={<AddTicket mode="add" />} />
                <Route
                  path="/edit-ticket/:id"
                  element={<AddTicket mode="edit" />}
                />
                <Route
                  path="/view-ticket/:id"
                  element={<AddTicket mode="view" />}
                />
                {/* <Route path="/ticket-categories" element={<TicketCategories />} /> */}
                <Route path="/blog-list" element={<BlogList />} />
                <Route path="/blog-categories" element={<BlogCategories />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/add-order" element={<AddOrder />} />
                <Route path="/user-list" element={<UserList />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <AdminFooter />
      </Layout>
    </ProtectedRoute>
  );
};
export default App;
