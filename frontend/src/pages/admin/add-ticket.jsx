import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Upload, Card, message, Row, Col, Table, Space, Modal } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, FileImageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AddTicket = ({ onMenuClick, mode = 'add', ticketData = null }) => {
    console.log('AddTicket props:', { mode, ticketData });
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState('');
    const [ticketTiers, setTicketTiers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTier, setEditingTier] = useState(null);
    const [tierForm] = Form.useForm();

    const isEditing = mode === 'edit';
    const isAdding = mode === 'add' || !mode;
    const isViewing = mode === 'view';

    // Load data when in edit mode
    useEffect(() => {
        if ((isEditing || isViewing) && ticketData) {
            // Map API fields to form fields
            const formData = {
                eventName: ticketData.name,
                category: ticketData.categories,
                location: ticketData.location,
                venueName: ticketData.venueName,
                dateRange: ticketData.startDate && ticketData.endDate ? [
                    dayjs(ticketData.startDate),
                    dayjs(ticketData.endDate)
                ] : ticketData.day ? [
                    dayjs(ticketData.day),
                    dayjs(ticketData.day).add(2, 'hours') // Default 2 hour duration
                ] : null,
                organizer: ticketData.organizer,
                organizerDescription: ticketData.organizerDescription,
            };
            
            // Set form fields
            form.setFieldsValue(formData);
            
            // Set description
            setDescription(ticketData.description || '');
            
            // Set ticket tiers if available
            setTicketTiers(ticketData.ticketTiers || []);
            
            // Set file list if available
            if (ticketData.images) {
                setFileList(ticketData.images);
            }
            
            console.log('Loading ticket data:', ticketData);
            console.log('Mapped form data:', formData);
        }
    }, [isEditing, isViewing, ticketData, form]);

    // Mock categories data
    const categories = [
        { id: 1, name: 'Live Concert', key: 'music' },
        { id: 2, name: 'Sân khấu nghệ thuật', key: 'theatersandart' },
        { id: 3, name: 'Thể thao', key: 'sport' },
        { id: 4, name: 'Khác', key: 'others' },
    ];

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Validate ticket tiers
            if (ticketTiers.length === 0) {
                message.error('Vui lòng thêm ít nhất một hạng vé!');
                setLoading(false);
                return;
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const formData = {
                ...values,
                description: description,
                ticketTiers: ticketTiers,
                images: fileList,
                id: isEditing ? ticketData.id : undefined
            };

            console.log('Form values:', formData);

            if (isEditing) {
                message.success('Cập nhật sự kiện thành công!');
            } else {
                message.success('Tạo sự kiện thành công!');
                // Reset form only when adding new
                form.resetFields();
                setFileList([]);
                setDescription('');
                setTicketTiers([]);
            }

            // Navigate back to ticket list after success
            setTimeout(() => {
                onMenuClick && onMenuClick('ticket-list');
            }, 1000);

        } catch (error) {
            console.error('Submit error:', error);
            message.error('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Chỉ có thể upload file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // Ticket Tier Management Functions
    const handleAddTier = () => {
        setEditingTier(null);
        tierForm.resetFields();
        setIsModalVisible(true);
    };

    const handleEditTier = (tier) => {
        setEditingTier(tier);
        tierForm.setFieldsValue(tier);
        setIsModalVisible(true);
    };

    const handleDeleteTier = (tierId) => {
        setTicketTiers(prev => prev.filter(tier => tier.id !== tierId));
        message.success('Đã xóa hạng vé!');
    };

    const handleTierSubmit = (values) => {
        if (editingTier) {
            // Edit existing tier
            setTicketTiers(prev => prev.map(tier =>
                tier.id === editingTier.id ? { ...values, id: editingTier.id } : tier
            ));
            message.success('Đã cập nhật hạng vé!');
        } else {
            // Add new tier
            const newTier = {
                ...values,
                id: Date.now() // Simple ID generation
            };
            setTicketTiers(prev => [...prev, newTier]);
            message.success('Đã thêm hạng vé!');
        }
        setIsModalVisible(false);
        tierForm.resetFields();
    };

    // Custom validation for description
    const validateDescription = () => {
        if (!description || description.trim().length < 20) {
            return Promise.reject(new Error('Mô tả phải có ít nhất 20 ký tự!'));
        }
        return Promise.resolve();
    };

    // Ticket Tiers Table Columns
    const tierColumns = [
        {
            title: 'Tên hạng vé',
            dataIndex: 'tierName',
            key: 'tierName',
        },
        {
            title: 'Giá vé (VND)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price?.toLocaleString()} VND`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => `${quantity} vé`,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text?.length > 50 ? `${text.substring(0, 50)}...` : text,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                !isViewing && (
                    <Space size="small">
                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEditTier(record)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="primary"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteTier(record.id)}
                        >
                            Xóa
                        </Button>
                    </Space>
                )
            ),
        },
    ];

    return (
        <div className="admin-container">
            <div className="admin-header-section">
                <h1 className="admin-page-title">
                    {isViewing ? 'Chi tiết sự kiện' : 
                     isEditing ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}
                </h1>
                <div className="admin-actions">
                    {isViewing && (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => onMenuClick && onMenuClick('edit-ticket', ticketData)}
                            style={{ marginRight: 8 }}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => onMenuClick && onMenuClick('ticket-list')}
                    >
                        Quay lại
                    </Button>
                </div>
            </div>

            <div className="admin-form-container">
                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        scrollToFirstError
                        disabled={isViewing}
                    >
                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="eventName"
                                    label="Tên sự kiện"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên sự kiện!' },
                                        { min: 5, message: 'Tên sự kiện phải có ít nhất 5 ký tự!' }
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập tên sự kiện"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="category"
                                    label="Danh mục"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                >
                                    <Select
                                        placeholder="Chọn danh mục sự kiện"
                                        size="large"
                                    >
                                        {categories.map(cat => (
                                            <Option key={cat.id} value={cat.key}>
                                                {cat.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="images"
                            label="Banner sự kiện"
                            valuePropName="fileList"
                            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={beforeUpload}
                                multiple
                                maxCount={5}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Mô tả sự kiện"
                            rules={[
                                { validator: validateDescription }
                            ]}
                        >
                            <div style={{ marginBottom: 16 }}>
                                <TextArea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={10}
                                    placeholder="Nhập mô tả sự kiện"
                                />
                            </div>
                        </Form.Item>

                        <Row gutter={24}>


                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="location"
                                    label="Địa điểm"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                                >
                                    <Input
                                        placeholder="Nhập địa điểm tổ chức"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="venueName"
                                    label="Tên tòa nhà / sân vận động / địa điểm cụ thể"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        placeholder="Ví dụ: Sân vận động Mỹ Đình, Nhà hát lớn Hà Nội..."
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="dateRange"
                                    label="Thời gian diễn ra"
                                    rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                                >
                                    <RangePicker
                                        showTime
                                        format="DD/MM/YYYY HH:mm"
                                        placeholder={['Bắt đầu', 'Kết thúc']}
                                        size="large"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Hạng vé">
                                    <Card
                                        title="Quản lý hạng vé"
                                        extra={
                                            !isViewing && (
                                                <Button
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                    onClick={handleAddTier}
                                                >
                                                    Thêm hạng vé
                                                </Button>
                                            )
                                        }
                                        style={{ marginBottom: 16 }}
                                    >
                                        {ticketTiers.length > 0 ? (
                                            <Table
                                                columns={tierColumns}
                                                dataSource={ticketTiers}
                                                pagination={false}
                                                rowKey="id"
                                                size="small"
                                            />
                                        ) : (
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '40px 0',
                                                color: '#999'
                                            }}>
                                                <FileImageOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                                                <p>Chưa có hạng vé nào. Nhấn "Thêm hạng vé" để bắt đầu.</p>
                                            </div>
                                        )}
                                    </Card>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="organizer"
                                    label="Ban tổ chức"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên ban tổ chức!' }]}
                                >
                                    <Input
                                        placeholder="Tên ban tổ chức"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="organizerDescription"
                                    label="Mô tả ban tổ chức"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả ban tổ chức!' }]}
                                >
                                    <Input
                                        placeholder="Mô tả ban tổ chức"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="organizerLogo"
                                    label="Logo ban tổ chức"
                                    valuePropName="fileList"
                                    getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleUploadChange}
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>

                            {/* <Col xs={24} md={12}>
                                <Form.Item
                                    name="status"
                                    label="Trạng thái"
                                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                                >
                                    <Select 
                                        placeholder="Chọn trạng thái"
                                        size="large"
                                    >
                                        <Option value="draft">Bản nháp</Option>
                                        <Option value="active">Đang bán</Option>
                                        <Option value="inactive">Tạm dừng</Option>
                                    </Select>
                                </Form.Item>
                            </Col> */}
                        </Row>



                        <Form.Item>
                            <div className="admin-form-actions">
                                <Button
                                    size="large"
                                    onClick={() => onMenuClick && onMenuClick('ticket-list')}
                                >
                                    {isViewing ? 'Quay lại' : 'Hủy'}
                                </Button>
                                {!isViewing && (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        size="large"
                                    >
                                        {loading 
                                            ? (isEditing ? 'Đang cập nhật...' : 'Đang tạo...') 
                                            : (isEditing ? 'Cập nhật sự kiện' : 'Tạo sự kiện')
                                        }
                                    </Button>
                                )}
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

            {/* Modal for adding/editing ticket tiers */}
            <Modal
                title={editingTier ? 'Sửa hạng vé' : 'Thêm hạng vé mới'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    tierForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={tierForm}
                    layout="vertical"
                    onFinish={handleTierSubmit}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="tierName"
                                label="Tên hạng vé"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên hạng vé!' },
                                    { min: 2, message: 'Tên hạng vé phải có ít nhất 2 ký tự!' }
                                ]}
                            >
                                <Input
                                    placeholder="VIP, Standard, Economy..."
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="price"
                                label="Giá vé (VND)"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá vé!' },
                                    { type: 'number', min: 0, message: 'Giá vé phải lớn hơn 0!' }
                                ]}
                            >
                                <InputNumber
                                    placeholder="0"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="quantity"
                                label="Số lượng vé"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập số lượng vé!' },
                                    { type: 'number', min: 1, message: 'Số vé phải lớn hơn 0!' }
                                ]}
                            >
                                <InputNumber
                                    placeholder="100"
                                    min={1}
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="benefits"
                                label="Quyền lợi đặc biệt"
                            >
                                <Input
                                    placeholder="Ưu tiên check-in, đồ uống miễn phí..."
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label="Mô tả hạng vé"
                    >
                        <TextArea
                            rows={3}
                            placeholder="Mô tả chi tiết về hạng vé này..."
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button
                                onClick={() => {
                                    setIsModalVisible(false);
                                    tierForm.resetFields();
                                }}
                            >
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingTier ? 'Cập nhật' : 'Thêm hạng vé'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddTicket;
