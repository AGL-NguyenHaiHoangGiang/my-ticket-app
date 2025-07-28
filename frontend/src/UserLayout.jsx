import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./services/auth";

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
import Booking from "./pages/booking";
import AccountTicket from "./pages/account-ticket";

export default function UserLayout() {
  const location = useLocation();

  const getMainClass = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    else if (path === "/tin-tuc" || path === "/tin-tuc/") return "blog";
    else if (path.startsWith("/loai-tin-tuc/")) return "blog category";
    else if (path.startsWith("/tin-tuc/") && path.split("/").length === 3)
      return "blog blog-single";
    else if (path.startsWith("/su-kien/") && path.endsWith("/dat-ve"))
      return "booking";
    else if (path === "/su-kien/" || path === "/su-kien") return "page-event";
    else if (path.startsWith("/su-kien/") && path.split("/").length === 3)
      return "event single";
    else if (path.startsWith("/loai-su-kien/")) return "page-event";
    else if (path === "/tai-khoan") return "account";
    else return "pages";
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  //check login
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // check token tồn tại và hợp lệ
    const checkAuth = async () => {
      // lấy token từ localStorage
      const token = localStorage.getItem("customerToken");
      if (!token) {
        setAuth(false);
        return;
      }

      try {
        const response = await Auth.verifyToken(token);
        // console.log("Token verified:", response);
        if (response && response.message === "Token is valid") {
          setAuth(true);
        }
      } catch (error) {
        // console.error("Token verification failed:", error);
<<<<<<< HEAD
        localStorage.removeItem("adminToken");
=======
        localStorage.removeItem('customerToken');
>>>>>>> develop
        setAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Modal login
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <Header
        setAuth={setAuth}
        auth={auth}
        setLoginOpen={setLoginOpen}
        loginOpen={loginOpen}
      />
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
          <Route
            path="/su-kien/:slug"
            element={<EventDetail auth={auth} setLoginOpen={setLoginOpen} />}
          />
          <Route
            path="/su-kien/:slug/dat-ve"
            element={<Booking auth={auth} setLoginOpen={setLoginOpen} />}
          />
          <Route path="/su-kien" element={<Events />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tai-khoan" element={<Account auth={auth} />} />
          <Route
            path="/tai-khoan-ticket"
            element={<AccountTicket auth={auth} />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
