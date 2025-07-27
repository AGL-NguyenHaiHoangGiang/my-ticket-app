import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../services/adminAuth';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // check token tồn tại và hợp lệ
    const checkAuth = async () => {
      // lấy token từ localStorage
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAuth(false);
        console.log("No token found, redirecting to login");
        return;
      }

      try {
        const response = await Auth.verifyToken(token);
        // console.log("Token verified:", response);
        if (response && response.message === 'Token is valid') {
          setAuth(true);
        }
      } catch (error) {
        console.warn("Token expired or invalid, trying to refresh...");

        const refreshToken = localStorage.getItem('adminRefreshToken');
        if (!refreshToken) {
          console.error("No refresh token found");
          setAuth(false);
          return;
        }

        try {
          const refreshResponse = await Auth.refreshToken(refreshToken);
          if (refreshResponse?.accessToken) {
            localStorage.setItem('adminToken', refreshResponse.accessToken);
            setAuth(true);
            return;
          }
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }

        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRefreshToken');
        setAuth(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (auth === false) {
      navigate('/admin/login');
    }
  }, [auth, navigate]);


  // Không render data nếu auth không hợp lệ
  if (auth === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin />
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return children;
}

export default ProtectedRoute;