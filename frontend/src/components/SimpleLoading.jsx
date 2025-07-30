import React from "react";
import "../assets/style/SimpleLoading.css";

const SimpleLoading = () => {
  return (
    <div className="simple-loading-container">
      <div className="simple-loading-spinner"></div>
      <div className="simple-loading-text">LOADING</div>
    </div>
  );
};

export default SimpleLoading;
