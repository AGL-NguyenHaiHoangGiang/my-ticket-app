import React from "react";
import adsBanner from "../../assets/images/blog/ad-banner.png";

const BlogAds = () => {
  return (
    <div className="side__block pc-only">
      <a href="https://www.google.com/" className="add-banner">
        <img src={adsBanner} alt="ads" />
      </a>
    </div>
  );
};

export default BlogAds;
