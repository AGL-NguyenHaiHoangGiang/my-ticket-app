import { Routes, Route, useLocation } from 'react-router-dom';

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

export default function UserLayout() {
    const location = useLocation();

    const getMainClass = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        else if (path === '/tin-tuc') return 'blog';
        else if (path.startsWith('/tin-tuc/')) return 'blog category';
        else if (path.startsWith('/tin-tuc/') && path.split('/').length === 3) return 'blog category';
        else if (path.startsWith('/tin-tuc/') && path.split('/').length === 4) return 'blog blog-single';
        else if (path.startsWith('/events')) return 'events';
        else return 'single';
    };

    return (
        <>
            <Loading />
            <Header />
            <main className={getMainClass()}>
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
    );
}
