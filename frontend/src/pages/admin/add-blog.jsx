import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Card,
  Row,
  Col,
  Breadcrumb,
} from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { createBlog, getBlogCategories } from "../../services/blog";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const AddBlogPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

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

      // Chuyển về trang danh sách blog
      navigate("/admin/blog-list");
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

  const handleGoBack = () => {
    navigate("/admin/blog-list");
  };

  return (
    <div className="admin-container">
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <a onClick={handleGoBack}>Quản lý Blog</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thêm bài viết mới</Breadcrumb.Item>
      </Breadcrumb>

      {/* Header */}
      <div className="admin-header-section">
        <h1 className="admin-page-title">Thêm bài viết mới</h1>
        <div className="admin-actions">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            style={{ marginRight: 8 }}
          >
            Quay lại
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            article_datetime: dayjs(),
          }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input placeholder="Nhập tiêu đề bài viết" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tác giả!" },
                ]}
              >
                <Input placeholder="Nhập tên tác giả" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category_id"
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
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Mô tả ngắn"
                name="short_description"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả ngắn!" },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Nhập mô tả ngắn cho bài viết"
                  maxLength={300}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tóm tắt"
                name="summary"
                rules={[{ required: true, message: "Vui lòng nhập tóm tắt!" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Nhập tóm tắt bài viết"
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
              >
                <TextArea
                  rows={12}
                  placeholder="Nhập nội dung bài viết (mỗi đoạn văn cách nhau bằng 2 dòng trống)"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="URL Thumbnail"
                name="thumpnail"
                rules={[{ type: "url", message: "Vui lòng nhập URL hợp lệ!" }]}
              >
                <Input
                  placeholder="https://example.com/image.jpg"
                  addonBefore="🖼️"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày xuất bản" name="article_datetime">
                <DatePicker
                  showTime
                  placeholder="Chọn ngày xuất bản"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY HH:mm"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Action Buttons */}
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="default"
                onClick={handleGoBack}
                style={{ marginRight: 8 }}
                size="large"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                {loading ? "Đang tạo..." : "Tạo bài viết"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddBlogPage;
