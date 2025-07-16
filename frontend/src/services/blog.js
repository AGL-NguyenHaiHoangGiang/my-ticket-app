import axios from "axios";

const API_BASE_URL = "http://localhost:3055/api/v1/blogs";

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
