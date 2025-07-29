import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Row, Col } from "antd";
import {
  updateBlog,
  getBlogBySlug,
  getBlogCategories,
} from "../../services/blog";

const { TextArea } = Input;
const { Option } = Select;

const EditBlogModal = ({ visible, onCancel, onSuccess, blogData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (visible && blogData) {
      fetchCategories();
    }
  }, [visible, blogData]);

  useEffect(() => {
    // Chỉ populate form khi đã có categories
    if (visible && blogData && categories.length > 0) {
      populateForm();
    }
  }, [visible, blogData, categories]);

  const fetchCategories = async () => {
    try {
      const response = await getBlogCategories();
      const categoryData = response.data.metadata || response.data;

      if (Array.isArray(categoryData) && categoryData.length > 0) {
        setCategories(categoryData);
      }
    } catch (error) {}
  };

  const populateForm = async () => {
    if (!blogData || !blogData.slug) return;

    try {
      const response = await getBlogBySlug(blogData.slug);
      const fullBlogData = response.data.metadata || response.data;

      // Tìm category ID từ blog data
      let categoryId = null;
      if (
        typeof fullBlogData.category_id === "object" &&
        fullBlogData.category_id
      ) {
        // Nếu category object chỉ có name, tìm category theo name
        if (fullBlogData.category_id.name && !fullBlogData.category_id._id) {
          const categoryName = fullBlogData.category_id.name;
          const foundCategoryByName = categories.find(
            (cat) => cat.name === categoryName
          );
          if (foundCategoryByName) {
            categoryId = foundCategoryByName._id;
          }
        } else {
          categoryId =
            fullBlogData.category_id._id || fullBlogData.category_id.id;
        }
      } else {
        categoryId = fullBlogData.category_id;
      }

      const formValues = {
        title: fullBlogData.title || "",
        author: fullBlogData.author || "",
        category_id: categoryId,
        short_description: fullBlogData.short_description || "",
        summary: fullBlogData.summary || "",
        content: Array.isArray(fullBlogData.content)
          ? fullBlogData.content.join("\n\n")
          : fullBlogData.content || "",
        article_datetime: fullBlogData.article_datetime
          ? new Date(fullBlogData.article_datetime).toISOString().slice(0, 16)
          : "",
        thumpnail: fullBlogData.thumpnail || "",
      };

      form.setFieldsValue(formValues);
    } catch (error) {
      message.error("Không thể tải thông tin chi tiết blog");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const blogUpdateData = {
        title: values.title,
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
        blogUpdateData.article_datetime = new Date(
          values.article_datetime
        ).toISOString();
      }

      const blogId = blogData._id;
      await updateBlog(blogId, blogUpdateData);

      message.success("Cập nhật bài viết thành công!");
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message || "Có lỗi xảy ra";

        if (status === 401) {
          message.error("Bạn không có quyền cập nhật bài viết");
        } else if (status === 400) {
          message.error(`Dữ liệu không hợp lệ: ${errorMessage}`);
        } else if (status === 404) {
          message.error("Không tìm thấy bài viết cần cập nhật");
        } else {
          message.error(`Không thể cập nhật bài viết: ${errorMessage}`);
        }
      } else {
        message.error("Không thể kết nối đến server");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Sửa bài viết"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxHeight: "85vh", overflowY: "auto", padding: "0 16px" }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input placeholder="Nhập tiêu đề bài viết" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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
              <Select
                placeholder="Chọn danh mục"
                loading={categories.length === 0}
                showSearch
                filterOption={(input, option) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Mô tả ngắn"
              name="short_description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn!" }]}
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

        <Row gutter={16}>
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

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <TextArea
                rows={10}
                placeholder="Nhập nội dung bài viết (mỗi đoạn văn cách nhau bằng 2 dòng trống)"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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
              <Input type="datetime-local" placeholder="Chọn ngày xuất bản" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật bài viết
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditBlogModal;
