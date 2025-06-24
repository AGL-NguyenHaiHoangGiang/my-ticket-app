import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const OrderList = () => {
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 120,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Sự kiện',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150,
            render: (quantity) => `${quantity} vé`,
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `${total} VND`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => {
                let color = 'red';
                if (status === 'completed') color = 'green';
                else if (status === 'pending') color = 'orange';
                else if (status === 'cancel') color = 'volcano';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
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
            orderId: 'ORD001',
            customer: 'Hoàng Giang',
            event: 'Concert Jazz Night',
            quantity: 2,
            total: 100,
            status: 'completed',
            date: '2025-06-15',
        },
        {
            key: '2',
            orderId: 'ORD002',
            customer: 'Phong Vũ',
            event: 'Tech Conference 2025',
            quantity: 1,
            total: 120,
            status: 'pending',
            date: '2025-06-20',
        },
        {
            key: '3',
            orderId: 'ORD003',
            customer: 'Vân Anh',
            event: 'Art Expo 2025',
            quantity: 3,
            total: 150,
            status: 'cancel',
            date: '2025-06-22',
        },
        {
            key: '4',
            orderId: 'ORD004',
            customer: 'Minh Tuấn',
            event: 'Music Festival',
            quantity: 4,
            total: 200,
            status: 'completed',
            date: '2025-06-25',
        },
        {
            key: '5',
            orderId: 'ORD005',
            customer: 'Thu Hằng',
            event: 'Book Fair',
            quantity: 2,
            total: 80,
            status: 'pending',
            date: '2025-06-28',
        },
        {
            key: '6',
            orderId: 'ORD006',
            customer: 'Quốc Bảo',
            event: 'Startup Meetup',
            quantity: 1,
            total: 60,
            status: 'cancel',
            date: '2025-07-01',
        },
        {
            key: '7',
            orderId: 'ORD007',
            customer: 'Lan Phương',
            event: 'Fashion Show',
            quantity: 2,
            total: 180,
            status: 'completed',
            date: '2025-07-03',
        },
        {
            key: '8',
            orderId: 'ORD008',
            customer: 'Đức Anh',
            event: 'Film Premiere',
            quantity: 1,
            total: 90,
            status: 'pending',
            date: '2025-07-05',
        },
        {
            key: '9',
            orderId: 'ORD009',
            customer: 'Hải Yến',
            event: 'Food Festival',
            quantity: 5,
            total: 250,
            status: 'completed',
            date: '2025-07-07',
        },
        {
            key: '10',
            orderId: 'ORD010',
            customer: 'Trung Kiên',
            event: 'Charity Gala',
            quantity: 2,
            total: 140,
            status: 'cancel',
            date: '2025-07-10',
        },
        {
            key: '11',
            orderId: 'ORD011',
            customer: 'Bích Ngọc',
            event: 'Startup Pitch',
            quantity: 1,
            total: 70,
            status: 'pending',
            date: '2025-07-12',
        },
        {
            key: '12',
            orderId: 'ORD012',
            customer: 'Thanh Sơn',
            event: 'Comedy Night',
            quantity: 3,
            total: 120,
            status: 'completed',
            date: '2025-07-14',
        },
        {
            key: '13',
            orderId: 'ORD013',
            customer: 'Kim Oanh',
            event: 'Science Expo',
            quantity: 2,
            total: 110,
            status: 'pending',
            date: '2025-07-16',
        },
        {
            key: '14',
            orderId: 'ORD014',
            customer: 'Ngọc Huyền',
            event: 'Dance Show',
            quantity: 4,
            total: 160,
            status: 'cancel',
            date: '2025-07-18',
        },
        {
            key: '15',
            orderId: 'ORD015',
            customer: 'Vũ Hoàng',
            event: 'Magic Show',
            quantity: 1,
            total: 50,
            status: 'completed',
            date: '2025-07-20',
        },
    ];

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">Quản lý đơn hàng</h1>
                <div className="admin-actions">
                    <Button type="primary">Thêm đơn hàng</Button>
                </div>
            </div>
            <div className="admin-table-container">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
            </div>
        </div>
    );
};

export default OrderList;
