import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import OrderService from '../services/order';

// Icons
import successIcon from '../assets/images/account/success.svg';
import iconTicket from '../assets/images/booking/icon-ticket.svg';

import '../assets/style/payment-success.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    const [transactionInfo, setTransactionInfo] = useState({
        transactionCode: '',
        amount: '',
        orderInfo: '',
        payDate: '',
        status: ''
    });

    //get parameters from URL
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order');

    //token
    const token = localStorage.getItem('customerToken');

    if (!token) {
        alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!');
        return;
    }

    const fetchTransaction = async () => {
        try {
            const response = await OrderService.getTransaction(orderId, token);
            console.log('Transaction info response:', response);
            if (response && response.status) {
                setTransactionInfo({
                    transactionCode: orderId,
                    amount: response.amount ? response.amount : '',
                    orderInfo: response.orderInfo || '',
                    payDate: response.payDate ? response.payDate : '',
                    status: response.status
                });
            } else {
                throw new Error('Không nhận được thông tin giao dịch từ server');
            }
        } catch (error) {
            console.error('Error fetching transaction info:', error);
            alert('Có lỗi xảy ra!');
        }
    };

    useEffect(() => {
        fetchTransaction();

        // Auto redirect sau 30 giây
        const timer = setTimeout(() => {
            navigate('/');
        }, 30000);

        return () => clearTimeout(timer);
    }, [searchParams, navigate]);

    //function format date
    const formatPayDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const isSuccess = transactionInfo.status === 'success';

    return (
        <div className="payment-success-page">
            <div className="container">
                <div className="payment-success-wrapper">
                    <div className="payment-result-card">
                        <div className={`payment-icon ${isSuccess ? 'success' : 'failed'}`}>
                            {isSuccess ? (
                                <img src={successIcon} alt="Success" />
                            ) : (
                                <div className="failed-icon">❌</div>
                            )}
                        </div>

                        <div className="payment-message">
                            <h1 className={`payment-title ${isSuccess ? 'success' : 'failed'}`}>
                                {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}
                            </h1>
                            <p className="payment-subtitle">
                                {isSuccess
                                    ? 'Cảm ơn bạn đã đặt vé. Chúng tôi sẽ gửi thông tin vé đến email của bạn trong vài phút tới.'
                                    : 'Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.'
                                }
                            </p>
                        </div>

                        {transactionInfo.transactionCode && (
                            <div className="transaction-details">
                                <h3 className="details-title">
                                    <img src={iconTicket} alt="Transaction" />
                                    Chi tiết giao dịch
                                </h3>
                                <div className="details-content">
                                    <div className="detail-item">
                                        <span className="detail-label">Mã giao dịch:</span>
                                        <span className="detail-value">{transactionInfo.transactionCode}</span>
                                    </div>
                                    {transactionInfo.amount && (
                                        <div className="detail-item">
                                            <span className="detail-label">Số tiền:</span>
                                            <span className="detail-value">{transactionInfo.amount}₫</span>
                                        </div>
                                    )}
                                    {transactionInfo.orderInfo && (
                                        <div className="detail-item">
                                            <span className="detail-label">Thông tin đơn hàng:</span>
                                            <span className="detail-value">{transactionInfo.orderInfo}</span>
                                        </div>
                                    )}
                                    {transactionInfo.payDate && (
                                        <div className="detail-item">
                                            <span className="detail-label">Thời gian thanh toán:</span>
                                            <span className="detail-value">{formatPayDate(transactionInfo.payDate)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="payment-actions">
                            {isSuccess ? (
                                <>
                                    <Link to="/tai-khoan-ticket" className="btn btn-primary">
                                        Xem vé của tôi
                                    </Link>
                                    <Link to="/" className="btn btn-secondary">
                                        Về trang chủ
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="btn btn-primary"
                                    >
                                        Thử lại
                                    </button>
                                    <Link to="/" className="btn btn-secondary">
                                        Về trang chủ
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="auto-redirect-notice">
                            <p>Trang sẽ tự động chuyển về trang chủ sau 30 giây</p>
                        </div>
                    </div>

                    <div className="support-contact">
                        <h4>Cần hỗ trợ?</h4>
                        <p>Liên hệ với chúng tôi qua:</p>
                        <div className="contact-info">
                            <span>📞 Hotline: 1900 0000</span>
                            <span>📧 Email: nhom1@myticket.demo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
