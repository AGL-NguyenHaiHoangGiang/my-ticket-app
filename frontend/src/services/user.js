import axios from "axios";

const API_BASE_URL = "http://localhost:3052/api/v0";

// User service
class UserService {
  // Lấy thông tin user hiện tại (từ token)
  static async getCurrentUser() {
    const token = localStorage.getItem("customerToken");
    return axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Cập nhật thông tin user
  static async updateUserProfile(userData) {
    const token = localStorage.getItem("customerToken");
    return axios.put(`${API_BASE_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Lấy tất cả booking của user hiện tại
  static async getUserBookings() {
    const token = localStorage.getItem("customerToken");
    return axios.get(`${API_BASE_URL}/user/my-bookings1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Lấy booking theo ID
  static async getBookingById(bookingId) {
    const token = localStorage.getItem("customerToken");
    return axios.get(`${API_BASE_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Hủy booking
  static async cancelBooking(bookingId) {
    const token = localStorage.getItem("customerToken");
    return axios.put(
      `${API_BASE_URL}/bookings/${bookingId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default UserService;
