import SideItem from "../../../components/blog/sideItem";
import DataBlog from "../data/dataBlog";
import adsBanner from "../../../assets/images/blog/ad-banner.png";

const BlogSide = () => {
  const blogSideData = DataBlog.slice(0, 5).map((item) => (
    <SideItem title={item.title} />
  ));

  return (
    <div className="blog__side">
      <div className="heading">
        <h2 class="title">Đọc nhiều</h2>
      </div>
      <ul className="side__block">{blogSideData}</ul>
      <div class="side__block pc-only">
        <a href="#" class="add-banner">
          <img src={adsBanner} alt="ads" />
        </a>
      </div>
    </div>
  );
};

export default BlogSide;
