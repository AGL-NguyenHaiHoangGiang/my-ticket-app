import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/style/admin.css';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock login validation
            if (values.email === 'admin@ticket.com' && values.password === 'admin123') {
                message.success('Đăng nhập thành công!');
                // Save to localStorage or context
                localStorage.setItem('adminToken', 'mock-token');
                localStorage.setItem('adminUser', JSON.stringify({
                    email: values.email,
                    name: 'Admin User',
                    role: 'admin'
                }));
                navigate('/admin');
            } else {
                message.error('Email hoặc mật khẩu không đúng!');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleFormFinish = (values) => {
        onFinish(values);
    };

    return (
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
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                            hasFeedback
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                autoComplete="email"
                                allowClear
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
                                <Link to="/admin/forgot-password" className="login-forgot">
                                    Quên mật khẩu?
                                </Link>
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
    );
};

export default Login;
