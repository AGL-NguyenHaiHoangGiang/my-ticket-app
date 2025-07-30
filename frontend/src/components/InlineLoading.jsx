import React from "react";

const InlineLoading = ({ size = "small", text = "Đang tải..." }) => {
  const spinnerSize =
    size === "large" ? "40px" : size === "medium" ? "30px" : "20px";

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #3b9ae1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <span>{text}</span>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default InlineLoading;
