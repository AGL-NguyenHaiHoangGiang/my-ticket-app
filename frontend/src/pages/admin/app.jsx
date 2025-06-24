import { useState } from 'react';
import { EditOutlined, UserOutlined, ShoppingCartOutlined, DashboardOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AdminFooter from '../../components/admin/footer';
import AdminHeader from '../../components/admin/header';

//style
import '../../assets/style/admin.css';

// Import các component
import Dashboard from './dashboard';
import TicketList from './ticket-list';
import TicketCategories from './ticket-categories';
import BlogList from './blog-list';
import BlogCategories from './blog-categories';
import OrderList from './order-list';
import UserList from './user-list';

const { Content, Sider } = Layout;

const items = [
  { 
    key: 'dashboard', 
    icon: <DashboardOutlined />, 
    label: 'Dashboard' 
  },
  {
    key: 'tickets',
    icon: <EditOutlined />,
    label: 'Ticket Management',
    children: [
      {
        key: 'ticket-list',
        label: 'Ticket List',
      },
      {
        key: 'add-ticket',
        label: 'Add Ticket',
      },
      {
        key: 'ticket-categories',
        label: 'Ticket Categories',
      },
      {
        key: 'ticket-status',
        label: 'Ticket Status',
      },
    ],
  },
  {
    key: 'blogs',
    icon: <EditOutlined />,
    label: 'Blog Management',
    children: [
      {
        key: 'blog-list',
        label: 'Blog List',
      },
      {
        key: 'add-blog',
        label: 'Add Blog',
      },
      {
        key: 'blog-categories',
        label: 'Blog Categories',
      }
    ],
  },
  {
    key: 'orders',
    icon: <ShoppingCartOutlined />,
    label: 'Orders',
    children: [
      {
        key: 'order-list',
        label: 'Order List',
      },
      {
        key: 'add-order',
        label: 'Add Order',
      },
      {
        key: 'order-status',
        label: 'Order Status',
      },
      {
        key: 'order-history',
        label: 'Order History',
      },
    ],
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'User Management',
    children: [
      {
        key: 'user-list',
        label: 'User List',
      },
      {
        key: 'add-user',
        label: 'Add User',
      },
      {
        key: 'user-roles',
        label: 'User Roles',
      }
    ],
  },
];

const App = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'ticket-list':
        return <TicketList />;
      case 'ticket-categories':
        return <TicketCategories />;
      case 'blog-list':
        return <BlogList />;
      case 'blog-categories':
        return <BlogCategories />;
      case 'order-list':
        return <OrderList />;
      case 'user-list':
        return <UserList />;
      default:
        return <Dashboard />;
    }
  };

  const getBreadcrumbItems = () => {
    const breadcrumbMap = {
      'dashboard': [{ title: 'Trang chủ' }, { title: 'Dashboard' }],
      'ticket-list': [{ title: 'Trang chủ' }, { title: 'Quản lý vé' }, { title: 'Danh sách vé' }],
      'ticket-categories': [{ title: 'Trang chủ' }, { title: 'Quản lý vé' }, { title: 'Danh mục vé' }],
      'blog-list': [{ title: 'Trang chủ' }, { title: 'Quản lý blog' }, { title: 'Danh sách blog' }],
      'blog-categories': [{ title: 'Trang chủ' }, { title: 'Quản lý blog' }, { title: 'Danh mục blog' }],
      'order-list': [{ title: 'Trang chủ' }, { title: 'Đơn hàng' }, { title: 'Danh sách đơn hàng' }],
      'user-list': [{ title: 'Trang chủ' }, { title: 'Quản lý người dùng' }, { title: 'Danh sách người dùng' }],
    };
    return breadcrumbMap[selectedKey] || [{ title: 'Trang chủ' }, { title: 'Dashboard' }];
  };
  return (
    <Layout className='admin-main'>
      <AdminHeader />
      <Layout>
        <Sider className='admin-sider' width={230}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['dashboard']}
            style={{ height: '100%'}}
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb
            items={getBreadcrumbItems()}
            style={{ margin: '16px 0' }}
          />
          <Content className='admin-content'>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      <AdminFooter />
    </Layout>
  );
};
export default App;