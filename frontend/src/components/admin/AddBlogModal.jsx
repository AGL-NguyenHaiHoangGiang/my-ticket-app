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

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", slug);
      formData.append("author", values.author);
      formData.append("category_id", values.category_id);
      formData.append("short_description", values.short_description);
      formData.append("summary", values.summary);

      const contentArray = values.content
        .split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph.length > 0);

      formData.append("content", JSON.stringify(contentArray));

      if (values.article_datetime) {
        formData.append(
          "article_datetime",
          values.article_datetime.toISOString()
        );
      } else {
        formData.append("article_datetime", new Date().toISOString());
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("thumpnail", fileList[0].originFileObj);
      }

      const response = await createBlog(formData);

      message.success("Tạo bài viết thành công!");
      form.resetFields();
      setFileList([]);
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

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ có thể upload file hình ảnh!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Hình ảnh phải nhỏ hơn 5MB!");
        return false;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    onRemove: () => {
      setFileList([]);
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
          label="Ảnh thumbnail"
          extra="Chỉ hỗ trợ file hình ảnh, tối đa 5MB"
        >
          <Upload {...uploadProps} maxCount={1}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogModal;
