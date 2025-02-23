import './App.css';
import OfficesPage from './offices/OfficesPage';
import OfficePage from './offices/OfficePage';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router';
import Home from "./pages/Home";
function App() {

  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/earthlogo.jpg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
        <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/offices" className="button rounded">
        <span className="icon-share"></span>
          Offices
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offices" element={<OfficesPage />} />
          <Route path="/offices/:id" element={<OfficePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;