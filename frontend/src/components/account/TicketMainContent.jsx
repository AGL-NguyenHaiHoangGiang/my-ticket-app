import React from "react";
import TicketTabs from "./TicketTabs";
import TicketList from "./TicketList";

const TicketMainContent = ({
  activeTab,
  expandedTickets,
  ticketData,
  onTabClick,
  onToggleExpand,
}) => {
  const allTickets = [
    ...ticketData.success,
    ...ticketData.inprogress,
    ...ticketData.canceled,
  ];

  const getTicketsByTab = (tab) => {
    switch (tab) {
      case "all":
        return allTickets;
      case "success":
        return ticketData.success;
      case "inprogress":
        return ticketData.inprogress;
      case "canceled":
        return ticketData.canceled;
      default:
        return [];
    }
  };

  return (
    <div className="main_container">
      <div>
        <h3>Vé đã mua</h3>
        <div className="horizontal__bar"></div>

        <TicketTabs activeTab={activeTab} onTabClick={onTabClick} />
      </div>

      {/* Tab content */}
      <div className="tab-content-container">
        <div className="tab-content active">
          <TicketList
            tickets={getTicketsByTab(activeTab)}
            activeTab={activeTab}
            expandedTickets={expandedTickets}
            onToggleExpand={onToggleExpand}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketMainContent;
