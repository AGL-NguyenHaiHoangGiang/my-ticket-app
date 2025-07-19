import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

import AdminEventService from '../../services/adminEvents';
import { useEffect, useState } from 'react';

const TicketList = ({ onMenuClick }) => {
    // Define the columns for the ticket list table (Ant Design)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Sự kiện',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Danh mục',
            dataIndex: 'categories',
            key: 'categories',
        },
        {
            title: 'Ngày diễn ra',
            dataIndex: 'day',
            key: 'eventDate',
            render: (day) => new Date(day).toLocaleDateString(),
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'day',
            key: 'status',
            width: 150,
            render: (day, record) => {
                const today = new Date();
                const eventDate = new Date(day);
                const isExpired = eventDate < today;
                return (
                    <Tag color={isExpired ? 'red' : 'green'}>
                        {isExpired ? 'HẾT HẠN' : 'HOẠT ĐỘNG'}
                    </Tag>
                );
            },
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

    // Tickets data
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await AdminEventService.getAll();
            setData(response.body);
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý sự kiện</h1>
                <div className="admin-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => onMenuClick && onMenuClick('add-ticket')}
                    >
                        Thêm sự kiện
                    </Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
            <p style={{ textAlign: 'right', marginTop: '16px' }}>Tổng cộng: {data.length} sự kiện</p>
        </div>
    );
};

export default TicketList;
