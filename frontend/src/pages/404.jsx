import { Link } from "react-router-dom";
const NotFound = () => (
  <div className="notfound__wrap">
    <div className="container">
      <h2>404</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/" className="button button--gradient button--back">Quay lại trang chủ</Link>
    </div>
  </div>
);

export default NotFound;