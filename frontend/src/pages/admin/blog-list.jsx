import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getBlogsWithPagination,
  deleteBlog,
  getBlogBySlug,
} from "../../services/blog";
import BlogDetailModal from "../../components/admin/BlogDetailModal";
import EditBlogModal from "../../components/admin/EditBlogModal";

const BlogList = () => {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]); // Lưu tất cả blogs
  const [blogs, setBlogs] = useState([]); // Blogs hiển thị trên trang hiện tại
  const [loading, setLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: false,
  });

  // Load tất cả blogs một lần với limit 10000
  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBlogsWithPagination(1, 10000); // Load tất cả
      const data = response.data;

      if (data && data.metadata) {
        const blogList = data.metadata.map((blog, index) => ({
          key: blog._id,
          id: index + 1,
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

        setAllBlogs(blogList);
        setPagination((prev) => ({
          ...prev,
          total: blogList.length,
        }));

        // Hiển thị trang đầu tiên
        updateDisplayedBlogs(blogList, 1, 10);
      }
    } catch (error) {
      message.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật blogs hiển thị theo trang
  const updateDisplayedBlogs = (allBlogsList, page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedBlogs = allBlogsList.slice(startIndex, endIndex);
    setBlogs(displayedBlogs);
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleTableChange = (paginationInfo) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationInfo.current,
    }));
    updateDisplayedBlogs(
      allBlogs,
      paginationInfo.current,
      paginationInfo.pageSize
    );
  };

  const handleDelete = async (blogId) => {
    try {
      setDeletingIds((prev) => new Set([...prev, blogId]));

      const response = await deleteBlog(blogId);

      message.success("Xóa bài viết thành công");

      // Cập nhật allBlogs và tính toán lại pagination
      const updatedAllBlogs = allBlogs.filter((blog) => blog._id !== blogId);
      setAllBlogs(updatedAllBlogs);

      // Cập nhật total count
      setPagination((prev) => ({
        ...prev,
        total: updatedAllBlogs.length,
      }));

      // Kiểm tra nếu trang hiện tại không còn dữ liệu
      const currentPageStartIndex =
        (pagination.current - 1) * pagination.pageSize;
      if (
        currentPageStartIndex >= updatedAllBlogs.length &&
        pagination.current > 1
      ) {
        // Chuyển về trang trước
        const newPage = pagination.current - 1;
        setPagination((prev) => ({
          ...prev,
          current: newPage,
        }));
        updateDisplayedBlogs(updatedAllBlogs, newPage, pagination.pageSize);
      } else {
        // Giữ nguyên trang hiện tại
        updateDisplayedBlogs(
          updatedAllBlogs,
          pagination.current,
          pagination.pageSize
        );
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

  const handleEditSuccess = () => {
    fetchAllBlogs(); // Reload tất cả dữ liệu và giữ trang hiện tại
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
    navigate("/admin/add-blog");
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
            showQuickJumper: true,
            showTotal: (total, range) => {
              return `Hiển thị ${range[0]}-${range[1]} của ${total} bài viết`;
            },
          }}
          onChange={handleTableChange}
        />
      </div>

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
