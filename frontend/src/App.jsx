import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/style/style.css";
import "./assets/style/home.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Loading from "./components/loading";
import Home from "./pages/home";
import News from "./pages/news";
import NewsCategory from "./pages/newsCategory";
import NewDetail from "./pages/newsDetail";

function App() {
  return (
    <Router>
      <Loading />
      <Header />
      <main id="home">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/tin-tuc/:category" element={<NewsCategory />} />
          <Route path="/tin-tuc/:category/:id" element={<NewDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
