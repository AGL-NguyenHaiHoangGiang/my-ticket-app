import DataBlog from "../data/dataBlog";
import BigCardNews from "../../../components/blog/bigCardNews";
import SmallCardNews from "../../../components/blog/smallCardNews";
import { Link } from "react-router-dom";

const LatestNews = () => {
  const bigCardNewsArr = DataBlog.slice(0, 2);
  const bigCardNewsList = bigCardNewsArr.map((item) => (
    <BigCardNews
      image={item.image}
      title={item.title}
      description={item.description}
      author={item.author}
      date={item.date}
      category={item.category}
      id={item.id}
    />
  ));
  return (
    <section>
      <div className="heading">
        <h2 className="title">Tin mới nhất</h2>
        <Link to="/tin-tuc/tin-moi" className="readmore">
          Xem thêm
        </Link>
      </div>
      <div className="blog-new flex-box">
        <ul className="flex-box">{bigCardNewsList}</ul>
        <ul className="flex-box">
          {DataBlog.slice(0, 4).map((item) => (
            <SmallCardNews
              title={item.title}
              image={item.image}
              author={item.author}
              date={item.date}
              category={item.category}
              id={item.id}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestNews;
