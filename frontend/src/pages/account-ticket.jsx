import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountBreadcrumbs from "../components/account/AccountBreadcrumbs";
import TicketMainContent from "../components/account/TicketMainContent";
import NotFound from "./404";
import SimpleLoading from "../components/SimpleLoading";
import UserService from "../services/user";

const AccountTicket = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedTickets, setExpandedTickets] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerRefreshToken");
    localStorage.removeItem("customerSessionToken");
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleExpand = (ticketId) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  // Fetch user bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      if (auth) {
        try {
          setLoading(true);

          // Fetch user info
          const userResponse = await UserService.getCurrentUser();
          if (userResponse.data?.body) {
            setUserInfo(userResponse.data.body);
          } else if (userResponse.data) {
            setUserInfo(userResponse.data);
          }

          // Fetch bookings
          const response = await UserService.getUserBookings();

          if (response.data?.body) {
            setBookings(response.data.body);
          } else {
            // If no bookings, use sample data for demonstration
            setBookings(getSampleTicketData());
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          // Fallback to sample data if API fails
          setBookings(getSampleTicketData());
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [auth]);

  // Function to get sample ticket data (fallback)
  const getSampleTicketData = () => {
    return [
      {
        _id: "sample_1",
        eventTitle:
          "Chuyến tàu mùa đông - Phan Mạnh Quỳnh The First Live Concert",
        status: "completed",
        eventDate: "2025-01-04T19:00:00Z",
        venue:
          "Nhà thi đấu Nguyễn Du - 116 Nguyễn Du, Bến Thành, Quận 1, Hồ Chí Minh",
        tickets: [{ type: "Tri kỷ", quantity: 1, seat: "A15" }],
        paymentDate: "2025-01-01",
        totalAmount: 3900000,
        paymentMethod: "Credit Card",
        createdAt: "2025-01-01T10:00:00Z",
      },
      {
        _id: "sample_2",
        eventTitle: "Live Concert - Ca sĩ ABC",
        status: "pending",
        eventDate: "2025-02-15T20:00:00Z",
        venue: "Sân vận động Quân khu 7",
        tickets: [{ type: "VIP", quantity: 2, seat: "B20-B21" }],
        paymentDate: "2025-01-15",
        totalAmount: 2500000,
        paymentMethod: "Bank Transfer",
        createdAt: "2025-01-15T14:30:00Z",
      },
    ];
  };

  // Transform booking data to match component structure
  const transformBookingData = (bookings) => {
    const transformed = {
      success: [],
      inprogress: [],
      cancelled: [],
      all: [],
    };

    bookings.forEach((booking) => {
      const transformedBooking = {
        id: booking._id,
        title: booking.eventTitle || booking.event?.title || "Event Title",
        status: booking.status || "completed",
        statusText: getStatusText(booking.status || "completed"),
        time: formatEventTime(booking.eventDate || booking.event?.date),
        location:
          booking.venue || booking.event?.venue || "Venue not specified",
        ticketDetails: booking.tickets || [
          { type: "General", quantity: 1, seat: "TBD" },
        ],
        paymentDate: formatDate(booking.paymentDate || booking.createdAt),
        totalTickets:
          booking.tickets?.reduce((sum, ticket) => sum + ticket.quantity, 0) ||
          1,
        paymentMethod: booking.paymentMethod || "Credit Card",
        cardNumber: "xxxx xxxx xxxx 1234", // Default card number
        amount: formatCurrency(booking.totalAmount || 0),
      };

      transformed.all.push(transformedBooking);

      if (booking.status === "completed" || booking.status === "success") {
        transformed.success.push(transformedBooking);
      } else if (
        booking.status === "pending" ||
        booking.status === "processing"
      ) {
        transformed.inprogress.push(transformedBooking);
      } else if (
        booking.status === "cancelled" ||
        booking.status === "failed"
      ) {
        transformed.cancelled.push(transformedBooking);
      }
    });

    return transformed;
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
      case "success":
        return "Thành công";
      case "pending":
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      case "failed":
        return "Thất bại";
      default:
        return "Thành công";
    }
  };

  const formatEventTime = (dateString) => {
    if (!dateString) return "TBD";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return "TBD";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    } catch (error) {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    } catch (error) {
      return `${amount} VND`;
    }
  };

  // Kiểm tra auth, nếu không đăng nhập thì hiển thị 404
  if (auth === false) {
    return <NotFound />;
  }

  // Nếu auth vẫn đang loading (null), có thể hiển thị loading hoặc chờ
  if (auth === null || loading) {
    return <SimpleLoading />;
  }

  const ticketData = transformBookingData(bookings);

  // Get user display name
  const getUserDisplayName = () => {
    // First try from API response
    if (userInfo) {
      const name =
        userInfo.fullName ||
        userInfo.name ||
        userInfo.firstName ||
        userInfo.username ||
        userInfo.email;
      if (name) return name;
    }

    // Fallback to localStorage
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsed = JSON.parse(storedUserInfo);
        const name =
          parsed.fullName ||
          parsed.name ||
          parsed.firstName ||
          parsed.username ||
          parsed.email;
        if (name) return name;
      }
    } catch (error) {
      console.error("Error parsing stored user info:", error);
    }

    // Last fallback
    return "Người dùng";
  };

  return (
    <main>
      <section>
        <div className="container">
          {/* Breadcrumbs */}
          <AccountBreadcrumbs pageName="Vé đã mua" />

          <div className="account__wrapper">
            {/* Side panel */}
            <AccountSidebar
              userName={getUserDisplayName()}
              onLogout={logout}
              activeTab="ticket"
            />
            {/* End Side panel */}

            {/* Main content */}
            <TicketMainContent
              activeTab={activeTab}
              expandedTickets={expandedTickets}
              ticketData={ticketData}
              onTabClick={handleTabClick}
              onToggleExpand={toggleExpand}
            />
            {/* End Main content */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountTicket;
