import React from 'react';
import { Table, Button, Space, Tag, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

const UserList = () => {
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 100,
            render: (avatar, record) => (
                <Avatar
                    src={avatar}
                    icon={<UserOutlined />}
                    size="default"
                />
            ),
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            width: 150,
            render: (role) => (
                <Tag color={role === 'admin' ? 'red' : role === 'manager' ? 'blue' : 'green'}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Ngày tham gia',
            dataIndex: 'joinDate',
            key: 'joinDate',
            width: 150,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EyeOutlined />} size="small">
                        Xem
                    </Button>
                    <Button type="default" icon={<EditOutlined />} size="small">
                        Sửa
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small">
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Admin',
            email: 'john@admin.com',
            role: 'admin',
            status: 'active',
            joinDate: '2025-01-15',
            avatar: null,
        },
        {
            key: '2',
            name: 'Jane Manager',
            email: 'jane@manager.com',
            role: 'manager',
            status: 'active',
            joinDate: '2025-02-20',
            avatar: null,
        },
        {
            key: '3',
            name: 'Bob User',
            email: 'bob@user.com',
            role: 'user',
            status: 'active',
            joinDate: '2025-03-10',
            avatar: null,
        },
    ];

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý User</h1>
                <div className="admin-actions">
                    <Button type="primary">Thêm User</Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default UserList;
