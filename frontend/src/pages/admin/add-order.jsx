import { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Card,
    Row,
    Col,
    Select,
    InputNumber,
    Table,
    Space,
    Divider,
    Typography,
    Alert,
    Tag,
    Descriptions,
    Modal,
    message
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    UserOutlined,
    CalendarOutlined,
    DollarOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddOrder = () => {
    const [form] = Form.useForm();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [orderSummary, setOrderSummary] = useState({
        subtotal: 0,
        discount: 0,
        total: 0
    });

    // Mock data - in real app, this would come from API
    const mockEvents = [
        {
            id: 1,
            name: 'Lễ hội âm nhạc mùa hè 2025',
            date: '2025-08-15',
            venue: 'Sân vận động Mỹ Đình',
            status: 'active'
        },
        {
            id: 2,
            name: 'Hội thảo công nghệ AI',
            date: '2025-07-30',
            venue: 'Trung tâm hội nghị quốc gia',
            status: 'active'
        }
    ];

    const mockTicketTypes = [
        {
            id: 1,
            eventId: 1,
            name: 'VIP',
            price: 2000000,
            available: 50,
            description: 'Vé VIP với dịch vụ cao cấp'
        },
        {
            id: 2,
            eventId: 1,
            name: 'Regular',
            price: 500000,
            available: 200,
            description: 'Vé thường'
        },
        {
            id: 3,
            eventId: 2,
            name: 'Standard',
            price: 300000,
            available: 100,
            description: 'Vé tham dự hội thảo'
        }
    ];

    const mockCustomers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0123456789',
            address: 'Hà Nội'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0987654321',
            address: 'TP.HCM'
        }
    ];

    const handleEventChange = (eventId) => {
        const event = mockEvents.find(e => e.id === eventId);
        setSelectedEvent(event);
        setSelectedTickets([]);
        calculateOrderSummary([]);
    };

    const handleAddTicket = (values) => {
        const ticketType = mockTicketTypes.find(t => t.id === values.ticketTypeId);
        if (!ticketType) return;

        const newTicket = {
            id: Date.now(),
            ticketTypeId: values.ticketTypeId,
            ticketTypeName: ticketType.name,
            price: ticketType.price,
            quantity: values.quantity,
            subtotal: ticketType.price * values.quantity
        };

        const updatedTickets = [...selectedTickets, newTicket];
        setSelectedTickets(updatedTickets);
        calculateOrderSummary(updatedTickets);

        // Reset ticket selection form
        form.setFieldsValue({
            ticketTypeId: undefined,
            quantity: 1
        });
    };

    const handleRemoveTicket = (ticketId) => {
        const updatedTickets = selectedTickets.filter(t => t.id !== ticketId);
        setSelectedTickets(updatedTickets);
        calculateOrderSummary(updatedTickets);
    };

    const calculateOrderSummary = (tickets) => {
        const subtotal = tickets.reduce((sum, ticket) => sum + ticket.subtotal, 0);
        const discount = 0; // Can implement discount logic later
        const total = subtotal - discount;

        setOrderSummary({ subtotal, discount, total });
    };

    const handleCustomerSelect = (customerId) => {
        const customer = mockCustomers.find(c => c.id === customerId);
        setCustomerInfo(customer);
    };

    const handleSubmitOrder = () => {
        if (!selectedEvent) {
            message.error('Vui lòng chọn sự kiện');
            return;
        }
        if (!customerInfo) {
            message.error('Vui lòng chọn khách hàng');
            return;
        }
        if (selectedTickets.length === 0) {
            message.error('Vui lòng thêm ít nhất một vé');
            return;
        }

        Modal.confirm({
            title: 'Xác nhận tạo đơn hàng',
            content: `Tổng tiền: ${orderSummary.total.toLocaleString('vi-VN')} VNĐ`,
            onOk() {
                message.success('Đơn hàng đã được tạo thành công!');
                // Reset form
                setSelectedEvent(null);
                setSelectedTickets([]);
                setCustomerInfo(null);
                setOrderSummary({ subtotal: 0, discount: 0, total: 0 });
                form.resetFields();
            }
        });
    };

    const availableTicketTypes = selectedEvent
        ? mockTicketTypes.filter(t => t.eventId === selectedEvent.id)
        : [];

    const ticketColumns = [
        {
            title: 'Loại vé',
            dataIndex: 'ticketTypeName',
            key: 'ticketTypeName',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (subtotal) => `${subtotal.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveTicket(record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>
                <ShoppingCartOutlined /> Tạo đơn hàng mới
            </Title>

            <Row gutter={[24, 24]}>
                {/* Left Column - Order Form */}
                <Col xs={24} lg={16}>
                    {/* Event Selection */}
                    <Card
                        title={<><CalendarOutlined /> Chọn sự kiện</>}
                        style={{ marginBottom: 24 }}
                    >
                        <Select
                            placeholder="Tìm kiếm và chọn sự kiện"
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="children"
                            onChange={handleEventChange}
                            suffixIcon={<SearchOutlined />}
                        >
                            {mockEvents.map(event => (
                                <Option key={event.id} value={event.id}>
                                    <div>
                                        <div>{event.name}</div>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            {event.date} - {event.venue}
                                        </Text>
                                    </div>
                                </Option>
                            ))}
                        </Select>

                        {selectedEvent && (
                            <Alert
                                message={`Đã chọn: ${selectedEvent.name}`}
                                description={`${selectedEvent.date} tại ${selectedEvent.venue}`}
                                type="success"
                                showIcon
                                style={{ marginTop: 16 }}
                            />
                        )}
                    </Card>

                    {/* Customer Selection */}
                    <Card
                        title={<><UserOutlined /> Thông tin khách hàng</>}
                        style={{ marginBottom: 24 }}
                    >
                        <Select
                            placeholder="Tìm kiếm khách hàng"
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="children"
                            onChange={handleCustomerSelect}
                            suffixIcon={<SearchOutlined />}
                        >
                            {mockCustomers.map(customer => (
                                <Option key={customer.id} value={customer.id}>
                                    <div>
                                        <div>{customer.name}</div>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            {customer.email} - {customer.phone}
                                        </Text>
                                    </div>
                                </Option>
                            ))}
                        </Select>

                        {customerInfo && (
                            <Descriptions
                                bordered
                                size="small"
                                style={{ marginTop: 16 }}
                                column={1}
                            >
                                <Descriptions.Item label="Họ tên">{customerInfo.name}</Descriptions.Item>
                                <Descriptions.Item label="Email">{customerInfo.email}</Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">{customerInfo.phone}</Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">{customerInfo.address}</Descriptions.Item>
                            </Descriptions>
                        )}
                    </Card>

                    {/* Ticket Selection */}
                    <Card
                        title="Chọn vé"
                        style={{ marginBottom: 24 }}
                    >
                        {selectedEvent ? (
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleAddTicket}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="ticketTypeId"
                                            label="Loại vé"
                                            rules={[{ required: true, message: 'Vui lòng chọn loại vé' }]}
                                        >
                                            <Select placeholder="Chọn loại vé">
                                                {availableTicketTypes.map(ticket => (
                                                    <Option key={ticket.id} value={ticket.id}>
                                                        <div>
                                                            <div>{ticket.name} - {ticket.price.toLocaleString('vi-VN')} VNĐ</div>
                                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                                Còn lại: {ticket.available} vé
                                                            </Text>
                                                        </div>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="quantity"
                                            label="Số lượng"
                                            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                            initialValue={1}
                                        >
                                            <InputNumber min={1} max={10} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item label=" ">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon={<PlusOutlined />}
                                                style={{ width: '100%' }}
                                            >
                                                Thêm
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        ) : (
                            <Alert
                                message="Vui lòng chọn sự kiện trước"
                                type="warning"
                                showIcon
                            />
                        )}
                    </Card>

                    {/* Selected Tickets Table */}
                    {selectedTickets.length > 0 && (
                        <Card title="Danh sách vé đã chọn">
                            <Table
                                dataSource={selectedTickets}
                                columns={ticketColumns}
                                rowKey="id"
                                pagination={false}
                                size="small"
                            />
                        </Card>
                    )}
                </Col>

                {/* Right Column - Order Summary */}
                <Col xs={24} lg={8}>
                    <Card
                        title={<><DollarOutlined /> Tổng kết đơn hàng</>}
                        style={{ position: 'sticky', top: 24 }}
                    >
                        <div style={{ marginBottom: 16 }}>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Text>Tạm tính:</Text>
                                <Text>{orderSummary.subtotal.toLocaleString('vi-VN')} VNĐ</Text>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Text>Giảm giá:</Text>
                                <Text>{orderSummary.discount.toLocaleString('vi-VN')} VNĐ</Text>
                            </Row>
                            <Divider style={{ margin: '12px 0' }} />
                            <Row justify="space-between" style={{ marginBottom: 16 }}>
                                <Title level={4} style={{ margin: 0 }}>Tổng cộng:</Title>
                                <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
                                    {orderSummary.total.toLocaleString('vi-VN')} VNĐ
                                </Title>
                            </Row>
                        </div>

                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={handleSubmitOrder}
                                disabled={selectedTickets.length === 0}
                            >
                                Tạo đơn hàng
                            </Button>
                            <Button
                                size="large"
                                block
                                onClick={() => {
                                    setSelectedEvent(null);
                                    setSelectedTickets([]);
                                    setCustomerInfo(null);
                                    setOrderSummary({ subtotal: 0, discount: 0, total: 0 });
                                    form.resetFields();
                                }}
                            >
                                Làm mới
                            </Button>
                        </Space>

                        {/* Order Info Summary */}
                        {(selectedEvent || customerInfo || selectedTickets.length > 0) && (
                            <>
                                <Divider />
                                <div>
                                    <Title level={5}>Thông tin đơn hàng:</Title>
                                    {selectedEvent && (
                                        <Tag color="blue" style={{ marginBottom: 8 }}>
                                            Sự kiện: {selectedEvent.name}
                                        </Tag>
                                    )}
                                    {customerInfo && (
                                        <Tag color="green" style={{ marginBottom: 8 }}>
                                            KH: {customerInfo.name}
                                        </Tag>
                                    )}
                                    {selectedTickets.length > 0 && (
                                        <Tag color="orange" style={{ marginBottom: 8 }}>
                                            {selectedTickets.length} loại vé
                                        </Tag>
                                    )}
                                </div>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddOrder;
