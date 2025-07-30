import React from "react";

const TicketDetails = ({ ticketDetails }) => {
  return (
    <>
      <h4>Danh sách vé</h4>
      <div className="table_container">
        <table className="ticket-table">
          <thead>
            <tr>
              <th className="left-align">Hạng vé</th>
              <th className="center-align">Số lượng</th>
              <th className="right-align">Số ghế</th>
            </tr>
          </thead>
          <tbody>
            {ticketDetails.map((detail, index) => (
              <tr key={index}>
                <td className="left-align">{detail.type}</td>
                <td className="center-align">{detail.quantity}</td>
                <td className="right-align">{detail.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketDetails;
