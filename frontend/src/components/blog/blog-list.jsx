import BlogCard from "./blog-card";

function BlogList({className, data}) {
  return (
    <ul className={`post__list ${className}`}>
      {data.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </ul>
  );
}

export default BlogList;