import React from "react";

const PaymentDetails = ({ ticket }) => {
  return (
    <>
      <h4>Chi tiết thanh toán</h4>
      <div className="ticket_botsection_detail_container">
        <div className="left-text">Ngày thanh toán:</div>
        <div className="right-text">{ticket.paymentDate || "-"}</div>
      </div>
      <div className="ticket_botsection_detail_container">
        <div className="left-text">Tổng số vé:</div>
        <div className="right-text">{ticket.totalTickets}</div>
      </div>
      <div className="ticket_botsection_detail_container">
        <div className="left-text">Hình thức thanh toán:</div>
        <div className="right-text">
          {ticket.paymentMethod || "-"}
          {ticket.cardNumber && (
            <>
              <br />
              {ticket.cardNumber}
            </>
          )}
        </div>
      </div>
      <div className="ticket_botsection_detail_container">
        <div className="left-text">
          {ticket.status === "success" ? "Đã thanh toán:" : "Cần thanh toán:"}
        </div>
        <div className="right-text">{ticket.amount}</div>
      </div>
      {ticket.status === "inprogress" && (
        <div className="pill_container_actual">
          <button className="pill__container blue_background">
            Quay lại bước thanh toán
          </button>
          <button className="pill__container red_background">Hủy vé</button>
        </div>
      )}
    </>
  );
};

export default PaymentDetails;
