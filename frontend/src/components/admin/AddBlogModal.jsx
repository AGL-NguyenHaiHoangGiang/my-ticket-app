import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import { createBlog, getBlogCategories } from "../../services/blog";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const AddBlogModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load blog categories khi modal mở
  useEffect(() => {
    if (visible) {
      fetchCategories();
      // Reset form khi modal mở
      form.resetFields();
    }
  }, [visible]);

  const fetchCategories = async () => {
    try {
      const response = await getBlogCategories();
      const categoryData = response.data.metadata || response.data;
      setCategories(categoryData);
    } catch (error) {
      message.error("Không thể tải danh sách danh mục");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const slug = values.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      const blogData = {
        title: values.title,
        slug: slug,
        author: values.author,
        category_id: values.category_id,
        short_description: values.short_description,
        summary: values.summary,
        content: values.content
          .split("\n\n")
          .map((paragraph) => paragraph.trim())
          .filter((paragraph) => paragraph.length > 0),
        thumpnail: values.thumpnail || "",
      };

      if (values.article_datetime) {
        blogData.article_datetime = values.article_datetime.toISOString();
      } else {
        blogData.article_datetime = new Date().toISOString();
      }

      const response = await createBlog(blogData);

      message.success("Tạo bài viết thành công!");
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message || "Có lỗi xảy ra";

        if (status === 401) {
          message.error("Bạn không có quyền tạo bài viết");
        } else if (status === 400) {
          message.error(`Dữ liệu không hợp lệ: ${errorMessage}`);
        } else {
          message.error(`Không thể tạo bài viết: ${errorMessage}`);
        }
      } else {
        message.error("Không thể kết nối đến server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm bài viết mới"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Tạo bài viết"
      cancelText="Hủy"
      confirmLoading={loading}
      width={800}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          article_datetime: dayjs(),
        }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề!" },
            { min: 10, message: "Tiêu đề phải có ít nhất 10 ký tự!" },
          ]}
        >
          <Input placeholder="Nhập tiêu đề bài viết..." />
        </Form.Item>

        <Form.Item
          name="short_description"
          label="Mô tả ngắn"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả ngắn!" },
            { min: 20, message: "Mô tả phải có ít nhất 20 ký tự!" },
          ]}
        >
          <TextArea
            rows={3}
            placeholder="Nhập mô tả ngắn cho bài viết..."
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Tóm tắt"
          rules={[{ required: true, message: "Vui lòng nhập tóm tắt!" }]}
        >
          <TextArea
            rows={4}
            placeholder="Nhập tóm tắt chi tiết..."
            showCount
            maxLength={500}
          />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            name="author"
            label="Tác giả"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Vui lòng nhập tên tác giả!" }]}
          >
            <Input placeholder="Nhập tên tác giả..." />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Danh mục"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="article_datetime"
          label="Ngày đăng"
          rules={[{ required: true, message: "Vui lòng chọn ngày đăng!" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm"
            placeholder="Chọn ngày và giờ đăng"
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung bài viết!" },
            { min: 100, message: "Nội dung phải có ít nhất 100 ký tự!" },
          ]}
        >
          <TextArea
            rows={8}
            placeholder="Nhập nội dung bài viết (mỗi đoạn văn cách nhau bằng 2 dòng trống)"
            showCount
          />
        </Form.Item>

        <Form.Item
          label="URL Thumbnail"
          name="thumpnail"
          rules={[{ type: "url", message: "Vui lòng nhập URL hợp lệ!" }]}
        >
          <Input placeholder="https://example.com/image.jpg" addonBefore="🖼️" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogModal;
