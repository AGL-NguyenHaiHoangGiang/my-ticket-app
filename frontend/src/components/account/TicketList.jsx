import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({
  tickets,
  activeTab,
  expandedTickets,
  onToggleExpand,
}) => {
  return (
    <>
      {tickets.map((ticket, index) => (
        <TicketItem
          key={`${activeTab}-${index}`}
          ticket={ticket}
          ticketId={`${activeTab}-${index}`}
          isExpanded={expandedTickets[`${activeTab}-${index}`]}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </>
  );
};

export default TicketList;
