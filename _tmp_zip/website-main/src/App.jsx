import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import BoardPage from "./pages/Board.jsx";
import ProgramsPage from "./pages/Programs.jsx";
import PartnersPage from "./pages/Partners.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import InterestPage from "./pages/Interest.jsx";
import "./styles/app.css";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div className="page">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/alumni" element={<ProjectsPage />} />
          <Route path="/interest" element={<InterestPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
