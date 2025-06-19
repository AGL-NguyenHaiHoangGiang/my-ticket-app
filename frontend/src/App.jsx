import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/style/style.css';
import './assets/style/home.css';
import Header from './components/header';
import Footer from './components/footer';
import Loading from './components/loading';
import Home from './pages/home';
import News from './pages/news';  

function App() {
  return (
    <Router>
      <Loading />
      <Header />
      <main id="home">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tin-tuc" element={<News />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
