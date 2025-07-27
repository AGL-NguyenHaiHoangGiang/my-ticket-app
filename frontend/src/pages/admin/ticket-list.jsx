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

    // console.log("Fetched data:", data);

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
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoriesV2',
            key: 'categories',
            render: (categories) =>
                Array.isArray(categories)
                    ? categories.map((cat) => <Tag key={cat}>{cat}</Tag>)
                    : <Tag>{categories}</Tag>,
        },
        {
            title: 'Thời gian sự kiện',
            key: 'eventTime',
            render: (_, record) => {
                const start = record.startTime ? new Date(record.startTime).toLocaleString() : '';
                const end = record.endTime ? new Date(record.endTime).toLocaleString() : '';
                return `${start} - ${end}`;
            },
            width: 250,
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: 150,
            render: (_, record) => {
                const now = new Date();
                const start = record.startTime ? new Date(record.startTime) : null;
                const end = record.endTime ? new Date(record.endTime) : null;
                let status = 'CHƯA DIỄN RA';
                let color = 'green';

                if(record.deletedAt) {
                    status = 'ĐÃ XÓA';
                    color = 'red';
                } else if (end && now > end) {
                    status = 'HẾT HẠN';
                    color = 'orange';
                } else if (start && end && now >= start && now <= end) {
                    status = 'ĐANG DIỄN RA';
                    color = 'orange';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_, record) => (
                <Space size="middle">
                    <Link
                        to={`/admin/view-ticket/${record.originalId}`}>
                        <Button type="primary" icon={<EyeOutlined />} size="small">
                            Xem
                        </Button>
                    </Link>
                    <Link to={`/admin/edit-ticket/${record.originalId}`}>
                        <Button type="default" icon={<EditOutlined />} size="small">
                            Sửa
                        </Button>
                    </Link>
                    {record.deletedAt ? (
                        <Button type="primary" danger disabled size="small">
                            Đã xóa
                        </Button>
                    ) : (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.originalId)} size="small">
                            Xóa
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const handleDelete = async (id) => {
        try {
            const response = await AdminEventService.deleteEvent(id);
            alert("Xóa sự kiện thành công");
            fetchData();

        } catch (error) {
            console.log("Error deleting event:", error);
            alert("Xóa sự kiện thất bại");
        }
    }



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
