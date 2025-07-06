import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/style/style.css';
import './assets/style/home.css';
import "./assets/style/blog.css";

import Header from './components/header';
import Footer from './components/footer';
import Loading from './components/loading';
import Home from './pages/home';
import News from './pages/news';
import NewsCategory from "./pages/newsCategory";
import NewDetail from "./pages/newsDetail";
import EventCategory from './pages/event-category';

import AdminLayout from './pages/admin/app';
import AdminLogin from './pages/admin/login';

function App() {
  return (
    <Router>

      <Routes>
        {/* admin login - no layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* admin routes - with layout */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* user routes */}
        <Route path="/*" element={
          <>
            <Loading />
            <Header />
            <main id="home">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tin-tuc" element={<News />} />
                <Route path="/tin-tuc/:category" element={<NewsCategory />} />
                <Route path="/tin-tuc/:category/:id" element={<NewDetail />} />
                <Route path="/events/:slug" element={<EventCategory />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
