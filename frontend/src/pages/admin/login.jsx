import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../services/adminAuth';
import '../../assets/style/admin.css';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (token) {
            navigate('/admin');
        }
    }, [token, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        setError('');

        try {
            const response = await Auth.login(values.username, values.password);
            // console.log("Login response:", response);

            if (response && response.accessToken) {
                localStorage.setItem("adminToken", response.accessToken);
                localStorage.setItem("adminRefreshToken", response.refreshToken);
                localStorage.setItem("sessionToken", response.sessionToken);
                localStorage.setItem("adminUsername", values.username);
                localStorage.setItem("avatar", response.body.avatar || '');
                navigate('/admin');
            }
        } catch (error) {
            console.error('Login error:', error);

            let errorMessage = '';

            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;

                switch (status) {
                    case 401:
                        errorMessage = errorData?.error;
                        break;
                    case 404:
                        errorMessage = 'Không tìm thấy tài khoản!';
                        break;
                    case 500:
                        errorMessage = 'Lỗi máy chủ. Vui lòng thử lại sau!';
                        break;
                    default:
                        errorMessage = 'Đăng nhập thất bại!';
                }
            } else {
                errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại!';
            }

            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFormFinish = (values) => {
        onFinish(values);
    };

    const handleInputChange = () => {
        if (error) {
            setError('');
        }
    };

    return (
        <>
            {!token && (
                <div className="login-container">
                    <div className="login-background">
                        <div className="login-overlay"></div>
                    </div>

                    <div className="login-content">
                        <Card className="login-card">
                            <div className="login-header">
                                <Title level={2} className="login-title">
                                    Đăng nhập
                                </Title>
                                <Text type="secondary" className="login-subtitle">
                                    Vui lòng đăng nhập để truy cập bảng điều khiển
                                </Text>
                            </div>

                            <Form
                                form={form}
                                name="login"
                                onFinish={handleFormFinish}
                                autoComplete="off"
                                size="large"
                                className="login-form"
                                validateTrigger="onBlur"
                            >
                                {error && (
                                    <Form.Item>
                                        <Alert
                                            message={error}
                                            type="error"
                                            showIcon
                                            closable
                                            onClose={() => setError('')}
                                            style={{ marginBottom: 16 }}
                                        />
                                    </Form.Item>
                                )}

                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập Username!' }
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="ID đăng nhập"
                                        autoComplete="ID đăng nhập"
                                        allowClear
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder="Mật khẩu"
                                        autoComplete="current-password"
                                        onChange={handleInputChange}
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div className="login-options">
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                        </Form.Item>
                                        {/* <Link to="/admin/forgot-password" className="login-forgot">
                                            Quên mật khẩu?
                                        </Link> */}
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        block
                                        className="login-button"
                                    >
                                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="login-footer">
                                <Text type="secondary">
                                    © 2025 My Ticket App.
                                </Text>
                            </div>
                        </Card>

                        <div className="login-back-home">
                            <Link to="/">
                                <Button type="link" icon={<UserOutlined />}>
                                    Về trang chủ
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
