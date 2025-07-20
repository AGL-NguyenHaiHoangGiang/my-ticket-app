import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../services/adminAuth';
import {Spin } from 'antd';

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
        return;
      }

      try {
        const response = await Auth.verifyToken(token);
        // console.log("Token verified:", response);
        if (response && response.message === 'Token is valid') {
          setAuth(true);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem('adminToken');
        setAuth(false);
      }
    }

    checkAuth();
  }, [navigate]);

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