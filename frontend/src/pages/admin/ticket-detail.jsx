import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminEventService from '../../services/adminEvents';
import { Form, Input, Button, Select, DatePicker, InputNumber, Upload, Card, message, Row, Col, Table, Space, Modal, Spin } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, FileImageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const TicketDetail = ({ mode = 'add' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // State 
    const [fileList, setFileList] = useState([]);
    const [logoFileList, setLogoFileList] = useState([]);
    const [ticketTiers, setTicketTiers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTier, setEditingTier] = useState(null);
    const [tierForm] = Form.useForm();

    // Mode (xem, sửa, thêm mới)
    const isEditing = mode === 'edit' && id;
    const isViewing = mode === 'view' && id;
    const isAdding = mode === 'add' || !id;

    // Categories data
    const categories = [
        { id: 1, name: 'Live Concert', key: 'music' },
        { id: 2, name: 'Sân khấu nghệ thuật', key: 'theatersandart' },
        { id: 3, name: 'Thể thao', key: 'sport' },
        { id: 4, name: 'Khác', key: 'others' },
    ];

    // Fetch event detail 
    const fetchEventDetail = async () => {
        if (!id) return;

        try {
            const response = await AdminEventService.getById(id);
            const eventData = response.body;


            // console.log('Event data:', eventData);

            // Map API data to form fields
            const formData = {
                eventName: eventData.title || '',
                url: eventData.url || '',
                category: eventData.categoriesV2?.[0] || '',
                address: eventData.address || '',
                location: eventData.location || '',
                venueName: eventData.venue || '',
                organizer: eventData.orgName || '',
                organizerDescription: eventData.orgDescription || '',
                description: eventData.description || '',
                dateRange: eventData.startTime && eventData.endTime ? [
                    dayjs(eventData.startTime),
                    dayjs(eventData.endTime),
                ] : null,
            };

            // Set form values
            form.setFieldsValue(formData);

            // Set banner image
            if (eventData.bannerURL) {
                setFileList([{
                    uid: '-1',
                    name: 'banner.jpg',
                    status: 'done',
                    url: eventData.bannerURL,
                    thumbUrl: eventData.bannerURL,
                }]);
            }

            // Set logo tổ chức image
            if (eventData.orgLogoURL) {
                setLogoFileList([{
                    uid: '-2',
                    name: 'logo.jpg',
                    status: 'done',
                    url: eventData.orgLogoURL,
                    thumbUrl: eventData.orgLogoURL,
                }]);
            }

            // Set ticket tiers if available
            if (eventData.showings?.[0]?.ticketTypes) {
                const mappedTiers = eventData.showings[0].ticketTypes.map((ticket, index) => ({
                    id: ticket.id || index + 1,
                    tierName: ticket.name,
                    price: ticket.price,
                    quantity: ticket.quantity || 0,
                    description: ticket.description || '',
                    benefits: ticket.benefits || '',
                }));
                setTicketTiers(mappedTiers);
            }

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchEventDetail();
    }, [id]);

    // Form submit handler
    const handleSubmit = async (values) => {
        try {
            // Validate hạng vé
            if (ticketTiers.length === 0) {
                alert('Vui lòng thêm ít nhất một hạng vé!');
                return;
            }

            // form data
            const formData = {
                title: values.eventName,
                url: values.url || values.eventName.toLowerCase().replace(/\s+/g, '-'),
                description: values.description,
                address: values.address,
                location: values.location,
                venue: values.venueName,
                orgName: values.organizer,
                orgDescription: values.organizerDescription,
                orgLogoURL: logoFileList[0]?.url || logoFileList[0]?.response?.url || logoFileList[0]?.thumbUrl || '',
                categoriesV2: [values.category],
                startTime: values.dateRange?.[0]?.toISOString(),
                endTime: values.dateRange?.[1]?.toISOString(),
                bannerURL: fileList[0]?.url || fileList[0]?.response?.url || fileList[0]?.thumbUrl || '',
                showings: [{
                    ticketTypes: ticketTiers.map(tier => ({
                        name: tier.tierName,
                        price: tier.price,
                        quantity: tier.quantity,
                        description: tier.description,
                        benefits: tier.benefits,
                    }))
                }]
            };

            // console.log('Form data:', formData);

            let response;
            if (isEditing) {
                response = await AdminEventService.updateEvent(id, formData);
                alert('Cập nhật sự kiện thành công!');
            } else {
                response = await AdminEventService.addEvent(formData);
                alert('Tạo sự kiện thành công!');
            }

            // console.log('API Response:', response);

            if (isAdding) {
                setTimeout(() => {
                    navigate('/admin/ticket-list');
                }, 1000);
            }

        } catch (error) {
            console.log('Submit error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
    };

    // File upload handlers
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleLogoUploadChange = ({ fileList: newFileList }) => {
        setLogoFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên Banner</div>
        </div>
    );

    const logoUploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên Logo</div>
        </div>
    );

    // Quan lý các hạng vé
    const handleAddTier = () => {
        setEditingTier(null);
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
            // Chỉnh sửa hạng vé hiện tại
            setTicketTiers(prev => prev.map(tier =>
                tier.id === editingTier.id ? { ...values, id: editingTier.id } : tier
            ));
            message.success('Đã cập nhật hạng vé!');
        } else {
            // Thêm hạng vé mới
            const newTier = {
                ...values,
                id: Date.now()
            };
            setTicketTiers(prev => [...prev, newTier]);
            message.success('Đã thêm hạng vé!');
        }
        setIsModalVisible(false);
        tierForm.resetFields();
    };

    // Config Column cho bảng hạng vé
    const tierColumns = [
        {
            title: 'Tên hạng vé',
            dataIndex: 'tierName',
            key: 'tierName',
            width: 150,
        },
        {
            title: 'Giá vé (VND)',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price) => `${price?.toLocaleString()} VND`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (quantity) => `${quantity} vé`,
        },
        {
            title: 'Quyền lợi',
            dataIndex: 'benefits',
            key: 'benefits',
            width: 150,
            render: (text) => text?.length > 30 ? `${text.substring(0, 30)}...` : text || 'Không có',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text?.length > 40 ? `${text.substring(0, 40)}...` : text || 'Không có',
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 120,
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
                            onClick={() => navigate(`/admin/edit-ticket/${id}`)}
                            style={{ marginRight: 8 }}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin/ticket-list')}
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
                        {/* Tên sự kiện */}
                        <Row gutter={24}>
                            <Col xs={24} md={24}>
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

                            {/* //slug */}
                            <Col xs={24} md={24}>
                                <Form.Item
                                    name="url"
                                    label="url"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        placeholder="Nhập url cho sự kiện"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Thời gian tổ chức */}
                        <Row gutter={24}>
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

                        {/* Địa điểm */}
                        <Row gutter={24}>
                            <Col xs={24} md={24}>
                                <Form.Item
                                    name="address"
                                    label="Tên đường, số nhà, phường/xã"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input
                                        placeholder="Nhập địa chỉ nơi diễn ra sự kiện"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="location"
                                    label="Thành phố"
                                    rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
                                >
                                    <Input
                                        placeholder="Nhập thành phố nơi diễn ra sự kiện"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="venueName"
                                    label="Tên địa điểm cụ thể"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        placeholder="Ví dụ: Sân vận động Mỹ Đình, Nhà hát lớn Hà Nội..."
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Banner sự kiện */}
                        <Form.Item
                            label="Banner sự kiện"
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                maxCount={1}
                                accept="image/*"
                                showUploadList={{
                                    showPreviewIcon: true,
                                    showDownloadIcon: false,
                                    showRemoveIcon: !isViewing,
                                }}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>

                        {/* Mô tả chi tiết */}
                        <Form.Item
                            name="description"
                            label="Mô tả sự kiện"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mô tả sự kiện!' },
                                { min: 20, message: 'Mô tả phải có ít nhất 20 ký tự!' }
                            ]}
                        >
                            <TextArea
                                rows={8}
                                placeholder="Nhập mô tả chi tiết về sự kiện"
                                showCount
                                maxLength={2000}
                            />
                        </Form.Item>



                        {/* Quản lý hạng vé */}
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Quản lý hạng vé">
                                    <Card
                                        title={`Hạng vé (${ticketTiers.length} loại)`}
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
                                                scroll={{ x: 800 }}
                                            />
                                        ) : (
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '40px 0',
                                                color: '#999'
                                            }}>
                                                <p>Chưa có hạng vé nào. Nhấn "Thêm hạng vé" để bắt đầu.</p>
                                            </div>
                                        )}
                                    </Card>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Ban tổ chức */}
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
                        </Row>

                        {/* Logo Đơn vị tổ chức */}
                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Logo ban tổ chức"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={logoFileList}
                                        onChange={handleLogoUploadChange}
                                        maxCount={1}
                                        accept="image/*"
                                        showUploadList={{
                                            showPreviewIcon: true,
                                            showDownloadIcon: false,
                                            showRemoveIcon: !isViewing,
                                        }}
                                    >
                                        {logoFileList.length >= 1 ? null : logoUploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Form Button */}
                        <Form.Item>
                            <div className="admin-form-actions">
                                {!isViewing && (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                    >
                                        {
                                            isEditing ? 'Cập nhật sự kiện' : 'Tạo sự kiện'
                                        }
                                    </Button>
                                )}
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

            {/* Modal các hạng vé */}
            <Modal
                title={editingTier ? 'Sửa hạng vé' : 'Thêm hạng vé mới'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    tierForm.resetFields();
                }}
                footer={null}
                width={700}
                destroyOnHidden
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
                                    min={0}
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

export default TicketDetail;
