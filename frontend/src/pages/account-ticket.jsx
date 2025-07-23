import React, { useState, useEffect } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountBreadcrumbs from "../components/account/AccountBreadcrumbs";
import TicketMainContent from "../components/account/TicketMainContent";
import NotFound from "./404";
import SimpleLoading from "../components/SimpleLoading";

const AccountTicket = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedTickets, setExpandedTickets] = useState({});

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
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

  // Sample ticket data
  const ticketData = {
    success: [
      {
        title: "Chuyến tàu mùa đông - Phan Mạnh Quỳnh The First Live Concert",
        status: "success",
        statusText: "Thành công",
        time: "19:00 - 22:00, 04 Tháng Một, 2025",
        location:
          "Nhà thi đấu Nguyễn Du - 116 Nguyễn Du, Bến Thành, Quận 1, Hồ Chí Minh",
        ticketDetails: [{ type: "Tri kỷ", quantity: 1, seat: "A15" }],
        paymentDate: "01/01/2025",
        totalTickets: 1,
        paymentMethod: "Thẻ tín dụng",
        cardNumber: "xxxx xxxx xxxx 1234",
        amount: "3.900.000 VND",
      },
    ],
    inprogress: [
      {
        title: "Chuyến tàu mùa đông - Phan Mạnh Quỳnh The First Live Concert",
        status: "inprogress",
        statusText: "Đang xử lý - Chờ thanh toán",
        time: "19:00 - 22:00, 04 Tháng Một, 2025",
        location:
          "Nhà thi đấu Nguyễn Du - 116 Nguyễn Du, Bến Thành, Quận 1, Hồ Chí Minh",
        ticketDetails: [{ type: "Tri kỷ", quantity: 1, seat: "A15" }],
        totalTickets: 1,
        amount: "3.900.000 VND",
      },
    ],
    canceled: [
      {
        title: "Chuyến tàu mùa đông - Phan Mạnh Quỳnh The First Live Concert",
        status: "cancelled",
        statusText: "Đã hủy",
        time: "19:00 - 22:00, 04 Tháng Một, 2025",
        location:
          "Nhà thi đấu Nguyễn Du - 116 Nguyễn Du, Bến Thành, Quận 1, Hồ Chí Minh",
        ticketDetails: [{ type: "Tri kỷ", quantity: 1, seat: "A15" }],
        totalTickets: 1,
        amount: "3.900.000 VND",
      },
    ],
  };

  // Kiểm tra auth, nếu không đăng nhập thì hiển thị 404
  if (auth === false) {
    return <NotFound />;
  }

  // Nếu auth vẫn đang loading (null), có thể hiển thị loading hoặc chờ
  if (auth === null) {
    return <SimpleLoading />;
  }

  return (
    <main>
      <section>
        <div className="container">
          {/* Breadcrumbs */}
          <AccountBreadcrumbs pageName="Vé đã mua" />

          <div className="account__wrapper">
            {/* Side panel */}
            <AccountSidebar
              userName="Nguyễn Vân Anh"
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
