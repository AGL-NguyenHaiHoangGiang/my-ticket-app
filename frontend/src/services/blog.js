import axios from "axios";

const API_BASE_URL = "http://localhost:3055/api/v1/blogs";

export const getAllBlogCategories = () => {
  return axios.get(API_BASE_URL);
};

export const getBlogCategoryBySlug = (slug) => {
  return axios.get(`${API_BASE_URL}/${slug}`);
};
