import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

import AdminEventService from '../../services/adminEvents';

const TicketList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await AdminEventService.getAll();
            setData(response.body);
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            render: (categories) =>
                Array.isArray(categories)
                    ? categories.map((cat) => <Tag key={cat}>{cat}</Tag>)
                    : <Tag>{categories}</Tag>,
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
                    <Link to={`/admin/view-ticket/${record.id}`}>
                        <Button type="primary" icon={<EyeOutlined />} size="small">
                            Xem
                        </Button>
                    </Link>
                    <Link to={`/admin/edit-ticket/${record.id}`}>
                        <Button type="default" icon={<EditOutlined />} size="small">
                            Sửa
                        </Button>
                    </Link>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small">
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];



    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý sự kiện</h1>
                <div className="admin-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        <Link to="/admin/add-ticket">Thêm sự kiện</Link>
                    </Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
            </div>
            <p style={{ textAlign: 'right', marginTop: '16px' }}>Tổng cộng: {data.length} sự kiện</p>
        </div>
    );
};

export default TicketList;
