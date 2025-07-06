import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../../assets/style/admin.css';

const { Option } = Select;

const TicketCategories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([
    {
      key: '1',
      id: 1,
      name: 'Âm nhạc',
      description: 'Các sự kiện ca nhạc, hòa nhạc và biểu diễn trực tiếp',
      status: 'active',
      ticketCount: 15,
      createdAt: '2025-01-01',
    },
    {
      key: '2',
      id: 2,
      name: 'Hội nghị',
      description: 'Hội nghị kinh doanh và công nghệ',
      status: 'active',
      ticketCount: 8,
      createdAt: '2025-01-15',
    },
    {
      key: '3',
      id: 3,
      name: 'Thể thao',
      description: 'Các sự kiện thể thao và thi đấu',
      status: 'inactive',
      ticketCount: 3,
      createdAt: '2025-02-01',
    },
    {
      key: '4',
      id: 4,
      name: 'Triển lãm',
      description: 'Triển lãm nghệ thuật và văn hóa',
      status: 'active',
      ticketCount: 12,
      createdAt: '2025-02-10',
    },
    {
      key: '5',
      id: 5,
      name: 'Workshop',
      description: 'Hội thảo giáo dục và đào tạo',
      status: 'active',
      ticketCount: 6,
      createdAt: '2025-02-15',
    },
  ]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Sự kiện',
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      width: 150,
      render: (count) => (
        <Tag color="blue">{count} sự kiện</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="default" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      content: 'Hành động này không thể hoàn tác.',
      onOk() {
        setCategories(categories.filter(cat => cat.id !== id));
        message.success('Xóa danh mục thành công');
      },
    });
  };

  const handleSubmit = (values) => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...values }
          : cat
      ));
      message.success('Cập nhật danh mục thành công');
    } else {
      // Add new category
      const newCategory = {
        key: String(categories.length + 1),
        id: categories.length + 1,
        ...values,
        ticketCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCategory]);
      message.success('Thêm danh mục thành công');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => 
      `${range[0]}-${range[1]} của ${total} danh mục`,
  };

  return (
    <div className="admin-container">
      <div className="admin-header-section">
        <h1 className="admin-page-title">Danh mục vé</h1>
        <div className="admin-actions">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm danh mục mới
          </Button>
        </div>
      </div>
      
      <div className="admin-table-container">
        <Table 
          columns={columns} 
          dataSource={categories}
          pagination={paginationConfig}
        />
      </div>

      <Modal
        title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Nhập mô tả danh mục" 
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingCategory ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TicketCategories;
