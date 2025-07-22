import React from "react";
import "../assets/style/MiniLoading.css";

const MiniLoading = ({ text = "Đang tải..." }) => {
  return (
    <div className="mini-loading-container">
      <div className="mini-loading-spinner"></div>
      <span className="mini-loading-text">{text}</span>
    </div>
  );
};

export default MiniLoading;
