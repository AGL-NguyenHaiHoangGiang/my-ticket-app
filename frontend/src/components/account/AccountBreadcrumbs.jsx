import React from "react";
import { Link } from "react-router-dom";

const AccountBreadcrumbs = ({ pageName = "Tài khoản" }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/">Trang chủ</Link> &gt; <Link to="/tai-khoan">Tài khoản</Link>{" "}
      &gt; <span className="text__blue">{pageName}</span>
    </div>
  );
};

export default AccountBreadcrumbs;
