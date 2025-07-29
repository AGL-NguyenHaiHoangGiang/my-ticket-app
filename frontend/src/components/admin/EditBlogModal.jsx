import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getBlogCategories,
  updateBlogBySlug,
  getBlogBySlug,
} from "../../services/blog";

const { TextArea } = Input;
const { Option } = Select;

const EditBlogModal = ({ visible, onCancel, onSuccess, blogData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (visible && blogData) {
      fetchCategories();
      populateForm();
    }
  }, [visible, blogData]);

  const fetchCategories = async () => {
    try {
      const response = await getBlogCategories();
      const categoryData = response.data.metadata || response.data;
      setCategories(categoryData);
    } catch (error) {
      message.error("Không thể tải danh sách danh mục");
    }
  };

  const populateForm = async () => {
    if (!blogData || !blogData.slug) return;

    try {
      const response = await getBlogBySlug(blogData.slug);
      const fullBlogData = response.data.metadata || response.data;

      form.setFieldsValue({
        title: fullBlogData.title || "",
        author: fullBlogData.author || "",
        category_id:
          typeof fullBlogData.category_id === "object"
            ? fullBlogData.category_id?._id
            : fullBlogData.category_id,
        short_description: fullBlogData.short_description || "",
        summary: fullBlogData.summary || "",
        content: Array.isArray(fullBlogData.content)
          ? fullBlogData.content.join("\n\n")
          : fullBlogData.content || "",
        article_datetime: fullBlogData.article_datetime
          ? new Date(fullBlogData.article_datetime).toISOString().slice(0, 16)
          : "",
      });

      if (fullBlogData.thumpnail) {
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.jpg",
            status: "done",
            url: fullBlogData.thumpnail,
          },
        ]);
      } else {
        setFileList([]);
      }
    } catch (error) {
      message.error("Không thể tải thông tin chi tiết blog");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
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
          new Date(values.article_datetime).toISOString()
        );
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("thumpnail", fileList[0].originFileObj);
      }

      const blogSlug = blogData.slug;
      await updateBlogBySlug(blogSlug, formData);

      message.success("Cập nhật bài viết thành công!");
      form.resetFields();
      setFileList([]);
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
    setFileList([]);
    onCancel();
  };

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ có thể upload file ảnh!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
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
        style={{ maxHeight: "70vh", overflowY: "auto", padding: "0 16px" }}
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
            <Form.Item label="Ảnh thumbnail" name="thumpnail">
              <Upload {...uploadProps} maxCount={1}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
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
