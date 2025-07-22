import React from "react";
import TicketDetails from "./TicketDetails";
import PaymentDetails from "./PaymentDetails";

// Import images
import successIcon from "../../assets/images/account/success.svg";
import inprogressIcon from "../../assets/images/account/inprogress.svg";
import cancelledIcon from "../../assets/images/account/cancelled.svg";
import calendarIcon from "../../assets/images/account/calendar.svg";
import coordinateIcon from "../../assets/images/account/coordinate.svg";
import ticketBanner from "../../assets/images/account/ticket_banner.png";

const TicketItem = ({ ticket, ticketId, isExpanded, onToggleExpand }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return successIcon;
      case "inprogress":
        return inprogressIcon;
      case "cancelled":
        return cancelledIcon;
      default:
        return successIcon;
    }
  };

  return (
    <div className="ticket_container">
      <div className="ticket_topsection_container">
        <div className="ticket_topsection_detail_container">
          <a href="#" className="text__blue">
            {ticket.title}
          </a>
          <div className="horizontal__bar"></div>
          <div className="ticket_detail_item">
            <div className="icon_container">
              <img src={getStatusIcon(ticket.status)} alt="Status" />
            </div>
            <span className={`text_${ticket.status}`}>{ticket.statusText}</span>
          </div>
          <div className="ticket_detail_item">
            <div className="icon_container">
              <img src={calendarIcon} alt="Calendar" />
            </div>
            <span>{ticket.time}</span>
          </div>
          <div className="ticket_detail_item">
            <div className="icon_container">
              <img src={coordinateIcon} alt="Coordinate" />
            </div>
            <span>{ticket.location}</span>
          </div>
        </div>
        <img
          className="ticket_topsection_img_container"
          src={ticketBanner}
          alt="ticket_banner"
        />
      </div>

      <div
        className={`ticket_botsection_container js-hide-content ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <div className="ticket_botsection_left_container">
          <TicketDetails ticketDetails={ticket.ticketDetails} />
        </div>
        <div className="ticket_botsection_right_container">
          <PaymentDetails ticket={ticket} />
        </div>
      </div>

      <button
        className="ticket_expand_button js-expand"
        onClick={() => onToggleExpand(ticketId)}
      >
        Thông tin chi tiết
      </button>
    </div>
  );
};

export default TicketItem;
