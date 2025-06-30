import SideItem from "../../components/blog/sideItem";
import DataBlog from "./data/dataBlog";

const BlogSide = () => {
  const blogSideData = DataBlog.slice(0, 5).map((item) => (
    <SideItem title={item.title} />
  ));
  console.log("Blog Side Data:", blogSideData);

  return (
    <div className="blog-side">
      <div className="heading">
        <h2 class="title">Đọc nhiều</h2>
      </div>
      <ul className="side__block">{blogSideData}</ul>
    </div>
  );
};

export default BlogSide;
