import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getBlogsWithPagination,
  deleteBlog,
  getBlogBySlug,
} from "../../services/blog";
import AddBlogModal from "../../components/admin/AddBlogModal";
import BlogDetailModal from "../../components/admin/BlogDetailModal";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set()); // Track đang xóa blogs nào
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Modal state
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Detail Modal state
  const [selectedBlog, setSelectedBlog] = useState(null); // Blog được chọn để xem chi tiết
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    hasNextPage: true, // Thêm flag để tracking có trang tiếp theo không
  });

  // Fetch blogs from API
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
          status: "published", // Mặc định tất cả blog đều published
          date: new Date(
            blog.article_datetime || blog.createdAt
          ).toLocaleDateString("vi-VN"),
          slug: blog.slug,
          _id: blog._id,
        }));

        setBlogs(blogList);

        // Xác định có trang tiếp theo không dựa trên số lượng records trả về
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
      console.error("Error fetching blogs:", error);
      message.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle pagination change
  const handleTableChange = (pagination) => {
    fetchBlogs(pagination.current, pagination.pageSize);
  };

  // Handle delete blog
  const handleDelete = async (blogId) => {
    try {
      // Thêm vào set đang xóa
      setDeletingIds((prev) => new Set([...prev, blogId]));

      console.log("Deleting blog with ID:", blogId); // Debug log
      const response = await deleteBlog(blogId);
      console.log("Delete response:", response); // Debug log

      message.success("Xóa bài viết thành công");

      // Kiểm tra nếu trang hiện tại không còn blog nào sau khi xóa
      const remainingBlogs = blogs.length - 1;
      if (remainingBlogs === 0 && pagination.current > 1) {
        // Nếu trang hiện tại trống và không phải trang đầu, chuyển về trang trước
        fetchBlogs(pagination.current - 1, pagination.pageSize);
      } else {
        // Reload trang hiện tại
        fetchBlogs(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);

      // Hiển thị thông báo lỗi chi tiết hơn
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
      // Xóa khỏi set đang xóa
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blogId);
        return newSet;
      });
    }
  };

  // Handle view blog
  const handleView = (slug) => {
    window.open(`/tin-tuc/${slug}`, "_blank");
  };

  // Handle add blog success
  const handleAddSuccess = () => {
    // Refresh danh sách blog và quay về trang đầu
    fetchBlogs(1, pagination.pageSize);
  };

  // Handle edit blog - hiển thị thông tin blog trong modal
  const handleEdit = async (blog) => {
    console.log("=== EDIT BLOG DATA (FROM TABLE) ===");
    console.log("Table blog object:", blog);
    console.log("Blog slug:", blog.slug);

    try {
      console.log("🔄 Fetching full blog details from API...");
      console.log("Using slug:", blog.slug);
      const response = await getBlogBySlug(blog.slug);
      console.log("📡 API Response:", response);

      const fullBlogData = response.data.metadata || response.data;

      console.log("=== FULL BLOG DATA (FROM API) ===");
      console.log("📋 Complete blog object:", fullBlogData);

      // Hiển thị modal với thông tin đầy đủ
      setSelectedBlog(fullBlogData);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error("❌ Error fetching full blog details:", error);
      if (error.response) {
        console.error("📡 API Error Response:", error.response.data);
        console.error("🔢 Status Code:", error.response.status);

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

  // Handle open add modal
  const handleAddBlog = () => {
    setIsAddModalVisible(true);
  };

  // Handle close add modal
  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  // Handle close detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
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
      width: 200,
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
    </div>
  );
};

export default BlogList;
