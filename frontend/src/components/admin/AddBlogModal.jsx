import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createBlog, getBlogCategories } from "../../services/blog";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const AddBlogModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  // Load blog categories khi modal mở
  useEffect(() => {
    if (visible) {
      fetchCategories();
      // Reset form khi modal mở
      form.resetFields();
      setFileList([]);
      setPreviewImage("");
    }
  }, [visible]);

  const fetchCategories = async () => {
    try {
      const response = await getBlogCategories();
      const categoryData = response.data.metadata || response.data;
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Không thể tải danh sách danh mục");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Tự động tạo slug từ title
      const slug = values.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single
        .trim();

      // Chuẩn bị dữ liệu blog
      const blogData = {
        title: values.title,
        slug: slug,
        short_description: values.short_description,
        summary: values.summary,
        author: values.author,
        category_id: values.category_id,
        content: values.content
          ? values.content.split("\n").filter((line) => line.trim())
          : [],
        article_datetime: values.article_datetime
          ? values.article_datetime.toISOString()
          : new Date().toISOString(),
        thumpnail: values.thumpnail || "", // URL thumbnail
      };

      // Gọi API tạo blog
      const response = await createBlog(blogData);

      message.success("Tạo bài viết thành công!");
      form.resetFields();
      setFileList([]);
      onSuccess(); // Callback để refresh danh sách blog
      onCancel(); // Đóng modal
    } catch (error) {
      console.error("Error creating blog:", error);

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

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ có thể upload file hình ảnh!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Hình ảnh phải nhỏ hơn 2MB!");
        return false;
      }
      return false; // Prevent auto upload
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
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
          name="thumpnail"
          label="URL Hình ảnh đại diện"
          rules={[{ type: "url", message: "Vui lòng nhập URL hợp lệ!" }]}
        >
          <Input placeholder="https://example.com/image.jpg" />
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
            placeholder="Nhập nội dung bài viết... (Mỗi dòng sẽ là một đoạn)"
            showCount
          />
        </Form.Item>

        <Form.Item
          label="Upload Hình ảnh (Tùy chọn)"
          extra="Chỉ hỗ trợ file hình ảnh, tối đa 2MB"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogModal;
