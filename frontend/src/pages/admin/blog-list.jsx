import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  getBlogsWithPagination,
  deleteBlog,
  getBlogBySlug,
} from "../../services/blog";
import AddBlogModal from "../../components/admin/AddBlogModal";
import BlogDetailModal from "../../components/admin/BlogDetailModal";
import EditBlogModal from "../../components/admin/EditBlogModal";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    hasNextPage: true,
  });

  const fetchBlogs = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await getBlogsWithPagination(page, pageSize);
      const data = response.data;

      if (data && data.metadata) {
        const blogList = data.metadata.map((blog, index) => ({
          key: blog._id,
          id: (page - 1) * pageSize + index + 1,
          title: blog.title,
          author: blog.author,
          category: blog.category_id?.name || "Chưa phân loại",
          status: "published",
          date: new Date(
            blog.article_datetime || blog.createdAt
          ).toLocaleDateString("vi-VN"),
          slug: blog.slug,
          _id: blog._id,
        }));

        setBlogs(blogList);

        const hasNextPage = blogList.length === pageSize;
        const estimatedTotal = hasNextPage
          ? page * pageSize + pageSize
          : (page - 1) * pageSize + blogList.length;

        setPagination({
          current: page,
          pageSize: pageSize,
          total: estimatedTotal,
          hasNextPage: hasNextPage,
          showSizeChanger: false,
        });
      }
    } catch (error) {
      message.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTableChange = (pagination) => {
    fetchBlogs(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (blogId) => {
    try {
      setDeletingIds((prev) => new Set([...prev, blogId]));

      const response = await deleteBlog(blogId);

      message.success("Xóa bài viết thành công");

      const remainingBlogs = blogs.length - 1;
      if (remainingBlogs === 0 && pagination.current > 1) {
        fetchBlogs(pagination.current - 1, pagination.pageSize);
      } else {
        fetchBlogs(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message_error = error.response.data?.message || "Có lỗi xảy ra";

        if (status === 401) {
          message.error("Bạn không có quyền xóa bài viết này");
        } else if (status === 404) {
          message.error("Không tìm thấy bài viết cần xóa");
        } else if (status === 403) {
          message.error("Quyền truy cập bị từ chối");
        } else {
          message.error(`Không thể xóa bài viết: ${message_error}`);
        }
      } else {
        message.error("Không thể kết nối đến server");
      }
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blogId);
        return newSet;
      });
    }
  };

  const handleView = (slug) => {
    window.open(`/tin-tuc/${slug}`, "_blank");
  };

  const handleAddSuccess = () => {
    fetchBlogs(1, pagination.pageSize);
  };

  const handleEditSuccess = () => {
    fetchBlogs(pagination.current, pagination.pageSize);
  };

  const handleViewDetail = async (blog) => {
    try {
      const response = await getBlogBySlug(blog.slug);
      const fullBlogData = response.data.metadata || response.data;

      setSelectedBlog(fullBlogData);
      setIsDetailModalVisible(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.error("Không tìm thấy blog này.");
        } else {
          message.error("Không thể tải thông tin blog chi tiết.");
        }
      } else {
        message.error("Không thể kết nối đến server.");
      }
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalVisible(true);
  };

  const handleAddBlog = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedBlog(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedBlog(null);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: 200,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 250,
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 280,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record.slug)}
          >
            Xem
          </Button>
          <Button
            type="default"
            icon={<InfoCircleOutlined />}
            size="small"
            onClick={() => handleViewDetail(record)}
          >
            Chi tiết
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa bài viết"
            description="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deletingIds.has(record._id)}
              disabled={deletingIds.has(record._id)}
            >
              {deletingIds.has(record._id) ? "Đang xóa..." : "Xóa"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-container">
      <div className="admin-header-section">
        <h1 className="admin-page-title">Quản lý blog</h1>
        <div className="admin-actions">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddBlog}
          >
            Thêm bài viết
          </Button>
        </div>
      </div>
      <div className="admin-table-container">
        <Table
          columns={columns}
          dataSource={blogs}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) => {
              // Hiển thị thông tin phù hợp
              if (
                !pagination.hasNextPage &&
                blogs.length < pagination.pageSize
              ) {
                return `Hiển thị ${range[0]}-${range[1]} của ${range[1]} bài viết (tất cả)`;
              } else {
                return `Hiển thị ${range[0]}-${range[1]} bài viết (trang ${pagination.current})`;
              }
            },
            itemRender: (current, type, originalElement) => {
              if (type === "next") {
                // Chỉ hiển thị nút next nếu có trang tiếp theo
                return pagination.hasNextPage ? originalElement : null;
              }
              return originalElement;
            },
          }}
          onChange={handleTableChange}
        />
      </div>

      {/* Add Blog Modal */}
      <AddBlogModal
        visible={isAddModalVisible}
        onCancel={handleCloseAddModal}
        onSuccess={handleAddSuccess}
      />

      {/* Blog Detail Modal */}
      <BlogDetailModal
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        blogData={selectedBlog}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        visible={isEditModalVisible}
        onCancel={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        blogData={selectedBlog}
      />
    </div>
  );
};

export default BlogList;
