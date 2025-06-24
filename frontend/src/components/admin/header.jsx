import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import logo from '../../assets/images/common/logo.svg';
const { Header } = Layout;

const AdminHeader = () => {
    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            // Handle logout logic here
            console.log('Logout clicked');
            // You can add logout logic like clearing tokens, redirecting, etc.
        } else if (e.key === 'account') {
            console.log('Account clicked');
        } else if (e.key === 'settings') {
            console.log('Settings clicked');
        }
    };

    const userMenuItems = [
        {
            key: 'account',
            icon: <UserOutlined />,
            label: 'Tài khoản',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            danger: true,
        },
    ];

    const userDropdown = {
        items: userMenuItems,
        onClick: handleMenuClick,
    };

    return (
        <Header className='admin-header'>
            <div className='admin-logo'>
                <Link to="/" className='admin-logo-link'>
                    <img
                        src={logo}
                        alt="Admin Logo"
                    />
                </Link>
            </div>
            <div className='admin-header-right'>
                <Dropdown menu={userDropdown} trigger={['click']} >
                    <a onClick={(e) => e.preventDefault()} style={{ color: 'white' }}>
                        <Space>
                            <Avatar 
                                size="medium" 
                                icon={<UserOutlined />} 
                                style={{ backgroundColor: '#1890ff' }}
                            />
                            Admin User
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};
export default AdminHeader;