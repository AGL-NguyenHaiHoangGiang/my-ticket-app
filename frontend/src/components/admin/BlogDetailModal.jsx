import React from "react";
import { Modal, Descriptions, Tag, Image, Typography } from "antd";
import dayjs from "dayjs";

const { Paragraph, Title } = Typography;

const BlogDetailModal = ({ visible, onCancel, blogData }) => {
  if (!blogData) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Không có thông tin";
    try {
      return dayjs(dateString).format("DD/MM/YYYY HH:mm");
    } catch (error) {
      return "Lỗi định dạng ngày";
    }
  };

  const renderContent = (content) => {
    if (!content) {
      return <Paragraph>Không có nội dung</Paragraph>;
    }

    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <Paragraph key={index} style={{ marginBottom: 12 }}>
          {typeof paragraph === "string" ? paragraph : String(paragraph)}
        </Paragraph>
      ));
    }

    return (
      <Paragraph>
        {typeof content === "string" ? content : String(content)}
      </Paragraph>
    );
  };

  return (
    <Modal
      title="Chi tiết Blog"
      open={visible}
      onCancel={onCancel}
      width={900}
      footer={null}
      style={{ top: 20 }}
    >
      <div style={{ maxHeight: "85vh", overflowY: "auto", padding: "0 16px" }}>
        {/* Thumbnail */}
        {blogData.thumpnail && (
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Image
              src={blogData.thumpnail}
              alt={blogData.title}
              style={{ maxWidth: "100%", maxHeight: 300, objectFit: "cover" }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
            />
          </div>
        )}

        {/* Basic Information */}
        <Descriptions
          title="Thông tin cơ bản"
          bordered
          column={1}
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="ID">
            <code>{blogData._id || "N/A"}</code>
          </Descriptions.Item>
          <Descriptions.Item label="Tiêu đề">
            <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
              {blogData.title || "Không có tiêu đề"}
            </Title>
          </Descriptions.Item>
          <Descriptions.Item label="Slug">
            <Tag color="blue">{blogData.slug || "N/A"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            <Tag color="green">{blogData.author || "Không có tác giả"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            <Tag color="orange">
              {typeof blogData.category_id === "object"
                ? blogData.category_id?.name || "Chưa phân loại"
                : blogData.category_id || "Chưa phân loại"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày xuất bản">
            {formatDate(blogData.article_datetime)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {formatDate(blogData.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {formatDate(blogData.updatedAt)}
          </Descriptions.Item>
        </Descriptions>

        {/* Short Description */}
        {blogData.short_description && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Mô tả ngắn:</Title>
            <Paragraph
              style={{
                background: "#f6f8fa",
                padding: 16,
                borderRadius: 6,
                border: "1px solid #e1e4e8",
              }}
            >
              {blogData.short_description}
            </Paragraph>
          </div>
        )}

        {/* Summary */}
        {blogData.summary && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Tóm tắt:</Title>
            <Paragraph
              style={{
                background: "#fff7e6",
                padding: 16,
                borderRadius: 6,
                border: "1px solid #ffd591",
              }}
            >
              {blogData.summary}
            </Paragraph>
          </div>
        )}

        {/* Content */}
        {blogData.content && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Nội dung chi tiết:</Title>
            <div
              style={{
                background: "#f9f9f9",
                padding: 20,
                borderRadius: 8,
                border: "1px solid #d9d9d9",
                lineHeight: 1.6,
              }}
            >
              {renderContent(blogData.content)}
            </div>
          </div>
        )}

        {/* Technical Info */}
        <Descriptions
          title="Thông tin kỹ thuật"
          bordered
          column={2}
          size="small"
        >
          <Descriptions.Item label="Content Type">
            {Array.isArray(blogData.content) ? "Array" : "String"}
          </Descriptions.Item>
          <Descriptions.Item label="Content Length">
            {Array.isArray(blogData.content)
              ? `${blogData.content.length} paragraphs`
              : `${blogData.content?.length || 0} characters`}
          </Descriptions.Item>
          <Descriptions.Item label="Has Thumbnail">
            {blogData.thumpnail ? "✅ Yes" : "❌ No"}
          </Descriptions.Item>
          <Descriptions.Item label="Category ID">
            <code>
              {typeof blogData.category_id === "object"
                ? blogData.category_id?._id || "N/A"
                : blogData.category_id || "N/A"}
            </code>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default BlogDetailModal;
