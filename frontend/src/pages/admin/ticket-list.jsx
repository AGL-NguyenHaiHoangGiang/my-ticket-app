import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const TicketList = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Sự kiện',
            dataIndex: 'eventName',
            key: 'eventName',
        },
        {
            title: 'Giá vé',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <span>
                    {record.minPrice} - {record.maxPrice} VND
                </span>
            ),
        },
        {
            title: 'Số lượng vé',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150,
            render: (_, record) => `${record.quantity} vé`,
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
            eventName: 'Concert Jazz Night',
            minPrice: 50,
            maxPrice: 100,
            quantity: 200,
            status: 'active',
        },
        {
            key: '2',
            id: 2,
            eventName: 'Tech Conference 2025',
            minPrice: 120,
            maxPrice: 150,
            quantity: 150,
            status: 'active',
        },
        {
            key: '3',
            id: 3,
            eventName: 'Art Exhibition',
            minPrice: 25,
            maxPrice: 50,
            quantity: 100,
            status: 'inactive',
        },
    ];

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý sự kiện</h1>
                <div className="admin-actions">
                    <Button type="primary">Thêm sự kiện</Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default TicketList;
