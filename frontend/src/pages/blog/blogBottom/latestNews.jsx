import DataBlog from "../data/dataBlog";
import BigCardNews from "../../../components/blog/bigCardNews";
import SmallCardNews from "../../../components/blog/smallCardNews";

const LatestNews = () => {
  const bigCardNewsArr = DataBlog.slice(0, 2);
  const bigCardNewsList = bigCardNewsArr.map((item) => (
    <BigCardNews
      image={item.image}
      title={item.title}
      description={item.description}
    />
  ));
  return (
    <section>
      <div className="heading">
        <h2 className="title">Tin mới nhất</h2>
        <a href="/tin-tuc-category/" className="readmore">
          Xem thêm
        </a>
      </div>
      <div className="blog-new flex-box">
        <ul className="flex-box">{bigCardNewsList}</ul>
        <ul className="flex-box">
          {DataBlog.slice(0, 4).map((item) => (
            <SmallCardNews
              key={item.id}
              title={item.title}
              image={item.image}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestNews;
