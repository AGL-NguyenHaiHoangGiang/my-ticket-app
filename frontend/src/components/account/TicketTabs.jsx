import React from "react";

const TicketTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "success", label: "Thành công" },
    { key: "inprogress", label: "Đang xử lý" },
    { key: "cancelled", label: "Đã hủy" },
  ];

  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TicketTabs;
