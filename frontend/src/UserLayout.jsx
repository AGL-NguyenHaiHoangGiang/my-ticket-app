import { Routes, Route, useLocation } from "react-router-dom";

import "./assets/style/style.css";
import "./assets/style/home.css";
import "./assets/style/blog.css";
import "./assets/style/event.css";
import "./assets/style/detail.css";
import "./assets/style/account.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Loading from "./components/loading";

import Home from "./pages/home";
import News from "./pages/news";
import NewsCategory from "./pages/newsCategory";
import NewDetail from "./pages/newsDetail";
import EventCategory from "./pages/event-category";
import EventDetail from "./pages/event-detail";
import Events from "./pages/events";
import NotFound from "./pages/404";
import Account from "./pages/account";

export default function UserLayout() {
  const location = useLocation();

  const getMainClass = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    else if (path === "/tin-tuc" || path === "/tin-tuc/") return "blog";
    else if (path.startsWith("/tin-tuc/category/")) return "blog category";
    else if (path.startsWith("/tin-tuc/") && path.split("/").length === 3)
      return "blog blog-single";
    else if (path.startsWith("/su-kien/") && path.split("/").length === 3)
      return "event single";
    else if (path.startsWith("/loai-su-kien/") || path.startsWith("/su-kien"))
      return "page-event";
    else if (path === "/tai-khoan") return "account";
    else return "pages";
  };

  return (
    <>
      <Loading />
      <Header />
      <main className={getMainClass()}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/loai-tin-tuc/:category" element={<NewsCategory />} />
          <Route path="/tin-tuc/:slug" element={<NewDetail />} />
          <Route
            path="/loai-su-kien/:categorySlug"
            element={<EventCategory />}
          />
          <Route path="/su-kien/:slug" element={<EventDetail />} />
          <Route path="/su-kien" element={<Events />} />
          <Route path="/tai-khoan" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
