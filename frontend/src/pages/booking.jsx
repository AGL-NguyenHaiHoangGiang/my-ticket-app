import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EventService from '../services/events';

// Icons
import iconMinus from '../assets/images/booking/icon-minus.svg';
import iconPlus from '../assets/images/booking/icon-plus.svg';
import iconSecure from '../assets/images/booking/icon-secure.svg';
import iconTicket from '../assets/images/booking/icon-ticket.svg';

import '../assets/style/booking.css';

// Validation schema
const customerInfoSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Họ và tên là bắt buộc")
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không được quá 50 ký tự"),
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
    phone: yup
        .string()
        .required("Số điện thoại là bắt buộc")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
    note: yup
        .string()
        .max(200, "Ghi chú không được quá 200 ký tự")
});

const Booking = ({ auth, setLoginOpen }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [selectedTickets, setSelectedTickets] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('vnpay');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 phút

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(customerInfoSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            note: ''
        }
    });

    const fetchEventDetail = async () => {
        try {
            const response = await EventService.getBySlug(slug);
            setDetail(response.body);
        } catch (error) {
            console.error("Error fetching event detail:", error);
        }
    };

    useEffect(() => {
        if (!auth) {
            navigate(`/su-kien/${slug}`);
            return;
        }
        fetchEventDetail();
        window.scrollTo(0, 0);
    }, [slug, auth]);

    // Countdown timer effect
    useEffect(() => {
        if (timeLeft <= 0) {
            alert('Hết thời gian đặt vé! Vui lòng thử lại.');
            navigate(`/su-kien/${slug}`);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, navigate, slug]);

    // Format time for display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${pad2(minutes)}:${pad2(remainingSeconds)}`;
    };

    const startTime = detail.startTime ? new Date(detail.startTime) : null;
    const endTime = detail.endTime ? new Date(detail.endTime) : null;

    const pad2 = (num) => num.toString().padStart(2, '0');
    const formattedDate = startTime
        ? `${pad2(startTime.getHours())}:${pad2(startTime.getMinutes())} - ${pad2(endTime.getHours())}:${pad2(endTime.getMinutes())}, ${pad2(startTime.getDate())}/${pad2(startTime.getMonth() + 1)}/${startTime.getFullYear()}`
        : '';

    const venue = detail.venue || null;
    const address = venue ? `${venue}, ${detail.address}` : detail.address;
    const ticketList = detail.showings && detail.showings[0]?.ticketTypes || [];

    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price).replace(/\s?₫/, '₫');
    }

    const handleTicketQuantityChange = (ticketId, action) => {
        setSelectedTickets(prev => {
            const currentQuantity = prev[ticketId] || 0;
            let newQuantity = currentQuantity;

            if (action === 'increase') {
                newQuantity = currentQuantity + 1;
            } else if (action === 'decrease' && currentQuantity > 0) {
                newQuantity = currentQuantity - 1;
            }

            if (newQuantity === 0) {
                const { [ticketId]: removed, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [ticketId]: newQuantity
            };
        });
    };

    const getTotalAmount = () => {
        return ticketList.reduce((total, ticket) => {
            const quantity = selectedTickets[ticket.id] || 0;
            return total + (ticket.price * quantity);
        }, 0);
    };

    const getTotalTickets = () => {
        return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
    };

    const handleSubmitBooking = async (data) => {
        if (getTotalTickets() === 0) {
            alert('Vui lòng chọn ít nhất một vé!');
            return;
        }

        setLoading(true);

        try {
            // Simulate booking API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            const bookingData = {
                eventId: detail.id,
                tickets: selectedTickets,
                customerInfo: data, // Sử dụng data từ form validation
                paymentMethod,
                totalAmount: getTotalAmount(),
                totalTickets: getTotalTickets()
            };

            console.log('Booking data:', bookingData);
            alert('Đặt vé thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
            navigate(`/su-kien/${slug}`);

        } catch (error) {
            console.error('Booking error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (!auth) {
        return null;
    }

    return (
        <div className="booking-page">
            <div className="container">
                <div className="booking-header">
                    <button
                        className="booking-back-btn"
                        onClick={() => navigate(`/su-kien/${slug}`)}
                    >
                        ← Quay lại sự kiện
                    </button>
                    <h1 className="booking-title">Đặt vé sự kiện</h1>
                </div>

                <div className="booking-wrapper">
                    {/* Event Info */}
                    <div className="booking-event-info">
                        <div className="event-info-card">
                            <div className="event-banner">
                                <img src={detail.bannerURL} alt={detail.title} />
                            </div>
                            <div className="event-details">
                                <h2 className="event-booking-title">{detail.title}</h2>
                                <div className="event-meta">
                                    <div className="event-meta-item">
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="event-meta-item">
                                        <span>{address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Countdown Timer */}
                        <div className="countdown-timer">
                            <div className="countdown-header">
                                <h4>Thời gian giữ vé</h4>
                                <p>Vui lòng hoàn tất đặt vé trong</p>
                            </div>
                            <div className="countdown-display">
                                <div className="time-box">
                                    <span className="time-value">{formatTime(timeLeft)}</span>
                                    <span className="time-label">phút:giây</span>
                                </div>
                            </div>
                            <div className="countdown-warning">
                                {timeLeft <= 30 && (
                                    <p className="warning-text">⚠️ Sắp hết thời gian!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form className="booking-form" onSubmit={handleSubmit(handleSubmitBooking)}>
                        {/* Ticket Selection */}
                        <div className="booking-section">
                            <h3 className="section-title">
                                <img src={iconTicket} alt="Ticket" />
                                Chọn loại vé
                            </h3>
                            <div className="ticket-list">
                                {ticketList.map((ticket) => (
                                    <div key={ticket.id} className="ticket-item">
                                        <div className="ticket-info">
                                            <h4 className="ticket-name">{ticket.name}</h4>
                                            <p className="ticket-price">{formatPrice(ticket.price)}</p>
                                            {ticket.description && (
                                                <p className="ticket-description">{ticket.description}</p>
                                            )}
                                        </div>
                                        <div className="ticket-quantity">
                                            <button
                                                type="button"
                                                className="quantity-btn"
                                                onClick={() => handleTicketQuantityChange(ticket.id, 'decrease')}
                                                disabled={!selectedTickets[ticket.id]}
                                            >
                                                <img src={iconMinus} alt="Decrease" />
                                            </button>
                                            <span className="quantity-display">
                                                {selectedTickets[ticket.id] || 0}
                                            </span>
                                            <button
                                                type="button"
                                                className="quantity-btn"
                                                onClick={() => handleTicketQuantityChange(ticket.id, 'increase')}
                                            >
                                                <img src={iconPlus} alt="Increase" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="booking-section">
                            <h3 className="section-title">Thông tin người đặt</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="fullName">Họ và tên *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        {...register('fullName')}
                                        placeholder="Nhập họ và tên"
                                        className={errors.fullName ? 'error' : ''}
                                    />
                                    {errors.fullName && (
                                        <span className="error-message">{errors.fullName.message}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register('phone')}
                                        placeholder="Nhập số điện thoại"
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && (
                                        <span className="error-message">{errors.phone.message}</span>
                                    )}
                                </div>
                                <div className="form-group form-group-full">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        placeholder="Nhập địa chỉ email"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && (
                                        <span className="error-message">{errors.email.message}</span>
                                    )}
                                </div>
                                <div className="form-group form-group-full">
                                    <label htmlFor="note">Ghi chú</label>
                                    <textarea
                                        id="note"
                                        {...register('note')}
                                        placeholder="Ghi chú thêm (không bắt buộc)"
                                        rows={3}
                                        className={errors.note ? 'error' : ''}
                                    />
                                    {errors.note && (
                                        <span className="error-message">{errors.note.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="booking-section">
                            <h3 className="section-title">Phương thức thanh toán</h3>
                            <div className="payment-methods">
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="vnpay"
                                        checked={paymentMethod === 'vnpay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="payment-label">VNPay</span>
                                </label>
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="momo"
                                        checked={paymentMethod === 'momo'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="payment-label">Ví MoMo</span>
                                </label>
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="payment-label">Chuyển khoản ngân hàng</span>
                                </label>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="booking-section booking-summary">
                            <h3 className="section-title">Tóm tắt đơn hàng</h3>
                            <div className="summary-content">
                                {/* Chi tiết từng loại vé */}
                                {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                                    const ticket = ticketList.find(t => t.id == ticketId);
                                    if (!ticket || quantity === 0) return null;
                                    return (
                                        <div key={ticketId} className="summary-item">
                                            <span>{ticket.name} x{quantity}</span>
                                            <span>{formatPrice(ticket.price * quantity)}</span>
                                        </div>
                                    );
                                })}
                                
                                {/* Tổng số vé */}
                                {getTotalTickets() > 0 && (
                                    <div className="summary-item">
                                        <span>Tổng số vé:</span>
                                        <span>{getTotalTickets()} vé</span>
                                    </div>
                                )}
                                
                                <div className="summary-item summary-total">
                                    <span>Tổng tiền:</span>
                                    <span className="total-amount">{formatPrice(getTotalAmount())}</span>
                                </div>
                            </div>

                            <div className="security-note">
                                <img src={iconSecure} alt="Secure" />
                                <span>Thông tin của bạn được bảo mật an toàn</span>
                            </div>

                            <button
                                type="submit"
                                className="booking-submit-btn"
                                disabled={loading || getTotalTickets() === 0}
                            >
                                {loading ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
