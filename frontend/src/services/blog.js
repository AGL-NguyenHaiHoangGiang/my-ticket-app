import axios from "axios";

const API_BASE_URL = "http://localhost:3052/api/v0/blogs";
const MANAGER_API_BASE_URL = "http://localhost:3052/api/v0/manager/blogs";
const BLOG_CATEGORIES_API_URL = "http://localhost:3052/api/v0/blog-categories";

export const getAllBlogCategories = (limit = 50) => {
  return axios.get(`${API_BASE_URL}?limit=${limit}`);
};

export const getBlogCategoryBySlug = (slug) => {
  return axios.get(`${API_BASE_URL}/${slug}`);
};

// Lấy chi tiết bài viết theo slug
export const getBlogBySlug = (slug) => {
  return axios.get(`${API_BASE_URL}/${slug}`);
};

// Lấy blog theo category
export const getBlogsByCategory = (category, limit = 50) => {
  return axios.get(`${API_BASE_URL}?category=${category}&limit=${limit}`);
};

// Lấy blogs với pagination cho admin
export const getBlogsWithPagination = (page = 1, limit = 10) => {
  return axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}`);
};

// Xóa blog
export const deleteBlog = (id) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("customerToken");
  const config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.delete(`${MANAGER_API_BASE_URL}/${id}`, config);
};

// Tạo blog mới
export const createBlog = (blogData) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("customerToken");
  const config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!(blogData instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return axios.post(MANAGER_API_BASE_URL, blogData, config);
};

// Cập nhật blog
export const updateBlog = (id, blogData) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("customerToken");
  const config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!(blogData instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return axios.put(`${MANAGER_API_BASE_URL}/${id}`, blogData, config);
};

// Cập nhật blog theo slug
export const updateBlogBySlug = (slug, blogData) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("customerToken");
  const config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!(blogData instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return axios.put(`${MANAGER_API_BASE_URL}/slug/${slug}`, blogData, config);
};

// Lấy chi tiết blog theo ID
export const getBlogById = (id) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("customerToken");
  const config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.get(`${MANAGER_API_BASE_URL}/${id}`, config);
};

// Lấy danh sách blog categories
export const getBlogCategories = () => {
  return axios.get(BLOG_CATEGORIES_API_URL);
};
