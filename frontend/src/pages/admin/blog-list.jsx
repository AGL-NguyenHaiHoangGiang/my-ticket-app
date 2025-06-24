import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const BlogList = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            width: 200
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: 250,
            render: (category) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => (
                <Tag color={status === 'published' ? 'green' : 'orange'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
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
            id: 1,
            title: 'How to organize perfect events',
            author: 'John Doe',
            category: 'Event Tips',
            status: 'published',
            date: '2025-06-20',
        },
        {
            key: '2',
            id: 2,
            title: 'Top 10 venues in the city',
            author: 'Jane Smith',
            category: 'Venues',
            status: 'draft',
            date: '2025-06-18',
        },
    ];

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý blog</h1>
                <div className="admin-actions">
                    <Button type="primary">Thêm bài viết</Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default BlogList;
