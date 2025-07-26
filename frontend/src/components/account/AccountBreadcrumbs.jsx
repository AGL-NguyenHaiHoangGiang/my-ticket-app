import React from "react";
import { Link } from "react-router-dom";

const AccountBreadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <Link to="/">Trang chủ</Link> &gt; <Link to="/tai-khoan">Tài khoản</Link>{" "}
      &gt;{" "}
      <Link to="/tai-khoan" className="text__blue">
        Tài khoản
      </Link>
    </div>
  );
};

export default AccountBreadcrumbs;
